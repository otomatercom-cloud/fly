import { Card, StatusBadge } from "@/components/ui";
import { LinkButton } from "@/components/ui/Button";
import type { Booking } from "@/types/api";
import { FlightRoute } from "./FlightRoute";

export function FlightCard({ booking }: { booking: Booking }) {
  return (
    <Card className="hover:shadow-[var(--shadow-card-hover)] transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-text-primary truncate">
            {booking.first_segment ? `${booking.first_segment.airline} ${booking.first_segment.flight_number}` : booking.name}
          </p>
          <p className="text-xs text-text-secondary">{booking.name}</p>
        </div>
        <StatusBadge domain="booking" status={booking.status} />
      </div>

      {booking.first_segment && <FlightRoute segment={booking.first_segment} />}

      {booking.segment_count > 1 && (
        <p className="mt-2 text-xs text-text-secondary">+{booking.segment_count - 1} more segment{booking.segment_count > 2 ? "s" : ""}</p>
      )}

      <div className="mt-4 flex justify-end">
        <LinkButton href={`/flights/${booking.id}`} variant="secondary" size="sm">
          View Details
        </LinkButton>
      </div>
    </Card>
  );
}
