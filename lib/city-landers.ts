import type { LeadCounty } from "./counties";
import { CITIES_HUB_NAV_LABEL } from "./cities-hub";
import { HOW_WE_BUY_RELATED_LINK } from "./how-we-buy";
import {
  CITIES_HUB_PATH,
  getLanderBySlug,
  type LanderDefinition,
} from "./landers";

export type CityObjection = {
  title: string;
  body: string;
};

export type CityRelatedLink = {
  href: string;
  label: string;
};

export type CityLanderSubstance = {
  slug: string;
  cityName: string;
  county: LeadCounty;
  /** Short county label for the local band. */
  countyLabel: string;
  /** What we buy in this city. */
  footprintBuys: string;
  /** Nearby marketed cities. */
  nearbyCities: string;
  objections: CityObjection[];
};

/**
 * City page substance only. Guides stay on guide-landers.
 * Marketed set: seven cities (Alameda + Tracy in San Joaquin).
 */
export const CITY_LANDER_SUBSTANCE: CityLanderSubstance[] = [
  {
    slug: "sell-house-fast-oakland",
    cityName: "Oakland",
    county: "Alameda",
    countyLabel: "Alameda County",
    footprintBuys:
      "We buy Oakland houses you still live in, vacant houses, and houses with tenants when the numbers work. Flatland and hillside homes both fit. We buy the house for cash, not as a listing agent.",
    nearbyCities:
      "Nearby, we also buy in San Leandro and Hayward. Castro Valley and San Lorenzo sit farther south in Alameda County.",
    objections: [
      {
        title: "Can you buy with title or ownership questions?",
        body: "We review title and ownership on the call. Clouded title, co-owner friction, and estate holds do not clear on their own. We buy when title and access are clear enough for a cash deal, and we leave room for your questions.",
      },
      {
        title: "Do you list my Oakland house?",
        body: "No. We buy for cash. We do not list your house as an agent for this request.",
      },
      {
        title: "How fast can you close in Oakland?",
        body: "Close timing follows title, access, and whether you still live in the house. Request a cash offer. On the call we set a window that matches those facts. We do not invent a day count first.",
      },
      {
        title: "Can heirs sell an Oakland house for cash?",
        body: "We buy inherited Oakland houses when title and estate status are clear enough. On the call we cover who can sign, then timeline, and we leave room for questions.",
      },
    ],
  },
  {
    slug: "sell-house-fast-san-leandro",
    cityName: "San Leandro",
    county: "Alameda",
    countyLabel: "Alameda County",
    footprintBuys:
      "We buy San Leandro houses you still live in, vacant houses, and houses with tenants when the numbers work. We buy the house for cash.",
    nearbyCities:
      "Nearby, we also buy in Oakland, San Lorenzo, and Hayward.",
    objections: [
      {
        title: "Do you buy houses in San Leandro?",
        body: "Yes. San Leandro is in Alameda County. We buy in Oakland, San Leandro, Hayward, Castro Valley, San Lorenzo, Newark, and Tracy.",
      },
      {
        title: "Do you buy tenant-occupied San Leandro houses?",
        body: "Yes when access and the numbers fit. On the call we cover occupancy, your timeline, and condition together so nothing important is skipped.",
      },
      {
        title: "How do you set the offer?",
        body: "We review condition, comps, and your timeline on the call. Request a cash offer to start, and bring your questions.",
      },
    ],
  },
  {
    slug: "sell-house-fast-hayward",
    cityName: "Hayward",
    county: "Alameda",
    countyLabel: "Alameda County",
    footprintBuys:
      "We buy Hayward houses you still live in, vacant houses, and houses with tenants when the numbers work. Condition stays honest in the offer. We buy for cash, not as a listing agent.",
    nearbyCities:
      "Nearby, we also buy in San Lorenzo, Castro Valley, and Newark.",
    objections: [
      {
        title: "Will you buy a Hayward house that needs repairs?",
        body: "Yes when the cash number works. As-is condition changes the offer, not whether you can send a request. We do not remodel your house before close.",
      },
      {
        title: "Do you list my house?",
        body: "No. This is a cash buy. We do not list your house as an agent for this request.",
      },
      {
        title: "How fast can you close in Hayward?",
        body: "Close timing follows title, access, and whether you still live in the house. On the call we set a window that matches those facts. We do not invent a day count first.",
      },
    ],
  },
  {
    slug: "sell-house-fast-castro-valley",
    cityName: "Castro Valley",
    county: "Alameda",
    countyLabel: "Alameda County",
    footprintBuys:
      "We buy Castro Valley houses you still live in, vacant houses, and some houses with tenants when the numbers work. We buy for cash.",
    nearbyCities:
      "Nearby, we also buy in Hayward and San Lorenzo.",
    objections: [
      {
        title: "Do you buy houses in Castro Valley?",
        body: "Yes. Castro Valley is in Alameda County. It is one of the seven cities we've bought in for cash.",
      },
      {
        title: "Do you remodel before close?",
        body: "No. We buy as-is when the numbers fit. Repairs stay in the deal math. We remodel after close on houses we own, not your house before close.",
      },
      {
        title: "What happens after I request an offer?",
        body: "We call Monday to Friday, 9:00 to 17:00 Pacific Time. We walk numbers, condition, and title on that call, and we leave room for your questions.",
      },
    ],
  },
  {
    slug: "sell-house-fast-san-lorenzo",
    cityName: "San Lorenzo",
    county: "Alameda",
    countyLabel: "Alameda County",
    footprintBuys:
      "We buy San Lorenzo houses you still live in, vacant houses, and houses with tenants when the numbers work. We buy the house for cash.",
    nearbyCities:
      "Nearby, we also buy in San Leandro, Hayward, and Castro Valley.",
    objections: [
      {
        title: "Do you buy houses in San Lorenzo?",
        body: "Yes. San Lorenzo is in Alameda County and is one of the cities we've bought in for cash.",
      },
      {
        title: "Can I sell if the house needs work?",
        body: "Yes. Condition stays in the offer. Request a cash offer and we cover repairs on the call, with room for your questions.",
      },
      {
        title: "Do you buy inherited San Lorenzo houses?",
        body: "Yes when title authority is clear enough for a cash close. Request a cash offer, say it is an inherited sale, and we walk who can sign and timing on the call.",
      },
    ],
  },
  {
    slug: "sell-house-fast-newark",
    cityName: "Newark",
    county: "Alameda",
    countyLabel: "Alameda County",
    footprintBuys:
      "We buy Newark houses you still live in, vacant houses, and some houses with tenants when the numbers work. We buy for cash in southern Alameda County.",
    nearbyCities:
      "Nearby, we also buy in Hayward and Tracy.",
    objections: [
      {
        title: "Do you buy houses in Newark?",
        body: "Yes. Newark is in Alameda County. We buy there along with Oakland, San Leandro, Hayward, Castro Valley, San Lorenzo, and Tracy.",
      },
      {
        title: "Do you only buy distressed houses?",
        body: "No. Updated homes and tired homes can both fit a cash buy when the numbers work. Condition stays honest in the offer.",
      },
      {
        title: "How do you set close timing?",
        body: "Close timing follows title, access, and whether you still live in the house. On the call we set a window that matches those facts. We do not invent a day count first.",
      },
    ],
  },
  {
    slug: "sell-house-fast-tracy",
    cityName: "Tracy",
    county: "San Joaquin",
    countyLabel: "San Joaquin County",
    footprintBuys:
      "We buy Tracy houses you still live in, vacant houses, and houses with tenants when the numbers work. We buy for cash in San Joaquin County.",
    nearbyCities:
      "Nearby in Alameda County, we also buy in Newark. Tracy is the San Joaquin city we've bought in for cash.",
    objections: [
      {
        title: "Do you buy houses in Tracy?",
        body: "Yes. Tracy is in San Joaquin County. It is one of the seven cities we've bought in for cash.",
      },
      {
        title: "Do you buy outside Tracy in San Joaquin?",
        body: "Tracy is our San Joaquin city. Outside our seven cities, we still buy when the house and the numbers fit.",
      },
      {
        title: "How fast can you close in Tracy?",
        body: "Close timing follows title, access, and whether you still live in the house. On the call we set a window that matches those facts. We do not invent a day count first.",
      },
    ],
  },
];

