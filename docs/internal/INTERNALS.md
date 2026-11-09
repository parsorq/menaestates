# Internals (this project)

Installed on first touch. Studio bars apply here. Guest-only cash-buyer delivery for Mena Estates (East Bay). Separate from Mena Construction (`forge/mena`).

## Bound

| Layer | This repo | Source |
|-------|-----------|--------|
| Voice | `docs/VOICE.md` | Cash-buyer East Bay ledger English |
| Delivered UI | `docs/standards/DELIVERED_UI.md` | Craft DoD; forge DESIGN_CRAFT |
| Reading measure | Guest `:root` `--reading-measure` + `.vc-reading-measure` | DESIGN_CRAFT § Type floor |
| Display gates | `docs/internal/display.md` + `lib/guest-display-policy.test.ts` | Forge DISPLAY_GATES; shells use `--edge-inline` |
| House | `.cursor/rules/house.mdc` | Studio house rule bound; this product does not ship declaration-bar chrome |
| Rooms | `.cursor/rules/rooms.mdc` | Jobs, not screens |
| Tone | `docs/VOICE.md` + tone audit | Verb-cover. No sales theater |
| Principles | house + rooms + design craft | HIG, accessibility, dignified and clear |
| Doors | Guest form + optional phone | Thin `/ops` is staff inbox, not Acceso Panel |
| Access | `.cursor/rules/parsorq-maintenance.mdc` | `parsorq@gmail.com` on gated surfaces |
| RevOps | `docs/internal/revops.md` | Pipeline + phase map |
| Clean tree | `~/.cursor/rules/finish-clean-tree.mdc` | Policy + doc + guard |

## Live surface

Product: East Bay cash offer landing + lead intake + Resend alert + password `/ops/leads`.

## Dev home

`npm run dev` serves `/` as the marketing home (App Router `app/page.tsx`).

## Machine sources

`/Users/navszt/forge/docs/standards/` · `/Users/navszt/forge/docs/STUDIO_HUB.md` · `~/.cursor/skills/rooms-audit` · `~/.cursor/skills/tone-audit`

Vercel project `menaestates` must keep Framework Preset `nextjs` (VH1).
