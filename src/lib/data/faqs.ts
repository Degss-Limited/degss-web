import "server-only";
import { getSupabase } from "@/lib/supabase";

export type Faq = {
  id: string;
  question: string;
  answer: string;
  sortOrder: number;
};

export type FaqInput = {
  question: string;
  answer: string;
  sortOrder?: number;
};

export async function listFaqs(): Promise<Faq[]> {
  const supabase = getSupabase();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("faqs")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("[faqs] listFaqs failed:", error.message);
    return [];
  }

  return data.map((row) => ({
    id: row.id,
    question: row.question,
    answer: row.answer,
    sortOrder: row.sort_order,
  }));
}

export async function createFaq(input: FaqInput) {
  const supabase = getSupabase();
  if (!supabase) throw new Error("Database is not configured.");

  const { error } = await supabase.from("faqs").insert({
    question: input.question,
    answer: input.answer,
    ...(input.sortOrder !== undefined ? { sort_order: input.sortOrder } : {}),
  });

  if (error) throw new Error(error.message);
}

export async function updateFaq(id: string, input: FaqInput) {
  const supabase = getSupabase();
  if (!supabase) throw new Error("Database is not configured.");

  const { error } = await supabase
    .from("faqs")
    .update({
      question: input.question,
      answer: input.answer,
      ...(input.sortOrder !== undefined ? { sort_order: input.sortOrder } : {}),
    })
    .eq("id", id);

  if (error) throw new Error(error.message);
}

export async function deleteFaq(id: string) {
  const supabase = getSupabase();
  if (!supabase) throw new Error("Database is not configured.");

  const { error } = await supabase.from("faqs").delete().eq("id", id);
  if (error) throw new Error(error.message);
}
