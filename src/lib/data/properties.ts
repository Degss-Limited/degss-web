import "server-only";
import { getSupabase } from "@/lib/supabase";

export type Property = {
  id: string;
  slug: string;
  title: string;
  location: string;
  price: string;
  description: string;
  about: string[];
  image: string;
  gallery: string[];
  beds: number;
  baths: number;
  sqft: string;
  highlight: string;
  status: "Available" | "Under Offer" | "Sold";
  propertyType: string;
  yearBuilt: number | null;
  lotSize: string;
  parking: string;
  features: string[];
  neighborhood: {
    name: string;
    city: string;
    description: string;
  };
  listingType: "Building" | "Land";
  sortOrder: number;
};

export type PropertyInput = Omit<Property, "id" | "sortOrder"> & {
  sortOrder?: number;
};

type PropertyRow = {
  id: string;
  slug: string;
  title: string;
  location: string;
  price: string;
  description: string;
  about: string[];
  image: string;
  gallery: string[];
  beds: number;
  baths: number;
  sqft: string;
  highlight: string;
  status: string;
  property_type: string;
  year_built: number | null;
  lot_size: string;
  parking: string;
  features: string[];
  neighborhood_name: string;
  neighborhood_city: string;
  neighborhood_description: string;
  listing_type: string;
  sort_order: number;
};

function fromRow(row: PropertyRow): Property {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    location: row.location,
    price: row.price,
    description: row.description,
    about: row.about ?? [],
    image: row.image,
    gallery: row.gallery ?? [],
    beds: row.beds,
    baths: row.baths,
    sqft: row.sqft,
    highlight: row.highlight,
    status:
      row.status === "Under Offer" || row.status === "Sold"
        ? row.status
        : "Available",
    propertyType: row.property_type,
    yearBuilt: row.year_built,
    lotSize: row.lot_size,
    parking: row.parking,
    features: row.features ?? [],
    neighborhood: {
      name: row.neighborhood_name,
      city: row.neighborhood_city,
      description: row.neighborhood_description,
    },
    listingType: row.listing_type === "Land" ? "Land" : "Building",
    sortOrder: row.sort_order,
  };
}

function toRow(input: PropertyInput) {
  return {
    slug: input.slug,
    title: input.title,
    location: input.location,
    price: input.price,
    description: input.description,
    about: input.about,
    image: input.image,
    gallery: input.gallery,
    beds: input.beds,
    baths: input.baths,
    sqft: input.sqft,
    highlight: input.highlight,
    status: input.status,
    property_type: input.propertyType,
    year_built: input.yearBuilt,
    lot_size: input.lotSize,
    parking: input.parking,
    features: input.features,
    neighborhood_name: input.neighborhood.name,
    neighborhood_city: input.neighborhood.city,
    neighborhood_description: input.neighborhood.description,
    listing_type: input.listingType,
    ...(input.sortOrder !== undefined ? { sort_order: input.sortOrder } : {}),
  };
}

export async function listProperties(): Promise<Property[]> {
  const supabase = getSupabase();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("[properties] listProperties failed:", error.message);
    return [];
  }

  return (data as PropertyRow[]).map(fromRow);
}

export async function getPropertyBySlug(slug: string): Promise<Property | null> {
  const supabase = getSupabase();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    console.error("[properties] getPropertyBySlug failed:", error.message);
    return null;
  }

  return data ? fromRow(data as PropertyRow) : null;
}

export async function getPropertyById(id: string): Promise<Property | null> {
  const supabase = getSupabase();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("[properties] getPropertyById failed:", error.message);
    return null;
  }

  return data ? fromRow(data as PropertyRow) : null;
}

export async function createProperty(input: PropertyInput) {
  const supabase = getSupabase();
  if (!supabase) throw new Error("Database is not configured.");

  const { data, error } = await supabase
    .from("properties")
    .insert(toRow(input))
    .select("id")
    .single();

  if (error) throw new Error(error.message);
  return data.id as string;
}

export async function updateProperty(id: string, input: PropertyInput) {
  const supabase = getSupabase();
  if (!supabase) throw new Error("Database is not configured.");

  const { error } = await supabase
    .from("properties")
    .update(toRow(input))
    .eq("id", id);

  if (error) throw new Error(error.message);
}

export async function deleteProperty(id: string) {
  const supabase = getSupabase();
  if (!supabase) throw new Error("Database is not configured.");

  const { error } = await supabase.from("properties").delete().eq("id", id);
  if (error) throw new Error(error.message);
}
