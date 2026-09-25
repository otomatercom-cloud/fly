import { PassportForm } from "@/components/domain/PassportForm";
import { getCountries } from "@/lib/odoo-client";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Add Passport" };

export default async function NewPassportPage() {
  const { items: countries } = await getCountries();

  return (
    <div className="space-y-5">
      <h1 className="text-xl sm:text-2xl font-semibold text-text-primary">Add Passport</h1>
      <PassportForm countries={countries} />
    </div>
  );
}
