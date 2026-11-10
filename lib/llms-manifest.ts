import { SITE_NAME } from "./brand";
import {
  LLM_MANIFEST_AUX_PATHS,
  MARKETING_SITEMAP_PATH_SET,
} from "./marketing-sitemap";
import { PAGE_SEO, SEO_ROUTE_KEYS } from "./seo-metadata";
import { absoluteSiteUrl } from "./site";

export const LLM_MANIFEST_LEAD = `${SITE_NAME}. We buy houses for cash as principal in Alameda and Contra Costa (East Bay). An operator handles seller calls. We own the exit after under contract.`;

/** High-intent queries → existing indexable routes only. */
export const LLM_CORE_QUERY_MAP: { query: string; path: string }[] = [
  { query: "cash home buyer East Bay", path: "/" },
  {
    query: "cities we buy in East Bay",
    path: "/cities-we-buy-in-east-bay",
  },
  { query: "how we buy houses East Bay", path: "/how-we-buy" },
  { query: "sell house fast Oakland", path: "/sell-house-fast-oakland" },
  { query: "sell house fast Berkeley", path: "/sell-house-fast-berkeley" },
  { query: "sell house fast Hayward", path: "/sell-house-fast-hayward" },
  { query: "sell house fast Fremont", path: "/sell-house-fast-fremont" },
  { query: "sell house fast Concord", path: "/sell-house-fast-concord" },
  {
    query: "sell house fast Walnut Creek",
    path: "/sell-house-fast-walnut-creek",
  },
  { query: "sell house fast Richmond", path: "/sell-house-fast-richmond" },
  {
    query: "sell inherited house East Bay",
    path: "/sell-inherited-house-east-bay",
  },
  { query: "sell house as-is East Bay", path: "/sell-house-as-is-east-bay" },
  {
    query: "repair or sell as-is East Bay",
    path: "/repair-or-as-is-east-bay",
  },
];

const AUX_SET = new Set<string>(LLM_MANIFEST_AUX_PATHS);

export function llmIndexableMarketingPaths(): string[] {
  return SEO_ROUTE_KEYS.map((key) => PAGE_SEO[key].path).filter(
    (path) => MARKETING_SITEMAP_PATH_SET.has(path) && !AUX_SET.has(path),
  );
}

function pageSummaryLines(): string[] {
  const indexable = llmIndexableMarketingPaths();
  const lines: string[] = [];
  for (const key of SEO_ROUTE_KEYS) {
    const seo = PAGE_SEO[key];
    if (!indexable.includes(seo.path)) continue;
    lines.push(`### ${seo.h1}`);
    lines.push(`- URL: ${absoluteSiteUrl(seo.path)}`);
    lines.push(`- ${seo.answerFirst}`);
    lines.push("");
  }
  return lines;
}

export function buildLlmsTxt(): string {
  const indexable = llmIndexableMarketingPaths();
  const lines: string[] = [
    `# ${SITE_NAME}`,
    "",
    LLM_MANIFEST_LEAD,
    "",
    "## Canonical pages",
    ...indexable.map((path) => `- ${absoluteSiteUrl(path)}`),
    "",
    "## Core queries",
    ...LLM_CORE_QUERY_MAP.map(
      (row) => `- ${row.query} → ${absoluteSiteUrl(row.path)}`,
    ),
    "",
    "## Page summaries",
    ...pageSummaryLines(),
  ];
  return `${lines.join("\n")}\n`;
}
