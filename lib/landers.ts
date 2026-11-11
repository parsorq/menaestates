import type { LeadCounty } from "./counties";
import { GUEST_PROOF } from "./guest-proof";

const BUY_CITIES = GUEST_PROOF.buyCitiesLabel;

/** City cash-offer leaves vs seller-help guides under `/guides`. */
export type LanderKind = "city" | "guide";

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
 * Marketed city set: Oakland, San Leandro, Hayward, Castro Valley,
 * San Lorenzo, Newark, Tracy. Not a national farm.
 * Paths are the landing_path written on each lead.
 * City page substance: lib/city-landers.ts.
 */
export const LANDERS: LanderDefinition[] = [
  {
    slug: "sell-house-fast-oakland",
    path: "/sell-house-fast-oakland",
    kind: "city",
    source: "lander-oakland",
    title: "Sell your Oakland house for cash",
    description:
      "We buy Oakland houses for cash in Alameda County. Flatland and hillside homes both fit when the numbers work. Request a cash offer when you are ready. We call you, walk through the numbers and the house, and answer your questions before anything moves forward. We do not list your house as an agent.",
    h1: "Sell your Oakland house for cash",
    answerFirst:
      "We buy Oakland houses for cash in Alameda County. Flatland and hillside homes both fit when the numbers work. Request a cash offer when you are ready. We call you, walk through the numbers and the house, and answer your questions before anything moves forward. We do not list your house as an agent.",
    asideTitle: "Oakland · Alameda County",
    asideBody:
      "We buy Oakland houses you still live in, vacant houses, and houses with tenants when the numbers work. Nearby, we also buy in San Leandro and Hayward.",
    defaultCounty: "Alameda",
    relatedSlugs: [
      "sell-house-fast-san-leandro",
      "sell-house-fast-hayward",
      "sell-inherited-house-east-bay",
      "sell-house-as-is-east-bay",
    ],
  },
  {
    slug: "sell-house-fast-san-leandro",
    path: "/sell-house-fast-san-leandro",
    kind: "city",
    source: "lander-san-leandro",
    title: "Sell your San Leandro house for cash",
    description:
      "We buy San Leandro houses for cash in Alameda County. If you still live there, the house is vacant, or tenants are in place, we can talk it through when the numbers work. Request a cash offer when you are ready. We call you, walk through the numbers and the house, and answer your questions before anything moves forward. We do not list your house as an agent.",
    h1: "Sell your San Leandro house for cash",
    answerFirst:
      "We buy San Leandro houses for cash in Alameda County. If you still live there, the house is vacant, or tenants are in place, we can talk it through when the numbers work. Request a cash offer when you are ready. We call you, walk through the numbers and the house, and answer your questions before anything moves forward. We do not list your house as an agent.",
    asideTitle: "San Leandro · Alameda County",
    asideBody:
      "We buy San Leandro houses you still live in, vacant houses, and houses with tenants when the numbers work. Nearby, we also buy in Oakland, San Lorenzo, and Hayward.",
    defaultCounty: "Alameda",
    relatedSlugs: [
      "sell-house-fast-oakland",
      "sell-house-fast-san-lorenzo",
      "sell-inherited-house-east-bay",
      "sell-house-as-is-east-bay",
    ],
  },
  {
    slug: "sell-house-fast-hayward",
    path: "/sell-house-fast-hayward",
    kind: "city",
    source: "lander-hayward",
    title: "Sell your Hayward house for cash",
    description:
      "We buy Hayward houses for cash in mid-county Alameda. Condition stays honest in the offer. Request a cash offer when you are ready. We call you, walk through the numbers and the house, and answer your questions before anything moves forward. We do not list your house as an agent.",
    h1: "Sell your Hayward house for cash",
    answerFirst:
      "We buy Hayward houses for cash in mid-county Alameda. Condition stays honest in the offer. Request a cash offer when you are ready. We call you, walk through the numbers and the house, and answer your questions before anything moves forward. We do not list your house as an agent.",
    asideTitle: "Hayward · Alameda County",
    asideBody:
      "We buy Hayward houses you still live in, vacant houses, and houses with tenants when the numbers work. Nearby, we also buy in San Lorenzo, Castro Valley, and Newark.",
    defaultCounty: "Alameda",
    relatedSlugs: [
      "sell-house-fast-san-lorenzo",
      "sell-house-fast-castro-valley",
      "sell-inherited-house-east-bay",
      "sell-house-as-is-east-bay",
    ],
  },
  {
    slug: "sell-house-fast-castro-valley",
    path: "/sell-house-fast-castro-valley",
    kind: "city",
    source: "lander-castro-valley",
    title: "Sell your Castro Valley house for cash",
    description:
      "We buy Castro Valley houses for cash in Alameda County. We work around real life at home, including when only some tenant situations fit. Request a cash offer when you are ready. We call you, walk through the numbers and the house, and answer your questions before anything moves forward. We do not list your house as an agent.",
    h1: "Sell your Castro Valley house for cash",
    answerFirst:
      "We buy Castro Valley houses for cash in Alameda County. We work around real life at home, including when only some tenant situations fit. Request a cash offer when you are ready. We call you, walk through the numbers and the house, and answer your questions before anything moves forward. We do not list your house as an agent.",
    asideTitle: "Castro Valley · Alameda County",
    asideBody:
      "We buy Castro Valley houses you still live in, vacant houses, and some houses with tenants when the numbers work. Nearby, we also buy in Hayward and San Lorenzo.",
    defaultCounty: "Alameda",
    relatedSlugs: [
      "sell-house-fast-hayward",
      "sell-house-fast-san-lorenzo",
      "sell-inherited-house-east-bay",
      "sell-house-as-is-east-bay",
    ],
  },
  {
    slug: "sell-house-fast-san-lorenzo",
    path: "/sell-house-fast-san-lorenzo",
    kind: "city",
    source: "lander-san-lorenzo",
    title: "Sell your San Lorenzo house for cash",
    description:
      "We buy San Lorenzo houses for cash in Alameda County. Repairs and tired condition stay in the offer math, not as a reason to skip the call. Request a cash offer when you are ready. We call you, walk through the numbers and the house, and answer your questions before anything moves forward. We do not list your house as an agent.",
    h1: "Sell your San Lorenzo house for cash",
    answerFirst:
      "We buy San Lorenzo houses for cash in Alameda County. Repairs and tired condition stay in the offer math, not as a reason to skip the call. Request a cash offer when you are ready. We call you, walk through the numbers and the house, and answer your questions before anything moves forward. We do not list your house as an agent.",
    asideTitle: "San Lorenzo · Alameda County",
    asideBody:
      "We buy San Lorenzo houses you still live in, vacant houses, and houses with tenants when the numbers work. Nearby, we also buy in San Leandro, Hayward, and Castro Valley.",
    defaultCounty: "Alameda",
    relatedSlugs: [
      "sell-house-fast-san-leandro",
      "sell-house-fast-hayward",
      "sell-inherited-house-east-bay",
      "sell-house-as-is-east-bay",
    ],
  },
  {
    slug: "sell-house-fast-newark",
    path: "/sell-house-fast-newark",
    kind: "city",
    source: "lander-newark",
    title: "Sell your Newark house for cash",
    description:
      "We buy Newark houses for cash in southern Alameda County. Updated homes and tired homes can both fit when the numbers work. Request a cash offer when you are ready. We call you, walk through the numbers and the house, and answer your questions before anything moves forward. We do not list your house as an agent.",
    h1: "Sell your Newark house for cash",
    answerFirst:
      "We buy Newark houses for cash in southern Alameda County. Updated homes and tired homes can both fit when the numbers work. Request a cash offer when you are ready. We call you, walk through the numbers and the house, and answer your questions before anything moves forward. We do not list your house as an agent.",
    asideTitle: "Newark · Alameda County",
    asideBody:
      "We buy Newark houses you still live in, vacant houses, and some houses with tenants when the numbers work. Nearby, we also buy in Hayward and Tracy.",
    defaultCounty: "Alameda",
    relatedSlugs: [
      "sell-house-fast-hayward",
      "sell-house-fast-tracy",
      "sell-inherited-house-east-bay",
      "sell-house-as-is-east-bay",
    ],
  },
  {
    slug: "sell-house-fast-tracy",
    path: "/sell-house-fast-tracy",
    kind: "city",
    source: "lander-tracy",
    title: "Sell your Tracy house for cash",
    description:
      "We buy Tracy houses for cash in San Joaquin County. It is the San Joaquin city we've bought in for cash alongside our Alameda cities. Request a cash offer when you are ready. We call you, walk through the numbers and the house, and answer your questions before anything moves forward. We do not list your house as an agent.",
    h1: "Sell your Tracy house for cash",
    answerFirst:
      "We buy Tracy houses for cash in San Joaquin County. It is the San Joaquin city we've bought in for cash alongside our Alameda cities. Request a cash offer when you are ready. We call you, walk through the numbers and the house, and answer your questions before anything moves forward. We do not list your house as an agent.",
    asideTitle: "Tracy · San Joaquin County",
    asideBody:
      "We buy Tracy houses you still live in, vacant houses, and houses with tenants when the numbers work. Nearby in Alameda County, we also buy in Newark.",
    defaultCounty: "San Joaquin",
    relatedSlugs: [
      "sell-house-fast-newark",
      "sell-house-fast-hayward",
      "sell-inherited-house-east-bay",
      "sell-house-as-is-east-bay",
    ],
  },
  {
    slug: "sell-inherited-house-east-bay",
    path: "/guides/sell-inherited-house-east-bay",
    kind: "guide",
    // Ops source string is frozen (revops / historic leads). Not renamed with kind.
    source: "lander-inherited",
    title: "Sell an inherited house for cash",
    description: `We buy inherited houses for cash in ${BUY_CITIES}. Request a cash offer when you are ready. We call you about who can sign, timeline, and the house itself, and we leave room for your questions. We do not give legal advice here.`,
    h1: "Sell an inherited house for cash",
    answerFirst: `We buy inherited houses for cash in ${BUY_CITIES}. Request a cash offer when you are ready. We call you about who can sign, timeline, and the house itself, and we leave room for your questions. We do not give legal advice here.`,
    asideTitle: "Who can sign",
    asideBody: `Who can sign, and when you need to close, come first. We buy when those facts and the numbers fit. We take the same careful call in ${BUY_CITIES}.`,
    defaultMotivation: "inherited",
    relatedSlugs: [
      "sell-house-as-is-east-bay",
      "sell-house-fast-oakland",
      "sell-house-fast-hayward",
    ],
  },
  {
    slug: "sell-house-as-is-east-bay",
    path: "/guides/sell-house-as-is-east-bay",
    kind: "guide",
    // Ops source string is frozen (revops / historic leads). Not renamed with kind.
    source: "lander-as-is",
    title: "Sell your house as-is for cash",
    description: `We buy houses that need repairs for cash in ${BUY_CITIES}. As-is means condition stays honest in the deal. Request a cash offer when you are ready. We call you about repairs, timeline, and whether anyone still lives there. We do not remodel your house before close.`,
    h1: "Sell your house as-is for cash",
    answerFirst: `We buy houses that need repairs for cash in ${BUY_CITIES}. As-is means condition stays honest in the deal. Request a cash offer when you are ready. We call you about repairs, timeline, and whether anyone still lives there. We do not remodel your house before close.`,
    asideTitle: "Condition in the deal",
    asideBody:
      "Deferred maintenance, unfinished projects, and tired rentals fit when the buy numbers work. Condition changes the number. You can still send a request and talk it through.",
    defaultMotivation: "repairs",
    relatedSlugs: [
      "sell-inherited-house-east-bay",
      "sell-house-fast-hayward",
      "sell-house-fast-san-leandro",
    ],
  },
];

