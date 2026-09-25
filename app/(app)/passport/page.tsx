import { Alert, EmptyState } from "@/components/ui";
import { PassportCard } from "@/components/domain/PassportCard";
import { daysUntil } from "@/components/ui/format";
import { getPassports } from "@/lib/odoo-client";
import { Stamp } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "My Passports" };

export default async function PassportPage() {
  const { items } = await getPassports();
  const expiringSoon = items.filter((p) => {
    const days = daysUntil(p.expiry_date);
    return days !== null && days >= 0 && days <= 180;
  });

  return (
    <div className="space-y-5">
      <h1 className="text-xl sm:text-2xl font-semibold text-text-primary">My Passports</h1>

      {expiringSoon.map((p) => (
        <Alert key={p.id} tone="warning" title={`Passport ${p.passport_number} expiring soon`}>
          Renew your passport before it expires to avoid travel disruption.
        </Alert>
      ))}

      {items.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((passport) => (
            <PassportCard key={passport.id} passport={passport} />
          ))}
        </div>
      ) : (
        <EmptyState icon={Stamp} title="No passports on file" description="Your passport records will appear here once added." />
      )}
    </div>
  );
}
