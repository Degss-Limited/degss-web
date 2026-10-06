import type { Metadata } from "next";
import Link from "next/link";
import PasswordField from "@/components/admin/PasswordField";
import SubmitButton from "@/components/admin/SubmitButton";
import AuthCard from "../AuthCard";
import { login } from "./actions";

export const metadata: Metadata = {
  title: "Admin Login | DEGSS",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string; reset?: string }>;
}) {
  const { error, next = "/admin", reset } = await searchParams;

  return (
    <AuthCard title="Admin sign in" description="DEGSS content and submissions dashboard.">
      {reset && (
        <p className="mb-5 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
          Your password has been reset. Sign in below.
        </p>
      )}
      {error && (
        <p className="mb-5 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          Invalid email or password.
        </p>
      )}

      <form action={login} className="space-y-4">
        <input type="hidden" name="next" value={next} />
        <div>
          <label
            htmlFor="email"
            className="mb-1.5 block text-sm font-medium text-neutral-700"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="username"
            className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-neutral-950 focus:outline-none focus:ring-2 focus:ring-neutral-950/10"
          />
        </div>

        <PasswordField label="Password" name="password" autoComplete="current-password" />

        <div className="flex justify-end">
          <Link
            href="/admin/forgot-password"
            className="text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-950"
          >
            Forgot password?
          </Link>
        </div>

        <SubmitButton
          pendingLabel="Signing in…"
          className="w-full rounded-full bg-neutral-950 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Sign in
        </SubmitButton>
      </form>
    </AuthCard>
  );
}
