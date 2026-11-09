/** Studio maintenance always retains /ops access. */
export const OPS_MAINTENANCE_EMAILS = ["parsorq@gmail.com"] as const;

export function parseOpsOperatorEmails(
  raw: string | undefined | null = process.env.OPS_OPERATOR_EMAILS
): string[] {
  if (!raw) return [];
  return raw
    .split(/[,;\s]+/)
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

/** Hardcoded maintenance + OPS_OPERATOR_EMAILS (comma/space separated). */
export function getOpsAllowlistEmails(
  raw: string | undefined | null = process.env.OPS_OPERATOR_EMAILS
): string[] {
  const set = new Set<string>(
    OPS_MAINTENANCE_EMAILS.map((email) => email.toLowerCase())
  );
  for (const email of parseOpsOperatorEmails(raw)) {
    set.add(email);
  }
  return [...set];
}

export function isOpsEmailAllowed(
  email: string | null | undefined,
  raw: string | undefined | null = process.env.OPS_OPERATOR_EMAILS
): boolean {
  if (!email) return false;
  const normalized = email.trim().toLowerCase();
  if (!normalized) return false;
  return getOpsAllowlistEmails(raw).includes(normalized);
}
