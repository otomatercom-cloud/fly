import { EmptyState } from "@/components/ui";
import { FilterTabs } from "@/components/domain/FilterTabs";
import { FlightCard } from "@/components/domain/FlightCard";
import { getFlights } from "@/lib/odoo-client";
import { Plane } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "My Flights" };

const FILTERS = [
  { value: "all", label: "All" },
  { value: "upcoming", label: "Upcoming" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];

export default async function FlightsPage(props: PageProps<"/flights">) {
  const searchParams = await props.searchParams;
  const filter = typeof searchParams.filter === "string" ? searchParams.filter : "all";
  const page = typeof searchParams.page === "string" ? Number(searchParams.page) || 1 : 1;

  const result = await getFlights(filter, page);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl sm:text-2xl font-semibold text-text-primary">My Flights</h1>
      </div>

      <FilterTabs basePath="/flights" active={filter} options={FILTERS} />

      {result.items.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {result.items.map((booking) => (
            <FlightCard key={booking.id} booking={booking} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Plane}
          title="No flights found"
          description={
            filter === "all"
              ? "You don't have any flight bookings yet."
              : `You don't have any ${filter} flights.`
          }
        />
      )}
    </div>
  );
}
