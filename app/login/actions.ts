"use server";

import { redirect } from "next/navigation";
import { ApiError, login as odooLogin } from "@/lib/odoo-client";
import { setSessionId } from "@/lib/session";

export type LoginState = { error: string | null };

export async function loginAction(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");

  if (!email || !password) {
    return { error: "Please enter both your email and password." };
  }

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
