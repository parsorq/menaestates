import { NextRequest, NextResponse } from "next/server";
import { isOpsAuthenticated } from "@/lib/ops-auth";
import { updateLeadCrm } from "@/lib/leads";

function readOptionalString(
  body: Record<string, unknown>,
  key: string
): { ok: true; present: false } | { ok: true; present: true; value: string | null } | { ok: false; error: string } {
  if (!(key in body)) return { ok: true, present: false };
  const raw = body[key];
  if (raw == null || raw === "") return { ok: true, present: true, value: null };
  if (typeof raw !== "string") return { ok: false, error: `Invalid ${key}.` };
  return { ok: true, present: true, value: raw };
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  if (!(await isOpsAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id } = await context.params;
  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;

  const input: {
    notes?: string | null;
    next_action_at?: string | null;
    motivation?: string | null;
    timeline?: string | null;
    numbers_discussed?: string | null;
    access_photos_notes?: string | null;
    contract_file_link?: string | null;
  } = {};

  const notes = readOptionalString(body, "notes");
  if (!notes.ok) return NextResponse.json({ error: notes.error }, { status: 400 });
  if (notes.present) input.notes = notes.value;

  if ("next_action_at" in body) {
    if (body.next_action_at == null || body.next_action_at === "") {
      input.next_action_at = null;
    } else if (typeof body.next_action_at === "string") {
      input.next_action_at = body.next_action_at;
    } else {
      return NextResponse.json({ error: "Invalid next action time." }, { status: 400 });
    }
  }

  for (const key of [
    "motivation",
    "timeline",
    "numbers_discussed",
    "access_photos_notes",
    "contract_file_link",
  ] as const) {
    const field = readOptionalString(body, key);
    if (!field.ok) return NextResponse.json({ error: field.error }, { status: 400 });
    if (field.present) input[key] = field.value;
  }

  if (Object.keys(input).length === 0) {
    return NextResponse.json({ error: "Nothing to update." }, { status: 400 });
  }

  const result = await updateLeadCrm(id, input);
  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }
  return NextResponse.json({ success: true });
}
