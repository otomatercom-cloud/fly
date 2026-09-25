import { CardSkeleton, Skeleton } from "@/components/ui/Skeleton";

export default function CancellationsLoading() {
  return (
    <div className="space-y-5 max-w-2xl">
      <Skeleton className="h-7 w-52" />
      <div className="space-y-3">
        {Array.from({ length: 2 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
