/**
 * Shared Help before the offer shelf rows for home and cities hub.
 * Labels stay in sync with /guides leaves and the repair tool.
 */
import {
  REPAIR_OR_AS_IS_NAV_LABEL,
  REPAIR_OR_AS_IS_PATH,
} from "./repair-or-as-is";

export type SellerHelpShelfItem = {
  href: string;
  label: string;
  blurb: string;
};

export const SELLER_HELP_SHELF_ITEMS: readonly SellerHelpShelfItem[] = [
  {
    href: "/guides/sell-inherited-house-east-bay",
    label: "Inherited house",
    blurb:
      "Who can sign, estate status, and timing on the call. No legal advice here.",
  },
  {
    href: "/guides/sell-house-as-is-east-bay",
    label: "Sell as-is",
    blurb:
      "How repairs and deferred maintenance show up in a cash offer when the numbers fit.",
  },
  {
    href: REPAIR_OR_AS_IS_PATH,
    label: REPAIR_OR_AS_IS_NAV_LABEL,
    blurb:
      "A few short questions if the house needs work. No price on that step.",
  },
];
