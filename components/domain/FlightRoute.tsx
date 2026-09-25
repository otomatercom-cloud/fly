import { Plane } from "lucide-react";
import type { Segment } from "@/types/api";
import { formatDate, formatTime } from "@/components/ui/format";

/** The reusable "COK ✈ DXB" route visual used on flight cards and details.
 * Fits comfortably within the screen width at 360px — no horizontal
 * scrolling, per spec's Mobile Flight Card requirement. */
export function FlightRoute({ segment, compact }: { segment: Segment; compact?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <div className="min-w-0">
        <p className={compact ? "text-lg font-semibold text-text-primary" : "text-xl font-semibold text-text-primary"}>
          {segment.departure_airport.code ?? "—"}
        </p>
        <p className="text-xs text-text-secondary truncate max-w-[6.5rem]">{segment.departure_airport.city}</p>
      </div>

      <div className="flex flex-1 flex-col items-center px-2 min-w-0">
        <div className="flex w-full items-center gap-1.5">
          <span className="h-px flex-1 bg-border" />
          <Plane className="h-4 w-4 text-primary shrink-0 rotate-90" aria-hidden />
          <span className="h-px flex-1 bg-border" />
        </div>
        <p className="mt-1 text-[11px] text-text-secondary whitespace-nowrap">
          {formatDate(segment.departure_datetime)}
        </p>
      </div>

      <div className="min-w-0 text-right">
        <p className={compact ? "text-lg font-semibold text-text-primary" : "text-xl font-semibold text-text-primary"}>
          {segment.arrival_airport.code ?? "—"}
        </p>
        <p className="text-xs text-text-secondary truncate max-w-[6.5rem] ml-auto">{segment.arrival_airport.city}</p>
      </div>
    </div>
  );
}

export function FlightTimeMeta({ segment }: { segment: Segment }) {
  return (
    <p className="text-sm text-text-secondary">
      {formatDate(segment.departure_datetime)} · {formatTime(segment.departure_datetime)}
      {segment.flight_number ? ` · ${segment.airline} ${segment.flight_number}` : ""}
    </p>
  );
}
