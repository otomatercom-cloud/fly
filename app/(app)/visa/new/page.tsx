import { Alert } from "@/components/ui";
import { LinkButton } from "@/components/ui/Button";
import { VisaForm } from "@/components/domain/VisaForm";
import { getCountries, getPassports, getVisaTypes } from "@/lib/odoo-client";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Add Visa" };

export default async function NewVisaPage() {
  const [{ items: passports }, { items: countries }, { items: visaTypes }] = await Promise.all([
    getPassports(),
    getCountries(),
    getVisaTypes(),
  ]);

  return (
    <div className="space-y-5">
      <h1 className="text-xl sm:text-2xl font-semibold text-text-primary">Add Visa</h1>

      {passports.length === 0 ? (
        <Alert tone="warning" title="Add a passport first">
          A visa application needs to be linked to one of your passports.
          <div className="mt-3">
            <LinkButton href="/passport/new" size="sm">
              Add Passport
            </LinkButton>
          </div>
        </Alert>
      ) : (
        <VisaForm passports={passports} countries={countries} visaTypes={visaTypes} />
      )}
    </div>
  );
}
