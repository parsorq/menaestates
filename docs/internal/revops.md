# RevOps — Mena Estates

System of record for East Bay seller capture. Not a lead marketplace. One store: Supabase `leads`. No HubSpot, Salesforce, or Airtable mirror.

## People split

| Role | Owns |
|------|------|
| Operator | Seller calls, qualification, offer path to under contract |
| Mena | Exit after under contract (buyers, funding, close) |

The split is people process in Phase 1–2. Software stores the lead, status vocabulary, notes, and next action on the same row.

## Pipeline vocabulary

```text
New → Contacted → Qualified → Offer out → Under contract → Mena handoff → Closed
                                                                         └→ Dead
```

DB values: `new`, `contacted`, `qualified`, `offer_out`, `under_contract`, `mena_handoff`, `closed`, `dead`.

Ops UI (`/ops/leads`): thin scan list with search (name / phone / address fragment) plus county and status filters. Open `/ops/leads/[id]` for key fields, status (instant), recent status history, notes + `next_action_at` (save/cancel), and Mena handoff packet (save/cancel). Source on detail shows `source`, `landing_path`, and UTM path when present. No Panel chrome.

## Lead object

`full_name`, `phone`, `email?`, `property_address`, `county?`, `motivation`, `timeline`, `occupancy`, `consent_call` + `consent_call_at` + `consent_text_version` + `consent_text`, `source`, `landing_path`, `status` (default `new`), `utm` jsonb, `notes`, `next_action_at` (timestamptz, nullable), `numbers_discussed`, `access_photos_notes`, `contract_file_link`, `intake_stage` (`contact` | `qualified`). County nullable since migration `20261111010000_leads_optional_address_county.sql`; address required again on guest + API (migration `20261111020000_leads_require_property_address.sql`).

Field adds:

| Column | Type | Notes |
|--------|------|-------|
| `notes` | `TEXT` | Operator CRM notes; editable on `/ops/leads` |
| `next_action_at` | `TIMESTAMPTZ` | Next follow-up; migration `20261109200000_leads_next_action_at.sql` |
| `numbers_discussed` | `TEXT` | Handoff packet; migration `20261109210000_leads_handoff_packet.sql` |
| `access_photos_notes` | `TEXT` | Handoff packet (keys, lockbox, photo links) |
| `contract_file_link` | `TEXT` | Handoff packet; http(s) URL to signed contract file |
| `consent_text` | `TEXT` | Exact call-consent wording shown at submit; migration `20261109220000_leads_consent_text.sql`. Null on pre-trail rows. |
| `intake_stage` | `TEXT` | `contact` (short first ask) or `qualified` (name + sell facts). Migration `20261110150000_leads_intake_stage.sql`. Default `qualified` for older rows. |

### Status history (`lead_events`)

Separate table (not jsonb on the lead row). Migration `20261109230000_lead_events.sql`.

| Column | Type | Notes |
|--------|------|-------|
| `lead_id` | UUID | FK to `leads`; cascade delete |
| `created_at` | TIMESTAMPTZ | When the change happened |
| `kind` | TEXT | `status_change` only for now |
| `from_status` / `to_status` | `lead_status` | Previous and next values |
| `actor_label` | TEXT | Operator email when Google session is present; otherwise `ops` |

Written on `POST /api/ops/leads/[id]/status` when status actually changes. Same status re-post does not insert. Detail History panel lists the last 20. No public anon writes. RLS + revoke lock matches `leads`.

Insert path: guest form → `POST /api/leads` (service role) → abuse guards → Supabase `leads` → Resend alert → visible on `/ops/leads`.

### Guest intake

Shared `LeadForm` is one short ask. Same store. No second CRM.

| Guest fields | Required | API | Row state |
|--------------|----------|-----|-----------|
| Full name, phone, property address, call consent | Yes | `POST /api/leads` | Inserts. Goes to `/thank-you`. |
| Why sell, notes | Optional | same | Timeline and occupancy store `pending_call` until the call. Motivation uses the selection or `pending_call`. County may be null. |
| County | Not shown | same | City/guide landers may still send `defaultCounty` silently for ops. |

