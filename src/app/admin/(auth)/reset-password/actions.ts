"use server";

import { redirect } from "next/navigation";
import { findAdminByResetTokenHash, updateAdminPassword } from "@/lib/data/admins";
import { hashPassword, hashResetToken } from "@/lib/auth";

export async function resetPassword(formData: FormData) {
  const token = String(formData.get("token") ?? "");
  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");

  const failUrl = `/admin/reset-password?token=${encodeURIComponent(token)}&error=1`;

  if (!token || password.length < 8 || password !== confirmPassword) {
    redirect(failUrl);
  }

  const admin = await findAdminByResetTokenHash(hashResetToken(token));
  if (!admin) {
    redirect("/admin/forgot-password?expired=1");
  }

  await updateAdminPassword(admin.id, await hashPassword(password));
  redirect("/admin/login?reset=1");
}
