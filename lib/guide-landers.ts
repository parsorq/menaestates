import { CITIES_HUB_NAV_LABEL } from "./cities-hub";
import { GUIDES_HUB_NAV_LABEL, GUIDES_HUB_PATH } from "./guides-hub";
import { GUEST_PROOF } from "./guest-proof";
import { HOW_WE_BUY_RELATED_LINK } from "./how-we-buy";
import {
  CITIES_HUB_PATH,
  getLanderBySlug,
  type LanderDefinition,
} from "./landers";
import { REPAIR_OR_AS_IS_RELATED_LINK } from "./repair-or-as-is";

const BUY_CITIES = GUEST_PROOF.buyCitiesLabel;

export type GuideNeedItem = {
  title: string;
  body: string;
};

export type GuideFaq = {
  question: string;
  answer: string;
};

export type GuideProcessStep = {
  title: string;
  body: string;
};

export type GuideSource = {
  label: string;
  href: string;
  note?: string;
};

export type GuideRelatedLink = {
  href: string;
  label: string;
};

/** Short exclusions block (inherited guide). Optional on other guides. */
export type GuideDoNotDo = {
  heading: string;
  items: string[];
};

export type GuideLanderSubstance = {
  slug: string;
  guideKey: "inherited" | "as-is";
  /** How this works: seller-facing process, not a legal flowchart. */
  processSteps: GuideProcessStep[];
  /** Title, timeline, and condition inputs without legal advice. */
  needFromSeller: GuideNeedItem[];
  /** What this cash buy is not (probate filing, legal advice, tax advice). */
  doNotDo?: GuideDoNotDo;
  faqs: GuideFaq[];
  /** Official sources shown at the bottom of the guide. */
  sources: GuideSource[];
};

/**
 * Guide page substance for inherited and as-is. City pages stay on city-landers.
 * Related links include the cities list path from AEO_ENTRY_MAP.
 */
