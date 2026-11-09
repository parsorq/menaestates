import Link from "next/link";
import { signOut } from "@/auth/google";

export const dynamic = "force-dynamic";

export default async function OpsDeniedPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const params = await searchParams;
  const email = params.email ? String(params.email) : "";

  return (
    <main className="me-ops">
      <div className="me-shell-narrow">
        <h1 style={{ marginTop: 0 }}>Access denied</h1>
        <p style={{ color: "var(--ink-soft)" }}>
          {email
            ? `${email} signed in with Google but is not on the ops allowlist.`
            : "That Google account is not on the ops allowlist."}{" "}
          Studio maintenance is{" "}
          <span style={{ color: "var(--ink)" }}>parsorq@gmail.com</span>.
        </p>
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/ops/login" });
          }}
        >
          <button className="me-btn me-btn--primary" type="submit">
            Try another Google account
          </button>
        </form>
        <p>
          <Link className="me-btn me-btn--ghost" href="/">
            Back to site
          </Link>
        </p>
      </div>
    </main>
  );
}
