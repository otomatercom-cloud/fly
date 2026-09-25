import { Skeleton } from "@/components/ui/Skeleton";

export default function VisaDetailLoading() {
  return (
    <div className="space-y-5 max-w-xl">
      <div className="flex items-center justify-between gap-3">
        <div className="space-y-2">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-24" />
        </div>
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>
      {Array.from({ length: 2 }).map((_, i) => (
        <div key={i} className="rounded-xl border border-border bg-card p-4 sm:p-5 space-y-3">
          <Skeleton className="h-4 w-1/3" />
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
