"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui";
import { createPassportAction, type PassportFormState } from "@/app/(app)/passport/new/actions";
import type { Country } from "@/types/api";

const initialState: PassportFormState = { error: null };

const inputClass =
  "w-full min-h-11 rounded-lg border border-border px-3.5 text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary";

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-text-primary mb-1.5">
        {label}
      </label>
      <input id={name} name={name} type={type} required={required} className={inputClass} />
    </div>
  );
}

export function PassportForm({ countries }: { countries: Country[] }) {
  const [state, formAction, pending] = useActionState(createPassportAction, initialState);

  return (
    <form action={formAction} className="space-y-5 max-w-lg">
      {state.error && (
        <div className="rounded-lg bg-red-50 border border-danger/30 px-3.5 py-2.5 text-sm text-danger">
          {state.error}
        </div>
      )}

      <Field label="Passport Number" name="passport_number" required />
      <Field label="Full Name (as on Passport)" name="full_name" required />
      <Field label="Date of Birth" name="date_of_birth" type="date" />

      <div>
        <label htmlFor="nationality_code" className="block text-sm font-medium text-text-primary mb-1.5">
          Nationality
        </label>
        <select id="nationality_code" name="nationality_code" className={inputClass}>
          <option value="">Select country</option>
          {countries.map((c) => (
            <option key={c.code} value={c.code}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Issue Date" name="issue_date" type="date" required />
        <Field label="Expiry Date" name="expiry_date" type="date" required />
      </div>

      <Field label="Place of Issue" name="place_of_issue" />

      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-text-primary mb-1.5">
          Notes
        </label>
        <textarea id="notes" name="notes" rows={3} className="w-full rounded-lg border border-border px-3.5 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary" />
      </div>

      <div>
        <label htmlFor="upload" className="block text-sm font-medium text-text-primary mb-1.5">
          Passport Copy (optional)
        </label>
        <input id="upload" name="upload" type="file" accept="image/*,.pdf" className="w-full text-sm text-text-secondary" />
      </div>

      <Button type="submit" loading={pending} fullWidth>
        Save Passport
      </Button>
      <p className="text-xs text-text-secondary text-center">
        Your submission is reviewed by our team before it&apos;s marked valid.
      </p>
    </form>
  );
}
