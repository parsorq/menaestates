import { SITE_NAME } from "./brand";
import { cityLanders } from "./landers";
import { PAGE_SEO } from "./seo-metadata";
import { absoluteSiteUrl, getSiteUrl } from "./site";

export type FaqSchemaItem = {
  question: string;
  answer: string;
};

const SITE_SCHEMA_DESCRIPTION = PAGE_SEO.home.answerFirst;

export function organizationId(): string {
  return `${getSiteUrl()}/#organization`;
}

/** Sitewide Organization. No invented phone, logo, or sameAs. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": organizationId(),
    name: SITE_NAME,
    url: getSiteUrl(),
    description: SITE_SCHEMA_DESCRIPTION,
    areaServed: [
      {
        "@type": "AdministrativeArea",
        name: "Alameda County",
      },
      {
        "@type": "AdministrativeArea",
        name: "San Joaquin County",
      },
      {
        "@type": "Place",
        name: "Oakland, California",
      },
      {
        "@type": "Place",
        name: "Tracy, California",
      },
    ],
    knowsAbout: [
      "cash home buyer Alameda County",
      "cash home buyer Tracy",
      "sell inherited house for cash",
      "sell house as-is for cash",
    ],
  };
}

/** Sitewide WebSite. No SearchAction: this site has no search route. */
export function webSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${getSiteUrl()}/#website`,
    name: SITE_NAME,
    url: getSiteUrl(),
    description: SITE_SCHEMA_DESCRIPTION,
    publisher: { "@id": organizationId() },
    inLanguage: "en-US",
  };
}

export function faqPageJsonLd(faqs: FaqSchemaItem[], pageUrl?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    ...(pageUrl ? { url: pageUrl } : {}),
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/** Cities hub catalog: one ItemList of city leaves (hub owns catalog intent). */
export function citiesHubItemListJsonLd() {
  const hub = PAGE_SEO["cities-we-buy-in-east-bay"];
  const cities = cityLanders();
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: hub.h1,
    description: hub.answerFirst,
    url: absoluteSiteUrl(hub.path),
    numberOfItems: cities.length,
    itemListElement: cities.map((lander, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: lander.title,
      url: absoluteSiteUrl(lander.path),
    })),
  };
}
