import { NextRequest, NextResponse } from "next/server";
import { verifyLeadContinueToken } from "@/lib/lead-intake";
import { getLeadConsentAt, qualifyLeadIntake } from "@/lib/leads";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const id = String(body.id ?? "").trim();
    const continue_token = String(body.continue_token ?? "").trim();
    const full_name = String(body.full_name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const motivation = String(body.motivation ?? "").trim();
    const timeline = String(body.timeline ?? "").trim();
    const occupancy = String(body.occupancy ?? "").trim();
    const notes = String(body.notes ?? "").trim();

    if (!id || !continue_token) {
      return NextResponse.json({ error: "Missing continue token." }, { status: 400 });
    }
    if (!full_name || !motivation || !timeline || !occupancy) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Email looks invalid." }, { status: 400 });
    }

    const consent = await getLeadConsentAt(id);
    if ("error" in consent) {
      return NextResponse.json({ error: "Could not update your request." }, { status: 404 });
    }

    if (!verifyLeadContinueToken(id, consent.consent_call_at, continue_token)) {
      return NextResponse.json({ error: "Continue link expired. We will call you." }, { status: 403 });
    }

    const result = await qualifyLeadIntake(id, {
      full_name,
      email: email || null,
      motivation,
      timeline,
      occupancy,
      notes: notes || null,
    });
    if ("error" in result) {
      return NextResponse.json(
        { error: "Could not update your request." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id, intake_stage: "qualified" }, { status: 200 });
  } catch (error) {
    console.error("[api/leads/qualify]", error);
    return NextResponse.json({ error: "Could not update." }, { status: 500 });
  }
}
