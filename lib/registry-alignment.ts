import { SITE_ORIGIN } from "./brand";
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
