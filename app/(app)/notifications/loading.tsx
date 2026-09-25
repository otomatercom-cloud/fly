import { Skeleton } from "@/components/ui/Skeleton";

export default function NotificationsLoading() {
  return (
    <div className="space-y-5 max-w-2xl">
      <Skeleton className="h-7 w-40" />
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-20 w-full rounded-xl" />
        ))}
      </div>
    </div>
  );
}
