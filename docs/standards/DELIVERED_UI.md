# Delivered UI — Mena Estates

**Purpose:** Craft definition of done for guest marketing surfaces in this repo.

**Studio craft SSOT (read every guest implement pass):**

1. This file
2. `/Users/navszt/forge/docs/standards/DESIGN_CRAFT.md`
3. `/Users/navszt/forge/docs/standards/DISPLAY_GATES.md`
4. `/Users/navszt/forge/docs/standards/GUEST_CONVERSION.md`

**Not forge house chrome.** This delivery does not ship navszt declaration bar, Lecturas, or Acceso material. Brand tokens live in `app/globals.css`.

**Frozen for Phase 1:** guest-only house. Thin `/ops` is staff inbox, not Panel chrome.

## When this applies

- `app/page.tsx`, `app/(landers)/**`, `app/thank-you/**`, shared guest components, guest CSS
- Indexable marketing metadata (`lib/seo-metadata.ts`, sitemap, `/llms.txt`)

`/ops/**` is out of guest craft scope unless patterns leak onto marketing routes.

## Before calling implement done

| Check | Source |
|-------|--------|
| Anti-slop | Craft § Anti-slop |
| Layout / rooms | Craft § Layout; one ~20s job per room |
| Reading measure | `--reading-measure` + `.vc-reading-measure` on prose |
| Air / gates | DISPLAY_GATES: 229, 390, 744, 1032, 1280; four-edge air; see `docs/internal/display.md` |
| Conversion | GUEST_CONVERSION: awareness → trust → action; form is the primary door |
| Voice | `docs/VOICE.md` |

## Accent jobs

| Job | Token / use |
|-----|-------------|
| Structure | Hairlines `--line`, brand mark |
| Primary fill | `--bay` on primary CTA / submit |
| Call / secondary | Ghost outline on header call |
| Hover / focus | Interactive controls only |
