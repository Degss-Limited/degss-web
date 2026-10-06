import "server-only";
import { getSupabase } from "@/lib/supabase";

export const SERVICE_ICON_NAMES = [
  "BuildingIcon",
  "KeyIcon",
  "ClipboardCheckIcon",
  "ShieldCheckIcon",
  "LeafIcon",
  "OrbitIcon",
] as const;

export type ServiceIconName = (typeof SERVICE_ICON_NAMES)[number];

export type Service = {
  id: string;
  slug: string;
  label: string;
  description: string;
  iconName: ServiceIconName;
  sortOrder: number;
};

export type ServiceInput = {
  slug: string;
  label: string;
  description: string;
  iconName: ServiceIconName;
  sortOrder?: number;
};

export function isServiceIconName(value: string): value is ServiceIconName {
  return (SERVICE_ICON_NAMES as readonly string[]).includes(value);
}

export async function listServices(): Promise<Service[]> {
  const supabase = getSupabase();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("services")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("[services] listServices failed:", error.message);
    return [];
  }

  return data.map((row) => ({
    id: row.id,
    slug: row.slug,
    label: row.label,
    description: row.description,
    iconName: isServiceIconName(row.icon_name) ? row.icon_name : "BuildingIcon",
    sortOrder: row.sort_order,
  }));
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const supabase = getSupabase();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error || !data) return null;
  return {
    id: data.id,
    slug: data.slug,
    label: data.label,
    description: data.description,
    iconName: isServiceIconName(data.icon_name) ? data.icon_name : "BuildingIcon",
    sortOrder: data.sort_order,
  };
}

export async function getServiceById(id: string): Promise<Service | null> {
  const supabase = getSupabase();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) return null;
  return {
    id: data.id,
    slug: data.slug,
    label: data.label,
    description: data.description,
    iconName: isServiceIconName(data.icon_name) ? data.icon_name : "BuildingIcon",
    sortOrder: data.sort_order,
  };
}

export async function createService(input: ServiceInput) {
  const supabase = getSupabase();
  if (!supabase) throw new Error("Database is not configured.");

  const { error } = await supabase.from("services").insert({
    slug: input.slug,
    label: input.label,
    description: input.description,
    icon_name: input.iconName,
    ...(input.sortOrder !== undefined ? { sort_order: input.sortOrder } : {}),
  });

  if (error) throw new Error(error.message);
}

export async function updateService(id: string, input: ServiceInput) {
  const supabase = getSupabase();
  if (!supabase) throw new Error("Database is not configured.");

  const { error } = await supabase
    .from("services")
    .update({
      slug: input.slug,
      label: input.label,
      description: input.description,
      icon_name: input.iconName,
      ...(input.sortOrder !== undefined ? { sort_order: input.sortOrder } : {}),
    })
    .eq("id", id);

  if (error) throw new Error(error.message);
}

export async function deleteService(id: string) {
  const supabase = getSupabase();
  if (!supabase) throw new Error("Database is not configured.");

  const { error } = await supabase.from("services").delete().eq("id", id);
  if (error) throw new Error(error.message);
}
