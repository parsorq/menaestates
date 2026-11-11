import { CITIES_HUB_PATH } from "./landers";

/**
 * Cities hub URL for guest chrome.
 * Path locked in AEO_ENTRY_MAP (`/cities-we-buy-in-east-bay`).
 * Labels name cities as places we have bought, not a hard fence.
 */
export const CITIES_HUB_NAV_LABEL = "Cities we've bought in";

/** Home section link into the full city list. */
export const CITIES_HUB_ALL_LABEL = "All cities we've bought in";

export function getCitiesHubHref(): string {
  return CITIES_HUB_PATH;
}
