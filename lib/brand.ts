export const SITE_NAME = "Mena Estates";

/** Origin without trailing slash. */
export const SITE_ORIGIN = (
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
).replace(/\/$/, "");
