# AEO entry map — Mena Estates

**Purpose:** Written East Bay cash-buyer AEO/SEO entry map that other threads implement against. Hub → leaf graph, not a single landing.

**Studio SSOT:** `/Users/navszt/forge/docs/standards/GUEST_AEO.md`. Repo overlay: [`LLM_AEO.md`](./LLM_AEO.md). Voice: [`docs/VOICE.md`](../VOICE.md).

**Structure pattern (Capital En Orden, structure only):** one URL per primary intent; hub links leaves; new indexable URL gets sitemap + canonical + hub link. Mena taxonomy is city landers, seller-help guides under `/guides`, and free tools under `/tools`.

**Frozen buy set:** Oakland, San Leandro, Hayward, Castro Valley, San Lorenzo, Newark, Tracy (Alameda + San Joaquin). Hub URL `/cities-we-buy-in-east-bay` kept for SEO; copy names the seven cities and must not claim Tracy is East Bay. Do not grow a national SEO farm from this map. Not Construction (`forge/mena`). Not ads. Not `/ops`.

**Status key:** **Verified** = present in current `PAGE_SEO` / `LLM_CORE_QUERY_MAP` / live landers. **Assumed research** = seller-language cluster or Proposed URL not yet in those registries. **Proposed** = URL not live; do not add to sitemap or llms until triad ships.

---

## Intent classes

| Class | Job | Status | Canonical URL |
|-------|-----|--------|---------------|
| Home thesis | Cash-buyer identity (Hector Mena); doors into offer + cities | Verified | `/` |
| Cash offer ask | Dedicated request form (header / home primary CTA) | Verified | `/get-a-cash-offer` |
| Cities hub (catalog) | Browse cities we've bought in; county core | Verified | `/cities-we-buy-in-east-bay` |
| City transactional leaf | Sell house fast in one named city | Verified (7) | `/sell-house-fast-{city}` |
| Guides hub | Seller-help catalog (inherited, as-is, tool door) | Verified | `/guides` |
| Guide leaf | Inherited or as-is teaching across buy cities | Verified (2) | `/guides/sell-*-east-bay` below |
| Trust | Who buys, process, footprint proof | Verified | `/how-we-buy` |
| About | Hector NAP, license, labeled Realtor career reviews | Verified | `/about` |
| Free tools | Decision aids before the form | Verified (1); Phase 2 stubs remain | `/tools/repair-or-as-is-east-bay` (+ stubs) |

Home hosts a cities door into the hub, a primary CTA into `/get-a-cash-offer`, and an end-of-page offer closer (same ask URL). That closer is not a second indexable primary for “get a cash offer East Bay” or “cities we buy in East Bay.” Home keeps thesis ownership; hub owns the catalog cluster; the ask page owns the shared offer URL and the form. City, guide, tool, and hub pages may still embed a local form for source attribution.

---

## Graph

```text
/  (home thesis)
├── /get-a-cash-offer  (Verified dedicated ask; header + home primary CTA)
├── /how-we-buy  (Verified trust: who buys, process, footprint)
├── /about  (Verified: Hector NAP, license, labeled Realtor career)
├── /cities-we-buy-in-east-bay  (Verified catalog hub)
│     ├── 7 city leaves
│     └── Help before the offer (doors guides + tool; also from home)
├── /guides  (Verified seller-help catalog)
│     ├── /guides/sell-inherited-house-east-bay
│     ├── /guides/sell-house-as-is-east-bay
│     └── free tool door
├── 7 city leaves (also linked from home CityTape)
└── /tools/repair-or-as-is-east-bay  (Verified free tool; decision aid before the form)
```

City set (Verified, matches `LANDERS` + voice footprint): Oakland, San Leandro, Hayward, Castro Valley, San Lorenzo, Newark, Tracy.

Retired (301 → cities hub): Berkeley, Fremont, Concord, Walnut Creek, Richmond.

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

**Conflict rule:** Home does **not** own “cities we buy in East Bay,” “how we buy houses East Bay,” “get a cash offer East Bay,” or any `sell house fast {City}` primary.

### Cash offer ask — `/get-a-cash-offer` (Verified)

| Role | Query | Mark |
|------|-------|------|
| **Primary** | get a cash offer East Bay | V |
| Supporting | request a cash offer East Bay | A |
| Supporting | cash offer form East Bay | A |

**Conflict rule:** Header and home primary CTA point here. Do not assign this primary to `/`. City, guide, tool, and hub leaves may keep an embedded form for landing_path attribution.

### Trust — `/how-we-buy` (Verified)

| Role | Query | Mark |
|------|-------|------|
| **Primary** | how we buy houses East Bay | V |
| Supporting | who buys houses East Bay as principal | A |
| Supporting | East Bay cash buyer principal | A |
| Supporting | cash home buyer operator East Bay | A |
| Supporting | Mena Estates how we buy | A |

**Conflict rule:** Do not assign this primary to `/` or the cities hub. Home may keep one short process band; deep proof lives on this URL.

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

### Guides hub (Verified)

#### `/guides`

| Role | Query | Mark |
|------|-------|------|
| **Primary** | help before a cash offer East Bay | V |
| Supporting | seller help East Bay cash | A |
| Supporting | inherited or as-is guide East Bay | A |

### Guide leaves (Verified)

#### `/guides/sell-inherited-house-east-bay`

| Role | Query | Mark |
|------|-------|------|
| **Primary** | sell inherited house East Bay | V |
| Supporting | inherited East Bay | A |
| Supporting | sell inherited house Alameda | A |
| Supporting | sell inherited house Contra Costa | A |
| Supporting | cash offer inherited house East Bay | A |
| Supporting | estate sale house East Bay cash | A |