const BY_SLUG = new Map(LANDERS.map((lander) => [lander.slug, lander]));

/** Cities list path. Locked in AEO_ENTRY_MAP (URL kept; copy names the seven cities). */
export const CITIES_HUB_PATH = "/cities-we-buy-in-east-bay" as const;

/** Retired city landers → cities hub. */
export const RETIRED_CITY_LANDER_REDIRECTS: Record<string, string> = {
  "/sell-house-fast-berkeley": CITIES_HUB_PATH,
  "/sell-house-fast-fremont": CITIES_HUB_PATH,
  "/sell-house-fast-concord": CITIES_HUB_PATH,
  "/sell-house-fast-walnut-creek": CITIES_HUB_PATH,
  "/sell-house-fast-richmond": CITIES_HUB_PATH,
};

export function getLanderBySlug(slug: string): LanderDefinition | undefined {
  return BY_SLUG.get(slug);
}

export function landerSlugs(): string[] {
  return LANDERS.map((lander) => lander.slug);
}

export function cityLanders(): LanderDefinition[] {
  return LANDERS.filter((lander) => lander.kind === "city");
}

export function guideLanders(): LanderDefinition[] {
  return LANDERS.filter((lander) => lander.kind === "guide");
}

/** City name → lander path for homepage CityTape links. */
export const CITY_LANDER_PATHS: Record<string, string> = {
  Oakland: "/sell-house-fast-oakland",
  "San Leandro": "/sell-house-fast-san-leandro",
  Hayward: "/sell-house-fast-hayward",
  "Castro Valley": "/sell-house-fast-castro-valley",
  "San Lorenzo": "/sell-house-fast-san-lorenzo",
  Newark: "/sell-house-fast-newark",
  Tracy: "/sell-house-fast-tracy",
};
