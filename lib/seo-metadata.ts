import type { Metadata } from "next";
import { SITE_NAME } from "./brand";
import { GUEST_PROOF } from "./guest-proof";
import { LANDERS } from "./landers";
import { absoluteSiteUrl, canonicalMeta, getMetadataBase } from "./site";

export type SeoRouteKey =
  | "home"
  | "cities-we-buy-in-east-bay"
  | "how-we-buy"
  | "about"
  | "get-a-cash-offer"
  | "guides"
  | "sell-house-fast-oakland"
  | "sell-house-fast-san-leandro"
  | "sell-house-fast-hayward"
  | "sell-house-fast-castro-valley"
  | "sell-house-fast-san-lorenzo"
  | "sell-house-fast-newark"
  | "sell-house-fast-tracy"
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
  | "about"
  | "get-a-cash-offer"
  | "guides"
  | "repair-or-as-is-east-bay"
>;

const CITIES = GUEST_PROOF.buyCitiesLabel;

const HOME_SEO: PageSeo = {
  path: "/",
  title: `${SITE_NAME} | Cash home buyer · Hector Mena`,
  description: `We buy houses for cash in ${CITIES}. Request a cash offer when you are ready. We call you, walk through the numbers and the condition of the house, and answer your questions before anything moves forward. If we agree and go under contract, we handle closing. We are the buyer, not your listing agent.`,
  h1: "Cash home buyer",
  answerFirst: `We buy houses for cash in ${CITIES}. Request a cash offer when you are ready.`,
};

const CITIES_HUB_SEO: PageSeo = {
  path: "/cities-we-buy-in-east-bay",
  title: "Cities we've bought in for cash",
  description: `We've bought houses for cash in ${CITIES}. Those cities are the core (Alameda County and Tracy in San Joaquin County). Outside them, we still buy when the numbers and the house fit. Request a cash offer and we will talk it through on the call.`,
  h1: "Cities we've bought in for cash",
  answerFirst: `We've bought houses for cash in ${CITIES}. Those cities are the core. Outside them, we still buy when the numbers and the house fit. Open your city for local detail, or request a cash offer and we will talk it through on the call.`,
};

const HOW_WE_BUY_SEO: PageSeo = {
  path: "/how-we-buy",
  title: "How we buy houses for cash",
  description: `We buy houses for cash in ${CITIES}. After you send the form, we call you and walk through what selling this way actually takes: numbers, condition, title, and when you need to move. If we agree and go under contract, we handle closing. We do not list your house as an agent.`,
  h1: "How we buy houses for cash",
  answerFirst: `We buy houses for cash in ${CITIES}. After you send the form, we call you and walk through what selling this way actually takes: numbers, condition, title, and when you need to move. If we agree and go under contract, we handle closing. We do not list your house as an agent.`,
};

const ABOUT_SEO: PageSeo = {
  path: "/about",
  title: "About Hector Mena",
  description: `I am Hector Mena. I buy houses for cash in ${CITIES}. I also hold CA Realtor license ${GUEST_PROOF.license.number}. On a cash sale I take the time to explain what happens next, stay reachable with your questions, and leave you room to decide. Call ${GUEST_PROOF.nap.phoneDisplay}.`,
  h1: "About Hector Mena",
  answerFirst: `I am Hector Mena. I buy houses for cash in ${CITIES}. I also hold CA Realtor license ${GUEST_PROOF.license.number}. On a cash sale I take the time to explain what happens next, stay reachable with your questions, and leave you room to decide.`,
};

const GET_A_CASH_OFFER_SEO: PageSeo = {
  path: "/get-a-cash-offer",
  title: "Get a cash offer",
  description: `Request a cash offer for your house in ${CITIES}. Phone, name, and property address first, with call consent. We call you, walk through the numbers and the condition of the house, and answer your questions before anything moves forward.`,
  h1: "Get a cash offer",
  answerFirst: `Request a cash offer for your house in ${CITIES}. Phone, name, and property address first. We call you, walk through the numbers and the house, and answer your questions before anything moves forward.`,
};

const GUIDES_SEO: PageSeo = {
  path: "/guides",
  title: "Help before the offer",
  description: `Short guides and a repair-versus-as-is tool for sellers in ${CITIES}. Inherited timing, selling as-is, and a few questions before you request a cash offer. This is not legal advice.`,
  h1: "Help before the offer",
  answerFirst: `Short guides and a repair-versus-as-is tool for sellers in ${CITIES}. Inherited timing, selling as-is, and a few questions before you request a cash offer. This is not legal advice.`,
};

const REPAIR_OR_AS_IS_SEO: PageSeo = {
  path: "/tools/repair-or-as-is-east-bay",
  title: "Repair or sell as-is",
  description: `If the house needs work, start with these short questions. They do not set a price. We buy for cash in ${CITIES}, and condition stays honest in the offer. When you are ready, request a cash offer and we will walk the details with you on the call.`,
  h1: "Repair or sell as-is",
  answerFirst: `If the house needs work, start with these short questions. They do not set a price. We buy for cash in ${CITIES}, and condition stays honest in the offer. When you are ready, request a cash offer and we will walk the details with you on the call.`,
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
  about: ABOUT_SEO,
  "get-a-cash-offer": GET_A_CASH_OFFER_SEO,
  guides: GUIDES_SEO,
  "repair-or-as-is-east-bay": REPAIR_OR_AS_IS_SEO,
  ...landerPageSeo(),
};

export const SEO_ROUTE_KEYS: SeoRouteKey[] = [
  "home",
  "cities-we-buy-in-east-bay",
  "how-we-buy",
  "about",
  "get-a-cash-offer",
  "guides",
  "sell-house-fast-oakland",
  "sell-house-fast-san-leandro",
  "sell-house-fast-hayward",
  "sell-house-fast-castro-valley",
  "sell-house-fast-san-lorenzo",
  "sell-house-fast-newark",
  "sell-house-fast-tracy",
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
