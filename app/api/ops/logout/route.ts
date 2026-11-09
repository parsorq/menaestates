import { NextResponse } from "next/server";
import { signOut } from "@/auth/google";
import { getSiteUrl } from "@/lib/site";

export async function POST() {
  await signOut({ redirect: false });
  return NextResponse.json({ success: true });
}

export async function GET() {
  await signOut({ redirectTo: new URL("/ops/login", getSiteUrl()).toString() });
}
