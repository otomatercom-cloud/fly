import { Plane, ShieldCheck } from "lucide-react";
import { LoginForm } from "@/components/domain/LoginForm";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Sign In" };

export default async function LoginPage(props: PageProps<"/login">) {
  const searchParams = await props.searchParams;
  const notice = searchParams.created === "1" ? "Account created. Please sign in." : undefined;

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Branding panel — full-width banner on mobile, left column on desktop */}
      <div className="relative flex flex-col justify-between bg-navy text-white px-6 py-8 sm:px-10 sm:py-12 lg:w-1/2 lg:px-16 lg:py-16">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Plane className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-lg font-semibold leading-tight">FLT</p>
            <p className="text-xs text-slate-300 leading-tight">Flight &amp; Visa Management</p>
          </div>
        </div>

        <div className="hidden lg:block max-w-md">
          <h2 className="text-3xl font-semibold leading-tight">
            Your entire journey, organized in one place.
          </h2>
          <p className="mt-4 text-slate-300">
            Flights, visas, passports and documents — tracked, reminded, and always up to date.
          </p>
          <div className="mt-8 flex items-center gap-2 text-sm text-slate-300">
            <ShieldCheck className="h-4 w-4 text-secondary" />
            Your data is private and only visible to you.
          </div>
        </div>

        <p className="hidden lg:block text-xs text-slate-400">© {new Date().getFullYear()} FLT. All rights reserved.</p>
      </div>

      {/* Sign-in form */}
      <div className="flex flex-1 items-center justify-center px-6 py-10 sm:px-10">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-semibold text-text-primary">Welcome back</h1>
          <p className="mt-1 text-sm text-text-secondary">Sign in to your FLT account</p>

          <LoginForm notice={notice} />
        </div>
      </div>
    </div>
  );
}