#### `/guides/sell-house-as-is-east-bay`

| Role | Query | Mark |
|------|-------|------|
| **Primary** | sell house as-is East Bay | V |
| Supporting | as-is East Bay | A |
| Supporting | sell house as is East Bay | A |
| Supporting | we buy houses as-is East Bay | A |
| Supporting | cash offer house needs repairs East Bay | A |
| Supporting | sell fixer house East Bay cash | A |

### Free tool — `/tools/repair-or-as-is-east-bay` (Verified)

| Role | Query | Mark |
|------|-------|------|
| **Primary** | repair or sell as-is East Bay | V |
| Supporting | should I repair before selling East Bay | A |
| Supporting | sell as-is or repair East Bay | A |
| Supporting | East Bay house needs repairs cash | A |

**Conflict rule:** Do not assign this primary to the as-is guide leaf. The guide keeps `sell house as-is East Bay`. This URL owns the repair-vs-as-is decision aid only. No dollar range, no AVM, no appraisal framing.

---

## Canonical ownership summary

| Primary intent | Canonical URL | Status |
|----------------|---------------|--------|
| cash home buyer East Bay | `/` | Verified |
| get a cash offer East Bay | `/get-a-cash-offer` | Verified |
| cities we buy in East Bay | `/cities-we-buy-in-east-bay` | Verified |
| how we buy houses East Bay | `/how-we-buy` | Verified |
| sell house fast Oakland | `/sell-house-fast-oakland` | Verified |
| sell house fast Berkeley | `/sell-house-fast-berkeley` | Verified |
| sell house fast Hayward | `/sell-house-fast-hayward` | Verified |
| sell house fast Fremont | `/sell-house-fast-fremont` | Verified |
| sell house fast Concord | `/sell-house-fast-concord` | Verified |
| sell house fast Walnut Creek | `/sell-house-fast-walnut-creek` | Verified |
| sell house fast Richmond | `/sell-house-fast-richmond` | Verified |
| help before a cash offer East Bay | `/guides` | Verified |
| sell inherited house East Bay | `/guides/sell-inherited-house-east-bay` | Verified |
| sell house as-is East Bay | `/guides/sell-house-as-is-east-bay` | Verified |
| repair or sell as-is East Bay | `/tools/repair-or-as-is-east-bay` | Verified |

**Rule:** No two indexable URLs share the same primary. Supporting queries may appear in body copy on related pages; they do not get a second competing lander.

**Not indexable (unchanged):** `/thank-you`, `/ops/**`, `/api/**`.

---

## Internal-link rules

Implement threads follow these edges. Code uses `relatedSlugs` in [`lib/landers.ts`](../../lib/landers.ts); city and guide related helpers prepend the cities hub.

| From | Must link to |
|------|----------------|
| Home `/` | Cities hub + city leaves. Separate seller-help shelf (“Help before the offer”) doors both guide leaves, free tool `/tools/repair-or-as-is-east-bay`, and `/guides` (not nested under cities). Trust room (`/how-we-buy`). Header/footer shared doors. |
| Cities hub | Every city leaf (all seven). Help shelf: both guides + free tool + `/guides`. Trust room. Link back to home. |
| City leaf | Cities hub. Trust room. **2–4 peer cities** via `relatedSlugs`. **Both** guide leaves (or at least the guides already in that lander’s `relatedSlugs`, expanding to both when editing). City-leaf thread owns leaf body wiring. Hub stays first. |
| Guides hub `/guides` | Both guide leaves. Free tool. Trust room. Link back to home. Offer form. |
| Guide leaf | Cities hub. Guides hub. Trust room. **At least two** city leaves (prefer `relatedSlugs` cities). The other guide leaf. Cities hub stays first in related. As-is guide also links the repair-or-as-is tool. |
| Free tool `/tools/repair-or-as-is-east-bay` | Cities hub. Guides hub. As-is guide leaf. Trust room. Inherited guide (optional). Offer form. Link back to home. |
| Trust `/how-we-buy` | Cities hub. About. Guides hub. Free tool. Offer form. Related pages (or body doors) only; not header/footer. |
| About `/about` | Trust room. Cities hub. Guides hub. Free tool. Offer form / home. Related pages (or body doors) only; not header/footer. |
| Header / footer | Shared doors only: home, cities hub, trust (`/how-we-buy`), about, offer/form entry. Do not invent a second nav taxonomy. Do not add a Tools header item for one tool. Do not add Guides to shared nav for one catalog. |

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

- **Repair-vs-as-is chooser** — Live at `/tools/repair-or-as-is-east-bay`. Decision aid before the form: when repairs stay in the deal vs sell as-is. Primary `repair or sell as-is East Bay`. Links the as-is guide leaf. No dollar range. No AVM. No appraisal framing. Official sources listed on the page.

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
| New city or guide leaf | Pick one primary from this map (or add a new row here first). Extend `LANDERS`, `SeoRouteKey`, sitemap, llms, core map. Link per rules above. |
| Cities hub | Live at `/cities-we-buy-in-east-bay` with triad + primary. Home keeps thesis; hub owns catalog. |
| Extra guide or city | East Bay only; update this map before registries. |
| Trust room | Live at `/how-we-buy` with triad + primary `how we buy houses East Bay`. |
| Free tool | Name in this map first (primary + URL). Then triad + hub/home links. Repair-or-as-is is Verified; remaining stubs stay out of sitemap until shipped. |

---

## Explicitly out of scope

Implementing pages in a docs-only pass. Ads. `/ops`. Construction (`forge/mena`). National city farms. Copy paste from Capital En Orden.
