# Install — Mena Estates

- Date: 2026-11-09
- Class: closed
- Surface: product (Phase 1 East Bay cash-buyer intake)
- State: Next guest site + Supabase leads + Resend + thin `/ops/leads`; Construction stays on `forge/mena`
- Git: `https://github.com/parsorq/menaestates` · `main`
- Hosts: Vercel `menaestates` → https://menaestates.vercel.app (interim production; no custom domain yet); Supabase `menaestates` (`qsijhuqxtvdxznbzwmkn`); Resend (shared studio key, `RESEND_FROM=Mena Estates <onboarding@resend.dev>` until domain verified)

## Access

| Surface | Status | Evidence / exact fix |
|---------|--------|----------------------|
| App session (parsorq@gmail.com) | APPLIED | `/ops` Google via Auth.js (studio pattern). Allowlist always includes `parsorq@gmail.com`; extras via `OPS_OPERATOR_EMAILS`. Shared `OPS_PASSWORD` demoted. `LEAD_ALERT_TO` + `MENA_HANDOFF_TO` to studio mail |
| Manage-everything in app | APPLIED | Thin ops inbox (Google allowlist): status, notes, next_action_at, handoff packet, county/status filters. Full Panel deferred |
| GitHub | PRESENT | `parsorq/menaestates` |
| Vercel | PRESENT | Project `menaestates`; live https://menaestates.vercel.app; VH1 `framework: nextjs`; Production `NEXT_PUBLIC_SITE_URL` set to that origin |
| Google / OAuth | APPLIED | Auth.js Google; callback `/api/auth/callback/google`; stranger → `/ops/denied`. Supabase stays data-only for leads |
| Other | PRESENT | Supabase project created (paused parked `pq.vestcrest` to free free-tier slot). Resend API key wired |

## Internals (this run)

| ID | Check | Status | Exact fix if MISSING |
|----|-------|--------|----------------------|
| V1 | docs/VOICE.md is studio ledger English | APPLIED | Cash-buyer East Bay voice |
| V2 | Client voice separated or absent | APPLIED | Single voice file; Construction is a different repo |
| H1 | House rule installed | APPLIED | `.cursor/rules/house.mdc` |
| H2 | Rooms rule installed | APPLIED | `.cursor/rules/rooms.mdc` |
| H3 | Tone / verb-cover bound | APPLIED | VOICE + voice.mdc |
| H4 | Principles bound | APPLIED | house + rooms + craft |
| DC1 | Design craft + DELIVERED_UI | APPLIED | `docs/standards/DELIVERED_UI.md` |
| RM1 | `--reading-measure` + `.vc-reading-measure` | APPLIED | `app/globals.css` |
| DG1 | Guest display gates 229–1280 + root clip policy | APPLIED | `docs/internal/display.md`; `lib/guest-display-policy.test.ts`; header wrap + `--edge-inline` |
| H5 | Doors / windows named | APPLIED | Guest form primary door; thin `/ops` Google allowlist gate |
| A1 | parsorq-maintenance rule | APPLIED | |
| A2 | parsorq@gmail.com in allowlists | APPLIED | Hardcoded in `lib/ops-allowlist.ts`; alert + handoff recipients |
| R1 | README names what this repo is | APPLIED | |
| R2 | DEPLOY names live / do-not-touch host | APPLIED | Do not touch Vercel `mena` / `forge/mena` |
| L3 | Local `npm run dev` serves `/` | APPLIED | App Router `app/page.tsx` |
| G1 | Remote and branch recorded | APPLIED | |
| G2 | Checkpoint / sibling host | APPLIED | Construction is sibling `mena`, not this tree |
| D1 | INSTALL is this file | APPLIED | |
| C1 | Cursor rules are house rules | APPLIED | |
| S1 | Stripped prior docs flagged | APPLIED | Greenfield empty repo |
| S2 | Supabase PostgREST lock | APPLIED | Migrations + `npm run test:security` |
| N1 | Platform security alert hygiene | APPLIED | `docs/internal/platform-security-alerts.md` |
| VH1 | Vercel Framework Preset matches app | APPLIED | `framework: nextjs` |
| AD1 | Counsel pass before paid ads spend | BLOCKED | Checklist in `docs/internal/revops.md` Ads runbook (C1-C6). Sign here with date + counsel name before any live budget. Until then: draft campaigns only, $0 spend. |

## Missing (detail)

### Custom domain + Resend

No Mena Estates domain yet. Production stays on https://menaestates.vercel.app (apex/www attach deferred). Alerts send as `Mena Estates <onboarding@resend.dev>`. When a domain exists: attach it on Vercel with apex/www redirects, verify the same domain in Resend DNS, set Production `NEXT_PUBLIC_SITE_URL` and `RESEND_FROM` to that origin/mailbox, redeploy, retest a lead alert.

## Notes

- Parked Supabase `pq.vestcrest` was paused 2026-11-09 to free a free-tier project slot for `menaestates`.
- Prompts B (CRM), C (Mena handoff), D (SEO landers), and E (ads runbook + UTM verify) shipped. Prompt E spend stays blocked on `AD1`.
- `MENA_HANDOFF_TO`: Resend recipient when status first becomes `under_contract`.
- `SSOT gap`: no forge TCPA/CIPA standard. Call-consent trail is local only: `lib/consent.ts` SSOT; each new lead stores `consent_text`, `consent_text_version`, and `consent_call_at` (migration `20261109220000_leads_consent_text.sql`). Ops and lead alerts surface those facts. This is an engineering record, not counsel sign-off. Ads counsel checklist (revops C1-C6, row `AD1`) stays local until a forge standard exists. No SMS consent product until explicitly added.
- Ads: spend owner, $75/day pilot cap, kill criteria, and negatives live in `docs/internal/revops.md` Ads runbook. No live spend while `AD1` is BLOCKED.
