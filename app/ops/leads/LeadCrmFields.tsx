"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

function toDatetimeLocalValue(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function fromDatetimeLocalValue(local: string): string | null {
  if (!local.trim()) return null;
  const d = new Date(local);
  if (Number.isNaN(d.getTime())) return null;
  return d.toISOString();
}

export function LeadCrmFields({
  id,
  notes,
  nextActionAt,
}: {
  id: string;
  notes: string | null;
  nextActionAt: string | null;
}) {
  const router = useRouter();
  const [noteDraft, setNoteDraft] = useState(notes ?? "");
  const [baselineNotes, setBaselineNotes] = useState(notes);
  // Empty until client so SSR and hydration agree (datetime-local is browser-local).
  const [nextDraft, setNextDraft] = useState("");
  const [baselineNext, setBaselineNext] = useState(nextActionAt);
  const [nextReady, setNextReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (notes !== baselineNotes) {
    setBaselineNotes(notes);
    setNoteDraft(notes ?? "");
  }

  if (typeof window !== "undefined" && (!nextReady || nextActionAt !== baselineNext)) {
    setBaselineNext(nextActionAt);
    setNextDraft(toDatetimeLocalValue(nextActionAt));
    setNextReady(true);
  }

  const savedNotes = notes ?? "";
  const savedNext = toDatetimeLocalValue(nextActionAt);
  const dirty =
    noteDraft !== savedNotes || (nextReady && nextDraft !== savedNext);

  async function save() {
    setBusy(true);
    setError(null);
    const res = await fetch(`/api/ops/leads/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        notes: noteDraft,
        next_action_at: fromDatetimeLocalValue(nextDraft),
      }),
    });
    setBusy(false);
    if (!res.ok) {
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      setError(data.error || "Save failed.");
      return;
    }
    setNoteDraft(noteDraft.trim());
    router.refresh();
  }

  function cancel() {
    setNoteDraft(savedNotes);
    setNextDraft(savedNext);
    setError(null);
  }

  return (
    <div className="me-ops__crm">
      <label className="me-ops__crm-label" htmlFor={`notes-${id}`}>
        Notes
      </label>
      <textarea
        id={`notes-${id}`}
        className="me-ops__notes"
        rows={3}
        value={noteDraft}
        onChange={(e) => setNoteDraft(e.target.value)}
        disabled={busy}
      />
      <label className="me-ops__crm-label" htmlFor={`next-${id}`}>
        Next action
      </label>
      <input
        id={`next-${id}`}
        className="me-ops__next"
        type="datetime-local"
        value={nextDraft}
        onChange={(e) => setNextDraft(e.target.value)}
        disabled={busy}
      />
      <div className="me-ops__crm-actions">
        <button type="button" onClick={save} disabled={busy || !dirty}>
          {busy ? "Saving…" : "Save"}
        </button>
        <button type="button" className="me-ops__ghost" onClick={cancel} disabled={busy || !dirty}>
          Cancel
        </button>
      </div>
      {error ? <p className="me-ops__crm-error">{error}</p> : null}
    </div>
  );
}
