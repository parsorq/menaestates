import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { isOpsEmailAllowed } from "@/lib/ops-allowlist";

const OPS_SIGN_IN = "/ops/login";
const OPS_DENIED = "/ops/denied";

function isGoogleEmailVerified(value: unknown): boolean {
  return value === true || value === "true";
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: {
        params: { prompt: "select_account" },
      },
    }),
  ],
  pages: {
    signIn: OPS_SIGN_IN,
    error: OPS_SIGN_IN,
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider !== "google") return false;
      if (!isGoogleEmailVerified(profile?.email_verified)) {
        return `${OPS_SIGN_IN}?error=unverified`;
      }
      if (!isOpsEmailAllowed(user?.email)) {
        const email = encodeURIComponent((user?.email || "").trim().toLowerCase());
        return `${OPS_DENIED}?email=${email}`;
      }
      return true;
    },
    jwt({ token, account, profile }) {
      if (account) {
        if (account.provider !== "google") return null;
        if (account.providerAccountId) token.sub = account.providerAccountId;
        token.emailVerified = isGoogleEmailVerified(profile?.email_verified);
      }
      if (token.emailVerified !== true) return null;
      return token;
    },
    session({ session, token }) {
      if (token.sub) session.user.id = token.sub;
      return session;
    },
  },
  trustHost:
    process.env.AUTH_TRUST_HOST === "true" ||
    process.env.NODE_ENV === "development",
});

export function isOpsAuthConfigured(): boolean {
  return Boolean(
    process.env.AUTH_GOOGLE_ID?.trim() &&
      process.env.AUTH_GOOGLE_SECRET?.trim() &&
      process.env.AUTH_SECRET?.trim()
  );
}
