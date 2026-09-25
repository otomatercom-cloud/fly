"use server";

import { redirect } from "next/navigation";
import { ApiError, createPassport, uploadPassportDocument } from "@/lib/odoo-client";

export type PassportFormState = { error: string | null };

export async function createPassportAction(
  _prevState: PassportFormState,
  formData: FormData
): Promise<PassportFormState> {
  const passport_number = String(formData.get("passport_number") || "").trim();
  const full_name = String(formData.get("full_name") || "").trim();
  const issue_date = String(formData.get("issue_date") || "").trim();
  const expiry_date = String(formData.get("expiry_date") || "").trim();
  const date_of_birth = String(formData.get("date_of_birth") || "").trim();
  const nationality_code = String(formData.get("nationality_code") || "").trim();
  const place_of_issue = String(formData.get("place_of_issue") || "").trim();
  const notes = String(formData.get("notes") || "").trim();
  const file = formData.get("upload") as File | null;

  if (!passport_number || !full_name || !issue_date || !expiry_date) {
    return { error: "Passport number, full name, issue date and expiry date are required." };
  }

  let passportId: number;
  try {
    const passport = await createPassport({
      passport_number,
      full_name,
      issue_date,
      expiry_date,
      date_of_birth: date_of_birth || undefined,
      nationality_code: nationality_code || undefined,
      place_of_issue: place_of_issue || undefined,
      notes: notes || undefined,
    });
    passportId = passport.id;
  } catch (err) {
    if (err instanceof ApiError) return { error: err.message };
    return { error: "Something went wrong. Please try again." };
  }

  // The passport record is saved at this point regardless of what happens
  // next — a failed copy upload shouldn't strand the user on this form or
  // make it look like nothing was saved. They can add/retry the copy from
  // the passport list afterward.
  if (file && file.size > 0) {
    try {
      const uploadData = new FormData();
      uploadData.append("upload", file);
      await uploadPassportDocument(passportId, uploadData);
    } catch {
      // Intentionally swallowed — see comment above.
    }
  }

  redirect("/passport");
}
