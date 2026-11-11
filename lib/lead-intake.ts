import { createHmac, timingSafeEqual } from "node:crypto";

/** Legacy placeholder when name was deferred to the call. */
export const DEFERRED_FULL_NAME = "To confirm on call";

/** Stored for motivation / timeline / occupancy until the call fills them. */
export const PENDING_QUALIFY = "pending_call";

export type IntakeStage = "contact" | "qualified";

export function isIntakeStage(value: unknown): value is IntakeStage {
  return value === "contact" || value === "qualified";
}

function continueSecret(): string | null {
  const secret = process.env.AUTH_SECRET?.trim();
  return secret || null;
}

/** HMAC so step 2 can update the same lead without a public write surface. */
export function signLeadContinueToken(
  leadId: string,
  consentCallAt: string
): string | { error: string } {
  const secret = continueSecret();
  if (!secret) return { error: "AUTH_SECRET missing." };
  return createHmac("sha256", secret)
    .update(`${leadId}:${consentCallAt}`)
    .digest("hex");
}

export function verifyLeadContinueToken(
  leadId: string,
  consentCallAt: string,
  token: string
): boolean {
  const expected = signLeadContinueToken(leadId, consentCallAt);
  if (typeof expected !== "string") return false;
  const got = token.trim();
  if (!got || got.length !== expected.length) return false;
  try {
    return timingSafeEqual(Buffer.from(got), Buffer.from(expected));
  } catch {
    return false;
  }
}
