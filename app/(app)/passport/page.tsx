import { Alert, EmptyState } from "@/components/ui";
import { LinkButton } from "@/components/ui/Button";
import { PassportCard } from "@/components/domain/PassportCard";
import { daysUntil } from "@/components/ui/format";
import { getPassports } from "@/lib/odoo-client";
import { Plus, Stamp } from "lucide-react";
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
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-xl sm:text-2xl font-semibold text-text-primary">My Passports</h1>
        <LinkButton href="/passport/new" size="sm" icon={<Plus className="h-4 w-4" />}>
          Add Passport
        </LinkButton>
      </div>

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
        <EmptyState
          icon={Stamp}
          title="No passports on file"
          description="Add your passport to keep it on record and start visa applications."
          action={
            <LinkButton href="/passport/new" size="sm">
              Add Passport
            </LinkButton>
          }
        />
      )}
    </div>
  );
}
