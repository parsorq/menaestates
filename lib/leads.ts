import { supabaseAdmin } from "@/lib/supabase";
import {
  handoffPacketMissingLabels,
  isHandoffPacketComplete,
  isHttpUrl,
} from "@/lib/handoff-packet";
import type { IntakeStage } from "@/lib/lead-intake";
import { isLeadStatus, type LeadStatus } from "@/lib/lead-status";

export type InsertLeadInput = {
  full_name: string;
  phone: string;
  email?: string | null;
  property_address: string;
  county?: string | null;
  motivation: string;
  timeline: string;
  occupancy: string;
  consent_call: boolean;
  consent_call_at: string;
  consent_text_version: string;
  consent_text: string;
  source: string;
  landing_path: string;
  utm?: Record<string, string>;
  notes?: string | null;
  /** Client IP at submit (abuse guards). Not shown on ops. */
  submit_ip?: string | null;
  /** contact = short first ask; qualified = sell facts present. */
  intake_stage?: IntakeStage;
};

export type LeadRow = {
  id: string;
  created_at: string;
  updated_at: string;
  full_name: string;
  phone: string;
  email: string | null;
  property_address: string;
  county: string | null;
  motivation: string;
  timeline: string;
  occupancy: string;
  consent_call: boolean;
  consent_call_at: string | null;
  consent_text_version: string;
  consent_text: string | null;
  source: string;
  landing_path: string;
  status: LeadStatus;
  utm: Record<string, unknown>;
  notes: string | null;
  next_action_at: string | null;
  numbers_discussed: string | null;
  access_photos_notes: string | null;
  contract_file_link: string | null;
  intake_stage: IntakeStage;
};

export type LeadEventRow = {
  id: string;
  lead_id: string;
  created_at: string;
  kind: "status_change";
  from_status: LeadStatus | null;
  to_status: LeadStatus;
  actor_label: string;
};

const LEAD_EVENT_SELECT =
  "id, lead_id, created_at, kind, from_status, to_status, actor_label";

export type ListLeadsFilters = {
  status?: LeadStatus;
  county?: string;
  /** Name, phone, or address fragment (case-insensitive). */
  q?: string;
  limit?: number;
};

/** Strip PostgREST `or()` breakers; cap length. Empty → null. */
export function sanitizeLeadSearchQuery(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  const cleaned = raw
    .trim()
    .slice(0, 80)
    .replace(/[,.()]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return cleaned || null;
}

function escapeIlikePattern(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/%/g, "\\%").replace(/_/g, "\\_");
}

const LEAD_SELECT =
  "id, created_at, updated_at, full_name, phone, email, property_address, county, motivation, timeline, occupancy, consent_call, consent_call_at, consent_text_version, consent_text, source, landing_path, status, utm, notes, next_action_at, numbers_discussed, access_photos_notes, contract_file_link, intake_stage";

export async function insertLead(
  input: InsertLeadInput
): Promise<{ id: string } | { error: string }> {
  if (!supabaseAdmin) return { error: "Leads not configured." };

  const full_name = input.full_name.trim();
  const phone = input.phone.trim();
  const property_address = input.property_address.trim();
  const county = (input.county ?? "").trim() || null;
  const motivation = input.motivation.trim();
  const timeline = input.timeline.trim();
  const occupancy = input.occupancy.trim();
  const intake_stage: IntakeStage = input.intake_stage ?? "qualified";

  if (!full_name || !phone || !property_address) {
    return { error: "Missing required fields." };
  }
  if (!motivation || !timeline || !occupancy) {
    return { error: "Missing required fields." };
  }
  if (!input.consent_call) {
    return { error: "Call consent is required." };
  }
  const consent_text = input.consent_text.trim();
  if (!consent_text || !input.consent_text_version.trim()) {
    return { error: "Call consent text and version are required." };
  }

  const row = {
    full_name,
    phone,
    email: (input.email ?? "").trim() || null,
    property_address,
    county,
    motivation,
    timeline,
    occupancy,
    consent_call: true,
    consent_call_at: input.consent_call_at,
    consent_text_version: input.consent_text_version.trim(),
    consent_text,
    source: input.source.trim() || "web",
    landing_path: input.landing_path.trim() || "/",
    status: "new" as LeadStatus,
    utm: input.utm ?? {},
    notes: (input.notes ?? "").trim() || null,
    submit_ip: (input.submit_ip ?? "").trim() || null,
    intake_stage,
  };

  const { data, error } = await supabaseAdmin
    .from("leads")
    .insert(row)
    .select("id")
    .single();

  if (error) {
    console.error("[leads] insert failed", error.message, error.code);
    return { error: error.message };
  }
  return { id: data.id as string };
}

