import "server-only";
import { getSupabase } from "@/lib/supabase";

export type AdminUser = {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
};

export async function findAdminByEmail(email: string): Promise<AdminUser | null> {
  const supabase = getSupabase();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("admin_users")
    .select("*")
    .eq("email", email.trim().toLowerCase())
    .maybeSingle();

  if (error || !data) return null;

  return {
    id: data.id,
    email: data.email,
    name: data.name,
    passwordHash: data.password_hash,
  };
}

export async function findAdminById(id: string): Promise<AdminUser | null> {
  const supabase = getSupabase();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("admin_users")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) return null;

  return {
    id: data.id,
    email: data.email,
    name: data.name,
    passwordHash: data.password_hash,
  };
}

export async function updateAdminName(id: string, name: string) {
  const supabase = getSupabase();
  if (!supabase) throw new Error("Database is not configured.");

  const { error } = await supabase
    .from("admin_users")
    .update({ name })
    .eq("id", id);

  if (error) throw new Error(error.message);
}

export async function setPasswordResetToken(
  email: string,
  tokenHash: string,
  expiresAt: Date
) {
  const supabase = getSupabase();
  if (!supabase) return;

  await supabase
    .from("admin_users")
    .update({
      reset_token_hash: tokenHash,
      reset_token_expires_at: expiresAt.toISOString(),
    })
    .eq("email", email.trim().toLowerCase());
}

export async function findAdminByResetTokenHash(
  tokenHash: string
): Promise<AdminUser | null> {
  const supabase = getSupabase();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("admin_users")
    .select("*")
    .eq("reset_token_hash", tokenHash)
    .gt("reset_token_expires_at", new Date().toISOString())
    .maybeSingle();

  if (error || !data) return null;

  return {
    id: data.id,
    email: data.email,
    name: data.name,
    passwordHash: data.password_hash,
  };
}

export async function updateAdminPassword(id: string, passwordHash: string) {
  const supabase = getSupabase();
  if (!supabase) throw new Error("Database is not configured.");

  const { error } = await supabase
    .from("admin_users")
    .update({
      password_hash: passwordHash,
      reset_token_hash: null,
      reset_token_expires_at: null,
    })
    .eq("id", id);

  if (error) throw new Error(error.message);
}
