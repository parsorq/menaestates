import { SITE_NAME } from "./brand";
import { GUEST_PROOF } from "./guest-proof";
import {
  LLM_MANIFEST_AUX_PATHS,
  MARKETING_SITEMAP_PATH_SET,
} from "./marketing-sitemap";
import { PAGE_SEO, SEO_ROUTE_KEYS } from "./seo-metadata";
import { absoluteSiteUrl } from "./site";

export const LLM_MANIFEST_LEAD = `${SITE_NAME}. We buy houses for cash in ${GUEST_PROOF.buyCitiesLabel}. Send the form when you are ready. We call you, walk through the numbers and the condition of the house, and answer your questions before anything moves forward. If we agree and go under contract, we handle closing. We are the buyer, not your listing agent. Hector Mena leads the team.`;

/** High-intent queries → existing indexable routes only. */
export const LLM_CORE_QUERY_MAP: { query: string; path: string }[] = [
  { query: "cash home buyer Hector Mena", path: "/" },
  {
    query: "cities we buy in East Bay",
    path: "/cities-we-buy-in-east-bay",
  },
  { query: "how we buy houses East Bay", path: "/how-we-buy" },
  { query: "about Hector Mena cash buyer", path: "/about" },
  { query: "get a cash offer East Bay", path: "/get-a-cash-offer" },
  { query: "help before a cash offer East Bay", path: "/guides" },
  { query: "sell Oakland house for cash", path: "/sell-house-fast-oakland" },
  {
    query: "sell San Leandro house for cash",
    path: "/sell-house-fast-san-leandro",
  },
  { query: "sell Hayward house for cash", path: "/sell-house-fast-hayward" },
  {
    query: "sell Castro Valley house for cash",
    path: "/sell-house-fast-castro-valley",
  },
  {
    query: "sell San Lorenzo house for cash",
    path: "/sell-house-fast-san-lorenzo",
  },
  { query: "sell Newark house for cash", path: "/sell-house-fast-newark" },
  { query: "sell Tracy house for cash", path: "/sell-house-fast-tracy" },
  {
    query: "sell inherited house East Bay",
    path: "/guides/sell-inherited-house-east-bay",
  },
  {
    query: "sell house as-is East Bay",
    path: "/guides/sell-house-as-is-east-bay",
  },
  {
    query: "repair or sell as-is East Bay",
    path: "/tools/repair-or-as-is-east-bay",
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
    "## Pages",
    ...indexable.map((path) => `- ${absoluteSiteUrl(path)}`),
    "",
    "## Searches we answer",
    ...LLM_CORE_QUERY_MAP.map(
      (row) => `- ${row.query} → ${absoluteSiteUrl(row.path)}`,
    ),
    "",
    "## Page answers",
    ...pageSummaryLines(),
  ];
  return `${lines.join("\n")}\n`;
}
