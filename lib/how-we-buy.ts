/**
 * Trust / how-we-buy room. Primary: how we buy houses for cash (AEO_ENTRY_MAP).
 * Standalone marketing page (not a lander). Form source: how-we-buy.
 */
import { CITIES_HUB_NAV_LABEL, getCitiesHubHref } from "./cities-hub";
import { GUIDES_HUB_NAV_LABEL, GUIDES_HUB_PATH } from "./guides-hub";
import {
  REPAIR_OR_AS_IS_NAV_LABEL,
  REPAIR_OR_AS_IS_PATH,
} from "./repair-or-as-is";

export const HOW_WE_BUY_PATH = "/how-we-buy" as const;

export const HOW_WE_BUY_NAV_LABEL = "How we buy";

export const HOW_WE_BUY_RELATED_LINK = {
  href: HOW_WE_BUY_PATH,
  label: "How we buy for cash",
} as const;

export type HowWeBuyRelatedLink = {
  href: string;
  label: string;
};

/**
 * Related doors on the trust room (AEO_ENTRY_MAP).
 * Guides hub + free tool live here; not in header/footer.
 */
export function howWeBuyRelatedLinks(): HowWeBuyRelatedLink[] {
  return [
    { href: getCitiesHubHref(), label: CITIES_HUB_NAV_LABEL },
    { href: "/about", label: "About Hector" },
    { href: GUIDES_HUB_PATH, label: GUIDES_HUB_NAV_LABEL },
    { href: REPAIR_OR_AS_IS_PATH, label: REPAIR_OR_AS_IS_NAV_LABEL },
  ];
}

export function getHowWeBuyHref(): string {
  return HOW_WE_BUY_PATH;
}
