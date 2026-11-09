import { auth, isOpsAuthConfigured } from "@/auth/google";
import { isOpsEmailAllowed } from "@/lib/ops-allowlist";

export type OpsSession = {
  email: string;
  userId: string;
};

/**
 * True when Auth.js has a Google session whose email is on the ops allowlist.
 * Shared OPS_PASSWORD is demoted and no longer admits anyone.
 */
export async function getOpsSession(): Promise<OpsSession | null> {
  if (!isOpsAuthConfigured()) return null;
  const session = await auth();
  const email = session?.user?.email?.trim().toLowerCase() || "";
  const userId = session?.user?.id || "";
  if (!email || !userId) return null;
  if (!isOpsEmailAllowed(email)) return null;
  return { email, userId };
}

export async function isOpsAuthenticated(): Promise<boolean> {
  return (await getOpsSession()) !== null;
}

export async function getOpsActorLabel(): Promise<string> {
  const session = await getOpsSession();
  return session?.email || "ops";
}
