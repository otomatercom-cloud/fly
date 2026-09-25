import { Alert, Card, CardHeader, CardTitle } from "@/components/ui";
import { CancelFlightForm } from "@/components/domain/CancelFlightForm";
import { getFlightDetail } from "@/lib/odoo-client";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound, redirect } from "next/navigation";

export const metadata: Metadata = { title: "Request Cancellation" };

export default async function CancelFlightPage(props: PageProps<"/flights/[id]/cancel">) {
  const { id } = await props.params;
  const booking = await getFlightDetail(Number(id)).catch(() => null);
  if (!booking) notFound();
  if (!booking.cancellable) redirect(`/flights/${booking.id}`);

  const quote = booking.cancellation_quote ?? { charge: 0, refund: booking.ticket_amount, policy_name: null };

  return (
    <div className="space-y-5 max-w-xl">
      <Link href={`/flights/${booking.id}`} className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-primary min-h-11">
        <ArrowLeft className="h-4 w-4" /> Back to flight details
      </Link>

      <div>
        <h1 className="text-xl sm:text-2xl font-semibold text-text-primary">Request Cancellation</h1>
        <p className="text-sm text-text-secondary mt-1">
          {booking.name} · {booking.segments[0]?.departure_airport.city} → {booking.segments.at(-1)?.arrival_airport.city}
        </p>
      </div>

      <Alert tone="warning" title="Cancellation Information">
        Cancelling this booking will apply the charge shown below, based on our cancellation policy and how close
        we are to departure. This action cannot be reversed once submitted.
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Flight Details</CardTitle>
        </CardHeader>
        <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
          <div>
            <dt className="text-xs text-text-secondary">Booking Reference</dt>
            <dd className="font-medium text-text-primary">{booking.name}</dd>
          </div>
          <div>
            <dt className="text-xs text-text-secondary">Passenger</dt>
            <dd className="font-medium text-text-primary">{booking.passenger_name}</dd>
          </div>
        </dl>
      </Card>

      <CancelFlightForm
        bookingId={booking.id}
        ticketAmount={booking.ticket_amount}
        charge={quote.charge}
        refund={quote.refund}
        policyName={quote.policy_name}
        currencySymbol={booking.currency_symbol}
      />
    </div>
  );
}
