import type { Metadata } from "next";
import { SITE_NAME } from "./brand";
import { LANDERS } from "./landers";
import { absoluteSiteUrl, canonicalMeta, getMetadataBase } from "./site";

export type SeoRouteKey =
  | "home"
  | "cities-we-buy-in-east-bay"
  | "how-we-buy"
  | "sell-house-fast-oakland"
  | "sell-house-fast-berkeley"
  | "sell-house-fast-hayward"
  | "sell-house-fast-fremont"
  | "sell-house-fast-concord"
  | "sell-house-fast-walnut-creek"
  | "sell-house-fast-richmond"
  | "sell-inherited-house-east-bay"
  | "sell-house-as-is-east-bay"
  | "repair-or-as-is-east-bay";

export type PageSeo = {
  path: string;
  title: string;
  description: string;
  h1: string;
  answerFirst: string;
};

type LanderSeoKey = Exclude<
  SeoRouteKey,
  | "home"
  | "cities-we-buy-in-east-bay"
  | "how-we-buy"
  | "repair-or-as-is-east-bay"
>;

const HOME_SEO: PageSeo = {
  path: "/",
  title: `${SITE_NAME} | East Bay cash home buyer`,
  description:
    "Cash home buyer for Alameda and Contra Costa. We buy as principal in Oakland, Berkeley, Hayward, Fremont, Concord, Walnut Creek, Richmond.",
  h1: "East Bay cash home buyer",
  answerFirst:
    "We buy houses for cash as principal in Alameda and Contra Costa. An operator handles seller calls. We own the exit after under contract.",
};

/** Catalog / footprint hub. Primary: cities we buy in East Bay (not sell-house-fast). */
const CITIES_HUB_SEO: PageSeo = {
  path: "/cities-we-buy-in-east-bay",
  title: "Cities we buy in East Bay",
  description:
    "East Bay cities where we buy houses for cash. Alameda and Contra Costa: Oakland, Berkeley, Hayward, Fremont, Concord, Walnut Creek, Richmond.",
  h1: "Cities we buy in the East Bay",
  answerFirst:
    "We buy houses for cash in Alameda and Contra Costa. Oakland, Berkeley, Hayward, Fremont, Concord, Walnut Creek, and Richmond. Open a city page for that market, or request a cash offer.",
};

/** Trust room. Primary: how we buy houses East Bay (principal, operator split, footprint). */
const HOW_WE_BUY_SEO: PageSeo = {
  path: "/how-we-buy",
  title: "How we buy houses East Bay",
  description:
    "How we buy East Bay houses for cash as principal. Operator on seller calls. Alameda and Contra Costa footprint. Request a cash offer.",
  h1: "How we buy houses in the East Bay",
  answerFirst:
    "We buy houses for cash as principal in Alameda and Contra Costa. An operator handles seller calls. After under contract, we own the exit. No agent listing theater. No invented reviews on this page.",
};

/** Free tool. Primary: repair or sell as-is East Bay (decision aid before the form). */
const REPAIR_OR_AS_IS_SEO: PageSeo = {
  path: "/repair-or-as-is-east-bay",
  title: "Repair or sell as-is East Bay",
  description:
    "Decide repair vs as-is for an East Bay house sale. Short questions, no login, no price. Cash offer door for Alameda and Contra Costa.",
  h1: "Repair or sell as-is in the East Bay",
  answerFirst:
    "Use this short chooser when the house needs work. We buy as principal in Alameda and Contra Costa. Condition stays in the cash offer. We do not price the house on this page.",
};

function landerPageSeo(): Record<LanderSeoKey, PageSeo> {
  const out = {} as Record<LanderSeoKey, PageSeo>;
  for (const lander of LANDERS) {
    const key = lander.slug as LanderSeoKey;
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
  "cities-we-buy-in-east-bay": CITIES_HUB_SEO,
  "how-we-buy": HOW_WE_BUY_SEO,
  "repair-or-as-is-east-bay": REPAIR_OR_AS_IS_SEO,
  ...landerPageSeo(),
};

export const SEO_ROUTE_KEYS: SeoRouteKey[] = [
  "home",
  "cities-we-buy-in-east-bay",
  "how-we-buy",
  "sell-house-fast-oakland",
  "sell-house-fast-berkeley",
  "sell-house-fast-hayward",
  "sell-house-fast-fremont",
  "sell-house-fast-concord",
  "sell-house-fast-walnut-creek",
  "sell-house-fast-richmond",
  "sell-inherited-house-east-bay",
  "sell-house-as-is-east-bay",
  "repair-or-as-is-east-bay",
];

export function getPageSeo(key: SeoRouteKey): PageSeo {
  return PAGE_SEO[key];
}

export function buildPageMetadata(key: SeoRouteKey): Metadata {
  const seo = PAGE_SEO[key];
  const absoluteTitle =
    key === "home" ? seo.title : `${seo.title} | ${SITE_NAME}`;
  return {
    ...canonicalMeta(seo.path),
    metadataBase: getMetadataBase(),
    title: {
      absolute: absoluteTitle,
    },
    description: seo.description,
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: absoluteSiteUrl(seo.path),
      siteName: SITE_NAME,
      locale: "en_US",
      type: "website",
    },
  };
}
