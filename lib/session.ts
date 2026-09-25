import "server-only";
import { cookies } from "next/headers";
import { SESSION_COOKIE_NAME } from "./config";

/** Reads the Odoo session_id this server is holding on the visitor's
 * behalf. The browser never sees this value — only Next.js's own httpOnly
 * cookie, which stores it. */
export async function getSessionId(): Promise<string | null> {
  const store = await cookies();
  return store.get(SESSION_COOKIE_NAME)?.value ?? null;
}

export async function setSessionId(sessionId: string) {
  const store = await cookies();
  store.set(SESSION_COOKIE_NAME, sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days, matches Odoo's own default session lifetime
  });
}

export async function clearSessionId() {
  const store = await cookies();
  store.delete(SESSION_COOKIE_NAME);
}
