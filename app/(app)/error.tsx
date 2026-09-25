"use client";

import { Button } from "@/components/ui";
import { AlertTriangle } from "lucide-react";
import { useEffect } from "react";

export default function AppError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // In production this would report to an error-tracking service.
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-danger-bg text-danger">
        <AlertTriangle className="h-6 w-6" />
      </div>
      <h2 className="text-base font-semibold text-text-primary">Something went wrong</h2>
      <p className="mt-1 max-w-sm text-sm text-text-secondary">
        We couldn&apos;t load this page. Please try again.
      </p>
      <Button className="mt-5" onClick={reset}>
        Try Again
      </Button>
    </div>
  );
}
