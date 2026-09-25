"use client";

import { StatusBadge } from "@/components/ui";
import { DateTimeDisplay } from "@/components/ui/format";
import type { Segment } from "@/types/api";
import { ChevronDown, Plane } from "lucide-react";
import { useState } from "react";

/** Vertical journey timeline for multi-segment bookings (spec §11).
 * Each leg is a collapsible row — no wide desktop table forced onto mobile. */
export function SegmentTimeline({ segments }: { segments: Segment[] }) {
  const [openId, setOpenId] = useState<number | null>(segments[0]?.id ?? null);

  return (
    <ol className="relative">
      {segments.map((segment, idx) => {
        const isLast = idx === segments.length - 1;
        const open = openId === segment.id;
        return (
          <li key={segment.id} className="relative pb-6 last:pb-0">
            {!isLast && <span className="absolute left-[15px] top-8 bottom-0 w-px bg-border" aria-hidden />}
            <div className="flex gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-light-blue text-primary">
                <Plane className="h-4 w-4" aria-hidden />
              </span>
              <div className="flex-1 min-w-0">
                <button
                  onClick={() => setOpenId(open ? null : segment.id)}
                  className="flex w-full items-center justify-between gap-2 text-left min-h-11"
                  aria-expanded={open}
                >
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-text-primary truncate">
                      {segment.departure_airport.city} → {segment.arrival_airport.city}
                    </p>
                    <p className="text-xs text-text-secondary">
                      <DateTimeDisplay iso={segment.departure_datetime} />
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <StatusBadge domain="booking" status={segment.status} />
                    <ChevronDown className={`h-4 w-4 text-text-secondary transition-transform ${open ? "rotate-180" : ""}`} />
                  </div>
                </button>

                {open && (
                  <div className="mt-3 rounded-lg bg-background border border-border p-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                    <Field label="Airline" value={segment.airline} />
                    <Field label="Flight No." value={segment.flight_number} />
                    <Field
                      label="Departure"
                      value={`${segment.departure_airport.code ?? "—"} · ${segment.departure_terminal ?? "—"}`}
                    />
                    <Field
                      label="Arrival"
                      value={`${segment.arrival_airport.code ?? "—"} · ${segment.arrival_terminal ?? "—"}`}
                    />
                    <Field label="Seat" value={segment.seat_number ?? "Not assigned"} />
                    <Field label="Arrival Time" value={segment.arrival_datetime ? new Date(segment.arrival_datetime).toLocaleString("en-IN") : "—"} />
                  </div>
                )}
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs text-text-secondary">{label}</dt>
      <dd className="text-text-primary font-medium">{value}</dd>
    </div>
  );
}
