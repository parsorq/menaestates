import type { SeoRouteKey } from "./seo-metadata";
import { PAGE_SEO, SEO_ROUTE_KEYS } from "./seo-metadata";

export const LLM_MANIFEST_AUX_PATHS = ["/llms.txt"] as const;

export type MarketingSitemapEntry = { path: string; priority: number };

const PRIORITY: Partial<Record<SeoRouteKey, number>> = {
  home: 1,
  "cities-we-buy-in-east-bay": 0.95,
  "how-we-buy": 0.92,
  about: 0.9,
  "get-a-cash-offer": 0.94,
  guides: 0.88,
  "sell-house-fast-oakland": 0.9,
  "sell-house-fast-san-leandro": 0.88,
  "sell-house-fast-hayward": 0.88,
  "sell-house-fast-castro-valley": 0.87,
  "sell-house-fast-san-lorenzo": 0.87,
  "sell-house-fast-newark": 0.87,
  "sell-house-fast-tracy": 0.87,
  "sell-inherited-house-east-bay": 0.86,
  "sell-house-as-is-east-bay": 0.86,
  "repair-or-as-is-east-bay": 0.82,
};

function priorityForKey(key: SeoRouteKey): number {
  return PRIORITY[key] ?? 0.7;
}

export const MARKETING_SITEMAP_PATHS: MarketingSitemapEntry[] = [
  ...SEO_ROUTE_KEYS.map((key) => ({
    path: PAGE_SEO[key].path,
    priority: priorityForKey(key),
  })),
  ...LLM_MANIFEST_AUX_PATHS.map((path) => ({ path, priority: 0.3 })),
];

export const MARKETING_SITEMAP_PATH_SET = new Set(
  MARKETING_SITEMAP_PATHS.map((row) => row.path),
);
