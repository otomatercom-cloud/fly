"use server";

import { redirect } from "next/navigation";
import { logout as odooLogout } from "@/lib/odoo-client";
import { clearSessionId } from "@/lib/session";

export async function logoutAction() {
  await odooLogout().catch(() => {});
  await clearSessionId();
  redirect("/login");
}
