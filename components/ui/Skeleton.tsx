import { cn } from "@/lib/utils";

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-md bg-slate-200/80", className)} />;
}

export function CardSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-card p-4 sm:p-5 space-y-3">
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="h-6 w-2/3" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  );
}

export function FlightCardSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-card p-4 sm:p-5">
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-5 w-20 rounded-full" />
      </div>
      <div className="flex items-center justify-between">
        <Skeleton className="h-10 w-20" />
        <Skeleton className="h-5 w-5 rounded-full" />
        <Skeleton className="h-10 w-20" />
      </div>
      <Skeleton className="h-4 w-1/2 mt-4" />
    </div>
  );
}

export function ListSkeleton({ count = 3, Item = CardSkeleton }: { count?: number; Item?: () => React.JSX.Element }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <Item key={i} />
      ))}
    </div>
  );
}
