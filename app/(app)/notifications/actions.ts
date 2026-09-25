"use server";

import { markNotificationRead } from "@/lib/odoo-client";
import { revalidatePath } from "next/cache";

export async function markNotificationReadAction(id: number) {
  await markNotificationRead(id);
  revalidatePath("/notifications");
  revalidatePath("/dashboard");
}
