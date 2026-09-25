import { EmptyState } from "@/components/ui";
import { LinkButton } from "@/components/ui/Button";
import { VisaCard } from "@/components/domain/VisaCard";
import { getVisas } from "@/lib/odoo-client";
import { Globe, Plus } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "My Visas" };

export default async function VisaPage() {
  const { items } = await getVisas();

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-xl sm:text-2xl font-semibold text-text-primary">My Visas</h1>
        <LinkButton href="/visa/new" size="sm" icon={<Plus className="h-4 w-4" />}>
          Add Visa
        </LinkButton>
      </div>

      {items.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((visa, i) => (
            <VisaCard key={visa.id} visa={visa} index={i} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Globe}
          title="No visas on file"
          description="Submit a visa application to start tracking it here."
          action={
            <LinkButton href="/visa/new" size="sm">
              Add Visa
            </LinkButton>
          }
        />
      )}
    </div>
  );
}