`intake_stage` is `qualified` only when motivation, timeline, and occupancy are all real values (scripts / older clients). Guest submits are usually `contact`. Soft dedupe uses phone + address.

`POST /api/leads/qualify` remains for token-gated updates; the guest form no longer uses it.

Guest proof near the ask: Hector photo, name, role, CA license, short who-buys line, and a compact What happens next (call window, cash buyer, cities). SSOT in `lib/guest-proof.ts`. Full bio, Realtor career stats, and reviews stay on About. Realtor stats/reviews are labeled career, not cash-buy counts.

### Abuse guards (`POST /api/leads`)

Policy in `lib/lead-guards.ts`. No CAPTCHA vendor. Decisions are logged server-side (`[api/leads] decision`). Seller-facing errors are clear (form shows `error`); not silent ignore.

| Guard | Rule | Response | Resend |
|-------|------|----------|--------|
| Soft dedupe | Same normalized phone + property address within 24h | `409` with message that we already have the property | Skipped (no insert) |
| IP rate limit | ≥8 inserts from same `submit_ip` in 10 minutes | `429` + `Retry-After` | Skipped |
| Phone rate limit | ≥5 inserts from same phone digits in 60 minutes (any address) | `429` + `Retry-After` | Skipped |

Double-submit (double-click / retry of the same phone + address): soft dedupe. Same phone with a **new** address still inserts until the phone cap. `submit_ip` is stored on the lead row for IP counts (migration `20261109240000_leads_submit_ip.sql`); not shown on ops.

### Landers (Prompt D)

Shared `LeadForm` sets `source` and `landing_path` per page. Ops Source shows both. City and guide registry: `lib/landers.ts` (`kind: "city" | "guide"`). Guide ops `source` strings stay `lander-inherited` / `lander-as-is` (frozen for historic leads). Guides hub path: `lib/guides-hub.ts` (`GUIDES_HUB_PATH` = `/guides`). Repair tool path: `lib/repair-or-as-is.ts`. AEO triad: `docs/standards/LLM_AEO.md`.

| Page | `source` | `landing_path` |
|------|----------|----------------|
| Home | `web` | `/` |
| Cities hub | `cities-hub` | `/cities-we-buy-in-east-bay` |
| How we buy | `how-we-buy` | `/how-we-buy` |
| Guides hub (`/guides`) | `guides-hub` | `/guides` |
| Inherited guide | `lander-inherited` | `/guides/sell-inherited-house-east-bay` |
| As-is guide | `lander-as-is` | `/guides/sell-house-as-is-east-bay` |
| Repair tool | `repair-or-as-is` | `/tools/repair-or-as-is-east-bay` |
| City landers | `lander-*` (e.g. `lander-oakland`) | city path (e.g. `/sell-house-fast-oakland`) |

`/guides/*` leaves write the full guide path (not `/guides`). `/tools/*` writes the tool path (today only `/tools/repair-or-as-is-east-bay`).

Ops CRM update: authenticated `POST /api/ops/leads/[id]` with notes, next action, and/or handoff packet fields. Status stays on `POST /api/ops/leads/[id]/status` (and appends `lead_events`).

No public anon writes. RLS + revoke lock on `leads` and `lead_events`.

`/ops` uses Auth.js Google + allowlist (`parsorq@gmail.com` always; extras via `OPS_OPERATOR_EMAILS`). Shared password gate is demoted. Leads still load via Supabase service role.

## Mena handoff packet (Prompt C)

Required before status can become `mena_handoff`. Same row; no second CRM.

| Packet field | Source |
|--------------|--------|
| Address | `property_address` (intake; shown on ops) |
| Motivation | `motivation` (intake; editable on ops packet) |
| Numbers discussed | `numbers_discussed` (ops) |
| Access / photos notes | `access_photos_notes` (ops) |
| Seller timeline | `timeline` (intake; editable on ops packet) |
| Contract file link | `contract_file_link` (ops; http(s) URL) |

Checklist for the operator:

