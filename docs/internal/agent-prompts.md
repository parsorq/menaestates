# Agent prompts — Mena Estates follow-ons

Paste one prompt per chat after Phase 1 is live. Do not start these inside the Phase 1 kickoff unless asked.

---

## Prompt B — CRM stages

```text
Work in /Users/navszt/forge/menaestates.

One outcome: CRM stages on the same Supabase leads table so the operator can work New → Closed|Dead without a second CRM.
Frozen: no lead marketplace; no full Panel chrome; guest marketing layout stays unless a tiny ops-only CSS leak; do not edit forge/mena (Construction).

Ship:
- Status transitions already exist; add notes edit, next_action_at, and filters by county/status on /ops
- Keep one system of record (Supabase). No HubSpot/Salesforce/Airtable mirror
- Password ops gate stays; parsorq@gmail.com maintenance rule respected if you add allowlists later
- Document field adds in docs/internal/revops.md

Check: change status + save note on a test lead; filter by county; migration applied local and production if schema changed.

Status: shipped (Prompt B).
```

---

## Prompt C — Mena handoff

```text
Work in /Users/navszt/forge/menaestates.

One outcome: When status becomes under_contract, require a Mena handoff packet and notify Mena; operator can flip to mena_handoff.
Frozen: no second CRM; no seller portal; guest site unchanged except if copy must name the handoff honestly; do not edit forge/mena product code (Construction).

Ship:
- Handoff fields: address (already), motivation, numbers discussed, access/photos notes, seller timeline, contract file link
- Block mena_handoff until required packet fields are present
- Email (or agreed channel) to Mena contact from env
- Checklist documented in docs/internal/revops.md

Check: cannot mark mena_handoff without packet; packet visible on ops; Mena notify fired on test lead.

Status: shipped (Prompt C).
```

---

## Prompt D — SEO page system

```text
Work in /Users/navszt/forge/menaestates.

One outcome: City + situation landers that feed the same /api/leads endpoint with correct source and landing_path.
Frozen: no national SEO farm; East Bay only; same Lead object; no dialer; do not edit forge/mena (Construction).

Ship:
- Landers such as sell house fast Oakland, inherited, as-is (pick a small first set)
- Shared form component; set source/landing_path per page
- Follow forge GUEST_AEO + DELIVERED_UI + VOICE
- Indexable metadata; answer-first H1

Check: submit from a city page; row shows that landing_path; pages survive 390 and 1280 with air.

Status: shipped (Prompt D). First set: Oakland, Berkeley, inherited, as-is. AEO triad in docs/standards/LLM_AEO.md.
```

---

## Prompt F — Ops search + detail

```text
Work in /Users/navszt/forge/menaestates.

One outcome: Operator can search leads and open one lead detail under /ops without building Panel chrome.
Frozen: guest-only house; no dual-surface Panel shell; password gate stays unless a later Google pass; do not edit forge/mena.

Ship:
- Search by name/phone/address fragment
- /ops/leads/[id] detail with status + key fields
- Keep one commit style for edits if notes land here; otherwise status remains instant control
- Stay visually thin (not admin shell)

Check: find the Phase 1 test lead; open detail; update status; mobile ops usable at 390.

Status: shipped (Prompt F).
```

---

## Prompt E — Ads

```text
Work in /Users/navszt/forge/menaestates.

One outcome: Meta or Google campaigns into existing landers with UTM written into Lead.utm; negatives for agents/rentals; counsel pass recorded before spend.
Frozen: no lead resale; no new capture stack; do not invent claims counsel has not cleared; do not edit forge/mena (Construction).

Ship:
- UTM capture already on form; verify end-to-end from ad URL
- Negative keyword / audience notes in docs/internal/revops.md or ads runbook
- Document spend owner, daily cap, and kill criteria
- Counsel checklist before launch (licensing / cash-buyer claims)

Check: test click with UTMs → lead row has utm jsonb; ops can see source path; no spend until counsel row is signed off in INSTALL or revops Notes.
```

---

## Prompt G — Lead spam guards

```text
Work in /Users/navszt/forge/menaestates.

One outcome: /api/leads resists burst spam and soft-dedupes obvious repeats without blocking real sellers.
Frozen: no CAPTCHA vendor unless needed after measuring; no marketplace; do not edit forge/mena.

Ship:
- Rate limit by IP (and optionally phone) in Route Handler
- Soft dedupe window for same phone + property_address
- Clear seller-facing error vs silent ignore (prefer clear)
- Log decisions server-side

Check: double-submit behavior is defined; legit new address still inserts; Resend not flooded by repeats.

Status: shipped (Prompt G).
```
