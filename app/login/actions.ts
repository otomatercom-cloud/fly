"use server";

import { redirect } from "next/navigation";
import { ApiError, login as odooLogin } from "@/lib/odoo-client";
import { clearSessionId, setSessionId } from "@/lib/session";

export type LoginState = { error: string | null };

export async function loginAction(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");

  if (!email || !password) {
    return { error: "Please enter both your email and password." };
  }

  // Every login attempt starts from a clean authentication state: drop any
  // pre-existing flt_session cookie (another user's stale/leftover session
  // in this browser) before authenticating, so it can never leak into this
  // attempt and never lingers if this attempt fails. This only touches the
  // application's own session cookie — no Odoo call, no data mutation.
  await clearSessionId();

  try {
    const { sessionId } = await odooLogin(email, password);
    await setSessionId(sessionId);
  } catch (err) {
    if (err instanceof ApiError) {
      return { error: err.message };
    }
    return { error: "Something went wrong. Please try again." };
  }

  redirect("/dashboard");
}
