"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { findAdminByEmail } from "@/lib/data/admins";
import { createSessionToken, SESSION_COOKIE, SESSION_MAX_AGE, verifyPassword } from "@/lib/auth";

export async function login(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/admin");

  const failUrl = `/admin/login?error=1&next=${encodeURIComponent(next)}`;

  if (!email || !password) {
    redirect(failUrl);
  }

  const admin = await findAdminByEmail(email);
  if (!admin) {
    redirect(failUrl);
  }

  const valid = await verifyPassword(password, admin.passwordHash);
  if (!valid) {
    redirect(failUrl);
  }

  const token = await createSessionToken({
    sub: admin.id,
    email: admin.email,
    name: admin.name,
  });

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });

  redirect(next.startsWith("/admin") ? next : "/admin");
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  redirect("/admin/login");
}