const BY_SLUG = new Map(
  CITY_LANDER_SUBSTANCE.map((row) => [row.slug, row] as const)
);

export function getCityLanderSubstance(
  slug: string
): CityLanderSubstance | undefined {
  return BY_SLUG.get(slug);
}

export function requireCityLander(
  lander: LanderDefinition,
): { lander: LanderDefinition; city: CityLanderSubstance } {
  if (lander.kind !== "city") {
    throw new Error(`Expected city lander, got ${lander.kind}: ${lander.slug}`);
  }
  const city = getCityLanderSubstance(lander.slug);
  if (!city) {
    throw new Error(`Missing city substance for ${lander.slug}`);
  }
  return { lander, city };
}

export function cityLanderSlugs(): string[] {
  return CITY_LANDER_SUBSTANCE.map((row) => row.slug);
}

export function getCityLanderDefinition(
  slug: string,
): LanderDefinition | undefined {
  const lander = getLanderBySlug(slug);
  if (!lander || lander.kind !== "city") return undefined;
  return lander;
}

export function cityRelatedLinks(lander: LanderDefinition): CityRelatedLink[] {
  const links: CityRelatedLink[] = [
    { href: CITIES_HUB_PATH, label: CITIES_HUB_NAV_LABEL },
    {
      href: HOW_WE_BUY_RELATED_LINK.href,
      label: HOW_WE_BUY_RELATED_LINK.label,
    },
  ];

  for (const slug of lander.relatedSlugs) {
    const related = getLanderBySlug(slug);
    if (!related) continue;
    links.push({
      href: related.path,
      label: related.title,
    });
  }

  return links;
}
