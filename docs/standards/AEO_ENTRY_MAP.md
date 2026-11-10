# AEO entry map — Mena Estates

**Purpose:** Written East Bay cash-buyer AEO/SEO entry map that other threads implement against. Hub → leaf graph, not a single landing.

**Studio SSOT:** `/Users/navszt/forge/docs/standards/GUEST_AEO.md`. Repo overlay: [`LLM_AEO.md`](./LLM_AEO.md). Voice: [`docs/VOICE.md`](../VOICE.md).

**Structure pattern (Capital En Orden, structure only):** one URL per primary intent; hub links leaves; new indexable URL gets sitemap + canonical + hub link. Mena taxonomy is city and situation landers, not Capital content modules.

**Frozen:** East Bay only (Alameda + Contra Costa). Do not grow a national SEO farm from this map. Live routes stay as registered until an implement thread ships triad changes. Not Construction (`forge/mena`). Not ads. Not `/ops`.

**Status key:** **Verified** = present in current `PAGE_SEO` / `LLM_CORE_QUERY_MAP` / live landers. **Assumed research** = seller-language cluster or Proposed URL not yet in those registries. **Proposed** = URL not live; do not add to sitemap or llms until triad ships.

---

## Intent classes

| Class | Job | Status | Canonical URL |
|-------|-----|--------|---------------|
| Home thesis | East Bay cash-buyer identity; primary conversion door | Verified | `/` |
| Cities hub (catalog) | Browse every city we buy in; county footprint | Verified | `/cities-we-buy-in-east-bay` |
| City transactional leaf | Sell house fast in one named city | Verified (7) | `/sell-house-fast-{city}` |
| Situation leaf | Inherited or as-is exit across East Bay | Verified (2) | situation paths below |
| Trust | Who buys, operator split, footprint proof | Verified | `/how-we-buy` |
| Free tools | Decision aids before the form | Verified (1); Phase 2 stubs remain | `/repair-or-as-is-east-bay` (+ stubs) |

Home hosts a cities door into the hub. That section is not a second indexable primary for “cities we buy in East Bay.” Home keeps thesis ownership; hub owns the catalog cluster.

---

## Graph

```text
/  (home thesis)
├── /how-we-buy  (Verified trust: principal, operator split, footprint)
├── /cities-we-buy-in-east-bay  (Verified catalog hub)
│     ├── 7 city leaves
│     ├── 2 situation leaves (optional hub doors; also from home)
│     └── free tool door (repair-or-as-is)
├── 7 city leaves (also linked from home CityTape)
├── 2 situation leaves
└── /repair-or-as-is-east-bay  (Verified free tool; decision aid before the form)
```

City set (Verified, matches `LANDERS` + voice footprint): Oakland, Berkeley, Hayward, Fremont, Concord, Walnut Creek, Richmond.

---

## Keyword / query clusters (one primary per URL)

Mark: **V** = Verified in `LLM_CORE_QUERY_MAP` (and title language in `PAGE_SEO` / landers). **A** = Assumed research.

### Home — `/`

| Role | Query | Mark |
|------|-------|------|
| **Primary** | cash home buyer East Bay | V |
| Supporting | we buy houses East Bay | A |
| Supporting | cash home buyer Alameda County | A |
| Supporting | cash home buyer Contra Costa | A |
| Supporting | sell house for cash East Bay | A |
| Supporting | we buy houses Alameda | A |
| Supporting | we buy houses Contra Costa | A |

**Conflict rule:** Home does **not** own “cities we buy in East Bay,” “how we buy houses East Bay,” or any `sell house fast {City}` primary.

### Trust — `/how-we-buy` (Verified)

| Role | Query | Mark |
|------|-------|------|
| **Primary** | how we buy houses East Bay | V |
| Supporting | who buys houses East Bay as principal | A |
| Supporting | East Bay cash buyer principal | A |
| Supporting | cash home buyer operator East Bay | A |
| Supporting | Mena Estates how we buy | A |

**Conflict rule:** Do not assign this primary to `/` or the cities hub. Home may keep a short process band and proof band; this URL owns the indexable trust answer.

### Cities hub — `/cities-we-buy-in-east-bay` (Verified)

| Role | Query | Mark |
|------|-------|------|
| **Primary** | cities we buy in East Bay | V |
| Supporting | East Bay cities we buy houses | A |
| Supporting | we buy houses Alameda Contra Costa cities | A |
| Supporting | cash home buyer East Bay cities | A |
| Supporting | where does Mena Estates buy houses | A |

**Conflict rule:** Do not assign this primary to `/` or to any city leaf. Ship only with full triad + core query row.

### City leaves (Verified)

Pattern for each city: primary `sell house fast {City}` (**V**). Supporting stay city-scoped; never steal another city’s primary.

