# Display — Mena Estates

Extends forge `DISPLAY_GATES.md`.

| Token | Value / use |
|-------|-------------|
| `--ui-gutter` | `clamp(1rem, 4vw, 2rem)` minimum bay |
| `--edge-inline` | `max(--ui-gutter, safe-area-inset-left/right)` used by shells |
| `--content-wide` | Shell for marketing sections |
| `--content-standard` | Narrow shell (thank-you, ops login) |
| `--reading-measure` | `min(62ch, 100%)` for prose |

## Gates

Guest marketing must survive **229 × 350**, then **390, 744, 1032, 1280** with air on four edges and no page horizontal scroll.

## Guest layout locks

- Shells use `--edge-inline` (gutter or safe-area, whichever is larger).
- Sticky header keeps `env(safe-area-inset-top)`; footer keeps bottom safe-area in padding.
- Header brand stays `white-space: nowrap`. Below **744**, chrome is brand + menu; nav, call, and offer live in the open menu panel. From **744**, nav and actions sit inline; the menu toggle is hidden.
- Hero and offer CTA rows stack full width below **744**; row wrap from **744**.
- `.me-btn` labels stay `white-space: nowrap` so CTAs stack as whole controls, not crushed word wraps.
- City leaves (`CityLanderPage`, every `/sell-house-fast-*`): answer + footprint center at `--reading-measure`; FAQ + related center at `--content-standard`; offer form keeps full `--content-wide` shell for the split. Same CSS cascade for all city entries.
- Do not put `overflow-x: clip` or `scrollbar-gutter` on `html` / `body` (forge DISPLAY_GATES §1c). Guard: `lib/guest-display-policy.test.ts`.
