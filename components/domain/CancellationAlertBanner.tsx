import { Alert } from "@/components/ui";
import { LinkButton } from "@/components/ui/Button";
import type { Booking } from "@/types/api";

/** Highly visible alert for airline-cancelled flights — spec §18 requires
 * this be prominent on the dashboard, above everything else. */
export function CancellationAlertBanner({ booking }: { booking: Booking }) {
  return (
    <Alert
      tone="danger"
      title={`Flight Cancelled — ${booking.first_segment?.airline ?? ""} ${booking.first_segment?.flight_number ?? ""}`}
      action={
        <LinkButton href={`/flights/${booking.id}`} variant="danger" size="sm">
          View Flight
        </LinkButton>
      }
    >
      Your flight for booking {booking.name} has been cancelled by the airline. Review rebooking and refund
      options on the flight details page.
    </Alert>
  );
}
