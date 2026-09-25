import { CardSkeleton, Skeleton } from "@/components/ui/Skeleton";

export default function VisaLoading() {
  return (
    <div className="space-y-5">
      <Skeleton className="h-7 w-32" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 2 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
