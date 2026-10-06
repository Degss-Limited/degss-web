"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { findAdminByEmail, setPasswordResetToken } from "@/lib/data/admins";
import { createPasswordResetToken, PASSWORD_RESET_TOKEN_TTL_MS } from "@/lib/auth";
import { sendPasswordResetEmail } from "@/lib/email";

export async function requestPasswordReset(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();

  if (email) {
    const admin = await findAdminByEmail(email);

    if (admin) {
      const { token, tokenHash } = createPasswordResetToken();
      const expiresAt = new Date(Date.now() + PASSWORD_RESET_TOKEN_TTL_MS);
      await setPasswordResetToken(admin.email, tokenHash, expiresAt);

      const headerList = await headers();
      const origin =
        process.env.NEXT_PUBLIC_SITE_URL ??
        `${headerList.get("x-forwarded-proto") ?? "http"}://${headerList.get("host")}`;

      await sendPasswordResetEmail({
        to: admin.email,
        resetUrl: `${origin}/admin/reset-password?token=${token}`,
      });
    }
  }

  // Always redirect to the same confirmation, whether or not the email
  // matched an account — this avoids revealing which emails have logins.
  redirect("/admin/forgot-password?sent=1");
}
