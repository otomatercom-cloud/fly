"use server";

import { redirect } from "next/navigation";
import { ApiError, createVisa, uploadVisaDocument } from "@/lib/odoo-client";

export type VisaFormState = { error: string | null };

export async function createVisaAction(_prevState: VisaFormState, formData: FormData): Promise<VisaFormState> {
  const passport_id = Number(formData.get("passport_id") || 0);
  const country_code = String(formData.get("country_code") || "").trim();
  const visa_type = String(formData.get("visa_type") || "").trim();
  const visa_number = String(formData.get("visa_number") || "").trim();
  const issue_date = String(formData.get("issue_date") || "").trim();
  const expiry_date = String(formData.get("expiry_date") || "").trim();
  const renewal_date = String(formData.get("renewal_date") || "").trim();
  const entry_type = String(formData.get("entry_type") || "single") as "single" | "double" | "multiple";
  const number_of_entries = Number(formData.get("number_of_entries") || 1);
  const notes = String(formData.get("notes") || "").trim();
  const file = formData.get("upload") as File | null;

  if (!passport_id || !country_code || !visa_type) {
    return { error: "Passport, country and visa type are required." };
  }

  let visaId: number;
  try {
    const visa = await createVisa({
      passport_id,
      country_code,
      visa_type,
      visa_number: visa_number || undefined,
      issue_date: issue_date || undefined,
      expiry_date: expiry_date || undefined,
      renewal_date: renewal_date || undefined,
      entry_type,
      number_of_entries: number_of_entries || 1,
      notes: notes || undefined,
    });
    visaId = visa.id;
  } catch (err) {
    if (err instanceof ApiError) return { error: err.message };
    return { error: "Something went wrong. Please try again." };
  }

  // Same rationale as passport creation: the visa application is already
  // saved, so a failed document upload shouldn't look like the whole
  // submission failed.
  if (file && file.size > 0) {
    try {
      const uploadData = new FormData();
      uploadData.append("upload", file);
      await uploadVisaDocument(visaId, uploadData);
    } catch {
      // Intentionally swallowed — see comment above.
    }
  }

  redirect("/visa");
}
