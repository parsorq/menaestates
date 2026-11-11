import { SITE_ORIGIN } from "./brand";
import { cityRelatedLinks } from "./city-landers";
import {
  CITIES_HUB_PATH,
  LANDERS,
  cityLanders,
  guideLanders,
} from "./landers";
import {
  LLM_CORE_QUERY_MAP,
  buildLlmsTxt,
  llmIndexableMarketingPaths,
} from "./llms-manifest";
import {
  LLM_MANIFEST_AUX_PATHS,
  MARKETING_SITEMAP_PATHS,
} from "./marketing-sitemap";
import { PAGE_SEO, SEO_ROUTE_KEYS, type SeoRouteKey } from "./seo-metadata";
import { absoluteSiteUrl } from "./site";
import { guideRelatedLinks } from "./guide-landers";

export type RegistryAlignmentCheck = {
  id: string;
  pass: boolean;
  detail: string;
};

export type RegistryAlignmentResult = {
  ok: boolean;
  checks: RegistryAlignmentCheck[];
};

function pushCheck(
  checks: RegistryAlignmentCheck[],
  id: string,
  pass: boolean,
  detail: string,
): void {
  checks.push({ id, pass, detail });
}

function evaluateCoreQueryUniqueness(checks: RegistryAlignmentCheck[]): void {
  const queries = LLM_CORE_QUERY_MAP.map((row) => row.query);
  const paths = LLM_CORE_QUERY_MAP.map((row) => row.path);
  const uniqueQueries = new Set(queries);
  const uniquePaths = new Set(paths);

  pushCheck(
    checks,
    "core-query-unique",
    uniqueQueries.size === queries.length,
    uniqueQueries.size === queries.length
      ? `LLM_CORE_QUERY_MAP has ${queries.length} unique primary queries`
      : `LLM_CORE_QUERY_MAP has duplicate primary queries`,
  );

  pushCheck(
    checks,
    "core-query-path-unique",
    uniquePaths.size === paths.length,
    uniquePaths.size === paths.length
      ? `LLM_CORE_QUERY_MAP has ${paths.length} unique paths`
      : `LLM_CORE_QUERY_MAP has duplicate paths (keyword-primary collision)`,
  );
}

/**
 * AEO_ENTRY_MAP orphan bar: leaf reachable from hub; hub from home (home
 * door is chrome); leaf returns to hub via related links.
 */
function evaluateInternalLinkGraph(checks: RegistryAlignmentCheck[]): void {
  const cities = cityLanders();
  const guides = guideLanders();
  const guidePaths = new Set(guides.map((lander) => lander.path));
  const cityPaths = new Set(cities.map((lander) => lander.path));

  pushCheck(
    checks,
    "graph-city-count",
    cities.length === 7,
    `city landers ${cities.length} (expected 7)`,
  );

  pushCheck(
    checks,
    "graph-guide-count",
    guides.length === 2,
    `guide landers ${guides.length} (expected 2)`,
  );

  pushCheck(
    checks,
    "graph-hub-in-seo",
    PAGE_SEO["cities-we-buy-in-east-bay"].path === CITIES_HUB_PATH,
    `cities hub path ${CITIES_HUB_PATH} ${
      PAGE_SEO["cities-we-buy-in-east-bay"].path === CITIES_HUB_PATH
        ? "matches"
        : "mismatches"
    } PAGE_SEO`,
  );

  for (const lander of cities) {
    const related = cityRelatedLinks(lander);
    const peerCities = related.filter((link) => cityPaths.has(link.href));
    const relatedGuides = related.filter((link) =>
      guidePaths.has(link.href),
    );
    const hubFirst = related[0]?.href === CITIES_HUB_PATH;
    const peerOk = peerCities.length >= 2 && peerCities.length <= 4;
    const bothGuides = relatedGuides.length === guides.length;

    pushCheck(
      checks,
      `graph-city-hub:${lander.slug}`,
      hubFirst,
      `${lander.slug} related doors ${hubFirst ? "start with" : "missing"} cities hub`,
    );
    pushCheck(
      checks,
      `graph-city-peers:${lander.slug}`,
      peerOk,
      `${lander.slug} has ${peerCities.length} peer cities (need 2–4)`,
    );
    pushCheck(
      checks,
      `graph-city-guides:${lander.slug}`,
      bothGuides,
      `${lander.slug} links ${relatedGuides.length}/${guides.length} guide leaves`,
    );

    for (const slug of lander.relatedSlugs) {
      const exists = LANDERS.some((row) => row.slug === slug);
      pushCheck(
        checks,
        `graph-related-exists:${lander.slug}:${slug}`,
        exists,
        `${lander.slug} relatedSlug ${slug} ${exists ? "exists" : "missing"}`,
      );
    }
  }

  for (const lander of guides) {
    const related = guideRelatedLinks(lander);
    const relatedCities = related.filter((link) => cityPaths.has(link.href));
    const peerGuide = related.filter((link) =>
      guidePaths.has(link.href),
    );
    const hubFirst = related[0]?.href === CITIES_HUB_PATH;

    pushCheck(
      checks,
      `graph-guide-hub:${lander.slug}`,
      hubFirst,
      `${lander.slug} related doors ${hubFirst ? "start with" : "missing"} cities hub`,
    );
    pushCheck(
      checks,
      `graph-guide-cities:${lander.slug}`,
      relatedCities.length >= 2,
      `${lander.slug} has ${relatedCities.length} city leaves (need ≥2)`,
    );
    pushCheck(
      checks,
      `graph-guide-peer:${lander.slug}`,
      peerGuide.length === 1,
      `${lander.slug} has ${peerGuide.length} peer guide (need 1)`,
    );

    for (const slug of lander.relatedSlugs) {
      const exists = LANDERS.some((row) => row.slug === slug);
      pushCheck(
        checks,
        `graph-related-exists:${lander.slug}:${slug}`,
        exists,
        `${lander.slug} relatedSlug ${slug} ${exists ? "exists" : "missing"}`,
      );
    }
  }
}

