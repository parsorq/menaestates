/**
 * Seller-help guides catalog URL for guest chrome.
 * Path locked in AEO_ENTRY_MAP (`/guides`).
 */
export const GUIDES_HUB_PATH = "/guides" as const;

export const GUIDES_HUB_NAV_LABEL = "Help before the offer";

/** Home / cities shelf link into the full guides list. */
export const GUIDES_HUB_ALL_LABEL = "All seller help";

export function getGuidesHubHref(): string {
  return GUIDES_HUB_PATH;
}
