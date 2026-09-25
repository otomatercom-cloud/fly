import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

const variantClasses: Record<Variant, string> = {
  primary: "bg-primary text-white hover:bg-primary-hover active:bg-primary-hover",
  secondary:
    "bg-white text-text-primary border border-border hover:bg-light-blue active:bg-light-blue",
  ghost: "bg-transparent text-text-primary hover:bg-light-blue",
  danger: "bg-danger text-white hover:bg-red-700 active:bg-red-700",
};

// min-h-11 (44px) everywhere: comfortable touch targets, per spec.
const sizeClasses: Record<Size, string> = {
  sm: "h-9 px-3 text-sm min-h-9",
  md: "h-11 px-4 text-sm min-h-11",
  lg: "h-12 px-6 text-base min-h-12",
};

interface BaseProps {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  fullWidth?: boolean;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

type ButtonProps = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type LinkButtonProps = BaseProps & { href: string; target?: string };

export function Button({
  variant = "primary",
  size = "md",
  loading,
  fullWidth,
  icon,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        "disabled:opacity-50 disabled:pointer-events-none",
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && "w-full",
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : icon}
      {children}
    </button>
  );
}

export function LinkButton({
  variant = "primary",
  size = "md",
  fullWidth,
  icon,
  children,
  className,
  href,
  target,
}: LinkButtonProps) {
  return (
    <Link
      href={href}
      target={target}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && "w-full",
        className
      )}
    >
      {icon}
      {children}
    </Link>
  );
}