#### `/sell-house-fast-oakland`

| Role | Query | Mark |
|------|-------|------|
| **Primary** | sell house fast Oakland | V |
| Supporting | we buy houses Oakland | A |
| Supporting | cash home buyer Oakland | A |
| Supporting | sell house for cash Oakland | A |
| Supporting | cash offer Oakland house | A |
| Supporting | sell Oakland house as principal | A |

#### `/sell-house-fast-berkeley`

| Role | Query | Mark |
|------|-------|------|
| **Primary** | sell house fast Berkeley | V |
| Supporting | we buy houses Berkeley | A |
| Supporting | cash home buyer Berkeley | A |
| Supporting | sell house for cash Berkeley | A |
| Supporting | cash offer Berkeley house | A |

#### `/sell-house-fast-hayward`

| Role | Query | Mark |
|------|-------|------|
| **Primary** | sell house fast Hayward | V |
| Supporting | we buy houses Hayward | A |
| Supporting | cash home buyer Hayward | A |
| Supporting | sell house for cash Hayward | A |
| Supporting | cash offer Hayward house | A |

#### `/sell-house-fast-fremont`

| Role | Query | Mark |
|------|-------|------|
| **Primary** | sell house fast Fremont | V |
| Supporting | we buy houses Fremont | A |
| Supporting | cash home buyer Fremont | A |
| Supporting | sell house for cash Fremont | A |
| Supporting | cash offer Fremont house | A |

#### `/sell-house-fast-concord`

| Role | Query | Mark |
|------|-------|------|
| **Primary** | sell house fast Concord | V |
| Supporting | we buy houses Concord | A |
| Supporting | cash home buyer Concord | A |
| Supporting | sell house for cash Concord | A |
| Supporting | cash offer Concord house | A |

#### `/sell-house-fast-walnut-creek`

| Role | Query | Mark |
|------|-------|------|
| **Primary** | sell house fast Walnut Creek | V |
| Supporting | we buy houses Walnut Creek | A |
| Supporting | cash home buyer Walnut Creek | A |
| Supporting | sell house for cash Walnut Creek | A |
| Supporting | cash offer Walnut Creek house | A |

#### `/sell-house-fast-richmond`

| Role | Query | Mark |
|------|-------|------|
| **Primary** | sell house fast Richmond | V |
| Supporting | we buy houses Richmond | A |
| Supporting | cash home buyer Richmond | A |
| Supporting | sell house for cash Richmond | A |
| Supporting | cash offer Richmond house | A |

### Situation leaves (Verified)

#### `/sell-inherited-house-east-bay`

| Role | Query | Mark |
|------|-------|------|
| **Primary** | sell inherited house East Bay | V |
| Supporting | inherited East Bay | A |
| Supporting | sell inherited house Alameda | A |
| Supporting | sell inherited house Contra Costa | A |
| Supporting | cash offer inherited house East Bay | A |
| Supporting | estate sale house East Bay cash | A |

#### `/sell-house-as-is-east-bay`

| Role | Query | Mark |
|------|-------|------|
| **Primary** | sell house as-is East Bay | V |
| Supporting | as-is East Bay | A |
| Supporting | sell house as is East Bay | A |
| Supporting | we buy houses as-is East Bay | A |
| Supporting | cash offer house needs repairs East Bay | A |
| Supporting | sell fixer house East Bay cash | A |

### Free tool — `/repair-or-as-is-east-bay` (Verified)

| Role | Query | Mark |
|------|-------|------|
| **Primary** | repair or sell as-is East Bay | V |
| Supporting | should I repair before selling East Bay | A |
| Supporting | sell as-is or repair East Bay | A |
| Supporting | East Bay house needs repairs cash | A |

**Conflict rule:** Do not assign this primary to the as-is situation leaf. The situation leaf keeps `sell house as-is East Bay`. This URL owns the repair-vs-as-is decision aid only. No dollar range, no AVM, no appraisal framing.

---

## Canonical ownership summary

| Primary intent | Canonical URL | Status |
|----------------|---------------|--------|
| cash home buyer East Bay | `/` | Verified |
| cities we buy in East Bay | `/cities-we-buy-in-east-bay` | Verified |
| how we buy houses East Bay | `/how-we-buy` | Verified |
| sell house fast Oakland | `/sell-house-fast-oakland` | Verified |
| sell house fast Berkeley | `/sell-house-fast-berkeley` | Verified |
| sell house fast Hayward | `/sell-house-fast-hayward` | Verified |
| sell house fast Fremont | `/sell-house-fast-fremont` | Verified |
| sell house fast Concord | `/sell-house-fast-concord` | Verified |
| sell house fast Walnut Creek | `/sell-house-fast-walnut-creek` | Verified |
| sell house fast Richmond | `/sell-house-fast-richmond` | Verified |
| sell inherited house East Bay | `/sell-inherited-house-east-bay` | Verified |
| sell house as-is East Bay | `/sell-house-as-is-east-bay` | Verified |
| repair or sell as-is East Bay | `/repair-or-as-is-east-bay` | Verified |

