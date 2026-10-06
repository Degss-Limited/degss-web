import "server-only";
import { getSupabase } from "@/lib/supabase";

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  rating: number;
  quote: string;
  sortOrder: number;
};

export type TestimonialInput = {
  name: string;
  role: string;
  rating: number;
  quote: string;
  sortOrder?: number;
};

function clampRating(value: number): number {
  return Math.min(5, Math.max(1, Math.round(value) || 5));
}

export async function listTestimonials(): Promise<Testimonial[]> {
  const supabase = getSupabase();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("[testimonials] listTestimonials failed:", error.message);
    return [];
  }

  return data.map((row) => ({
    id: row.id,
    name: row.name,
    role: row.role,
    rating: row.rating,
    quote: row.quote,
    sortOrder: row.sort_order,
  }));
}

export async function getTestimonialById(id: string): Promise<Testimonial | null> {
  const supabase = getSupabase();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) return null;
  return {
    id: data.id,
    name: data.name,
    role: data.role,
    rating: data.rating,
    quote: data.quote,
    sortOrder: data.sort_order,
  };
}

export async function createTestimonial(input: TestimonialInput) {
  const supabase = getSupabase();
  if (!supabase) throw new Error("Database is not configured.");

  const { error } = await supabase.from("testimonials").insert({
    name: input.name,
    role: input.role,
    rating: clampRating(input.rating),
    quote: input.quote,
    ...(input.sortOrder !== undefined ? { sort_order: input.sortOrder } : {}),
  });

  if (error) throw new Error(error.message);
}

export async function updateTestimonial(id: string, input: TestimonialInput) {
  const supabase = getSupabase();
  if (!supabase) throw new Error("Database is not configured.");

  const { error } = await supabase
    .from("testimonials")
    .update({
      name: input.name,
      role: input.role,
      rating: clampRating(input.rating),
      quote: input.quote,
      ...(input.sortOrder !== undefined ? { sort_order: input.sortOrder } : {}),
    })
    .eq("id", id);

  if (error) throw new Error(error.message);
}

export async function deleteTestimonial(id: string) {
  const supabase = getSupabase();
  if (!supabase) throw new Error("Database is not configured.");

  const { error } = await supabase.from("testimonials").delete().eq("id", id);
  if (error) throw new Error(error.message);
}
