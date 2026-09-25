"use client";

import { useActionState } from "react";
import { Plane, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui";
import { loginAction, type LoginState } from "./actions";

const initialState: LoginState = { error: null };

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(loginAction, initialState);

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

          <form action={formAction} className="mt-8 space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-1.5">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                required
                className="w-full min-h-11 rounded-lg border border-border px-3.5 text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-text-primary mb-1.5">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-full min-h-11 rounded-lg border border-border px-3.5 text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="••••••••"
              />
            </div>

            {state.error && (
              <p role="alert" className="rounded-lg bg-danger-bg px-3.5 py-2.5 text-sm text-danger">
                {state.error}
              </p>
            )}

            <Button type="submit" fullWidth size="lg" loading={pending}>
              Sign In
            </Button>
          </form>

          <a href="#" className="mt-4 block text-center text-sm text-primary hover:underline">
            Forgot password?
          </a>
        </div>
      </div>
    </div>
  );
}
