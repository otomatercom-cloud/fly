import { Card, CardHeader, CardTitle, StatusBadge } from "@/components/ui";
import { DateDisplay, ExpiryCountdown } from "@/components/ui/format";
import { getVisaDetail } from "@/lib/odoo-client";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = { title: "Visa Details" };

export default async function VisaDetailPage(props: PageProps<"/visa/[id]">) {
  const { id } = await props.params;
  const visa = await getVisaDetail(Number(id)).catch(() => null);
  if (!visa) notFound();

  return (
    <div className="space-y-5 max-w-xl">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-text-primary">{visa.country}</h1>
          <p className="text-sm text-text-secondary capitalize">{visa.visa_type} Visa</p>
        </div>
        <StatusBadge domain="visa" status={visa.status} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Expiry</CardTitle>
        </CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-text-secondary">Expires</p>
            <DateDisplay iso={visa.expiry_date} className="text-sm font-medium text-text-primary" />
          </div>
          <ExpiryCountdown iso={visa.expiry_date} />
        </div>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Visa Details</CardTitle>
        </CardHeader>
        <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
          <Field label="Visa Number" value={visa.visa_number ?? "—"} />
          <Field label="Issue Date" node={<DateDisplay iso={visa.issue_date} />} />
          <Field label="Renewal Date" node={<DateDisplay iso={visa.renewal_date} />} />
          <Field label="Entry Type" value={visa.entry_type} capitalize />
          <Field label="Number of Entries" value={visa.number_of_entries ? String(visa.number_of_entries) : "Unlimited"} />
          <Field label="Linked Passport" value={visa.passport_number ?? "—"} />
        </dl>
      </Card>
    </div>
  );
}

function Field({
  label,
  value,
  node,
  capitalize,
}: {
  label: string;
  value?: string;
  node?: React.ReactNode;
  capitalize?: boolean;
}) {
  return (
    <div>
      <dt className="text-xs text-text-secondary">{label}</dt>
      <dd className={`text-sm font-medium text-text-primary ${capitalize ? "capitalize" : ""}`}>{node ?? value}</dd>
    </div>
  );
}
