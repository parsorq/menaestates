/**
 * About Hector. Indexable trust / NAP room.
 */
import { CITIES_HUB_NAV_LABEL, getCitiesHubHref } from "./cities-hub";
import { GUIDES_HUB_NAV_LABEL, GUIDES_HUB_PATH } from "./guides-hub";
import { HOW_WE_BUY_NAV_LABEL, HOW_WE_BUY_PATH } from "./how-we-buy";
import {
  REPAIR_OR_AS_IS_NAV_LABEL,
  REPAIR_OR_AS_IS_PATH,
} from "./repair-or-as-is";

export const ABOUT_PATH = "/about" as const;

export const ABOUT_NAV_LABEL = "About";

export type AboutRelatedLink = {
  href: string;
  label: string;
};

/**
 * Related doors on About (AEO_ENTRY_MAP).
 * Guides hub + free tool live here; not in header/footer.
 */
export function aboutRelatedLinks(): AboutRelatedLink[] {
  return [
    { href: HOW_WE_BUY_PATH, label: HOW_WE_BUY_NAV_LABEL },
    { href: getCitiesHubHref(), label: CITIES_HUB_NAV_LABEL },
    { href: GUIDES_HUB_PATH, label: GUIDES_HUB_NAV_LABEL },
    { href: REPAIR_OR_AS_IS_PATH, label: REPAIR_OR_AS_IS_NAV_LABEL },
  ];
}

export function getAboutHref(): string {
  return ABOUT_PATH;
}
