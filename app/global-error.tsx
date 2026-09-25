"use client";

import { useEffect } from "react";

// Root-level error boundary — only fires if the root layout itself throws.
// Must render its own <html>/<body> since it replaces the root layout.
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div style={{ display: "flex", minHeight: "100vh", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 16px", fontFamily: "system-ui, sans-serif" }}>
          <h1 style={{ fontSize: 18, fontWeight: 600, color: "#0F172A" }}>Something went wrong</h1>
          <p style={{ marginTop: 4, maxWidth: 320, fontSize: 14, color: "#475569" }}>
            We couldn&apos;t load the application. Please try again.
          </p>
          <button
            onClick={reset}
            style={{ marginTop: 20, height: 44, padding: "0 24px", borderRadius: 8, background: "#2563EB", color: "white", fontSize: 14, fontWeight: 500, border: "none", cursor: "pointer" }}
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}