/** Same rules as `npm run check:registries`. */
export function evaluateRegistryAlignment(): RegistryAlignmentResult {
  const checks: RegistryAlignmentCheck[] = [];
  const sitemapPaths = new Set(MARKETING_SITEMAP_PATHS.map((entry) => entry.path));
  const pageSeoPaths = new Set(SEO_ROUTE_KEYS.map((key) => PAGE_SEO[key].path));
  const auxPaths = new Set<string>(LLM_MANIFEST_AUX_PATHS);
  const llms = buildLlmsTxt();
  const originHost = new URL(SITE_ORIGIN).host;

  for (const row of LLM_CORE_QUERY_MAP) {
    pushCheck(
      checks,
      `core-query-sitemap:${row.path}`,
      sitemapPaths.has(row.path),
      `LLM_CORE_QUERY_MAP path ${row.path} ${sitemapPaths.has(row.path) ? "in" : "missing from"} sitemap`,
    );
  }

  evaluateCoreQueryUniqueness(checks);

  pushCheck(
    checks,
    "llms-origin-host",
    llms.includes(originHost),
    `buildLlmsTxt() ${llms.includes(originHost) ? "includes" : "missing"} origin host ${originHost}`,
  );

  pushCheck(
    checks,
    "llms-no-api",
    !llms.includes("/api/"),
    "buildLlmsTxt() must not reference /api/",
  );

  for (const path of llmIndexableMarketingPaths()) {
    const url = absoluteSiteUrl(path);
    pushCheck(
      checks,
      `llms-indexable:${path}`,
      llms.includes(url),
      `buildLlmsTxt() ${llms.includes(url) ? "lists" : "missing"} ${url}`,
    );
  }

  for (const key of SEO_ROUTE_KEYS) {
    const path = PAGE_SEO[key].path;
    pushCheck(
      checks,
      `page-seo-sitemap:${key}`,
      sitemapPaths.has(path),
      `PAGE_SEO.${key} path ${path} ${sitemapPaths.has(path) ? "in" : "missing from"} sitemap`,
    );
  }

  for (const path of sitemapPaths) {
    const allowed = pageSeoPaths.has(path) || auxPaths.has(path);
    pushCheck(
      checks,
      `sitemap-member:${path}`,
      allowed,
      `sitemap path ${path} ${allowed ? "allowed" : "not in PAGE_SEO or aux"}`,
    );
  }

  const expectedSize = pageSeoPaths.size + auxPaths.size;
  pushCheck(
    checks,
    "sitemap-count",
    sitemapPaths.size === expectedSize,
    `sitemap count ${sitemapPaths.size} vs PAGE_SEO (${pageSeoPaths.size}) + aux (${auxPaths.size})`,
  );

  evaluateInternalLinkGraph(checks);

  const ok = checks.every((check) => check.pass);
  return { ok, checks };
}

export function firstRegistryAlignmentFailure(
  result: RegistryAlignmentResult,
): RegistryAlignmentCheck | null {
  return result.checks.find((check) => !check.pass) ?? null;
}

export type MarketingRouteChecklistRow = {
  routeKey: SeoRouteKey;
  path: string;
  inSitemap: boolean;
  inLlmsIndexable: boolean;
  inLlmsCanonicalBlock: boolean;
  coreQuery: string | null;
};

export function marketingRouteChecklistRows(): MarketingRouteChecklistRow[] {
  const sitemapPaths = new Set(MARKETING_SITEMAP_PATHS.map((entry) => entry.path));
  const llmsIndexable = new Set(llmIndexableMarketingPaths());
  const llms = buildLlmsTxt();
  const coreByPath = new Map(LLM_CORE_QUERY_MAP.map((row) => [row.path, row.query]));

  return SEO_ROUTE_KEYS.map((routeKey) => {
    const path = PAGE_SEO[routeKey].path;
    const url = absoluteSiteUrl(path);
    return {
      routeKey,
      path,
      inSitemap: sitemapPaths.has(path),
      inLlmsIndexable: llmsIndexable.has(path),
      inLlmsCanonicalBlock: llms.includes(url),
      coreQuery: coreByPath.get(path) ?? null,
    };
  });
}
