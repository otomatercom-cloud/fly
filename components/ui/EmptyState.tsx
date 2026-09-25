import { ReactNode } from "react";
import { Inbox } from "lucide-react";

export function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
  action,
}: {
  icon?: typeof Inbox;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12 px-4">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-light-blue text-primary">
        <Icon className="h-6 w-6" aria-hidden />
      </div>
      <h3 className="text-sm font-semibold text-text-primary">{title}</h3>
      {description && <p className="mt-1 max-w-xs text-sm text-text-secondary">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
