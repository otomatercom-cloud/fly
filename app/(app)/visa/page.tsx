import { EmptyState } from "@/components/ui";
import { VisaCard } from "@/components/domain/VisaCard";
import { getVisas } from "@/lib/odoo-client";
import { Globe } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "My Visas" };

export default async function VisaPage() {
  const { items } = await getVisas();

  return (
    <div className="space-y-5">
      <h1 className="text-xl sm:text-2xl font-semibold text-text-primary">My Visas</h1>

      {items.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((visa) => (
            <VisaCard key={visa.id} visa={visa} />
          ))}
        </div>
      ) : (
        <EmptyState icon={Globe} title="No visas on file" description="Your visa records will appear here once added." />
      )}
    </div>
  );
}
