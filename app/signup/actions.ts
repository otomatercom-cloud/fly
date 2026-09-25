"use server";

import { redirect } from "next/navigation";
import { ApiError, signup as odooSignup } from "@/lib/odoo-client";
import { setSessionId } from "@/lib/session";

export type SignupState = { error: string | null };

export async function signupAction(_prevState: SignupState, formData: FormData): Promise<SignupState> {
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const password = String(formData.get("password") || "");
  const confirmPassword = String(formData.get("confirmPassword") || "");

  if (!name || !email || !password) {
    return { error: "Please fill in your name, email and password." };
  }
  if (password.length < 8) {
    return { error: "Password must be at least 8 characters." };
  }
  if (password !== confirmPassword) {
    return { error: "Passwords don't match." };
  }

  try {
    const { sessionId } = await odooSignup(name, email, password, phone);
    await setSessionId(sessionId);
  } catch (err) {
    if (err instanceof ApiError && err.code === "signup_created_needs_login") {
      redirect("/login?created=1");
    }
    if (err instanceof ApiError) {
      return { error: err.message };
    }
    return { error: "Something went wrong. Please try again." };
  }

  redirect("/dashboard");
}
