import { Skeleton } from "@/components/ui/Skeleton";

export default function DocumentsLoading() {
  return (
    <div className="space-y-5 max-w-2xl">
      <Skeleton className="h-7 w-48" />
      <Skeleton className="h-11 w-full rounded-lg" />
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-20 w-full rounded-xl" />
        ))}
      </div>
    </div>
  );
}
