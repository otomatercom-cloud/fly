import { Skeleton } from "@/components/ui/Skeleton";

export default function CancelFlightLoading() {
  return (
    <div className="space-y-5 max-w-xl">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-7 w-56" />
      <Skeleton className="h-16 w-full rounded-xl" />
      <div className="rounded-xl border border-border bg-card p-4 sm:p-5 space-y-3">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-6 w-full" />
      </div>
    </div>
  );
}
