import { Alert, Card, CardHeader, CardTitle, StatusBadge } from "@/components/ui";
import { LinkButton } from "@/components/ui/Button";
import { CurrencyDisplay } from "@/components/ui/format";
import { SegmentTimeline } from "@/components/domain/SegmentTimeline";
import { getFlightDetail } from "@/lib/odoo-client";
import { AlertTriangle, Download, Headphones, XCircle } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = { title: "Flight Details" };

export default async function FlightDetailPage(props: PageProps<"/flights/[id]">) {
  const { id } = await props.params;
  const booking = await getFlightDetail(Number(id)).catch(() => null);
  if (!booking) notFound();

  return (
    <div className="space-y-5 pb-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-text-primary">{booking.name}</h1>
          <p className="text-sm text-text-secondary">PNR: {booking.pnr ?? "—"}</p>
        </div>
        <StatusBadge domain="booking" status={booking.status} />
      </div>

      {booking.status === "airline_cancelled" && (
        <Alert tone="danger" title="Flight Cancelled by Airline">
          {booking.airline_cancellation_reason ?? "This flight has been cancelled by the airline."}
          {" "}Please contact our support team regarding rebooking or refund options.
        </Alert>
      )}

      {/* Booking information */}
      <Card>
        <CardHeader>
          <CardTitle>Booking Information</CardTitle>
        </CardHeader>
        <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
          <Field label="Booking Reference" value={booking.name} />
          <Field label="PNR" value={booking.pnr ?? "—"} />
          <Field label="Booking Status" node={<StatusBadge domain="booking" status={booking.status} />} />
          <Field label="Payment Status" value={booking.payment_status.replace(/_/g, " ")} capitalize />
        </dl>
      </Card>

      {/* Journey */}
      <Card>
        <CardHeader>
          <CardTitle>Journey</CardTitle>
        </CardHeader>
        <SegmentTimeline segments={booking.segments} />
      </Card>

      {/* Passenger */}
      <Card>
        <CardHeader>
          <CardTitle>Passenger</CardTitle>
        </CardHeader>
        <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
          <Field label="Name" value={booking.passenger_name} />
          <Field label="Passport" value={booking.passenger_passport_number ?? "—"} />
          <Field label="Contact" value={booking.passenger_contact ?? "—"} />
        </dl>
      </Card>

      {/* Flight information */}
      <Card>
        <CardHeader>
          <CardTitle>Flight Information</CardTitle>
        </CardHeader>
        <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
          <Field label="Class" value={booking.ticket_class} capitalize />
          <Field label="Ticket Number" value={booking.ticket_number ?? "—"} />
          <Field label="Baggage" value={booking.baggage_allowance ?? "—"} />
          <Field label="Ticket Amount" node={<CurrencyDisplay amount={booking.ticket_amount} symbol={booking.currency_symbol} />} />
        </dl>
      </Card>

      {/* Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Actions</CardTitle>
        </CardHeader>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {booking.ticket_number && (
            <LinkButton href="#" variant="secondary" icon={<Download className="h-4 w-4" />}>
              Download Ticket
            </LinkButton>
          )}
          {booking.cancellable && (
            <LinkButton href={`/flights/${booking.id}/cancel`} variant="danger" icon={<XCircle className="h-4 w-4" />}>
              Request Cancellation
            </LinkButton>
          )}
          <LinkButton href="/notifications" variant="secondary" icon={<Headphones className="h-4 w-4" />}>
            Contact Support
          </LinkButton>
        </div>
        {!booking.cancellable && booking.status !== "airline_cancelled" && (
          <p className="mt-3 flex items-center gap-1.5 text-xs text-text-secondary">
            <AlertTriangle className="h-3.5 w-3.5" /> This booking is no longer eligible for self-service cancellation.
          </p>
        )}
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
      <dd className={`text-sm font-medium text-text-primary ${capitalize ? "capitalize" : ""}`}>
        {node ?? value}
      </dd>
    </div>
  );
}
