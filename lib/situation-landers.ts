import { HOW_WE_BUY_RELATED_LINK } from "./how-we-buy";
import {
  CITIES_HUB_PATH,
  getLanderBySlug,
  type LanderDefinition,
} from "./landers";
import { REPAIR_OR_AS_IS_RELATED_LINK } from "./repair-or-as-is";

export type SituationNeedItem = {
  title: string;
  body: string;
};

export type SituationFaq = {
  question: string;
  answer: string;
};

export type SituationRelatedLink = {
  href: string;
  label: string;
};

export type SituationLanderSubstance = {
  slug: string;
  situationKey: "inherited" | "as-is";
  /** Title, timeline, and condition inputs without legal advice. */
  needFromSeller: SituationNeedItem[];
  faqs: SituationFaq[];
};

/**
 * Situation-leaf substance only. City leaves stay on city-landers.
 * Related links include the cities hub path from AEO_ENTRY_MAP.
 */
export const SITUATION_LANDER_SUBSTANCE: SituationLanderSubstance[] = [
  {
    slug: "sell-inherited-house-east-bay",
    situationKey: "inherited",
    needFromSeller: [
      {
        title: "Title and who can sell",
        body: "Tell us who holds title and who can sign. Multiple heirs, a trust, or an open estate stay on the call. We buy when the authority path is clear enough for a cash principal close. This page is not legal advice.",
      },
      {
        title: "Timeline",
        body: "Say when you need to move. Estate timing, access to the house, and readiness to close set the window. An operator states a realistic range after your request. We do not lock a calendar day in marketing copy.",
      },
      {
        title: "Condition",
        body: "Describe what you know about the house: vacant, occupied, repairs, and deferred maintenance. Condition stays in the offer math. We do not require a remodel before close.",
      },
    ],
    faqs: [
      {
        question: "Do you buy during probate?",
        answer:
          "Sometimes. Probate and estate status decide the path. Request a cash offer. An operator reviews who can sign and what must clear before close. We do not run a law practice on this site.",
      },
      {
        question: "What if several heirs disagree?",
        answer:
          "Co-owner and heir friction can pause a cash path. Put what you know on the form. The callback covers whether authority is clear enough for us to buy as principal.",
      },
      {
        question: "The inherited house is vacant. Does that matter?",
        answer:
          "Vacant stock stays in scope when the numbers work. Vacancy, access, and condition are inputs on the call. Same East Bay form as every other lander.",
      },
      {
        question: "Will you cover taxes or counsel for the estate?",
        answer:
          "No. We price a cash buy on the house. Estate taxes, probate counsel, and distribution among heirs stay with your own advisors. We do not invent those outcomes here.",
      },
      {
        question: "How is this different from a city page?",
        answer:
          "This room is for inherited exits across Alameda and Contra Costa. City pages open on one named city. The form and operator callback are the same.",
      },
    ],
  },
  {
    slug: "sell-house-as-is-east-bay",
    situationKey: "as-is",
    needFromSeller: [
      {
        title: "Condition",
        body: "Name the repairs and deferred maintenance you already see. Roof, systems, unfinished work, and tired rental stock all belong on the form. Honest condition keeps the offer grounded.",
      },
      {
        title: "Timeline",
        body: "Say how soon you want to close. Access for walk-through and readiness to sell set the window. An operator gives a range after your request, not a slogan day count.",
      },
      {
        title: "Title and occupancy",
        body: "Tell us who owns the house and whether it is vacant, owner-occupied, or tenant-occupied. Title clarity and possession facts decide what we can buy as principal.",
      },
    ],
    faqs: [
      {
        question: "Do I have to repair before you buy?",
        answer:
          "No. As-is means condition stays in the deal. Repairs change the number. We do not require contractor bids or a polish pass before close when the buy math works.",
      },
      {
        question: "Will you still inspect the house?",
        answer:
          "We verify what we can see before we commit. Tell us known issues up front. Unknown scope can slow or stop a cash path until facts land.",
      },
      {
        question: "What if tenants are still living there?",
        answer:
          "Tenant-occupied houses stay in scope when lease facts and numbers fit. Put occupancy on the form. The callback covers notice and possession.",
      },
      {
        question: "Is an as-is cash offer the same as list price?",
        answer:
          "No. A cash principal offer prices risk, speed, and condition. It is not a retail list match by default. An operator walks the number after your request.",
      },
      {
        question: "How is this different from selling an inherited house?",
        answer:
          "This room is for condition-led exits. Inherited title and estate authority have their own lander. Both stay inside Alameda and Contra Costa and use the same form.",
      },
    ],
  },
];

const BY_SLUG = new Map(
  SITUATION_LANDER_SUBSTANCE.map((row) => [row.slug, row]),
);

export function getSituationLanderSubstance(
  slug: string,
): SituationLanderSubstance | undefined {
  return BY_SLUG.get(slug);
}

export function requireSituationLander(
  lander: LanderDefinition,
): { lander: LanderDefinition; situation: SituationLanderSubstance } {
  if (lander.kind !== "situation") {
    throw new Error(
      `Expected situation lander, got ${lander.kind}: ${lander.slug}`,
    );
  }
  const situation = getSituationLanderSubstance(lander.slug);
  if (!situation) {
    throw new Error(`Missing situation substance for ${lander.slug}`);
  }
  return { lander, situation };
}

export function situationLanderSlugs(): string[] {
  return SITUATION_LANDER_SUBSTANCE.map((row) => row.slug);
}

/**
 * Related doors for a situation leaf: cities hub, trust room, two city
 * leaves, and the peer situation. City and peer slugs come from
 * `relatedSlugs`. Hub stays first (Batch 2 graph). As-is also links the
 * repair-or-as-is free tool (page-local; not forced onto every city leaf).
 */
export function situationRelatedLinks(
  lander: LanderDefinition,
): SituationRelatedLink[] {
  const links: SituationRelatedLink[] = [
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
    if (related.kind === "city") {
      links.push({
        href: related.path,
        label: related.title,
      });
      continue;
    }
    if (related.kind === "situation") {
      links.push({
        href: related.path,
        label: related.title,
      });
    }
  }

  if (lander.slug === "sell-house-as-is-east-bay") {
    links.push({
      href: REPAIR_OR_AS_IS_RELATED_LINK.href,
      label: REPAIR_OR_AS_IS_RELATED_LINK.label,
    });
  }

  return links;
}
