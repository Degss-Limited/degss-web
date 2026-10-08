import "server-only";
import { getSupabase } from "@/lib/supabase";

export type HeroSlide = {
  id: string;
  image: string;
  alt: string;
  sortOrder: number;
};

export type HeroSlideInput = {
  image: string;
  alt: string;
  sortOrder?: number;
};

export async function listHeroSlides(): Promise<HeroSlide[]> {
  const supabase = getSupabase();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("hero_slides")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("[heroSlides] listHeroSlides failed:", error.message);
    return [];
  }

  return data.map((row) => ({
    id: row.id,
    image: row.image,
    alt: row.alt,
    sortOrder: row.sort_order,
  }));
}

export async function getHeroSlideById(id: string): Promise<HeroSlide | null> {
  const supabase = getSupabase();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("hero_slides")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) return null;
  return {
    id: data.id,
    image: data.image,
    alt: data.alt,
    sortOrder: data.sort_order,
  };
}

export async function createHeroSlide(input: HeroSlideInput) {
  const supabase = getSupabase();
  if (!supabase) throw new Error("Database is not configured.");

  const { error } = await supabase.from("hero_slides").insert({
    image: input.image,
    alt: input.alt,
    ...(input.sortOrder !== undefined ? { sort_order: input.sortOrder } : {}),
  });

  if (error) throw new Error(error.message);
}

export async function updateHeroSlide(id: string, input: HeroSlideInput) {
  const supabase = getSupabase();
  if (!supabase) throw new Error("Database is not configured.");

  const { error } = await supabase
    .from("hero_slides")
    .update({
      image: input.image,
      alt: input.alt,
      ...(input.sortOrder !== undefined ? { sort_order: input.sortOrder } : {}),
    })
    .eq("id", id);

  if (error) throw new Error(error.message);
}

export async function deleteHeroSlide(id: string) {
  const supabase = getSupabase();
  if (!supabase) throw new Error("Database is not configured.");

  const { error } = await supabase.from("hero_slides").delete().eq("id", id);
  if (error) throw new Error(error.message);
}
