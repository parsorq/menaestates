# LLM / AEO: Mena Estates

**Studio SSOT:** `/Users/navszt/forge/docs/standards/GUEST_AEO.md`, else `~/.cursor/operator/guest-aeo.md`. This file is the Mena Estates module-path overlay.

**Purpose:** Keep crawler-facing manifests aligned with indexable East Bay landers, the cities catalog hub, the trust room (`/how-we-buy`), and the dedicated cash-offer ask (`/get-a-cash-offer`).

**Entry map:** Intent classes, primary query ownership, internal-link rules, and Phase 2 stubs live in [`AEO_ENTRY_MAP.md`](./AEO_ENTRY_MAP.md). Other threads implement URLs against that map; this file stays the registry/module checklist.

**Cities hub path:** `/cities-we-buy-in-east-bay` (locked in the entry map; not `/cities`). Owns catalog / footprint intent (`cities we buy in East Bay`). City leaves keep `sell house fast {City}`.

---

## Routes

| URL | Builder | Contents |
|-----|---------|----------|
| `/llms.txt` | `buildLlmsTxt()` in [`lib/llms-manifest.ts`](../../lib/llms-manifest.ts) | Site lead, canonical pages, core queries, page summaries |
| `/robots.txt` | [`app/robots.ts`](../../app/robots.ts) | Marketing crawl policy; disallow `/api/`, `/ops/`, `/thank-you` |
| `/sitemap.xml` | [`app/sitemap.ts`](../../app/sitemap.ts) | Indexable marketing paths + `/llms.txt` |
| `/cities-we-buy-in-east-bay` | [`app/cities-we-buy-in-east-bay/page.tsx`](../../app/cities-we-buy-in-east-bay/page.tsx) | Cities catalog hub (seven buy cities; Alameda + Tracy / San Joaquin) |
| `/about` | [`app/about/page.tsx`](../../app/about/page.tsx) | Hector NAP, license, labeled Realtor career reviews |
| `/get-a-cash-offer` | [`app/get-a-cash-offer/page.tsx`](../../app/get-a-cash-offer/page.tsx) | Dedicated cash-offer ask (header / home primary CTA) |
| `/how-we-buy` | [`app/how-we-buy/page.tsx`](../../app/how-we-buy/page.tsx) | Trust room (principal, operator split, footprint) |

---

## Canonical modules

| Module | Role |
|--------|------|
| [`lib/landers.ts`](../../lib/landers.ts) | East Bay city + guide lander set (source, path, copy defaults); `CITIES_HUB_PATH` |
| [`lib/guides-hub.ts`](../../lib/guides-hub.ts) | `/guides` catalog path and labels |
| [`lib/repair-or-as-is.ts`](../../lib/repair-or-as-is.ts) | `/tools/repair-or-as-is-east-bay` path |
| [`lib/cities-hub.ts`](../../lib/cities-hub.ts) | Guest chrome helper for the cities hub href |
| [`lib/how-we-buy.ts`](../../lib/how-we-buy.ts) | Trust room path + nav/related link helpers |
| [`lib/get-a-cash-offer.ts`](../../lib/get-a-cash-offer.ts) | Dedicated ask path + nav label |
| [`lib/guide-landers.ts`](../../lib/guide-landers.ts) | Guide-leaf substance (need-from-seller, FAQs, related doors) |
| [`lib/seo-metadata.ts`](../../lib/seo-metadata.ts) | `PAGE_SEO` titles, descriptions, H1, answer-first leads; `buildPageMetadata` (canonical + OG) |
| [`lib/schema.ts`](../../lib/schema.ts) | JSON-LD builders: Organization, WebSite, FAQPage, cities-hub ItemList |
| [`app/components/JsonLd.tsx`](../../app/components/JsonLd.tsx) | Renders `application/ld+json` script tags |
| [`lib/marketing-sitemap.ts`](../../lib/marketing-sitemap.ts) | Sitemap path set |
| [`lib/llms-manifest.ts`](../../lib/llms-manifest.ts) | `LLM_CORE_QUERY_MAP`, `buildLlmsTxt()` |
| [`lib/brand.ts`](../../lib/brand.ts) | `SITE_NAME`, `SITE_ORIGIN` |
| [`lib/registry-alignment.ts`](../../lib/registry-alignment.ts) | Alignment guard used by tests / `check:registries` |

**Schema mount:** Root layout emits Organization + WebSite once. Cities hub emits ItemList of city leaves. City and guide leaves emit FAQPage only when visible FAQ/`dl` copy exists on that page. Do not duplicate Organization/WebSite per route.

**Not indexable:** `/thank-you`, `/ops/**`, `/api/**`.

**Frozen scope:** East Bay only. Do not grow into a national SEO farm from this registry.

---

## Update checklist

| Change | Action |
|--------|--------|
| New indexable lander | Add row in `lib/landers.ts`, extend `SeoRouteKey` + `SEO_ROUTE_KEYS`, confirm form `source` / `landingPath` |
| Cities hub (already live) | Keep triad on `/cities-we-buy-in-east-bay`; core query `cities we buy in East Bay`; do not collide with city leaf primaries |
| Trust room (already live) | Keep triad on `/how-we-buy`; core query `how we buy houses East Bay`; home may keep one short process band without stealing the primary |
| Core buyer query | Map to an **existing** path in `LLM_CORE_QUERY_MAP` |
| Draft route | Keep out of sitemap and llms |

After edits: `npm run check:registries`.
