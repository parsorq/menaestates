/** Standard UTM keys captured from ad URLs into Lead.utm. */
export const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

export type UtmKey = (typeof UTM_KEYS)[number];

/** Read UTM params from a URLSearchParams / query map. */
export function readUtmFromSearchParams(
  params: URLSearchParams | { get(name: string): string | null }
): Record<string, string> {
  const out: Record<string, string> = {};
  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (value?.trim()) out[key] = value.trim().slice(0, 200);
  }
  return out;
}

/** Sanitize a POST body.utm object for insert. */
export function pickUtmFromBody(raw: unknown): Record<string, string> {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return {};
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(raw as Record<string, unknown>)) {
    if (typeof v === "string" && v.trim()) out[k] = v.trim().slice(0, 200);
  }
  return out;
}

/** One-line ops summary: source / medium / campaign (content·term if present). */
export function formatUtmPath(utm: Record<string, unknown> | null | undefined): string | null {
  if (!utm || typeof utm !== "object") return null;
  const source = String(utm.utm_source ?? "").trim();
  const medium = String(utm.utm_medium ?? "").trim();
  const campaign = String(utm.utm_campaign ?? "").trim();
  const content = String(utm.utm_content ?? "").trim();
  const term = String(utm.utm_term ?? "").trim();
  if (!source && !medium && !campaign && !content && !term) return null;

  const head = [source, medium, campaign].filter(Boolean).join(" / ");
  const tail = [content, term].filter(Boolean).join(" · ");
  if (head && tail) return `${head} · ${tail}`;
  return head || tail;
}
