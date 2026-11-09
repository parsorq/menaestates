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
 */
export const LANDERS: LanderDefinition[] = [
  {
    slug: "sell-house-fast-oakland",
    path: "/sell-house-fast-oakland",
    kind: "city",
    source: "lander-oakland",
    title: "Sell house fast Oakland",
    description:
      "Mena Estates buys Oakland houses for cash as principal. Alameda County. Request a cash offer. An operator calls you.",
    h1: "Sell your Oakland house for cash",
    answerFirst:
      "Mena Estates buys Oakland houses as principal in Alameda County. Request a cash offer. An operator calls you. No agent listing theater.",
    asideTitle: "Oakland · Alameda County",
    asideBody:
      "Owner-occupied, vacant, and tenant houses in Oakland and nearby Alameda cities when the numbers work.",
    defaultCounty: "Alameda",
    relatedSlugs: [
      "sell-house-fast-berkeley",
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
      "Mena Estates buys Berkeley houses for cash as principal. Alameda County. Request a cash offer. An operator calls you.",
    h1: "Sell your Berkeley house for cash",
    answerFirst:
      "Mena Estates buys Berkeley houses as principal in Alameda County. Request a cash offer. An operator calls you. Closing path runs with Mena after under contract.",
    asideTitle: "Berkeley · Alameda County",
    asideBody:
      "Same East Bay footprint and the same form used on every city page. Alameda and Contra Costa only.",
    defaultCounty: "Alameda",
    relatedSlugs: [
      "sell-house-fast-oakland",
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
      "Mena Estates buys inherited houses for cash in Alameda and Contra Costa. Request a cash offer when the estate needs a clean exit.",
    h1: "Sell an inherited East Bay house for cash",
    answerFirst:
      "Mena Estates buys inherited houses in Alameda and Contra Costa as principal. Request a cash offer. An operator calls you about timeline and title.",
    asideTitle: "Inherited · East Bay",
    asideBody:
      "Probate and estate exits stay on one callback path. We buy as principal when the house and numbers fit.",
    defaultMotivation: "inherited",
    relatedSlugs: [
      "sell-house-as-is-east-bay",
      "sell-house-fast-oakland",
      "sell-house-fast-berkeley",
    ],
  },
  {
    slug: "sell-house-as-is-east-bay",
    path: "/sell-house-as-is-east-bay",
    kind: "situation",
    source: "lander-as-is",
    title: "Sell house as-is East Bay",
    description:
      "Mena Estates buys East Bay houses as-is for cash in Alameda and Contra Costa. Condition stays on the table. Request a cash offer.",
    h1: "Sell your East Bay house as-is for cash",
    answerFirst:
      "Mena Estates buys houses that need repairs in Alameda and Contra Costa as principal. Sell as-is when the condition is part of the deal. Request a cash offer.",
    asideTitle: "As-is · East Bay",
    asideBody:
      "Repairs, deferred maintenance, and tired rental stock stay in scope when the numbers work. No remodel theater before close.",
    defaultMotivation: "repairs",
    relatedSlugs: [
      "sell-inherited-house-east-bay",
      "sell-house-fast-oakland",
      "sell-house-fast-berkeley",
    ],
  },
];

const BY_SLUG = new Map(LANDERS.map((lander) => [lander.slug, lander]));

export function getLanderBySlug(slug: string): LanderDefinition | undefined {
  return BY_SLUG.get(slug);
}

export function landerSlugs(): string[] {
  return LANDERS.map((lander) => lander.slug);
}

/** City name → lander path for homepage links. */
export const CITY_LANDER_PATHS: Record<string, string> = {
  Oakland: "/sell-house-fast-oakland",
  Berkeley: "/sell-house-fast-berkeley",
};
