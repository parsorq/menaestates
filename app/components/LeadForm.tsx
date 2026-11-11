"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { GuestProofNearAsk } from "@/app/components/GuestProofNearAsk";
import { CONSENT_CALL_TEXT } from "@/lib/consent";
import { GUEST_PROOF } from "@/lib/guest-proof";
import { readUtmFromSearchParams } from "@/lib/utm";

type FormState = {
  full_name: string;
  phone: string;
  property_address: string;
  motivation: string;
  notes: string;
  consent_call: boolean;
};

export type LeadFormProps = {
  /** Ops attribution. Defaults to `web`. */
  source?: string;
  /** Explicit landing path. Defaults to `window.location.pathname`. */
  landingPath?: string;
  /** Silent county when the lander already knows it. Not shown on the form. */
  defaultCounty?: string;
  defaultMotivation?: string;
  /** Focus Full name on mount (dedicated ask page). */
  autoFocusName?: boolean;
};

function readUtm(): Record<string, string> {
  if (typeof window === "undefined") return {};
  return readUtmFromSearchParams(new URLSearchParams(window.location.search));
}

const PRIVACY_LINE = "We do not sell your information to other buyers.";

export function LeadForm({
  source = "web",
  landingPath,
  defaultCounty = "",
  defaultMotivation = "",
  autoFocusName = false,
}: LeadFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<FormState>({
    full_name: "",
    phone: "",
    property_address: "",
    motivation: defaultMotivation,
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
          full_name: form.full_name,
          phone: form.phone,
          property_address: form.property_address,
          county: defaultCounty,
          motivation: form.motivation,
          notes: form.notes,
          consent_call: form.consent_call,
          source,
          landing_path: resolvedLandingPath,
          utm: readUtm(),
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
      };
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
    <div className="me-offer-ask" id="offer-form">
      <div className="me-offer-ask__split">
        <div className="me-offer-ask__context">
          <GuestProofNearAsk />

          <div className="me-offer-next" aria-labelledby="offer-next-title">
            <h3 id="offer-next-title" className="me-offer-next__title">
              What happens next
            </h3>
            <ol className="me-offer-next__steps">
              <li>
                <strong>We call you</strong>
                <p>
                  Monday to Friday, 9:00 to 17:00 Pacific Time. Same day when your
                  request lands in that window. We walk numbers, condition, and
                  your questions before anything moves forward.
                </p>
              </li>
              <li>
                <strong>We are the buyer</strong>
                <p>
                  We buy for cash. We are not listing your house. On the call we
                  cover numbers, condition, timing, and hard parts like title.
                </p>
              </li>
              <li>
                <strong>Cities we&apos;ve bought in</strong>
                <p>
                  {GUEST_PROOF.buyCitiesLabel} are the core. Outside them, we
                  still buy when the house and the numbers fit.
                </p>
              </li>
            </ol>
          </div>
        </div>

        <form
          className="me-form me-offer-ask__form"
          onSubmit={onSubmit}
          noValidate
        >
          <p className="me-form__step-label">Request a call</p>

          <div className="me-field">
            <label htmlFor="full_name">Full name</label>
            <input
              id="full_name"
              name="full_name"
              autoComplete="name"
              required
              autoFocus={autoFocusName}
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

          <div className="me-field">
            <label htmlFor="motivation">Why sell (optional)</label>
            <select
              id="motivation"
              name="motivation"
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

          <div className="me-form__commit">
            <button
              className="me-btn me-btn--primary"
              type="submit"
              disabled={busy}
            >
              {busy ? "Sending…" : "Request a call"}
            </button>
            <p className="me-form__privacy">{PRIVACY_LINE}</p>
          </div>
        </form>
      </div>
    </div>
  );
}