export type QualifyLeadInput = {
  full_name: string;
  email?: string | null;
  motivation: string;
  timeline: string;
  occupancy: string;
  notes?: string | null;
};

/** Step 2 after contact insert. Does not change phone, address, or consent. */
export async function qualifyLeadIntake(
  leadId: string,
  input: QualifyLeadInput
): Promise<{ ok: true } | { error: string }> {
  if (!supabaseAdmin) return { error: "Leads not configured." };

  const full_name = input.full_name.trim();
  const motivation = input.motivation.trim();
  const timeline = input.timeline.trim();
  const occupancy = input.occupancy.trim();
  if (!full_name || !motivation || !timeline || !occupancy) {
    return { error: "Missing required fields." };
  }

  const { error } = await supabaseAdmin
    .from("leads")
    .update({
      full_name,
      email: (input.email ?? "").trim() || null,
      motivation,
      timeline,
      occupancy,
      notes: (input.notes ?? "").trim() || null,
      intake_stage: "qualified" as IntakeStage,
      updated_at: new Date().toISOString(),
    })
    .eq("id", leadId);

  if (error) {
    console.error("[leads] qualify failed", error.message, error.code);
    return { error: error.message };
  }
  return { ok: true };
}

export async function getLeadConsentAt(
  leadId: string
): Promise<{ consent_call_at: string } | { error: string }> {
  if (!supabaseAdmin) return { error: "Leads not configured." };
  const { data, error } = await supabaseAdmin
    .from("leads")
    .select("consent_call_at")
    .eq("id", leadId)
    .maybeSingle();
  if (error) {
    console.error("[leads] consent lookup failed", error.message);
    return { error: error.message };
  }
  if (!data?.consent_call_at) return { error: "Lead not found." };
  return { consent_call_at: String(data.consent_call_at) };
}

export async function listLeads(filters: ListLeadsFilters = {}): Promise<LeadRow[]> {
  if (!supabaseAdmin) return [];

  const limit = Math.min(filters.limit ?? 200, 500);
  let query = supabaseAdmin
    .from("leads")
    .select(LEAD_SELECT)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (filters.status) {
    query = query.eq("status", filters.status);
  }
  if (filters.county) {
    query = query.eq("county", filters.county);
  }

  const q = sanitizeLeadSearchQuery(filters.q);
  if (q) {
    const pattern = `"%${escapeIlikePattern(q).replace(/"/g, "")}%"`;
    query = query.or(
      `full_name.ilike.${pattern},phone.ilike.${pattern},property_address.ilike.${pattern}`
    );
  }

  const { data, error } = await query;

  if (error) {
    console.error("[leads] list failed", error.message);
    return [];
  }
  return (data ?? []) as LeadRow[];
}

export async function getLeadById(id: string): Promise<LeadRow | null> {
  if (!supabaseAdmin) return null;

  const { data, error } = await supabaseAdmin
    .from("leads")
    .select(LEAD_SELECT)
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("[leads] get failed", error.message);
    return null;
  }
  return (data as LeadRow | null) ?? null;
}

export async function listLeadEvents(
  leadId: string,
  options: { limit?: number } = {}
): Promise<LeadEventRow[]> {
  if (!supabaseAdmin) return [];

  const limit = Math.min(options.limit ?? 20, 100);
  const { data, error } = await supabaseAdmin
    .from("lead_events")
    .select(LEAD_EVENT_SELECT)
    .eq("lead_id", leadId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("[leads] list events failed", error.message);
    return [];
  }
  return (data ?? []) as LeadEventRow[];
}

