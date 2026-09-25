import { FlightCardSkeleton, Skeleton } from "@/components/ui/Skeleton";

export default function FlightsLoading() {
  return (
    <div className="space-y-5">
      <Skeleton className="h-7 w-40" />
      <div className="flex gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-9 w-20 rounded-full" />
        ))}
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <FlightCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
