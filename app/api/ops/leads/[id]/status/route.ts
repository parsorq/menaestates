import { NextRequest, NextResponse } from "next/server";
import { getOpsActorLabel, isOpsAuthenticated } from "@/lib/ops-auth";
import { isLeadStatus } from "@/lib/lead-status";
import { updateLeadStatus } from "@/lib/leads";
import { sendMenaHandoffAlert } from "@/lib/notify";

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  if (!(await isOpsAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id } = await context.params;
  const body = (await request.json().catch(() => ({}))) as { status?: string };
  const status = body.status;

  if (!isLeadStatus(status)) {
    return NextResponse.json({ error: "Invalid status." }, { status: 400 });
  }

  const actorLabel = await getOpsActorLabel();
  const result = await updateLeadStatus(id, status, { actorLabel });
  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  let menaNotify: "sent" | "skipped" | "failed" = "skipped";
  if (status === "under_contract" && result.previous !== "under_contract") {
    const notify = await sendMenaHandoffAlert(result.lead);
    if ("error" in notify) {
      console.error("[ops/status] Mena notify failed", notify.error);
      menaNotify = "failed";
    } else {
      menaNotify = "sent";
    }
  }

  return NextResponse.json({ success: true, mena_notify: menaNotify });
}