export async function updateLeadStatus(
  id: string,
  status: LeadStatus,
  options: { actorLabel?: string } = {}
): Promise<{ ok: true; previous: LeadStatus; lead: LeadRow } | { error: string }> {
  if (!supabaseAdmin) return { error: "Leads not configured." };
  if (!isLeadStatus(status)) return { error: "Invalid status." };

  const existing = await getLeadById(id);
  if (!existing) return { error: "Lead not found." };

  if (status === "mena_handoff" && !isHandoffPacketComplete(existing)) {
    const missing = handoffPacketMissingLabels(existing).join(", ");
    return {
      error: `Mena handoff packet incomplete. Fill: ${missing}.`,
    };
  }

  const previous = existing.status;
  if (previous === status) {
    return { ok: true, previous, lead: existing };
  }

  const { data, error } = await supabaseAdmin
    .from("leads")
    .update({ status })
    .eq("id", id)
    .select(LEAD_SELECT)
    .maybeSingle();

  if (error) {
    console.error("[leads] status update failed", error.message);
    return { error: "Update failed." };
  }
  if (!data) return { error: "Lead not found." };

  const actor_label = (options.actorLabel ?? "ops").trim() || "ops";
  const { error: eventError } = await supabaseAdmin.from("lead_events").insert({
    lead_id: id,
    kind: "status_change",
    from_status: previous,
    to_status: status,
    actor_label,
  });

  if (eventError) {
    // Keep status and history aligned without a DB transaction: roll status back.
    console.error("[leads] status event insert failed", eventError.message);
    const { error: rollbackError } = await supabaseAdmin
      .from("leads")
      .update({ status: previous })
      .eq("id", id);
    if (rollbackError) {
      console.error("[leads] status rollback failed", rollbackError.message);
      return { error: "Status saved but history write failed." };
    }
    return { error: "Update failed." };
  }

  return { ok: true, previous, lead: data as LeadRow };
}

export type UpdateLeadCrmInput = {
  notes?: string | null;
  next_action_at?: string | null;
  motivation?: string | null;
  timeline?: string | null;
  numbers_discussed?: string | null;
  access_photos_notes?: string | null;
  contract_file_link?: string | null;
};

function trimTextField(
  raw: unknown,
  label: string,
  max: number
): { value: string | null } | { error: string } {
  if (raw == null) return { value: null };
  if (typeof raw !== "string") return { error: `Invalid ${label}.` };
  const trimmed = raw.trim();
  if (trimmed.length > max) return { error: `${label} too long.` };
  return { value: trimmed || null };
}

export async function updateLeadCrm(
  id: string,
  input: UpdateLeadCrmInput
): Promise<{ ok: true } | { error: string }> {
  if (!supabaseAdmin) return { error: "Leads not configured." };

  const patch: Record<string, string | null> = {};

  if ("notes" in input) {
    const result = trimTextField(input.notes, "Notes", 8000);
    if ("error" in result) return result;
    patch.notes = result.value;
  }

  if ("next_action_at" in input) {
    const raw = input.next_action_at;
    if (raw == null || raw === "") {
      patch.next_action_at = null;
    } else if (typeof raw !== "string") {
      return { error: "Invalid next action time." };
    } else {
      const parsed = new Date(raw);
      if (Number.isNaN(parsed.getTime())) {
        return { error: "Invalid next action time." };
      }
      patch.next_action_at = parsed.toISOString();
    }
  }

  if ("motivation" in input) {
    const result = trimTextField(input.motivation, "Motivation", 2000);
    if ("error" in result) return result;
    if (!result.value) return { error: "Motivation is required." };
    patch.motivation = result.value;
  }

  if ("timeline" in input) {
    const result = trimTextField(input.timeline, "Seller timeline", 2000);
    if ("error" in result) return result;
    if (!result.value) return { error: "Seller timeline is required." };
    patch.timeline = result.value;
  }

  if ("numbers_discussed" in input) {
    const result = trimTextField(input.numbers_discussed, "Numbers discussed", 4000);
    if ("error" in result) return result;
    patch.numbers_discussed = result.value;
  }

  if ("access_photos_notes" in input) {
    const result = trimTextField(input.access_photos_notes, "Access/photos notes", 4000);
    if ("error" in result) return result;
    patch.access_photos_notes = result.value;
  }

  if ("contract_file_link" in input) {
    const result = trimTextField(input.contract_file_link, "Contract file link", 2000);
    if ("error" in result) return result;
    if (result.value && !isHttpUrl(result.value)) {
      return { error: "Contract file link must be an http(s) URL." };
    }
    patch.contract_file_link = result.value;
  }

  if (Object.keys(patch).length === 0) {
    return { error: "Nothing to update." };
  }

  const { data, error } = await supabaseAdmin
    .from("leads")
    .update(patch)
    .eq("id", id)
    .select("id")
    .maybeSingle();

  if (error) {
    console.error("[leads] CRM update failed", error.message);
    return { error: "Update failed." };
  }
  if (!data) return { error: "Lead not found." };
  return { ok: true };
}
