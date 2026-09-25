import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "./globals.css";

// Self-hosted (not next/font/google): serves the same Inter typeface from
// our own bundle instead of fonts.googleapis.com — no external font request
// at runtime, which is both faster on slow mobile networks (spec §performance)
// and works in network-restricted build environments.

export const metadata: Metadata = {
  title: {
    default: "FLT — Flight & Visa Management",
    template: "%s | FLT",
  },
  description: "Manage your flights, visas, passports and travel documents in one place.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#2563eb",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`h-full antialiased`}>
      <body className="min-h-full bg-background text-text-primary flex flex-col overflow-x-hidden">{children}</body>
    </html>
  );
}
