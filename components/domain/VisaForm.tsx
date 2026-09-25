"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui";
import { createVisaAction, type VisaFormState } from "@/app/(app)/visa/new/actions";
import type { Country, Passport, VisaTypeOption } from "@/types/api";

const initialState: VisaFormState = { error: null };

const inputClass =
  "w-full min-h-11 rounded-lg border border-border px-3.5 text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary";

function Field({
  label,
  name,
  type = "text",
  required,
  defaultValue,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  defaultValue?: string | number;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-text-primary mb-1.5">
        {label}
      </label>
      <input id={name} name={name} type={type} required={required} defaultValue={defaultValue} className={inputClass} />
    </div>
  );
}

export function VisaForm({
  passports,
  countries,
  visaTypes,
}: {
  passports: Passport[];
  countries: Country[];
  visaTypes: VisaTypeOption[];
}) {
  const [state, formAction, pending] = useActionState(createVisaAction, initialState);

  return (
    <form action={formAction} className="space-y-5 max-w-lg">
      {state.error && (
        <div className="rounded-lg bg-red-50 border border-danger/30 px-3.5 py-2.5 text-sm text-danger">
          {state.error}
        </div>
      )}

      <div>
        <label htmlFor="passport_id" className="block text-sm font-medium text-text-primary mb-1.5">
          Passport
        </label>
        <select id="passport_id" name="passport_id" required className={inputClass}>
          <option value="">Select passport</option>
          {passports.map((p) => (
            <option key={p.id} value={p.id}>
              {p.passport_number} — {p.full_name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="country_code" className="block text-sm font-medium text-text-primary mb-1.5">
          Country
        </label>
        <select id="country_code" name="country_code" required className={inputClass}>
          <option value="">Select country</option>
          {countries.map((c) => (
            <option key={c.code} value={c.code}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="visa_type" className="block text-sm font-medium text-text-primary mb-1.5">
          Visa Type
        </label>
        <select id="visa_type" name="visa_type" required className={inputClass}>
          <option value="">Select visa type</option>
          {visaTypes.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </div>

      <Field label="Visa Number (optional)" name="visa_number" />

      <div className="grid grid-cols-2 gap-4">
        <Field label="Issue Date" name="issue_date" type="date" />
        <Field label="Expiry Date" name="expiry_date" type="date" />
      </div>
      <Field label="Renewal Date (optional)" name="renewal_date" type="date" />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="entry_type" className="block text-sm font-medium text-text-primary mb-1.5">
            Entry Type
          </label>
          <select id="entry_type" name="entry_type" defaultValue="single" className={inputClass}>
            <option value="single">Single Entry</option>
            <option value="double">Double Entry</option>
            <option value="multiple">Multiple Entry</option>
          </select>
        </div>
        <Field label="Number of Entries" name="number_of_entries" type="number" defaultValue={1} />
      </div>

      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-text-primary mb-1.5">
          Notes
        </label>
        <textarea id="notes" name="notes" rows={3} className="w-full rounded-lg border border-border px-3.5 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary" />
      </div>

      <div>
        <label htmlFor="upload" className="block text-sm font-medium text-text-primary mb-1.5">
          Visa Document (optional)
        </label>
        <input id="upload" name="upload" type="file" accept="image/*,.pdf" className="w-full text-sm text-text-secondary" />
      </div>

      <Button type="submit" loading={pending} fullWidth disabled={passports.length === 0}>
        Submit Visa Application
      </Button>
      <p className="text-xs text-text-secondary text-center">
        Your submission is reviewed by our team before it&apos;s processed.
      </p>
    </form>
  );
}
