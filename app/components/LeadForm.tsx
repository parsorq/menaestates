"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CONSENT_CALL_TEXT } from "@/lib/consent";
import { readUtmFromSearchParams } from "@/lib/utm";

type FormState = {
  full_name: string;
  phone: string;
  email: string;
  property_address: string;
  county: string;
  motivation: string;
  timeline: string;
  occupancy: string;
  notes: string;
  consent_call: boolean;
};

export type LeadFormProps = {
  /** Ops attribution. Defaults to `web`. */
  source?: string;
  /** Explicit landing path. Defaults to `window.location.pathname`. */
  landingPath?: string;
  defaultCounty?: string;
  defaultMotivation?: string;
};

function readUtm(): Record<string, string> {
  if (typeof window === "undefined") return {};
  return readUtmFromSearchParams(new URLSearchParams(window.location.search));
}

export function LeadForm({
  source = "web",
  landingPath,
  defaultCounty = "",
  defaultMotivation = "",
}: LeadFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<FormState>({
    full_name: "",
    phone: "",
    email: "",
    property_address: "",
    county: defaultCounty,
    motivation: defaultMotivation,
    timeline: "",
    occupancy: "",
    notes: "",
    consent_call: false,
  });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resolvedLandingPath = useMemo(() => {
    if (landingPath) return landingPath;
    if (typeof window === "undefined") return "/";
    return window.location.pathname || "/";
  }, [landingPath]);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          source,
          landing_path: resolvedLandingPath,
          utm: readUtm(),
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setError(data.error || "Could not submit. Try again.");
        setBusy(false);
        return;
      }
      router.push("/thank-you");
    } catch {
      setError("Network error. Try again.");
      setBusy(false);
    }
  }

  return (
    <form className="me-form" id="offer-form" onSubmit={onSubmit} noValidate>
      <div className="me-form__row me-form__row--2">
        <div className="me-field">
          <label htmlFor="full_name">Full name</label>
          <input
            id="full_name"
            name="full_name"
            autoComplete="name"
            required
            value={form.full_name}
            onChange={(e) => update("full_name", e.target.value)}
          />
        </div>
        <div className="me-field">
          <label htmlFor="phone">Phone</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
          />
        </div>
      </div>

      <div className="me-field">
        <label htmlFor="email">Email (optional)</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
        />
      </div>

      <div className="me-field">
        <label htmlFor="property_address">Property address</label>
        <input
          id="property_address"
          name="property_address"
          autoComplete="street-address"
          required
          value={form.property_address}
          onChange={(e) => update("property_address", e.target.value)}
        />
      </div>

      <div className="me-form__row me-form__row--2">
        <div className="me-field">
          <label htmlFor="county">County</label>
          <select
            id="county"
            name="county"
            required
            value={form.county}
            onChange={(e) => update("county", e.target.value)}
          >
            <option value="">Select</option>
            <option value="Alameda">Alameda</option>
            <option value="Contra Costa">Contra Costa</option>
          </select>
        </div>
        <div className="me-field">
          <label htmlFor="timeline">Timeline</label>
          <select
            id="timeline"
            name="timeline"
            required
            value={form.timeline}
            onChange={(e) => update("timeline", e.target.value)}
          >
            <option value="">Select</option>
            <option value="asap">As soon as possible</option>
            <option value="30_days">Within 30 days</option>
            <option value="90_days">Within 90 days</option>
            <option value="exploring">Just exploring</option>
          </select>
        </div>
      </div>

      <div className="me-form__row me-form__row--2">
        <div className="me-field">
          <label htmlFor="occupancy">Occupancy</label>
          <select
            id="occupancy"
            name="occupancy"
            required
            value={form.occupancy}
            onChange={(e) => update("occupancy", e.target.value)}
          >
            <option value="">Select</option>
            <option value="owner_occupied">Owner occupied</option>
            <option value="tenant">Tenant occupied</option>
            <option value="vacant">Vacant</option>
          </select>
        </div>
        <div className="me-field">
          <label htmlFor="motivation">Why sell</label>
          <select
            id="motivation"
            name="motivation"
            required
            value={form.motivation}
            onChange={(e) => update("motivation", e.target.value)}
          >
            <option value="">Select</option>
            <option value="tired_landlord">Tired landlord</option>
            <option value="inherited">Inherited</option>
            <option value="relocation">Relocation</option>
            <option value="repairs">Repairs / condition</option>
            <option value="financial">Financial pressure</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div className="me-field">
        <label htmlFor="notes">Anything else (optional)</label>
        <textarea
          id="notes"
          name="notes"
          value={form.notes}
          onChange={(e) => update("notes", e.target.value)}
        />
      </div>

      <label className="me-check">
        <input
          type="checkbox"
          checked={form.consent_call}
          onChange={(e) => update("consent_call", e.target.checked)}
          required
        />
        <span>{CONSENT_CALL_TEXT}</span>
      </label>

      {error ? <p className="me-form__error">{error}</p> : null}

      <button className="me-btn me-btn--primary" type="submit" disabled={busy}>
        {busy ? "Sending…" : "Request cash offer"}
      </button>
    </form>
  );
}
