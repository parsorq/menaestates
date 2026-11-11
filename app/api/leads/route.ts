import { NextRequest, NextResponse } from "next/server";
import { CONSENT_CALL_TEXT, CONSENT_TEXT_VERSION } from "@/lib/consent";
import { LEAD_COUNTIES } from "@/lib/counties";
import { PENDING_QUALIFY, type IntakeStage } from "@/lib/lead-intake";
import {
  evaluateLeadSubmitGuards,
  getClientIp,
  logLeadGuardDecision,
} from "@/lib/lead-guards";
import { insertLead } from "@/lib/leads";
import { sendLeadAlert } from "@/lib/notify";
import { pickUtmFromBody } from "@/lib/utm";

const COUNTIES = new Set<string>(LEAD_COUNTIES);

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Record<string, unknown>;

    const phone = String(body.phone ?? "").trim();
    const email = String(body.email ?? "").trim();
    const property_address = String(body.property_address ?? "").trim();
    const county = String(body.county ?? "").trim();
    const consent_call = Boolean(body.consent_call);
    const source = String(body.source ?? "web").trim() || "web";
    const landing_path = String(body.landing_path ?? "/").trim() || "/";
    const notes = String(body.notes ?? "").trim();
    const utm = pickUtmFromBody(body.utm);

    const full_name = String(body.full_name ?? "").trim();
    const motivation =
      String(body.motivation ?? "").trim() || PENDING_QUALIFY;
    const timeline = String(body.timeline ?? "").trim() || PENDING_QUALIFY;
    const occupancy = String(body.occupancy ?? "").trim() || PENDING_QUALIFY;

    if (!phone || !full_name || !property_address) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }
    if (county && !COUNTIES.has(county)) {
      return NextResponse.json(
        {
          error:
            "We buy in Alameda and San Joaquin only (Oakland, San Leandro, Hayward, Castro Valley, San Lorenzo, Newark, Tracy).",
        },
        { status: 400 }
      );
    }
    if (!consent_call) {
      return NextResponse.json({ error: "Call consent is required." }, { status: 400 });
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Email looks invalid." }, { status: 400 });
    }

    const submit_ip = getClientIp(request);
    const guard = await evaluateLeadSubmitGuards({
      ip: submit_ip,
      phone,
      property_address,
    });
    logLeadGuardDecision(guard, { ip: submit_ip, phone, property_address });

    if (!guard.allow) {
      if (guard.kind === "duplicate") {
        // Soft dedupe: clear seller message; no insert; no Resend.
        return NextResponse.json({ error: guard.message }, { status: 409 });
      }
      return NextResponse.json(
        { error: guard.message },
        {
          status: 429,
          headers: { "Retry-After": String(guard.retryAfterSec) },
        }
      );
    }

    const consent_call_at = new Date().toISOString();
    const factsComplete =
      motivation !== PENDING_QUALIFY &&
      timeline !== PENDING_QUALIFY &&
      occupancy !== PENDING_QUALIFY;
    const intake_stage: IntakeStage = factsComplete ? "qualified" : "contact";
    const payload = {
      full_name,
      phone,
      email: email || null,
      property_address,
      county: county || null,
      motivation,
      timeline,
      occupancy,
      consent_call: true,
      consent_call_at,
      consent_text_version: CONSENT_TEXT_VERSION,
      consent_text: CONSENT_CALL_TEXT,
      source,
      landing_path,
      utm,
      notes: notes || null,
      submit_ip,
      intake_stage,
    };

    const leadResult = await insertLead(payload);
    if ("error" in leadResult) {
      return NextResponse.json(
        { error: "Could not save your request." },
        { status: 500 },
      );
    }

    const alert = await sendLeadAlert(leadResult.id, payload);
    if ("error" in alert) {
      console.error("[api/leads] alert failed after insert", alert.error);
    }

    return NextResponse.json(
      {
        success: true,
        id: leadResult.id,
        intake_stage,
        consent_text: CONSENT_CALL_TEXT,
        consent_text_version: CONSENT_TEXT_VERSION,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[api/leads]", error);
    return NextResponse.json({ error: "Could not submit." }, { status: 500 });
  }
}
