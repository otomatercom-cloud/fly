"use server";

import { requestCancellation, ApiError } from "@/lib/odoo-client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export interface CancelActionState {
  error: string | null;
}

export async function submitCancellationAction(
  _prevState: CancelActionState,
  formData: FormData
): Promise<CancelActionState> {
  const bookingId = Number(formData.get("bookingId"));
  const reason = String(formData.get("reason") || "");
  const confirm = formData.get("confirm") === "on";

  if (!confirm) {
    return { error: "Please confirm you understand the cancellation policy before submitting." };
  }

  let requestId: number;
  try {
    const cancellationRequest = await requestCancellation(bookingId, reason, confirm);
    requestId = cancellationRequest.id;
  } catch (err) {
    if (err instanceof ApiError) {
      return { error: err.message };
    }
    return { error: "Something went wrong. Please try again." };
  }

  revalidatePath("/flights");
  revalidatePath(`/flights/${bookingId}`);
  redirect(`/cancellations/${requestId}`);
}
