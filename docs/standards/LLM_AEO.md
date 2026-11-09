# LLM / AEO: Mena Estates

**Studio SSOT:** `/Users/navszt/forge/docs/standards/GUEST_AEO.md`, else `~/.cursor/operator/guest-aeo.md`. This file is the Mena Estates module-path overlay.

**Purpose:** Keep crawler-facing manifests aligned with indexable East Bay landers and the home cash-offer route.

---

## Routes

| URL | Builder | Contents |
|-----|---------|----------|
| `/llms.txt` | `buildLlmsTxt()` in [`lib/llms-manifest.ts`](../../lib/llms-manifest.ts) | Site lead, canonical pages, core queries, page summaries |
| `/robots.txt` | [`app/robots.ts`](../../app/robots.ts) | Marketing crawl policy; disallow `/api/`, `/ops/`, `/thank-you` |
| `/sitemap.xml` | [`app/sitemap.ts`](../../app/sitemap.ts) | Indexable marketing paths + `/llms.txt` |

---

## Canonical modules

| Module | Role |
|--------|------|
| [`lib/landers.ts`](../../lib/landers.ts) | East Bay city + situation lander set (source, path, copy defaults) |
| [`lib/seo-metadata.ts`](../../lib/seo-metadata.ts) | `PAGE_SEO` titles, descriptions, H1, answer-first leads |
| [`lib/marketing-sitemap.ts`](../../lib/marketing-sitemap.ts) | Sitemap path set |
| [`lib/llms-manifest.ts`](../../lib/llms-manifest.ts) | `LLM_CORE_QUERY_MAP`, `buildLlmsTxt()` |
| [`lib/brand.ts`](../../lib/brand.ts) | `SITE_NAME`, `SITE_ORIGIN` |
| [`lib/registry-alignment.ts`](../../lib/registry-alignment.ts) | Alignment guard used by tests / `check:registries` |

**Not indexable:** `/thank-you`, `/ops/**`, `/api/**`.

**Frozen scope:** East Bay only. Do not grow into a national SEO farm from this registry.

---

## Update checklist

| Change | Action |
|--------|--------|
| New indexable lander | Add row in `lib/landers.ts`, extend `SeoRouteKey` + `SEO_ROUTE_KEYS`, confirm form `source` / `landingPath` |
| Core buyer query | Map to an **existing** path in `LLM_CORE_QUERY_MAP` |
| Draft route | Keep out of sitemap and llms |

After edits: `npm run check:registries`.
