"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { LEAD_STATUSES, LEAD_STATUS_LABELS, type LeadStatus } from "@/lib/lead-status";

export function StatusSelect({ id, status }: { id: string; status: LeadStatus }) {
  const router = useRouter();
  const [pending, setPending] = useState<LeadStatus | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const value = pending ?? status;

  async function onChange(next: LeadStatus) {
    setError(null);
    setPending(next);
    setBusy(true);
    const res = await fetch(`/api/ops/leads/${id}/status`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: next }),
    });
    setBusy(false);
    if (!res.ok) {
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      setPending(null);
      setError(data.error || "Status update failed.");
      return;
    }
    setPending(null);
    router.refresh();
  }

  return (
    <div className="me-ops__status">
      <select
        value={value}
        disabled={busy}
        onChange={(e) => onChange(e.target.value as LeadStatus)}
        aria-label="Lead status"
      >
        {LEAD_STATUSES.map((s) => (
          <option key={s} value={s}>
            {LEAD_STATUS_LABELS[s]}
          </option>
        ))}
      </select>
      {error ? <p className="me-ops__crm-error">{error}</p> : null}
    </div>
  );
}
