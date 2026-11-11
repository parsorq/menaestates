/**
 * Guest proof: compact ask identity, About / footer NAP, labeled Realtor career.
 * Career stats and reviews are not cash-buy counts.
 */

export type GuestProofReview = {
  quote: string;
  attribution: string;
  date: string;
  place?: string;
};

export type GuestProof = {
  principal: {
    name: string;
    role: string;
    bio: string;
    photoSrc: string;
    photoAlt: string;
  };
  license: {
    number: string;
    issuedBy: string;
    description: string;
  };
  /** Career Realtor metrics from Zillow. Not cash-purchase counts. */
  realtorCareer: {
    label: string;
    /** Plain line under the label on the cash ask. */
    notCashCountsLine: string;
    totalSalesDisplay: string;
    salesLast12MonthsDisplay: string;
    priceRangeDisplay: string;
    averagePriceDisplay: string;
    asOf: string;
    profileUrl: string;
  };
  reviewsNearAsk: GuestProofReview[];
  reviewsAbout: GuestProofReview[];
  closeTiming: {
    text: string;
  };
  /** Short who-buys line beside the ask form. Full bio stays on About. */
  askBioLine: string;
  nap: {
    phoneDisplay: string;
    phoneTel: string;
    email: string;
    street: string;
    cityStateZip: string;
  };
  buyCitiesLabel: string;
};

export const GUEST_PROOF: GuestProof = {
  principal: {
    name: "Hector Mena",
    role: "Cash buyer",
    bio: "When you sell to me for cash, I am the buyer, not your listing agent. On the call I walk through the numbers, the condition of the house, and your timing. I tell you straight what the facts support, stay reachable with your questions, and leave you room to decide.",
    photoSrc: "/proof/hector-mena.jpg",
    photoAlt: "Hector Mena",
  },
  license: {
    number: "01472758",
    issuedBy: "CA",
    description: "Realtor",
  },
  realtorCareer: {
    label: "Zillow Realtor career stats",
    notCashCountsLine:
      "These figures are from his Realtor career, not cash-purchase counts.",
    totalSalesDisplay: "160",
    salesLast12MonthsDisplay: "5",
    priceRangeDisplay: "$340K to $1.3M",
    averagePriceDisplay: "$707K",
    asOf: "as of Nov 2026",
    profileUrl: "https://www.zillow.com/profile/Realtormena",
  },
  reviewsNearAsk: [
    {
      quote:
        "Hector was very responsive and thorough in explaining the process of selling my home. We were able to stay in the home while we looked for our next one.",
      attribution: "Alberto Garcia",
      date: "Jan 2021",
      place: "Brentwood, CA",
    },
    {
      quote:
        "Hector was so knowledgeable, honest, and humble. He was never pushy and always gave us time to make our own informed decisions.",
      attribution: "karpadillo",
      date: "Aug 2020",
      place: "Oakland, CA",
    },
    {
      quote:
        "The purchase involved the court and multiple sellers. Hector kept me updated and provided valuable advice throughout.",
      attribution: "Sunday Nguyen",
      date: "Jan 2021",
      place: "Oakland, CA",
    },
  ],
  reviewsAbout: [
    {
      quote:
        "Buying a home in the Bay Area can be daunting, but we felt fully supported with Hector by our side. He was patient and knowledgeable.",
      attribution: "kim arg med",
      date: "Jul 2021",
      place: "Gilroy, CA",
    },
    {
      quote:
        "Hector is very knowledgeable and candid about what it takes to put your home up for sale. He focused on my family and worked around our schedule.",
      attribution: "Tony Diaz",
      date: "May 2021",
      place: "Sold a home",
    },
    {
      quote:
        "Hector was very responsive and thorough in explaining the process of selling my home. We were able to stay in the home while we looked for our next one.",
      attribution: "Alberto Garcia",
      date: "Jan 2021",
      place: "Brentwood, CA",
    },
    {
      quote:
        "The purchase involved the court and multiple sellers. Hector kept me updated and provided valuable advice throughout.",
      attribution: "Sunday Nguyen",
      date: "Jan 2021",
      place: "Oakland, CA",
    },
    {
      quote:
        "Hector was so knowledgeable, honest, and humble. He was never pushy and always gave us time to make our own informed decisions.",
      attribution: "karpadillo",
      date: "Aug 2020",
      place: "Oakland, CA",
    },
    {
      quote:
        "Hector took the time to guide us. We could always reach out with questions. He was always available for us.",
      attribution: "Lynnette Rodriguez",
      date: "Jul 2020",
      place: "Hayward, CA",
    },
    {
      quote:
        "Hector helped us sell. Very knowledgeable, patient, and understanding.",
      attribution: "Zillow reviewer",
      date: "Apr 2020",
      place: "CA 95035",
    },
    {
      quote:
        "Hector knew East Oakland well. We had hundreds of questions, and he answered each one.",
      attribution: "Zillow reviewer",
      date: "Jul 2019",
      place: "Hayward, CA",
    },
  ],
  closeTiming: {
    text: "Close timing follows title, access, and whether you still live in the house. On the call we set a window that fits your situation. We do not invent a day count before those facts are clear.",
  },
  askBioLine:
    "I buy houses for cash in Oakland, San Leandro, Hayward, Castro Valley, San Lorenzo, Newark, and Tracy. When you sell to me for cash, I am the buyer, not your listing agent.",
  nap: {
    phoneDisplay: "(510) 858-8484",
    phoneTel: "5108588484",
    email: "menasold@gmail.com",
    street: "5960 Stoneridge Drive Suite #101",
    cityStateZip: "Pleasanton, CA 94588",
  },
  buyCitiesLabel:
    "Oakland, San Leandro, Hayward, Castro Valley, San Lorenzo, Newark, and Tracy",
};
