/**
 * Call-consent SSOT for guest form + lead insert.
 * Shown on the form and stored on each new lead as consent_text + consent_text_version + consent_call_at.
 * Bump CONSENT_TEXT_VERSION whenever CONSENT_CALL_TEXT changes.
 * Call consent only. No SMS consent product until explicitly added.
 * Counsel before ads volume (SSOT gap: no forge TCPA/CIPA standard).
 */
export const CONSENT_TEXT_VERSION =
  process.env.CONSENT_TEXT_VERSION || "2026-11-09-v1";

export const CONSENT_CALL_TEXT =
  "I agree that Mena Estates may call me about selling this property. Message and data rates may apply. I can opt out later.";