1. Confirm address on the lead row.
2. Confirm or refine motivation.
3. Write numbers discussed (offer, credits, repairs).
4. Write access and photos notes.
5. Confirm or refine seller timeline.
6. Paste contract file link (Drive, Dropbox, or similar http(s) URL).
7. Set status to Under contract (sends Mena notice once on first transition).
8. When the packet chip reads Ready, set status to Mena handoff.

Notify: first transition into `under_contract` emails `MENA_HANDOFF_TO` via Resend (`sendMenaHandoffAlert`). Incomplete packet still notifies; status `mena_handoff` stays blocked until the packet is complete. Re-selecting Under contract does not re-send.

Local check script: `node scripts/verify-handoff.mjs` (service role; sends a real Resend message to `MENA_HANDOFF_TO`).

## Phase map

| Phase | Outcome | Prompt |
|-------|---------|--------|
| 1 | Site + DB + notify + ops list | Kickoff (shipped) |
| 2 | CRM stages / notes / next_action / filters | Prompt B (shipped) |
| 3 | Mena handoff packet | Prompt C (shipped) |
| 4 | SEO city/guide pages | Prompt D (shipped) |
| 5 | Ads + UTM discipline | Prompt E (runbook shipped; spend blocked until counsel) |
| 6 | Ops search + lead detail | Prompt F (shipped) |

Copy-paste prompts: [`agent-prompts.md`](./agent-prompts.md).

## Ads runbook (Prompt E)

Paid traffic lands on existing guest capture pages only (city/guide rows in `lib/landers.ts`, home, guides hub `/guides`, guide leaves under `/guides/*`, repair tool under `/tools/*`). Same `LeadForm` → `POST /api/leads`. No new capture stack. No lead resale. Prefer city or guide leaves over hubs when the ad already names the seller's case.

### UTM discipline

Ad final URLs must carry standard UTMs. Form reads query on submit (`lib/utm.ts`); API stores them on `leads.utm` jsonb. Ops Source column shows `source`, `landing_path`, and a UTM path line. Lead alert email includes the same UTM block. Final URL path must match the page’s `landing_path` (table above); UTMs do not replace `source`.

Example (Google → Oakland city lander → `source: lander-oakland`, `landing_path: /sell-house-fast-oakland`):

```text
https://menaestates.vercel.app/sell-house-fast-oakland?utm_source=google&utm_medium=cpc&utm_campaign=eastbay-sellers&utm_content=oakland-lander&utm_term=sell-house-fast-oakland
```

Example (Meta → inherited guide leaf → `source: lander-inherited`, `landing_path: /guides/sell-inherited-house-east-bay`):

```text
https://menaestates.vercel.app/guides/sell-inherited-house-east-bay?utm_source=meta&utm_medium=paid_social&utm_campaign=eastbay-sellers&utm_content=inherited-guide&utm_term=sell-inherited-house-east-bay
```

Example (Google → repair tool → `source: repair-or-as-is`, `landing_path: /tools/repair-or-as-is-east-bay`):

```text
https://menaestates.vercel.app/tools/repair-or-as-is-east-bay?utm_source=google&utm_medium=cpc&utm_campaign=eastbay-sellers&utm_content=repair-or-as-is-tool&utm_term=repair-or-sell-as-is
```

Example (Meta → guides hub only when the ad is catalog-level → `source: guides-hub`, `landing_path: /guides`):

```text
https://menaestates.vercel.app/guides?utm_source=meta&utm_medium=paid_social&utm_campaign=eastbay-sellers&utm_content=guides-hub
```

Local verify: `node scripts/verify-utm.mjs` (posts a lead with UTMs, asserts jsonb, deletes the row).

### Negative keywords / audiences

Keep agents, rentals, and out-of-footprint traffic out of paid search and Meta.

**Google Search negatives (phrase / exact as account allows):**

- real estate agent, realtor, listing agent, MLS, Zillow agent
- for rent, rental, apartment for rent, lease, tenant screening
- property management, landlord software
- wholesale wholesale leads, lead list, skip tracing (buyer-side junk)
- remodel, contractor, construction (Construction is `forge/mena`, not this site)
- national / out of East Bay city names not in footprint when they skew waste

**Meta audience notes:**

