import { cn } from "@/lib/utils";
import { HTMLAttributes, ReactNode } from "react";

export function Card({
  children,
  className,
  padded = true,
  ...props
}: HTMLAttributes<HTMLDivElement> & { children: ReactNode; padded?: boolean }) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card shadow-[var(--shadow-card)]",
        padded && "p-4 sm:p-5",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mb-3 flex items-center justify-between gap-2", className)}>{children}</div>;
}

export function CardTitle({ children, className }: { children: ReactNode; className?: string }) {
  return <h3 className={cn("text-sm font-semibold text-text-primary", className)}>{children}</h3>;
}
