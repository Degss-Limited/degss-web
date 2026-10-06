import type { Metadata } from "next";
import { redirect } from "next/navigation";
import PasswordField from "@/components/admin/PasswordField";
import AuthCard from "../AuthCard";
import { resetPassword } from "./actions";

export const metadata: Metadata = {
  title: "Reset Password | DEGSS",
  robots: { index: false, follow: false },
};

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string; error?: string }>;
}) {
  const { token, error } = await searchParams;

  if (!token) {
    redirect("/admin/forgot-password");
  }

  return (
    <AuthCard title="Set a new password" description="Choose a new password for your admin login.">
      {error && (
        <p className="mb-5 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          Passwords must match and be at least 8 characters.
        </p>
      )}

      <form action={resetPassword} className="space-y-4">
        <input type="hidden" name="token" value={token} />
        <PasswordField label="New password" name="password" autoComplete="new-password" />
        <PasswordField
          label="Confirm new password"
          name="confirmPassword"
          autoComplete="new-password"
        />

        <button
          type="submit"
          className="w-full rounded-full bg-neutral-950 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
        >
          Reset password
        </button>
      </form>
    </AuthCard>
  );
}
