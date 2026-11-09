import type { Metadata } from "next";
import { SITE_NAME } from "./brand";
import { LANDERS } from "./landers";
import { absoluteSiteUrl, canonicalMeta, getMetadataBase } from "./site";

export type SeoRouteKey =
  | "home"
  | "sell-house-fast-oakland"
  | "sell-house-fast-berkeley"
  | "sell-inherited-house-east-bay"
  | "sell-house-as-is-east-bay";

export type PageSeo = {
  path: string;
  title: string;
  description: string;
  h1: string;
  answerFirst: string;
};

const HOME_SEO: PageSeo = {
  path: "/",
  title: `${SITE_NAME} | East Bay cash home buyer`,
  description:
    "Mena Estates buys houses for cash in Alameda and Contra Costa. Oakland, Berkeley, Hayward, Fremont, Concord, Walnut Creek, Richmond.",
  h1: "Sell your East Bay house for cash",
  answerFirst:
    "Mena Estates buys as principal in Alameda and Contra Costa. Request a cash offer. An operator calls you. We close when the numbers work.",
};

function landerPageSeo(): Record<Exclude<SeoRouteKey, "home">, PageSeo> {
  const out = {} as Record<Exclude<SeoRouteKey, "home">, PageSeo>;
  for (const lander of LANDERS) {
    const key = lander.slug as Exclude<SeoRouteKey, "home">;
    out[key] = {
      path: lander.path,
      title: lander.title,
      description: lander.description,
      h1: lander.h1,
      answerFirst: lander.answerFirst,
    };
  }
  return out;
}

export const PAGE_SEO: Record<SeoRouteKey, PageSeo> = {
  home: HOME_SEO,
  ...landerPageSeo(),
};

export const SEO_ROUTE_KEYS: SeoRouteKey[] = [
  "home",
  "sell-house-fast-oakland",
  "sell-house-fast-berkeley",
  "sell-inherited-house-east-bay",
  "sell-house-as-is-east-bay",
];

export function getPageSeo(key: SeoRouteKey): PageSeo {
  return PAGE_SEO[key];
}

export function buildPageMetadata(key: SeoRouteKey): Metadata {
  const seo = PAGE_SEO[key];
  return {
    ...canonicalMeta(seo.path),
    metadataBase: getMetadataBase(),
    title: {
      absolute: key === "home" ? seo.title : `${seo.title} | ${SITE_NAME}`,
    },
    description: seo.description,
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: absoluteSiteUrl(seo.path),
      siteName: SITE_NAME,
      type: "website",
    },
  };
}
