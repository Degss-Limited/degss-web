import "server-only";
import { getSupabase } from "@/lib/supabase";

export type ContactSubmission = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  isRead: boolean;
  createdAt: string;
};

export type ContactSubmissionInput = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
};

export type GetStartedSubmission = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  reason: string;
  budget: string;
  timeline: string;
  message: string;
  isRead: boolean;
  createdAt: string;
};

export type GetStartedSubmissionInput = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  reason: string;
  budget: string;
  timeline: string;
  message: string;
};

export async function createContactSubmission(input: ContactSubmissionInput) {
  const supabase = getSupabase();
  if (!supabase) throw new Error("Database is not configured.");

  const { error } = await supabase.from("contact_submissions").insert({
    first_name: input.firstName,
    last_name: input.lastName,
    email: input.email,
    phone: input.phone,
    message: input.message,
  });

  if (error) throw new Error(error.message);
}

export async function listContactSubmissions(): Promise<ContactSubmission[]> {
  const supabase = getSupabase();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("contact_submissions")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[submissions] listContactSubmissions failed:", error.message);
    return [];
  }

  return data.map((row) => ({
    id: row.id,
    firstName: row.first_name,
    lastName: row.last_name,
    email: row.email,
    phone: row.phone,
    message: row.message,
    isRead: row.is_read,
    createdAt: row.created_at,
  }));
}

export async function countUnreadContactSubmissions(): Promise<number> {
  const supabase = getSupabase();
  if (!supabase) return 0;

  const { count, error } = await supabase
    .from("contact_submissions")
    .select("*", { count: "exact", head: true })
    .eq("is_read", false);

  if (error) {
    console.error(
      "[submissions] countUnreadContactSubmissions failed:",
      error.message
    );
    return 0;
  }

  return count ?? 0;
}

export async function countUnreadGetStartedSubmissions(): Promise<number> {
  const supabase = getSupabase();
  if (!supabase) return 0;

  const { count, error } = await supabase
    .from("get_started_submissions")
    .select("*", { count: "exact", head: true })
    .eq("is_read", false);

  if (error) {
    console.error(
      "[submissions] countUnreadGetStartedSubmissions failed:",
      error.message
    );
    return 0;
  }

  return count ?? 0;
}

export async function setContactSubmissionRead(id: string, isRead: boolean) {
  const supabase = getSupabase();
  if (!supabase) throw new Error("Database is not configured.");

  const { error } = await supabase
    .from("contact_submissions")
    .update({ is_read: isRead })
    .eq("id", id);

  if (error) throw new Error(error.message);
}

export async function deleteContactSubmission(id: string) {
  const supabase = getSupabase();
  if (!supabase) throw new Error("Database is not configured.");

  const { error } = await supabase
    .from("contact_submissions")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);
}

export async function createGetStartedSubmission(
  input: GetStartedSubmissionInput
) {
  const supabase = getSupabase();
  if (!supabase) throw new Error("Database is not configured.");

  const { error } = await supabase.from("get_started_submissions").insert({
    first_name: input.firstName,
    last_name: input.lastName,
    email: input.email,
    phone: input.phone,
    reason: input.reason,
    budget: input.budget,
    timeline: input.timeline,
    message: input.message,
  });

  if (error) throw new Error(error.message);
}

export async function listGetStartedSubmissions(): Promise<
  GetStartedSubmission[]
> {
  const supabase = getSupabase();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("get_started_submissions")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(
      "[submissions] listGetStartedSubmissions failed:",
      error.message
    );
    return [];
  }

  return data.map((row) => ({
    id: row.id,
    firstName: row.first_name,
    lastName: row.last_name,
    email: row.email,
    phone: row.phone,
    reason: row.reason,
    budget: row.budget,
    timeline: row.timeline,
    message: row.message,
    isRead: row.is_read,
    createdAt: row.created_at,
  }));
}

export async function setGetStartedSubmissionRead(id: string, isRead: boolean) {
  const supabase = getSupabase();
  if (!supabase) throw new Error("Database is not configured.");

  const { error } = await supabase
    .from("get_started_submissions")
    .update({ is_read: isRead })
    .eq("id", id);

  if (error) throw new Error(error.message);
}

export async function deleteGetStartedSubmission(id: string) {
  const supabase = getSupabase();
  if (!supabase) throw new Error("Database is not configured.");

  const { error } = await supabase
    .from("get_started_submissions")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);
}
