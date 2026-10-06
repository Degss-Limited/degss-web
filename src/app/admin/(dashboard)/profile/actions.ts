"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { findAdminById, updateAdminName, updateAdminPassword } from "@/lib/data/admins";
import {
  SESSION_COOKIE,
  SESSION_MAX_AGE,
  createSessionToken,
  hashPassword,
  verifyPassword,
  verifySessionToken,
} from "@/lib/auth";
import { withToast } from "@/lib/toast";

const BASE_PATH = "/admin/profile";

async function requireSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  const session = token ? await verifySessionToken(token) : null;
  if (!session) redirect("/admin/login");
  return session;
}

export async function updateProfileAction(formData: FormData) {
  const session = await requireSession();
  const name = String(formData.get("name") ?? "").trim();

  if (!name) {
    redirect(withToast(BASE_PATH, "error", "Name can't be empty."));
  }

  try {
    await updateAdminName(session.sub, name);
  } catch (err) {
    console.error("[profile] update failed:", err);
    redirect(withToast(BASE_PATH, "error", "Could not update your profile."));
  }

  // The session JWT carries the display name, so it has to be reissued for
  // the new name to show up in the sidebar/topbar without a re-login.
  const token = await createSessionToken({
    sub: session.sub,
    email: session.email,
    name,
  });
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });

  redirect(withToast(BASE_PATH, "success", "Profile updated."));
}

export async function changePasswordAction(formData: FormData) {
  const session = await requireSession();
  const currentPassword = String(formData.get("currentPassword") ?? "");
  const newPassword = String(formData.get("newPassword") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");

  if (!currentPassword || newPassword.length < 8 || newPassword !== confirmPassword) {
    redirect(
      withToast(
        BASE_PATH,
        "error",
        "New passwords must match and be at least 8 characters."
      )
    );
  }

  const admin = await findAdminById(session.sub);
  if (!admin) {
    redirect("/admin/login");
  }

  const valid = await verifyPassword(currentPassword, admin.passwordHash);
  if (!valid) {
    redirect(withToast(BASE_PATH, "error", "Current password is incorrect."));
  }

  try {
    await updateAdminPassword(admin.id, await hashPassword(newPassword));
  } catch (err) {
    console.error("[profile] password change failed:", err);
    redirect(withToast(BASE_PATH, "error", "Could not change your password."));
  }

  redirect(withToast(BASE_PATH, "success", "Password changed."));
}
