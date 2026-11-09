import { NextResponse } from "next/server";
import { auth, isOpsAuthConfigured } from "@/auth/google";

const OPS_LOGIN = "/ops/login";

export const proxy = auth((req) => {
  const pathname = req.nextUrl.pathname;
  const isOps =
    pathname === "/ops" ||
    pathname.startsWith("/ops/") ||
    pathname.startsWith("/api/ops/");

  if (!isOps) return NextResponse.next();

  if (pathname === "/ops/login" || pathname === "/ops/denied") {
    return NextResponse.next();
  }

  if (!isOpsAuthConfigured()) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = OPS_LOGIN;
    redirectUrl.searchParams.set("error", "config");
    return NextResponse.redirect(redirectUrl);
  }

  if (!req.auth) {
    if (pathname.startsWith("/api/ops/")) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = OPS_LOGIN;
    redirectUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/ops", "/ops/:path*", "/api/ops/:path*"],
};
