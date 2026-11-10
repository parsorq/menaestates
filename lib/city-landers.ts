import type { LeadCounty } from "./counties";
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
  /** Short county label for the footprint band. */
  countyLabel: string;
  /** What we buy in this city. */
  footprintBuys: string;
  /** Nearby cities named honestly (same county or adjacent East Bay). */
  nearbyCities: string;
  objections: CityObjection[];
};

/**
 * City-leaf substance only. Situations stay on situation-landers.
 * East Bay freeze: these seven cities, no national farm.
 */
export const CITY_LANDER_SUBSTANCE: CityLanderSubstance[] = [
  {
    slug: "sell-house-fast-oakland",
    cityName: "Oakland",
    county: "Alameda",
    countyLabel: "Alameda County",
    footprintBuys:
      "Owner-occupied, vacant, and tenant-occupied houses in Oakland when the numbers work. Flatland and hillside stock stay in scope. We buy as principal, not as a listing agent.",
    nearbyCities:
      "Nearby Alameda County doors: Berkeley and Hayward. Fremont is farther south in the same county. Contra Costa peers sit across the county line.",
    objections: [
      {
        title: "Can you buy with title or ownership questions?",
        body: "An operator reviews title and ownership on the call. Clouded title, co-owner friction, and estate holds do not auto-qualify. We buy when the path to close is clear enough for a cash principal deal.",
      },
      {
        title: "Do Oakland transfer taxes change the offer?",
        body: "Local transfer costs sit in the numbers. We do not quote a fixed tax figure on this page. The cash offer reflects what we can pay after costs and condition.",
      },
      {
        title: "What if the house needs work?",
        body: "Condition stays on the table. Deferred maintenance, tired rentals, and unfinished projects still fit when the buy numbers work. We do not require a remodel before close.",
      },
      {
        title: "How fast is a cash close in Oakland?",
        body: "Timeline depends on title, occupancy, and access. Request a cash offer. An operator sets a realistic close window on the call. We do not promise a calendar day on a form.",
      },
      {
        title: "What if tenants are still in the house?",
        body: "Tenant-occupied Oakland houses stay in scope when the lease facts and numbers fit. Tell us occupancy on the form. The callback covers notice and possession.",
      },
    ],
  },
  {
    slug: "sell-house-fast-berkeley",
    cityName: "Berkeley",
    county: "Alameda",
    countyLabel: "Alameda County",
    footprintBuys:
      "Berkeley houses we can underwrite as principal: owner-occupied, vacant, and some tenant stock when the numbers work. Hills and flats stay in the same callback path.",
    nearbyCities:
      "Nearby doors: Oakland and Richmond. Hayward sits farther south in Alameda County. We stay inside Alameda and Contra Costa.",
    objections: [
      {
        title: "Do city rules or rental status block a cash sale?",
        body: "Local rental and occupancy facts matter. An operator asks what is true on the house. We buy as principal when title and possession support a clean close. We do not invent permit outcomes.",
      },
      {
        title: "Will Berkeley taxes wipe the offer?",
        body: "Transfer and closing costs enter the offer math. We do not publish a tax schedule here. The cash number you hear is after we account for costs we can see.",
      },
      {
        title: "The house is older and not updated.",
        body: "Age and finish level are inputs, not automatic refusals. As-is condition fits when the buy numbers work. We do not stage a remodel pitch before close.",
      },
      {
        title: "Can heirs sell a Berkeley house for cash?",
        body: "Inherited Berkeley houses use the same form. Title and estate status decide the path. An operator covers timeline once those facts are clear.",
      },
    ],
  },
  {
    slug: "sell-house-fast-hayward",
    cityName: "Hayward",
    county: "Alameda",
    countyLabel: "Alameda County",
    footprintBuys:
      "Hayward houses as principal when underwriting clears: owner-occupied, vacant, and tenant-occupied stock in mid-county Alameda.",
    nearbyCities:
      "Nearby Alameda County doors: Oakland and Fremont. Berkeley sits north of Oakland. Contra Costa cities stay on their own landers.",
    objections: [
      {
        title: "The house needs repairs. Can you still buy?",
        body: "Repairs and deferred maintenance stay in scope when the numbers work. Sell as-is through the same form. We do not require contractor bids before a callback.",
      },
      {
        title: "How do you set timeline in Hayward?",
        body: "Close timing follows title, access, and occupancy. Request a cash offer. An operator gives a window that matches the house, not a national slogan.",
      },
      {
        title: "What about HOA or shared ownership?",
        body: "HOA dues, special assessments, and co-owner facts go on the call. We buy when those constraints still leave a workable cash path. Incomplete facts pause the deal.",
      },
      {
        title: "Is Hayward inside your footprint?",
        body: "Yes. Hayward is Alameda County. We buy in Alameda and Contra Costa only. Outside those counties, the form is the wrong door.",
      },
    ],
  },
  {
    slug: "sell-house-fast-fremont",
    cityName: "Fremont",
    county: "Alameda",
    countyLabel: "Alameda County",
    footprintBuys:
      "Fremont houses as principal when the buy numbers work: owner-occupied, vacant, and selected tenant stock in southern Alameda County.",
    nearbyCities:
      "Nearby Alameda County door: Hayward. Oakland and Berkeley sit farther north. Contra Costa peers use Concord, Walnut Creek, and Richmond landers.",
    objections: [
      {
        title: "Do you only buy distressed Fremont houses?",
        body: "Condition is one input. Updated houses and tired stock both enter the same underwriting. We buy when the cash number works for us as principal.",
      },
      {
        title: "How fast can you close in Fremont?",
        body: "Speed follows title clarity, access, and seller readiness. An operator sets the close window after the request. We do not lock a day count in marketing copy.",
      },
      {
        title: "What if the property has unpermitted work?",
        body: "Unpermitted work and open questions go on the call. We price what we can verify. Unknown scope can stop a cash path until facts land.",
      },
      {
        title: "Can I sell without listing?",
        body: "Yes. This is a principal cash path, not an agent listing. Request a cash offer. An operator calls you. No listing theater.",
      },
    ],
  },
  {
    slug: "sell-house-fast-concord",
    cityName: "Concord",
    county: "Contra Costa",
    countyLabel: "Contra Costa County",
    footprintBuys:
      "Concord houses as principal when underwriting clears: owner-occupied, vacant, and tenant-occupied stock in central Contra Costa.",
    nearbyCities:
      "Nearby Contra Costa doors: Walnut Creek and Richmond. Alameda peers sit on Oakland, Berkeley, Hayward, and Fremont landers.",
    objections: [
      {
        title: "Is Concord in your buy area?",
        body: "Yes. Concord is Contra Costa County. We buy in Alameda and Contra Costa only. That footprint is the whole East Bay set on this site.",
      },
      {
        title: "What if I am behind on payments?",
        body: "Timeline pressure belongs on the form and the call. We review what we can buy as principal. We do not claim to stop foreclosure or erase debt on this page.",
      },
      {
        title: "Does condition kill the deal?",
        body: "Condition changes the number, not the door. Repairs stay honest in the offer. We close as-is when the buy math works.",
      },
      {
        title: "Who calls me after I submit?",
        body: "An operator calls you. Seller calls stay with the operator. After under contract, we own the exit with buyers and funding.",
      },
    ],
  },
  {
    slug: "sell-house-fast-walnut-creek",
    cityName: "Walnut Creek",
    county: "Contra Costa",
    countyLabel: "Contra Costa County",
    footprintBuys:
      "Walnut Creek houses as principal when the numbers work. Price band and condition both sit in underwriting. We do not claim every listing-priced house fits a cash buy.",
    nearbyCities:
      "Nearby Contra Costa doors: Concord and Richmond. Alameda County peers stay on their own city landers.",
    objections: [
      {
        title: "Will a cash offer match list price?",
        body: "Cash principal offers price risk, speed, and condition. They are not a retail list match by default. An operator walks the number after your request.",
      },
      {
        title: "What about local transfer costs?",
        body: "Closing and transfer costs enter the offer. We do not publish a municipal fee table here. The cash figure accounts for costs we can see.",
      },
      {
        title: "Can I sell a condo or townhome?",
        body: "HOA documents, dues, and special assessments decide condo and townhome paths. Tell us the property type on the form. The callback covers what we can buy.",
      },
      {
        title: "How does timeline work here?",
        body: "Close timing follows title, HOA if any, and access. Request a cash offer. An operator sets a window that matches the house.",
      },
    ],
  },
  {
    slug: "sell-house-fast-richmond",
    cityName: "Richmond",
    county: "Contra Costa",
    countyLabel: "Contra Costa County",
    footprintBuys:
      "Richmond houses as principal when underwriting clears: owner-occupied, vacant, and tenant-occupied stock in western Contra Costa.",
    nearbyCities:
      "Nearby doors: Concord and Berkeley. Walnut Creek sits farther inland in Contra Costa. Oakland is across the county line in Alameda.",
    objections: [
      {
        title: "Do you buy Richmond houses that need work?",
        body: "Yes when the numbers work. Condition and repairs stay in the offer. We do not require a polish pass before close.",
      },
      {
        title: "What if title or heirs are involved?",
        body: "Title and heir facts belong on the call. Inherited Richmond houses use the same form. We buy when the path to close is clear enough.",
      },
      {
        title: "How fast can this move?",
        body: "Speed is not a slogan. Occupancy, access, and title set the window. An operator states that window after your request.",
      },
      {
        title: "Is Richmond outside Alameda?",
        body: "Richmond is Contra Costa County. Still inside our East Bay footprint. We buy in Alameda and Contra Costa only.",
      },
      {
        title: "Do you flip leads to other buyers?",
        body: "No lead auction. Your request stays with us. An operator calls you. After under contract, we own the exit.",
      },
    ],
  },
];

const BY_SLUG = new Map(
  CITY_LANDER_SUBSTANCE.map((row) => [row.slug, row]),
);

export function getCityLanderSubstance(
  slug: string,
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

/** Sanity helper for registry tests. */
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

/**
 * Related doors for a city leaf: cities hub (AEO_ENTRY_MAP), trust room,
 * 2–4 peer cities, and both situation leaves from `relatedSlugs`. Not a
 * full mesh. Hub stays first (Batch 2 graph).
 */
export function cityRelatedLinks(lander: LanderDefinition): CityRelatedLink[] {
  const links: CityRelatedLink[] = [
    {
      href: CITIES_HUB_PATH,
      label: "Cities we buy in East Bay",
    },
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
