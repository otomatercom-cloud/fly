import { CardSkeleton, Skeleton } from "@/components/ui/Skeleton";

export default function PassportLoading() {
  return (
    <div className="space-y-5">
      <Skeleton className="h-7 w-36" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <CardSkeleton />
      </div>
    </div>
  );
}
