"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui";
import { loginAction, type LoginState } from "@/app/login/actions";

const initialState: LoginState = { error: null };

export function LoginForm({ notice }: { notice?: string }) {
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  return (
    <>
      {notice && (
        <p className="mt-6 rounded-lg bg-success-bg px-3.5 py-2.5 text-sm text-success">{notice}</p>
      )}

      <form action={formAction} className={`space-y-5 ${notice ? "mt-4" : "mt-8"}`}>
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
      <p className="mt-3 text-center text-sm text-text-secondary">
        Don&apos;t have an account?{" "}
        <a href="/signup" className="font-medium text-primary hover:underline">
          Sign up
        </a>
      </p>
    </>
  );
}