**Rule:** No two indexable URLs share the same primary. Supporting queries may appear in body copy on related pages; they do not get a second competing lander.

**Not indexable (unchanged):** `/thank-you`, `/ops/**`, `/api/**`.

---

## Internal-link rules

Implement threads follow these edges. Code uses `relatedSlugs` in [`lib/landers.ts`](../../lib/landers.ts); city and situation related helpers prepend the cities hub.

| From | Must link to |
|------|----------------|
| Home `/` | Cities hub + city leaves + both situation leaves as doors. Trust room (`/how-we-buy`). Free tool `/repair-or-as-is-east-bay`. Header/footer shared doors. |
| Cities hub | Every city leaf (all seven). Optional: both situations. Free tool door. Trust room. Link back to home. |
| City leaf | Cities hub. Trust room. **2–4 peer cities** via `relatedSlugs`. **Both** situation leaves (or at least the situations already in that lander’s `relatedSlugs`, expanding to both when editing). City-leaf thread owns leaf body wiring. Hub stays first. |
| Situation leaf | Cities hub. Trust room. **At least two** city leaves (prefer `relatedSlugs` cities). The other situation leaf. Hub stays first. As-is leaf also links the repair-or-as-is tool. |
| Free tool `/repair-or-as-is-east-bay` | Cities hub. As-is situation leaf. Trust room. Inherited situation (optional). Offer form. Link back to home. |
| Header / footer | Shared doors only: home, cities hub, trust (`/how-we-buy`), offer/form entry. Do not invent a second nav taxonomy. Do not add a Tools header item for one tool. |

**Orphan bar:** Every indexable marketing URL must be reachable from home or the cities hub (Capital hub-link rule, Mena graph).

---

## Required triad (every new indexable URL)

Align with [`GUEST_AEO.md`](/Users/navszt/forge/docs/standards/GUEST_AEO.md) and [`LLM_AEO.md`](./LLM_AEO.md):

1. **`PAGE_SEO`** in [`lib/seo-metadata.ts`](../../lib/seo-metadata.ts) (and lander row in [`lib/landers.ts`](../../lib/landers.ts) when it is a lander).
2. **Sitemap** via [`lib/marketing-sitemap.ts`](../../lib/marketing-sitemap.ts) / `SEO_ROUTE_KEYS`.
3. **llms** via [`lib/llms-manifest.ts`](../../lib/llms-manifest.ts) canonical list (summaries from `PAGE_SEO`).
4. **`LLM_CORE_QUERY_MAP`** when the URL claims a core buyer query (existing path only; one primary per path).

Then: `npm run check:registries` ([`lib/registry-alignment.ts`](../../lib/registry-alignment.ts)).

Draft or Phase 2 surfaces stay out of sitemap and llms until ready.

---

## Free tools

### Verified

- **Repair-vs-as-is chooser** — Live at `/repair-or-as-is-east-bay`. Decision aid before the form: when repairs stay in the deal vs sell as-is. Primary `repair or sell as-is East Bay`. Links the as-is situation leaf. No dollar range. No AVM. No appraisal framing.

### Phase 2 stubs (names only; no build)

| Stub name | One-line job |
|-----------|--------------|
| Cash-offer range estimator | Rough cash range from address + condition inputs; door back to request offer. |
| East Bay close-timeline explainer | Typical steps from form to close in this footprint; no fake day counts. |

Do not invent tool URLs, sitemap rows, or core queries for remaining stubs until a product pass ships them with triad.

---

## Implement checklist (other threads)

| Change | Do |
|--------|----|
| New city or situation leaf | Pick one primary from this map (or add a new row here first). Extend `LANDERS`, `SeoRouteKey`, sitemap, llms, core map. Link per rules above. |
| Cities hub | Live at `/cities-we-buy-in-east-bay` with triad + primary. Home keeps thesis; hub owns catalog. |
| Extra situation or city | East Bay only; update this map before registries. |
| Trust room | Live at `/how-we-buy` with triad + primary `how we buy houses East Bay`. |
| Free tool | Name in this map first (primary + URL). Then triad + hub/home links. Repair-or-as-is is Verified; remaining stubs stay out of sitemap until shipped. |

---

## Explicitly out of scope

Implementing pages in a docs-only pass. Ads. `/ops`. Construction (`forge/mena`). National city farms. Copy paste from Capital En Orden.
