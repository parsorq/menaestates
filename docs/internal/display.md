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

Thin `/ops` (login, leads list, lead detail) must stay operable at **390, 744, 1032, 1280**. It does not claim **229**. Guard: `lib/ops-display-policy.test.ts`.

## Guest layout locks

- Shells use `--edge-inline` (gutter or safe-area, whichever is larger).
- Sticky header keeps `env(safe-area-inset-top)`; footer keeps bottom safe-area in padding.
- Header brand stays `white-space: nowrap`. Below **744**, chrome is brand + menu; brand may ellipsis (`overflow: hidden`); nav, call, and offer live in the open menu panel (panel `display: none` until open). From **744**, the menu toolbar is hidden, the panel is `display: contents` so nav and actions sit inline, brand does not flex-shrink (`flex: 0 0 auto`, `min-width: max-content`) so it never paints through Cities, and the header row may wrap so nav and actions yield first.
- Dual CTA rows (`.me-home-hero__cta`, `.me-home-offer__cta`, `.me-hero__cta`, `.me-guides-hub__cta`) stack full width below **744**; row wrap from **744**.
- `.me-btn` labels stay `white-space: nowrap` so CTAs stack as whole controls, not crushed word wraps. Exception: tool outcome actions below **390** stack and may wrap the label so 229 does not overflow.
- In-page jump targets clear sticky SiteHeader with `scroll-margin-top`. Home hero/offer/cities band, cities hub form, city lander ask (`#city-offer` / nested `#offer-form`), and shared offer ask (`.me-offer-ask` / `#offer-form` on get-a-cash-offer, guides, tool, cities hub) raise clearance for the tall wrap header (`8.5rem` + safe-area from **744** through **1031** where that wrap applies).
- City leaves (`CityLanderPage`, every `/sell-house-fast-*`): answer + footprint center at `--reading-measure`; FAQ + related center at `--content-standard`; offer form keeps full `--content-wide` shell for the split. Same CSS cascade for all city entries.
- Offer ask (`.me-offer-ask__split`) stacks through **1032**; two-column only from **1280**. `#offer-form` / ask fields keep `scroll-margin` for sticky header + keyboard bay (base pad clears the single-row bar; tall-wrap media as above).
- Cities hub grid: one column by default; two from **744**; four from **1032**.
- Guide leaf hero (`.me-hero__grid`) stays one column below **900**; two-column only from **900** (not from **744**). Guide source links use `overflow-wrap: anywhere`.
- Tool chooser options stay content-height (`flex: 0 0 auto`, full width) below **744**; row wrap with `flex: 1 1 12rem` from **744**.
- About stats stay one column below **744**; three-up from **744**.
- City tape may marquee or scroll horizontally inside `.me-city-tape` only (contained overflow; reduced-motion uses `overflow-x: auto` on the tape). That is not page horizontal scroll.
- Do not put `overflow-x: clip` or `scrollbar-gutter` on `html` / `body` (forge DISPLAY_GATES §1c). Guard: `lib/guest-display-policy.test.ts`.

## Ops layout locks

- `.me-ops` uses `--edge-inline` and safe-area block padding (not guest Panel chrome). Login/denied use `.me-ops__shell`, not guest `.me-shell-narrow` width math.
- Filters wrap; control floor matches `.me-btn` (**2.75rem**), including Clear.
- Fact values, soft paths, notes, and URL/datetime fields use `min-width: 0` + `overflow-wrap: anywhere`.
- Notes / handoff Save+Cancel sit in sticky `.me-ops__crm-actions` with field `scroll-margin-bottom` for keyboard.
- Live list is `.me-ops__scan`; `@media (max-width: 900px)` table→card stack stays for any ops `<table>`.
