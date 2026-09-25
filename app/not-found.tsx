import { LinkButton } from "@/components/ui/Button";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center px-4 bg-background">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-light-blue text-primary">
        <Compass className="h-7 w-7" aria-hidden />
      </div>
      <h1 className="text-lg font-semibold text-text-primary">Page not found</h1>
      <p className="mt-1 max-w-xs text-sm text-text-secondary">
        The page you&apos;re looking for doesn&apos;t exist or may have been moved.
      </p>
      <LinkButton href="/dashboard" className="mt-5">
        Go to Dashboard
      </LinkButton>
    </div>
  );
}
