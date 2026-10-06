import type { Metadata } from "next";
import Link from "next/link";
import AuthCard from "../AuthCard";
import { requestPasswordReset } from "./actions";

export const metadata: Metadata = {
  title: "Forgot Password | DEGSS",
  robots: { index: false, follow: false },
};

export default async function ForgotPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ sent?: string; expired?: string }>;
}) {
  const { sent, expired } = await searchParams;

  return (
    <AuthCard
      title="Forgot password"
      description="Enter your admin email and we'll send you a reset link."
    >
      {expired && !sent && (
        <p className="mb-5 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          That reset link is invalid or has expired. Request a new one below.
        </p>
      )}
      {sent ? (
        <p className="rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
          If an account exists for that email, a reset link is on its way.
        </p>
      ) : (
        <form action={requestPasswordReset} className="space-y-4">
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

          <button
            type="submit"
            className="w-full rounded-full bg-neutral-950 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
          >
            Send reset link
          </button>
        </form>
      )}

      <Link
        href="/admin/login"
        className="mt-6 block text-center text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-950"
      >
        ← Back to sign in
      </Link>
    </AuthCard>
  );
}
