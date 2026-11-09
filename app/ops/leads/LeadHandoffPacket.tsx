"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  handoffPacketMissingLabels,
  isHandoffPacketComplete,
} from "@/lib/handoff-packet";

export function LeadHandoffPacket({
  id,
  propertyAddress,
  motivation,
  timeline,
  numbersDiscussed,
  accessPhotosNotes,
  contractFileLink,
}: {
  id: string;
  propertyAddress: string;
  motivation: string;
  timeline: string;
  numbersDiscussed: string | null;
  accessPhotosNotes: string | null;
  contractFileLink: string | null;
}) {
  const router = useRouter();
  const [motivationDraft, setMotivationDraft] = useState(motivation);
  const [timelineDraft, setTimelineDraft] = useState(timeline);
  const [numbersDraft, setNumbersDraft] = useState(numbersDiscussed ?? "");
  const [accessDraft, setAccessDraft] = useState(accessPhotosNotes ?? "");
  const [contractDraft, setContractDraft] = useState(contractFileLink ?? "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const saved = {
    motivation,
    timeline,
    numbers: numbersDiscussed ?? "",
    access: accessPhotosNotes ?? "",
    contract: contractFileLink ?? "",
  };
  const dirty =
    motivationDraft !== saved.motivation ||
    timelineDraft !== saved.timeline ||
    numbersDraft !== saved.numbers ||
    accessDraft !== saved.access ||
    contractDraft !== saved.contract;

  const packetSource = {
    property_address: propertyAddress,
    motivation,
    timeline,
    numbers_discussed: numbersDiscussed,
    access_photos_notes: accessPhotosNotes,
    contract_file_link: contractFileLink,
  };
  const complete = isHandoffPacketComplete(packetSource);
  const missing = handoffPacketMissingLabels(packetSource);

  async function save() {
    setBusy(true);
    setError(null);
    const res = await fetch(`/api/ops/leads/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        motivation: motivationDraft,
        timeline: timelineDraft,
        numbers_discussed: numbersDraft,
        access_photos_notes: accessDraft,
        contract_file_link: contractDraft,
      }),
    });
    setBusy(false);
    if (!res.ok) {
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      setError(data.error || "Save failed.");
      return;
    }
    setMotivationDraft(motivationDraft.trim());
    setTimelineDraft(timelineDraft.trim());
    setNumbersDraft(numbersDraft.trim());
    setAccessDraft(accessDraft.trim());
    setContractDraft(contractDraft.trim());
    router.refresh();
  }

  function cancel() {
    setMotivationDraft(saved.motivation);
    setTimelineDraft(saved.timeline);
    setNumbersDraft(saved.numbers);
    setAccessDraft(saved.access);
    setContractDraft(saved.contract);
    setError(null);
  }

  return (
    <div className="me-ops__handoff">
      <div className="me-ops__handoff-head">
        <span className="me-ops__crm-label">Mena handoff packet</span>
        <span
          className={
            complete ? "me-ops__packet-chip me-ops__packet-chip--ready" : "me-ops__packet-chip"
          }
        >
          {complete ? "Ready" : `Missing: ${missing.join(", ")}`}
        </span>
      </div>

      <p className="me-ops__handoff-address">{propertyAddress}</p>

      <label className="me-ops__crm-label" htmlFor={`motivation-${id}`}>
        Motivation
      </label>
      <textarea
        id={`motivation-${id}`}
        className="me-ops__notes"
        rows={2}
        value={motivationDraft}
        onChange={(e) => setMotivationDraft(e.target.value)}
        disabled={busy}
      />

      <label className="me-ops__crm-label" htmlFor={`timeline-${id}`}>
        Seller timeline
      </label>
      <input
        id={`timeline-${id}`}
        className="me-ops__next"
        type="text"
        value={timelineDraft}
        onChange={(e) => setTimelineDraft(e.target.value)}
        disabled={busy}
      />

      <label className="me-ops__crm-label" htmlFor={`numbers-${id}`}>
        Numbers discussed
      </label>
      <textarea
        id={`numbers-${id}`}
        className="me-ops__notes"
        rows={2}
        value={numbersDraft}
        onChange={(e) => setNumbersDraft(e.target.value)}
        disabled={busy}
        placeholder="Offer, credits, repairs"
      />

      <label className="me-ops__crm-label" htmlFor={`access-${id}`}>
        Access / photos notes
      </label>
      <textarea
        id={`access-${id}`}
        className="me-ops__notes"
        rows={2}
        value={accessDraft}
        onChange={(e) => setAccessDraft(e.target.value)}
        disabled={busy}
        placeholder="Keys, lockbox, photo links"
      />

      <label className="me-ops__crm-label" htmlFor={`contract-${id}`}>
        Contract file link
      </label>
      <input
        id={`contract-${id}`}
        className="me-ops__next"
        type="url"
        value={contractDraft}
        onChange={(e) => setContractDraft(e.target.value)}
        disabled={busy}
        placeholder="https://"
      />

      <div className="me-ops__crm-actions">
        <button type="button" onClick={save} disabled={busy || !dirty}>
          {busy ? "Saving…" : "Save packet"}
        </button>
        <button type="button" className="me-ops__ghost" onClick={cancel} disabled={busy || !dirty}>
          Cancel
        </button>
      </div>
      {error ? <p className="me-ops__crm-error">{error}</p> : null}
    </div>
  );
}
