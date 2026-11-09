import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { isOpsAuthenticated } from "@/lib/ops-auth";
import { getLeadById, listLeadEvents } from "@/lib/leads";
import { isLeadStatus, LEAD_STATUS_LABELS, type LeadStatus } from "@/lib/lead-status";
import { formatOpsWhen } from "@/lib/ops-time";
import { formatUtmPath } from "@/lib/utm";
import { LeadCrmFields } from "../LeadCrmFields";
import { LeadHandoffPacket } from "../LeadHandoffPacket";
import { LogoutButton } from "../LogoutButton";
import { StatusSelect } from "../StatusSelect";

export const dynamic = "force-dynamic";

export default async function OpsLeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  if (!(await isOpsAuthenticated())) {
    redirect("/ops/login");
  }

  const { id } = await params;
  const lead = await getLeadById(id);
  if (!lead) notFound();

  const events = await listLeadEvents(id, { limit: 20 });
  const status = isLeadStatus(lead.status) ? lead.status : ("new" as LeadStatus);
  const utmPath = formatUtmPath(lead.utm);

  return (
    <main className="me-ops me-ops--detail">
      <div className="me-ops__bar">
        <div>
          <p className="me-ops__crumb">
            <Link href="/ops/leads">Leads</Link>
          </p>
          <h1 style={{ margin: 0 }}>{lead.full_name}</h1>
          <p style={{ margin: "0.35rem 0 0", color: "var(--ink-soft)" }}>
            {LEAD_STATUS_LABELS[status]} · {formatOpsWhen(lead.created_at)}
          </p>
        </div>
        <LogoutButton />
      </div>

      <section className="me-ops__panel" aria-labelledby="lead-status-heading">
        <h2 id="lead-status-heading" className="me-ops__panel-title">
          Status
        </h2>
        <StatusSelect id={lead.id} status={status} />
        <p className="me-ops__hint">Status saves as soon as you change it.</p>
      </section>

      <section className="me-ops__panel" aria-labelledby="lead-history-heading">
        <h2 id="lead-history-heading" className="me-ops__panel-title">
          History
        </h2>
        {events.length === 0 ? (
          <p className="me-ops__soft" style={{ margin: 0 }}>
            No status changes yet.
          </p>
        ) : (
          <ul className="me-ops__history">
            {events.map((event) => {
              const fromLabel =
                event.from_status && isLeadStatus(event.from_status)
                  ? LEAD_STATUS_LABELS[event.from_status]
                  : event.from_status || "Unknown";
              const toLabel = isLeadStatus(event.to_status)
                ? LEAD_STATUS_LABELS[event.to_status]
                : event.to_status;
              return (
                <li key={event.id} className="me-ops__history-row">
                  <div className="me-ops__history-change">
                    {fromLabel} → {toLabel}
                  </div>
                  <div className="me-ops__history-meta">
                    <span>{event.actor_label}</span>
                    <span>{formatOpsWhen(event.created_at)}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <section className="me-ops__panel" aria-labelledby="lead-key-heading">
        <h2 id="lead-key-heading" className="me-ops__panel-title">
          Lead
        </h2>
        <dl className="me-ops__facts">
          <div>
            <dt>Phone</dt>
            <dd>
              <a href={`tel:${lead.phone.replace(/\D/g, "")}`}>{lead.phone}</a>
            </dd>
          </div>
          <div>
            <dt>Email</dt>
            <dd>{lead.email || "None"}</dd>
          </div>
          <div>
            <dt>Address</dt>
            <dd>{lead.property_address}</dd>
          </div>
          <div>
            <dt>County</dt>
            <dd>{lead.county}</dd>
          </div>
          <div>
            <dt>Motivation</dt>
            <dd>{lead.motivation}</dd>
          </div>
          <div>
            <dt>Timeline</dt>
            <dd>{lead.timeline}</dd>
          </div>
          <div>
            <dt>Occupancy</dt>
            <dd>{lead.occupancy}</dd>
          </div>
          <div>
            <dt>Source</dt>
            <dd>
              {lead.source}
              <div className="me-ops__soft">{lead.landing_path}</div>
              {utmPath ? <div className="me-ops__soft">{utmPath}</div> : null}
            </dd>
          </div>
          <div>
            <dt>Consent</dt>
            <dd>
              {lead.consent_call ? (
                <div className="me-ops__consent">
                  <div>{lead.consent_text_version}</div>
                  <div className="me-ops__soft">
                    {lead.consent_call_at
                      ? formatOpsWhen(lead.consent_call_at)
                      : "No timestamp"}
                  </div>
                  <div className="me-ops__consent-text">
                    {lead.consent_text || "Text not stored (pre-trail row)"}
                  </div>
                </div>
              ) : (
                <span className="me-ops__soft">No call consent</span>
              )}
            </dd>
          </div>
        </dl>
      </section>

      <section className="me-ops__panel" aria-labelledby="lead-crm-heading">
        <h2 id="lead-crm-heading" className="me-ops__panel-title">
          Notes
        </h2>
        <LeadCrmFields
          id={lead.id}
          notes={lead.notes}
          nextActionAt={lead.next_action_at}
        />
      </section>

      <section className="me-ops__panel" aria-labelledby="lead-handoff-heading">
        <h2 id="lead-handoff-heading" className="me-ops__panel-title">
          Mena handoff
        </h2>
        <LeadHandoffPacket
          id={lead.id}
          propertyAddress={lead.property_address}
          motivation={lead.motivation}
          timeline={lead.timeline}
          numbersDiscussed={lead.numbers_discussed}
          accessPhotosNotes={lead.access_photos_notes}
          contractFileLink={lead.contract_file_link}
        />
      </section>
    </main>
  );
}
