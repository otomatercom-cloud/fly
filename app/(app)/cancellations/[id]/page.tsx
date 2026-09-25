import { Alert, Card, CardHeader, CardTitle, StatusBadge } from "@/components/ui";
import { LinkButton } from "@/components/ui/Button";
import { CurrencyDisplay, DateDisplay } from "@/components/ui/format";
import { getCancellationRequest } from "@/lib/odoo-client";
import { CheckCircle2, Clock, FileSearch, Headphones } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = { title: "Cancellation Status" };

const STEPS = [
  { key: "submitted", label: "Submitted", icon: Clock },
  { key: "under_review", label: "Under Review", icon: FileSearch },
  { key: "approved", label: "Approved", icon: CheckCircle2 },
  { key: "processed", label: "Refund Processed", icon: CheckCircle2 },
] as const;

export default async function CancellationStatusPage(props: PageProps<"/cancellations/[id]">) {
  const { id } = await props.params;
  const request = await getCancellationRequest(Number(id)).catch(() => null);
  if (!request) notFound();

  const stepIndex = STEPS.findIndex((s) => s.key === request.status);
  const isRejected = request.status === "rejected";

  return (
    <div className="space-y-5 max-w-xl">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-text-primary">Cancellation Request</h1>
          <p className="text-sm text-text-secondary">{request.name} · Booking {request.booking_name}</p>
        </div>
        <StatusBadge domain="cancellation" status={request.status} />
      </div>

      {isRejected ? (
        <Alert tone="danger" title="Cancellation request rejected">
          {request.remarks ?? "Please contact our support team for more details."}
        </Alert>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Request Progress</CardTitle>
          </CardHeader>
          <ol className="space-y-4">
            {STEPS.map((step, idx) => {
              const done = stepIndex >= idx;
              const Icon = step.icon;
              return (
                <li key={step.key} className="flex items-center gap-3">
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                      done ? "bg-primary text-white" : "bg-light-blue text-text-secondary"
                    }`}
                  >
                    <Icon className="h-4 w-4" aria-hidden />
                  </span>
                  <span className={`text-sm ${done ? "font-medium text-text-primary" : "text-text-secondary"}`}>
                    {step.label}
                  </span>
                </li>
              );
            })}
          </ol>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Refund Details</CardTitle>
        </CardHeader>
        <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
          <Field label="Original Amount" node={<CurrencyDisplay amount={request.original_amount} symbol={request.currency_symbol} />} />
          <Field label="Cancellation Charge" node={<CurrencyDisplay amount={request.cancellation_charge} symbol={request.currency_symbol} />} />
          <Field
            label="Refund Amount"
            node={<CurrencyDisplay amount={request.refund_amount} symbol={request.currency_symbol} className="text-success font-semibold" />}
          />
          <Field label="Refund Status" node={<StatusBadge domain="cancellation" status={request.refund_status.replace("not_applicable", "pending")} />} />
          <Field label="Requested On" node={<DateDisplay iso={request.request_date} />} />
        </dl>
        {request.remarks && !isRejected && (
          <p className="mt-3 text-xs text-text-secondary border-t border-border pt-3">{request.remarks}</p>
        )}
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <LinkButton href={`/flights/${request.booking_id}`} variant="secondary">
          View Flight
        </LinkButton>
        <LinkButton href="/notifications" variant="secondary" icon={<Headphones className="h-4 w-4" />}>
          Contact Support
        </LinkButton>
      </div>
    </div>
  );
}

function Field({ label, node }: { label: string; node: React.ReactNode }) {
  return (
    <div>
      <dt className="text-xs text-text-secondary">{label}</dt>
      <dd className="text-sm">{node}</dd>
    </div>
  );
}
