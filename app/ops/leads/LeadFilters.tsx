import Link from "next/link";
import { LEAD_COUNTIES } from "@/lib/counties";
import { LEAD_STATUSES, LEAD_STATUS_LABELS, type LeadStatus } from "@/lib/lead-status";

export function LeadFilters({
  q,
  status,
  county,
}: {
  q?: string;
  status?: LeadStatus;
  county?: string;
}) {
  const hasActive = Boolean(q || status || county);

  return (
    <form className="me-ops__filters" method="get" action="/ops/leads">
      <label className="me-ops__filters-search">
        Search
        <input
          type="search"
          name="q"
          defaultValue={q ?? ""}
          placeholder="Name, phone, or address"
          autoComplete="off"
        />
      </label>
      <label>
        Status
        <select name="status" defaultValue={status ?? ""}>
          <option value="">All</option>
          {LEAD_STATUSES.map((s) => (
            <option key={s} value={s}>
              {LEAD_STATUS_LABELS[s]}
            </option>
          ))}
        </select>
      </label>
      <label>
        County
        <select name="county" defaultValue={county ?? ""}>
          <option value="">All</option>
          {LEAD_COUNTIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>
      <button type="submit">Search</button>
      {hasActive ? (
        <Link className="me-ops__filter-clear" href="/ops/leads">
          Clear
        </Link>
      ) : null}
    </form>
  );
}
