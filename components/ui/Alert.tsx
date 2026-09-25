import { cn } from "@/lib/utils";
import { AlertTriangle, CheckCircle2, Info, XCircle } from "lucide-react";
import { ReactNode } from "react";

type Tone = "info" | "success" | "warning" | "danger";

const config: Record<Tone, { icon: typeof Info; classes: string }> = {
  info: { icon: Info, classes: "bg-info-bg border-info/20 text-navy" },
  success: { icon: CheckCircle2, classes: "bg-success-bg border-success/20 text-navy" },
  warning: { icon: AlertTriangle, classes: "bg-warning-bg border-warning/30 text-navy" },
  danger: { icon: XCircle, classes: "bg-danger-bg border-danger/20 text-navy" },
};

export function Alert({
  tone = "info",
  title,
  children,
  action,
  className,
}: {
  tone?: Tone;
  title: string;
  children?: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  const { icon: Icon, classes } = config[tone];
  return (
    <div className={cn("flex gap-3 rounded-xl border p-4", classes, className)} role="alert">
      <Icon className="h-5 w-5 flex-shrink-0 mt-0.5" aria-hidden />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold">{title}</p>
        {children && <div className="mt-1 text-sm text-text-secondary">{children}</div>}
        {action && <div className="mt-3">{action}</div>}
      </div>
    </div>
  );
}
