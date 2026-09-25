"use server";

import { updateProfile, ApiError } from "@/lib/odoo-client";
import { revalidatePath } from "next/cache";

export interface ProfileActionState {
  error: string | null;
  success: boolean;
}

export async function updateProfileAction(
  _prevState: ProfileActionState,
  formData: FormData
): Promise<ProfileActionState> {
  const patch = {
    phone: String(formData.get("phone") || ""),
    street: String(formData.get("street") || ""),
    city: String(formData.get("city") || ""),
    emergency_contact_name: String(formData.get("emergency_contact_name") || ""),
    emergency_contact_phone: String(formData.get("emergency_contact_phone") || ""),
  };

  try {
    await updateProfile(patch);
  } catch (err) {
    if (err instanceof ApiError) {
      return { error: err.message, success: false };
    }
    return { error: "Something went wrong. Please try again.", success: false };
  }

  revalidatePath("/profile");
  return { error: null, success: true };
}
