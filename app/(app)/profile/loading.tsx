import { Skeleton } from "@/components/ui/Skeleton";

export default function ProfileLoading() {
  return (
    <div className="space-y-5 max-w-xl">
      <Skeleton className="h-7 w-24" />
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="rounded-xl border border-border bg-card p-4 sm:p-5 space-y-3">
          <Skeleton className="h-4 w-1/3" />
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
