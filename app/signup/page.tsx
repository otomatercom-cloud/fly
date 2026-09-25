"use client";

import { useActionState } from "react";
import { Plane, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui";
import { signupAction, type SignupState } from "./actions";

const initialState: SignupState = { error: null };

export default function SignupPage() {
  const [state, formAction, pending] = useActionState(signupAction, initialState);

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

      {/* Sign-up form */}
      <div className="flex flex-1 items-center justify-center px-6 py-10 sm:px-10">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-semibold text-text-primary">Create your account</h1>
          <p className="mt-1 text-sm text-text-secondary">Sign up for a free FLT account</p>

          <form action={formAction} className="mt-8 space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-1.5">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="w-full min-h-11 rounded-lg border border-border px-3.5 text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="Your full name"
              />
            </div>
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
              <label htmlFor="phone" className="block text-sm font-medium text-text-primary mb-1.5">
                Phone <span className="text-text-secondary font-normal">(optional)</span>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                className="w-full min-h-11 rounded-lg border border-border px-3.5 text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="+91 98765 43210"
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
                autoComplete="new-password"
                required
                minLength={8}
                className="w-full min-h-11 rounded-lg border border-border px-3.5 text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="At least 8 characters"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-text-primary mb-1.5">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                minLength={8}
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
              Create Account
            </Button>
          </form>

          <p className="mt-4 text-center text-sm text-text-secondary">
            Already have an account?{" "}
            <a href="/login" className="font-medium text-primary hover:underline">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
