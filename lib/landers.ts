import type { LeadCounty } from "./counties";

export type LanderKind = "city" | "situation";

export type LanderDefinition = {
  slug: string;
  path: string;
  kind: LanderKind;
  /** Ops `source` on /api/leads */
  source: string;
  title: string;
  description: string;
  h1: string;
  answerFirst: string;
  asideTitle: string;
  asideBody: string;
  defaultCounty?: LeadCounty;
  defaultMotivation?: string;
  relatedSlugs: string[];
};

/**
 * Small East Bay first set. Not a national farm.
 * Paths are the landing_path written on each lead.
 * City leaf substance (FAQs, footprint detail): lib/city-landers.ts.
 */
export const LANDERS: LanderDefinition[] = [
  {
    slug: "sell-house-fast-oakland",
    path: "/sell-house-fast-oakland",
    kind: "city",
    source: "lander-oakland",
    title: "Sell house fast Oakland",
    description:
      "We buy Oakland houses for cash as principal. Alameda County. Request a cash offer. An operator calls you.",
    h1: "Sell your Oakland house for cash",
    answerFirst:
      "We buy Oakland houses as principal in Alameda County. Flatland and hillside stock stay in scope when the numbers work. Request a cash offer. An operator calls you. No agent listing theater.",
    asideTitle: "Oakland · Alameda County",
    asideBody:
      "Owner-occupied, vacant, and tenant houses in Oakland. Nearby Alameda doors: Berkeley and Hayward.",
    defaultCounty: "Alameda",
    relatedSlugs: [
      "sell-house-fast-berkeley",
      "sell-house-fast-hayward",
      "sell-inherited-house-east-bay",
      "sell-house-as-is-east-bay",
    ],
  },
  {
    slug: "sell-house-fast-berkeley",
    path: "/sell-house-fast-berkeley",
    kind: "city",
    source: "lander-berkeley",
    title: "Sell house fast Berkeley",
    description:
      "We buy Berkeley houses for cash as principal. Alameda County. Request a cash offer. An operator calls you.",
    h1: "Sell your Berkeley house for cash",
    answerFirst:
      "We buy Berkeley houses as principal in Alameda County. Hills and flats use the same form. Request a cash offer. An operator calls you. We own the exit after under contract.",
    asideTitle: "Berkeley · Alameda County",
    asideBody:
      "Owner-occupied, vacant, and selected tenant stock in Berkeley. Nearby doors: Oakland and Richmond.",
    defaultCounty: "Alameda",
    relatedSlugs: [
      "sell-house-fast-oakland",
      "sell-house-fast-richmond",
      "sell-inherited-house-east-bay",
      "sell-house-as-is-east-bay",
    ],
  },
  {
    slug: "sell-house-fast-hayward",
    path: "/sell-house-fast-hayward",
    kind: "city",
    source: "lander-hayward",
    title: "Sell house fast Hayward",
    description:
      "We buy Hayward houses for cash as principal. Alameda County. Request a cash offer. An operator calls you.",
    h1: "Sell your Hayward house for cash",
    answerFirst:
      "We buy Hayward houses as principal in mid-county Alameda. Condition stays on the table. Request a cash offer. An operator calls you. No agent listing theater.",
    asideTitle: "Hayward · Alameda County",
    asideBody:
      "Owner-occupied, vacant, and tenant houses in Hayward. Nearby Alameda doors: Oakland and Fremont.",
    defaultCounty: "Alameda",
    relatedSlugs: [
      "sell-house-fast-oakland",
      "sell-house-fast-fremont",
      "sell-inherited-house-east-bay",
      "sell-house-as-is-east-bay",
    ],
  },
  {
    slug: "sell-house-fast-fremont",
    path: "/sell-house-fast-fremont",
    kind: "city",
    source: "lander-fremont",
    title: "Sell house fast Fremont",
    description:
      "We buy Fremont houses for cash as principal. Alameda County. Request a cash offer. An operator calls you.",
    h1: "Sell your Fremont house for cash",
    answerFirst:
      "We buy Fremont houses as principal in southern Alameda County. Updated stock and tired stock both enter underwriting. Request a cash offer. An operator calls you. We own the exit after under contract.",
    asideTitle: "Fremont · Alameda County",
    asideBody:
      "Owner-occupied, vacant, and selected tenant stock in Fremont. Nearby Alameda door: Hayward.",
    defaultCounty: "Alameda",
    relatedSlugs: [
      "sell-house-fast-hayward",
      "sell-house-fast-oakland",
      "sell-inherited-house-east-bay",
      "sell-house-as-is-east-bay",
    ],
  },
  {
    slug: "sell-house-fast-concord",
    path: "/sell-house-fast-concord",
    kind: "city",
    source: "lander-concord",
    title: "Sell house fast Concord",
    description:
      "We buy Concord houses for cash as principal. Contra Costa County. Request a cash offer. An operator calls you.",
    h1: "Sell your Concord house for cash",
    answerFirst:
      "We buy Concord houses as principal in central Contra Costa County. Request a cash offer. An operator calls you. No agent listing theater.",
    asideTitle: "Concord · Contra Costa County",
    asideBody:
      "Owner-occupied, vacant, and tenant houses in Concord. Nearby Contra Costa doors: Walnut Creek and Richmond.",
    defaultCounty: "Contra Costa",
    relatedSlugs: [
      "sell-house-fast-walnut-creek",
      "sell-house-fast-richmond",
      "sell-inherited-house-east-bay",
      "sell-house-as-is-east-bay",
    ],
  },
  {
    slug: "sell-house-fast-walnut-creek",
    path: "/sell-house-fast-walnut-creek",
    kind: "city",
    source: "lander-walnut-creek",
    title: "Sell house fast Walnut Creek",
    description:
      "We buy Walnut Creek houses for cash as principal. Contra Costa County. Request a cash offer. An operator calls you.",
    h1: "Sell your Walnut Creek house for cash",
    answerFirst:
      "We buy Walnut Creek houses as principal in Contra Costa County when the cash number works. Price band and condition both sit in underwriting. Request a cash offer. An operator calls you.",
    asideTitle: "Walnut Creek · Contra Costa County",
    asideBody:
      "Principal cash buys in Walnut Creek when underwriting clears. Nearby Contra Costa doors: Concord and Richmond.",
    defaultCounty: "Contra Costa",
    relatedSlugs: [
      "sell-house-fast-concord",
      "sell-house-fast-richmond",
      "sell-inherited-house-east-bay",
      "sell-house-as-is-east-bay",
    ],
  },
  {
    slug: "sell-house-fast-richmond",
    path: "/sell-house-fast-richmond",
    kind: "city",
    source: "lander-richmond",
    title: "Sell house fast Richmond",
    description:
      "We buy Richmond houses for cash as principal. Contra Costa County. Request a cash offer. An operator calls you.",
    h1: "Sell your Richmond house for cash",
    answerFirst:
      "We buy Richmond houses as principal in western Contra Costa County. Condition stays honest in the offer. Request a cash offer. An operator calls you. No agent listing theater.",
    asideTitle: "Richmond · Contra Costa County",
    asideBody:
      "Owner-occupied, vacant, and tenant houses in Richmond. Nearby doors: Concord and Berkeley.",
    defaultCounty: "Contra Costa",
    relatedSlugs: [
      "sell-house-fast-concord",
      "sell-house-fast-berkeley",
      "sell-inherited-house-east-bay",
      "sell-house-as-is-east-bay",
    ],
  },
  {
    slug: "sell-inherited-house-east-bay",
    path: "/sell-inherited-house-east-bay",
    kind: "situation",
    source: "lander-inherited",
    title: "Sell inherited house East Bay",
    description:
      "We buy inherited East Bay houses for cash as principal in Alameda and Contra Costa. Request a cash offer. An operator covers title and timeline.",
    h1: "Sell an inherited East Bay house for cash",
    answerFirst:
      "We buy inherited houses in Alameda and Contra Costa as principal. Estate and heir sales use one form. Request a cash offer. An operator calls you about who can sign, timeline, and the house itself. We do not give legal advice on this page.",
    asideTitle: "Inherited · East Bay",
    asideBody:
      "Title authority and close timing decide the path. We buy as principal when those facts and the numbers fit. Same callback for Alameda and Contra Costa.",
    defaultMotivation: "inherited",
    relatedSlugs: [
      "sell-house-as-is-east-bay",
      "sell-house-fast-oakland",
      "sell-house-fast-concord",
    ],
  },
  {
    slug: "sell-house-as-is-east-bay",
    path: "/sell-house-as-is-east-bay",
    kind: "situation",
    source: "lander-as-is",
    title: "Sell house as-is East Bay",
    description:
      "We buy East Bay houses as-is for cash as principal in Alameda and Contra Costa. Condition stays in the offer. Request a cash offer.",
    h1: "Sell your East Bay house as-is for cash",
    answerFirst:
      "We buy houses that need repairs in Alameda and Contra Costa as principal. As-is means condition stays in the deal. Request a cash offer. An operator calls you about repairs, timeline, and occupancy. No remodel theater before close.",
    asideTitle: "As-is · East Bay",
    asideBody:
      "Deferred maintenance, unfinished projects, and tired rental stock stay in scope when the buy numbers work. Condition changes the number, not the door.",
    defaultMotivation: "repairs",
    relatedSlugs: [
      "sell-inherited-house-east-bay",
      "sell-house-fast-hayward",
      "sell-house-fast-walnut-creek",
    ],
  },
];

const BY_SLUG = new Map(LANDERS.map((lander) => [lander.slug, lander]));

/** Catalog hub for East Bay city leaves. Locked in AEO_ENTRY_MAP. */
export const CITIES_HUB_PATH = "/cities-we-buy-in-east-bay" as const;

export function getLanderBySlug(slug: string): LanderDefinition | undefined {
  return BY_SLUG.get(slug);
}

export function landerSlugs(): string[] {
  return LANDERS.map((lander) => lander.slug);
}

export function cityLanders(): LanderDefinition[] {
  return LANDERS.filter((lander) => lander.kind === "city");
}

export function situationLanders(): LanderDefinition[] {
  return LANDERS.filter((lander) => lander.kind === "situation");
}

/** City name → lander path for homepage CityTape links. */
export const CITY_LANDER_PATHS: Record<string, string> = {
  Oakland: "/sell-house-fast-oakland",
  Berkeley: "/sell-house-fast-berkeley",
  Hayward: "/sell-house-fast-hayward",
  Fremont: "/sell-house-fast-fremont",
  Concord: "/sell-house-fast-concord",
  "Walnut Creek": "/sell-house-fast-walnut-creek",
  Richmond: "/sell-house-fast-richmond",
};
