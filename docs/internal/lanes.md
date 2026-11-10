# Work lanes — Mena Estates

| Lane | May edit | Must not edit in the same pass |
|------|----------|--------------------------------|
| Guest | `app/page.tsx`, `app/how-we-buy/**`, `app/cities-we-buy-in-east-bay/**`, `app/(landers)/**`, `app/thank-you/**`, `app/components/**` (guest), `app/globals.css` guest rules, `lib/landers.ts`, `lib/how-we-buy.ts`, SEO/AEO libs, marketing docs | `/ops/**` chrome growth into Panel; Construction repo |
| Ops (thin) | `app/ops/**`, `app/api/ops/**`, lead status helpers | Guest marketing redesign |
| Ledger / intake | `lib/leads.ts`, `app/api/leads/**`, `supabase/migrations/**`, revops docs | Guest copy rewrites unrelated to schema |

Guest-only house for Phase 1. Do not grow `/ops` into full Panel chrome without an explicit dual-surface pass.