- Exclude real-estate industry job titles when the platform allows
- Exclude interest clusters that skew agent / investor-course / rental-landlord software
- Geo: Oakland, San Leandro, Hayward, Castro Valley, San Lorenzo, Newark, Tracy (Alameda + San Joaquin); no national lookalikes until proven
- Age floor: adult homeowners; no under-21 targeting

Review negatives weekly in the first 14 days of spend. Add search-term waste to this list the same day.

### Spend owner, daily cap, kill criteria

| Control | Value |
|---------|--------|
| Spend owner | Operator (seller-call owner). Studio (`parsorq@gmail.com`) may pause accounts for kill criteria or counsel hold. |
| Channels | Google Search and/or Meta. One channel first. |
| Daily cap (pilot) | $75 USD / day across all ad accounts for this brand until counsel lifts the hold and the first 14 days stay inside kill criteria. |
| Monthly soft cap | $1,500 USD until a written raise. |
| Destination | Existing capture pages only (city/guide landers, home, `/guides`, `/guides/*`, `/tools/*`). Do not point ads at Construction (`forge/mena` / Vercel `mena`). |

**Kill criteria (pause same day, do not wait for a weekly review):**

1. Counsel hold or INSTALL `AD1` not signed.
2. Consent / TCPA complaint or platform policy strike on cash-buyer claims.
3. Cost per qualified lead (status `qualified`+) exceeds $250 for 3 calendar days with ≥5 paid leads.
4. ≥30% of paid leads are agents, rentals, or outside the seven buy cities after operator tag in notes.
5. Form, notify, or ops inbox broken for >4 hours during spend hours (PT).

No spend until INSTALL counsel row `AD1` is signed. Caps above are pilot defaults; change them in this table when the operator writes a new number.

### Counsel checklist (before launch)

Do not invent licenses, guarantees, or cash-buyer claims counsel has not cleared. Site copy already on landers stays as-is until counsel marks a change.

| # | Item | Sign-off |
|---|------|----------|
| C1 | Entity may advertise as principal cash buyer in CA for the seven buy cities (Alameda + Tracy / San Joaquin) | Pending counsel |
| C2 | Licensing / brokerage language: ads and landers do not imply realtor/MLS listing services | Pending counsel |
| C3 | Cash / as-is / speed claims on ads match cleared lander wording only | Pending counsel |
| C4 | Consent text (`lib/consent.ts`) and call path reviewed for TCPA / CIPA risk at ad volume | Pending counsel |
| C5 | Meta / Google ad creative and headlines reviewed (no uncleared guarantees) | Pending counsel |
| C6 | Negative list and geo exclusions accepted | Pending counsel |

Record the pass on INSTALL row `AD1` (date + counsel name). Until then: build campaigns in draft only; daily budget = $0 live.

`SSOT gap`: no forge TCPA/CIPA standard yet; this checklist is local.

## Non-goals (until proven)

Lead marketplace/resale, national SEO farm, dialer, second CRM for Mena, seller portal, full Panel chrome.

## Consent

Call consent only. No SMS consent product until explicitly added.

Each new lead stores:

| Fact | Column | Source |
|------|--------|--------|
| Checkbox accepted | `consent_call` | Form required |
| When accepted | `consent_call_at` | Server timestamp on insert |
| Wording version | `consent_text_version` | `CONSENT_TEXT_VERSION` in `lib/consent.ts` |
| Exact wording shown | `consent_text` | `CONSENT_CALL_TEXT` in `lib/consent.ts` |

`lib/consent.ts` is the SSOT. Bump `CONSENT_TEXT_VERSION` whenever `CONSENT_CALL_TEXT` changes. Ops reads version, timestamp, and text on `/ops/leads`. Lead alert email includes the same facts. Pre-migration rows may have version + timestamp without `consent_text`.

**Counsel gap (do not invent forge TCPA law):** This trail is an engineering record of what the seller saw and when. It is not a counsel opinion, TCPA/CIPA compliance certificate, or license to run ads. No forge TCPA/CIPA standard exists yet (`SSOT gap`). Clear wording and call path with counsel before ad volume (checklist C4, INSTALL `AD1`). Until then: no invented legal claims in product copy or agent docs.
