import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE_NAME } from "@/lib/config";

const PUBLIC_PATHS = ["/login", "/signup"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasSession = Boolean(request.cookies.get(SESSION_COOKIE_NAME)?.value);
  const isPublic = PUBLIC_PATHS.some((p) => pathname.startsWith(p));

  if (!hasSession && !isPublic) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  // Deliberately NOT redirecting /login or /signup away just because a
  // flt_session cookie is present: the middleware can only see that a
  // cookie exists, not whether it's still valid at Odoo or belongs to
  // whoever is sitting at the browser right now. A stale (or another
  // user's still-live) cookie must never bounce a fresh visitor straight
  // into /dashboard without going through authentication — that was the
  // multi-user session leak. Private routes stay fully protected by the
  // check above; only the auto-skip-past-login convenience is removed.

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
