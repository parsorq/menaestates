/** Stable ops timestamps (ASCII, America/Los_Angeles). Avoids Intl hydration drift. */
export function formatOpsWhen(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;

  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Los_Angeles",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).formatToParts(d);

  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? "";

  const month = get("month");
  const day = get("day");
  const year = get("year");
  const hour = get("hour");
  const minute = get("minute");
  const dayPeriod = get("dayPeriod").toUpperCase();

  return `${month} ${day}, ${year}, ${hour}:${minute} ${dayPeriod} PT`;
}
