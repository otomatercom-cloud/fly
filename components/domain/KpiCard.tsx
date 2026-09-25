import { Card } from "@/components/ui";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

export function KpiCard({
  label,
  value,
  icon: Icon,
  tone = "primary",
}: {
  label: string;
  value: number;
  icon: LucideIcon;
  tone?: "primary" | "warning" | "danger";
}) {
  const toneClasses = {
    primary: "bg-light-blue text-primary",
    warning: "bg-warning-bg text-warning",
    danger: "bg-danger-bg text-danger",
  }[tone];

  return (
    <Card className="flex items-center gap-3" padded>
      <span className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-full", toneClasses)}>
        <Icon className="h-5 w-5" aria-hidden />
      </span>
      <div className="min-w-0">
        <p className="text-2xl font-semibold text-text-primary leading-none">{value}</p>
        <p className="mt-1 text-xs text-text-secondary truncate">{label}</p>
      </div>
    </Card>
  );
}
