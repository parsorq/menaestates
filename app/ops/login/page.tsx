import Link from "next/link";
import { redirect } from "next/navigation";
import { signIn, isOpsAuthConfigured } from "@/auth/google";
import { isOpsAuthenticated } from "@/lib/ops-auth";

export const dynamic = "force-dynamic";

const ERROR_COPY: Record<string, string> = {
  config: "Ops Google auth is not configured.",
  unverified: "That Google account email is not verified.",
  AccessDenied: "Access denied.",
  OAuthCallback: "Google sign-in could not finish. Try again.",
};

function safeOpsCallback(raw: string | undefined): string {
  if (!raw || !raw.startsWith("/ops")) return "/ops/leads";
  if (raw.startsWith("//")) return "/ops/leads";
  return raw;
}

export default async function OpsLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; callbackUrl?: string }>;
}) {
  if (await isOpsAuthenticated()) {
    redirect("/ops/leads");
  }

  const params = await searchParams;
  const callbackUrl = safeOpsCallback(params.callbackUrl);
  const errorKey = params.error ? String(params.error) : "";
  const error = ERROR_COPY[errorKey] || null;
  const configured = isOpsAuthConfigured();

  return (
    <main className="me-ops">
      <div className="me-shell-narrow">
        <h1 style={{ marginTop: 0 }}>Ops login</h1>
        <p style={{ color: "var(--ink-soft)" }}>
          Google sign-in for the lead list. Allowlisted operators only. Not a full Panel.
        </p>
        {error ? <p className="me-form__error">{error}</p> : null}
        {!configured ? (
          <p className="me-form__error">
            Set AUTH_GOOGLE_ID, AUTH_GOOGLE_SECRET, and AUTH_SECRET.
          </p>
        ) : (
          <form
            action={async () => {
              "use server";
              await signIn("google", { redirectTo: callbackUrl });
            }}
          >
            <button className="me-btn me-btn--primary" type="submit">
              Continue with Google
            </button>
          </form>
        )}
        <p style={{ color: "var(--ink-soft)", fontSize: "0.9rem" }}>
          <Link href="/">Back to site</Link>
        </p>
      </div>
    </main>
  );
}
