import Link from "next/link";
import { redirect } from "next/navigation";
import { isOpsAuthenticated } from "@/lib/ops-auth";
import { listLeads, sanitizeLeadSearchQuery } from "@/lib/leads";
import { isLeadCounty } from "@/lib/counties";
import { isLeadStatus, LEAD_STATUS_LABELS, type LeadStatus } from "@/lib/lead-status";
import { formatOpsWhen } from "@/lib/ops-time";
import { LeadFilters } from "./LeadFilters";
import { LogoutButton } from "./LogoutButton";

export const dynamic = "force-dynamic";

export default async function OpsLeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string; county?: string }>;
}) {
  if (!(await isOpsAuthenticated())) {
    redirect("/ops/login");
  }

  const params = await searchParams;
  const q = sanitizeLeadSearchQuery(params.q) ?? undefined;
  const status = isLeadStatus(params.status) ? params.status : undefined;
  const county = isLeadCounty(params.county) ? params.county : undefined;

  const leads = await listLeads({ q, status, county });

  return (
    <main className="me-ops">
      <div className="me-ops__bar">
        <div>
          <h1 style={{ margin: 0 }}>Leads</h1>
          <p style={{ margin: "0.35rem 0 0", color: "var(--ink-soft)" }}>
            Search by name, phone, or address. Open a row for status, notes, and handoff.
          </p>
        </div>
        <LogoutButton />
      </div>

      <LeadFilters q={q} status={status} county={county} />

      {leads.length === 0 ? (
        <div className="me-ops__empty">No leads match these filters.</div>
      ) : (
        <ul className="me-ops__scan">
          {leads.map((lead) => {
            const statusLabel = isLeadStatus(lead.status)
              ? LEAD_STATUS_LABELS[lead.status as LeadStatus]
              : lead.status;
            return (
              <li key={lead.id}>
                <Link className="me-ops__scan-row" href={`/ops/leads/${lead.id}`}>
                  <div className="me-ops__scan-top">
                    <strong>{lead.full_name}</strong>
                    <span className="me-ops__scan-status">{statusLabel}</span>
                  </div>
                  <div className="me-ops__scan-meta">{lead.phone}</div>
                  <div className="me-ops__scan-meta">{lead.property_address}</div>
                  <div className="me-ops__scan-foot">
                    <span>{lead.county}</span>
                    <span>{formatOpsWhen(lead.created_at)}</span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}