export const GUIDE_LANDER_SUBSTANCE: GuideLanderSubstance[] = [
  {
    slug: "sell-inherited-house-east-bay",
    guideKey: "inherited",
    processSteps: [
      {
        title: "Who can sign comes first",
        body: "A cash close needs clear authority to sell: the person appointed for the estate, or co-owners already on title. We do not open probate for you, and we do not give legal advice. Court self-help pages under Sources explain how estates work.",
      },
      {
        title: "How the house is titled shapes what comes next",
        body: "Some houses pass outside full probate. Others need a court appointment before anyone can sell. Your counsel or the court pages decide which case you are in. We only buy when who can sign is clear enough for title and close.",
      },
      {
        title: "If the court is involved, we wait on your authority",
        body: "Some sales need a notice or court confirmation before close. We work with the authority you actually have. We do not prepare those filings. Sources below name the official pages for that paperwork.",
      },
      {
        title: "Timeline, access, then the cash call",
        body: "Estate timing, who still needs to be heard, and access to the house set a realistic window. When who can sign and timing are clear enough, request a cash offer. On the call we walk those facts and the house, and we leave room for your questions.",
      },
    ],
    doNotDo: {
      heading: "What we do not do",
      items: [
        "We do not file probate for you.",
        "We do not give legal advice.",
        "We do not give estate tax advice.",
      ],
    },
    needFromSeller: [
      {
        title: "Title and who can sell",
        body: "Tell us who holds title and who can sign. Multiple heirs, a trust, or an open estate stay on the call. We buy when who can sign is clear enough for a cash close. This is not legal advice; we will say when you need your own counsel.",
      },
      {
        title: "Timeline",
        body: "Say when you need to move. Estate timing, access to the house, and readiness to close set the window. Once we have those facts, we give a realistic range. We do not invent a day count first.",
      },
      {
        title: "Condition",
        body: "Describe what you know about the house: vacant, occupied, repairs, and deferred maintenance. Condition stays honest in the offer. We do not require a remodel before close.",
      },
    ],
    faqs: [
      {
        question: "Do you buy during probate?",
        answer:
          "Sometimes. Probate and estate status decide who can sell. Request a cash offer. On the call we go through who can sign and what must clear before close. We do not run a law practice here.",
      },
      {
        question: "What if several heirs disagree?",
        answer:
          "Co-owner and heir friction can pause a cash deal. Put what you know on the form. The call covers whether authority is clear enough for us to buy, and we will say so straight.",
      },
      {
        question: "The inherited house is vacant. Does that matter?",
        answer:
          "Vacant houses fit when the numbers work. Vacancy, access, and condition come up on the call so we can plan around them.",
      },
      {
        question: "Will you cover taxes or counsel for the estate?",
        answer:
          "No. We price a cash buy on the house. Estate taxes, probate counsel, and distribution among heirs stay with your own advisors.",
      },
      {
        question: "Does the city change how you buy an inherited house?",
        answer: `We buy inherited houses in ${BUY_CITIES}. Put the city on the form. We call after your request and walk who can sign, timing, and the house the same way.`,
      },
    ],
    sources: [
      {
        label: "California Courts Self-Help: property after someone dies",
        href: "https://www.selfhelp.courts.ca.gov/probate",
        note: "What probate is, and who handles the estate.",
      },
      {
        label: "California Courts Self-Help: when formal probate may not be needed",
        href: "https://www.selfhelp.courts.ca.gov/probate/simple-transfer",
        note: "Trusts, joint title, beneficiaries, and simpler transfers.",
      },
      {
        label: "Alameda Superior Court: administering the estate",
        href: "https://www.alameda.courts.ca.gov/divisions/probate/property-transfers/administering-estate",
        note: "Full vs limited authority, Notice of Proposed Action, and when a hearing is required to sell real property.",
      },
      {
        label: "California Probate Code §10511",
        href: "https://leginfo.legislature.ca.gov/faces/codes_displayText.xhtml?lawCode=PROB&division=7.&title=&part=6.&chapter=3.&article=2.",
        note: "Full-authority power to sell or exchange real property of the estate.",
      },
      {
        label: "Judicial Council form DE-260",
        href: "https://selfhelp.courts.ca.gov/jcc-form/DE-260",
        note: "Report of sale and petition to confirm a sale of real property when court confirmation is required.",
      },
    ],
  },
  {
    slug: "sell-house-as-is-east-bay",
    guideKey: "as-is",
    processSteps: [
      {
        title: "As-is means no remodel before our close",
        body: "When we buy for cash, you do not remodel the house first. Repairs and deferred maintenance stay honest in the offer when the numbers fit.",
      },
      {
        title: "Known condition still belongs in the facts",
        body: "Calling a sale as-is does not erase what you already know about the house. Put known repairs on the form so the cash number stays honest. Official disclosure pages under Sources cover what California expects in a typical residential sale.",
      },
      {
        title: "We still verify what we can see",
        body: "We verify condition before we lock a cash number. Unknown issues can slow or stop a deal until the facts are clear. That is different from asking you to hire contractors and finish a remodel first.",
      },
      {
        title: "A listed retail sale works differently",
        body: "A financed buyer can bring inspection contingencies, repair requests, and lender conditions. Our cash buy is not that sale. Price reflects risk, speed, and condition. It is not a retail list match by default.",
      },
    ],
    needFromSeller: [
      {
        title: "Condition",
        body: "Name the repairs and deferred maintenance you already see. Roof, systems, unfinished work, and tired rentals all belong on the form. Clear condition keeps the offer honest.",
      },
      {
        title: "Timeline",
        body: "Say how soon you want to close. Access for a walk-through and readiness to sell set the window. After your request, we give a range that fits those facts.",
      },
      {
        title: "Title and occupancy",
        body: "Tell us who owns the house and whether it is vacant, owner-occupied, or tenant-occupied. Title and who still lives there shape what a cash buy can look like on the call.",
      },
    ],
    faqs: [
      {
        question: "Do I have to repair before you buy?",
        answer:
          "No. As-is means condition stays in the deal. Repairs change the number. We do not require contractor bids or a remodel before close when the numbers work.",
      },
      {
        question: "Will you still inspect the house?",
        answer:
          "We verify what we can see before we commit. Tell us known issues up front. Unknown condition can slow or stop a cash deal until we have the facts, and we will say that plainly.",
      },
      {
        question: "What if tenants are still living there?",
        answer:
          "Tenant-occupied houses fit when lease facts and numbers work. Put occupancy on the form. The call covers notice and possession so everyone knows what comes next.",
      },
      {
        question: "Is an as-is cash offer the same as list price?",
        answer:
          "No. A cash offer prices risk, speed, and condition. It is not a retail list match by default. After your request, we walk the number with you.",
      },
      {
        question: "How is this different from selling an inherited house?",
        answer: `If repairs drive the sale, stay with as-is. If title and heirs drive it, open the inherited guide. We buy in ${BUY_CITIES} either way.`,
      },
    ],
    sources: [
      {
        label: "California Civil Code §1102",
        href: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=1102.",
        note: "Residential disclosure article for typical single-family transfers; waiver of the article's requirements is void as against public policy.",
      },
      {
        label: "California Civil Code §1102.1",
        href: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=1102.1.",
        note: "Legislature intent that delivery of a Transfer Disclosure Statement may not be waived in an as-is sale.",
      },
      {
        label: "California Department of Real Estate: information for homebuyers",
        href: "https://dre.ca.gov/consumers/informationforhomebuyers.html",
        note: "Inspection and residential disclosure expectations buyers commonly rely on.",
      },
    ],
  },
];

const BY_SLUG = new Map(
  GUIDE_LANDER_SUBSTANCE.map((row) => [row.slug, row]),
);

export function getGuideLanderSubstance(
  slug: string,
): GuideLanderSubstance | undefined {
  return BY_SLUG.get(slug);
}

export function requireGuideLander(
  lander: LanderDefinition,
): { lander: LanderDefinition; guide: GuideLanderSubstance } {
  if (lander.kind !== "guide") {
    throw new Error(
      `Expected guide lander, got ${lander.kind}: ${lander.slug}`,
    );
  }
  const guide = getGuideLanderSubstance(lander.slug);
  if (!guide) {
    throw new Error(`Missing guide substance for ${lander.slug}`);
  }
  return { lander, guide };
}

export function guideLanderSlugs(): string[] {
  return GUIDE_LANDER_SUBSTANCE.map((row) => row.slug);
}

/**
 * Related links for a guide page: cities list, how we buy, guides list,
 * peer guide, city pages. As-is also links the repair-or-as-is tool.
 */
export function guideRelatedLinks(
  lander: LanderDefinition,
): GuideRelatedLink[] {
  const links: GuideRelatedLink[] = [
    {
      href: CITIES_HUB_PATH,
      label: CITIES_HUB_NAV_LABEL,
    },
    {
      href: HOW_WE_BUY_RELATED_LINK.href,
      label: HOW_WE_BUY_RELATED_LINK.label,
    },
    {
      href: GUIDES_HUB_PATH,
      label: GUIDES_HUB_NAV_LABEL,
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
    if (related.kind === "guide") {
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
