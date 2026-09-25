import { cn } from "@/lib/utils";
import Link from "next/link";

export function FilterTabs({
  basePath,
  active,
  options,
}: {
  basePath: string;
  active: string;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="flex gap-1.5 overflow-x-auto scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
      {options.map((opt) => (
        <Link
          key={opt.value}
          href={opt.value === "all" ? basePath : `${basePath}?filter=${opt.value}`}
          className={cn(
            "shrink-0 rounded-full px-4 py-2 text-sm font-medium min-h-9 flex items-center transition-colors",
            active === opt.value
              ? "bg-primary text-white"
              : "bg-light-blue text-text-secondary hover:text-primary"
          )}
        >
          {opt.label}
        </Link>
      ))}
    </div>
  );
}
