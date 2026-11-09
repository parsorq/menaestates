import type { NextRequest } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

/** Burst + soft-dedupe policy for POST /api/leads. Tuned for real sellers, not CAPTCHA. */
export const LEAD_GUARD = {
  /** Max inserts from one IP in ipWindowMs. */
  ipMax: 8,
  ipWindowMs: 10 * 60 * 1000,
  /** Max inserts from one phone in phoneWindowMs (any address). */
  phoneMax: 5,
  phoneWindowMs: 60 * 60 * 1000,
  /** Same phone + address within this window → soft dedupe (no insert, no Resend). */
  dedupeWindowMs: 24 * 60 * 60 * 1000,
  /** How many recent rows to scan for phone norm / address match. */
  scanLimit: 80,
} as const;

export type LeadGuardDecision =
  | { allow: true }
  | {
      allow: false;
      kind: "rate_limit";
      scope: "ip" | "phone";
      retryAfterSec: number;
      message: string;
    }
  | {
      allow: false;
      kind: "duplicate";
      existingId: string;
      message: string;
    };

const RATE_LIMIT_MESSAGE =
  "Too many requests from this connection. Wait a few minutes and try again.";
const DUPLICATE_MESSAGE =
  "We already have this property on file for that phone. We will call you.";

/** Digits only; US numbers keep the last 10 when longer (leading 1). */
export function normalizePhoneDigits(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("1")) return digits.slice(1);
  return digits;
}

/** Lowercase, strip punctuation, collapse whitespace. Soft match only. */
export function normalizeAddressKey(address: string): string {
  return address
    .toLowerCase()
    .replace(/[#.,/\\-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first.slice(0, 64);
  }
  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp.slice(0, 64);
  return "unknown";
}

export function decideLeadGuard(input: {
  ipCount: number;
  phoneCount: number;
  duplicateId: string | null;
  ipMax?: number;
  phoneMax?: number;
  ipWindowMs?: number;
  phoneWindowMs?: number;
}): LeadGuardDecision {
  const ipMax = input.ipMax ?? LEAD_GUARD.ipMax;
  const phoneMax = input.phoneMax ?? LEAD_GUARD.phoneMax;
  const ipWindowMs = input.ipWindowMs ?? LEAD_GUARD.ipWindowMs;
  const phoneWindowMs = input.phoneWindowMs ?? LEAD_GUARD.phoneWindowMs;

  if (input.duplicateId) {
    return {
      allow: false,
      kind: "duplicate",
      existingId: input.duplicateId,
      message: DUPLICATE_MESSAGE,
    };
  }

  if (input.ipCount >= ipMax) {
    return {
      allow: false,
      kind: "rate_limit",
      scope: "ip",
      retryAfterSec: Math.ceil(ipWindowMs / 1000),
      message: RATE_LIMIT_MESSAGE,
    };
  }

  if (input.phoneCount >= phoneMax) {
    return {
      allow: false,
      kind: "rate_limit",
      scope: "phone",
      retryAfterSec: Math.ceil(phoneWindowMs / 1000),
      message: RATE_LIMIT_MESSAGE,
    };
  }

  return { allow: true };
}

function isoSince(windowMs: number): string {
  return new Date(Date.now() - windowMs).toISOString();
}

/**
 * Soft dedupe: same normalized phone + address inside the window.
 * Rate limits: IP count (DB) and phone count (scan of recent rows).
 * Fail open on DB errors after logging (do not brick intake).
 */
export async function evaluateLeadSubmitGuards(input: {
  ip: string;
  phone: string;
  property_address: string;
}): Promise<LeadGuardDecision> {
  if (!supabaseAdmin) {
    console.error("[lead-guards] supabaseAdmin missing; allowing submit");
    return { allow: true };
  }

  const phoneNorm = normalizePhoneDigits(input.phone);
  const addressNorm = normalizeAddressKey(input.property_address);

  if (!phoneNorm || !addressNorm) {
    return { allow: true };
  }

  const dedupeSince = isoSince(LEAD_GUARD.dedupeWindowMs);
  const phoneSince = isoSince(LEAD_GUARD.phoneWindowMs);
  const ipSince = isoSince(LEAD_GUARD.ipWindowMs);
  const scanSince =
    LEAD_GUARD.dedupeWindowMs >= LEAD_GUARD.phoneWindowMs
      ? dedupeSince
      : phoneSince;

  let ipCount = 0;
  if (input.ip !== "unknown") {
    const { count, error } = await supabaseAdmin
      .from("leads")
      .select("id", { count: "exact", head: true })
      .eq("submit_ip", input.ip)
      .gte("created_at", ipSince);

    if (error) {
      console.error("[lead-guards] ip count failed", error.message);
    } else {
      ipCount = count ?? 0;
    }
  }

  const { data: recent, error: recentError } = await supabaseAdmin
    .from("leads")
    .select("id, phone, property_address, created_at")
    .gte("created_at", scanSince)
    .order("created_at", { ascending: false })
    .limit(LEAD_GUARD.scanLimit);

  if (recentError) {
    console.error("[lead-guards] recent scan failed", recentError.message);
    return decideLeadGuard({
      ipCount,
      phoneCount: 0,
      duplicateId: null,
    });
  }

  const rows = recent ?? [];
  let duplicateId: string | null = null;
  let phoneCount = 0;
  const phoneCutoff = Date.now() - LEAD_GUARD.phoneWindowMs;
  const dedupeCutoff = Date.now() - LEAD_GUARD.dedupeWindowMs;

  for (const row of rows) {
    const rowPhone = normalizePhoneDigits(String(row.phone ?? ""));
    if (rowPhone !== phoneNorm) continue;

    const createdMs = Date.parse(String(row.created_at));
    if (!Number.isNaN(createdMs) && createdMs >= phoneCutoff) {
      phoneCount += 1;
    }

    if (
      !duplicateId &&
      !Number.isNaN(createdMs) &&
      createdMs >= dedupeCutoff &&
      normalizeAddressKey(String(row.property_address ?? "")) === addressNorm
    ) {
      duplicateId = String(row.id);
    }
  }

  return decideLeadGuard({ ipCount, phoneCount, duplicateId });
}

export function logLeadGuardDecision(
  decision: LeadGuardDecision,
  meta: { ip: string; phone: string; property_address: string }
): void {
  const base = {
    ip: meta.ip,
    phone_norm: normalizePhoneDigits(meta.phone),
    address_norm: normalizeAddressKey(meta.property_address),
  };

  if (decision.allow) {
    console.info("[api/leads] decision", { decision: "allow", ...base });
    return;
  }

  if (decision.kind === "duplicate") {
    console.info("[api/leads] decision", {
      decision: "duplicate",
      existingId: decision.existingId,
      ...base,
    });
    return;
  }

  console.info("[api/leads] decision", {
    decision: "rate_limit",
    scope: decision.scope,
    retryAfterSec: decision.retryAfterSec,
    ...base,
  });
}
