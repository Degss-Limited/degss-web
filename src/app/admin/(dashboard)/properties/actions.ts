"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { linesToArray } from "@/components/admin/fields";
import { resolveUploadedImage, uploadImages } from "@/lib/cloudinary";
import { formatPrice, formatThousands } from "@/lib/format";
import { withToast } from "@/lib/toast";
import {
  createProperty,
  deleteProperty,
  updateProperty,
  type PropertyInput,
} from "@/lib/data/properties";

async function readPropertyInput(formData: FormData): Promise<PropertyInput> {
  const status = String(formData.get("status") ?? "Available");
  const listingType = String(formData.get("listingType") ?? "Building");
  const yearBuiltRaw = String(formData.get("yearBuilt") ?? "").trim();

  const image = await resolveUploadedImage(formData, "image", "properties");
  const newGalleryFiles = formData
    .getAll("galleryFiles")
    .filter((file): file is File => file instanceof File && file.size > 0);
  const uploadedGallery = await uploadImages(newGalleryFiles, "properties");
  const existingGallery = linesToArray(formData.get("galleryCurrent"));

  return {
    slug: String(formData.get("slug") ?? "").trim(),
    title: String(formData.get("title") ?? "").trim(),
    location: String(formData.get("location") ?? "").trim(),
    price: formatPrice(String(formData.get("price") ?? "").trim()),
    description: String(formData.get("description") ?? "").trim(),
    about: linesToArray(formData.get("about")),
    image,
    gallery: [...existingGallery, ...uploadedGallery],
    beds: Number(formData.get("beds") ?? 0),
    baths: Number(formData.get("baths") ?? 0),
    sqft: formatThousands(String(formData.get("sqft") ?? "").trim()),
    highlight: String(formData.get("highlight") ?? "").trim(),
    status:
      status === "Under Offer" || status === "Sold" ? status : "Available",
    propertyType: String(formData.get("propertyType") ?? "").trim(),
    yearBuilt: yearBuiltRaw ? Number(yearBuiltRaw) : null,
    lotSize: String(formData.get("lotSize") ?? "").trim(),
    parking: String(formData.get("parking") ?? "").trim(),
    features: linesToArray(formData.get("features")),
    neighborhood: {
      name: String(formData.get("neighborhoodName") ?? "").trim(),
      city: String(formData.get("neighborhoodCity") ?? "").trim(),
      description: String(formData.get("neighborhoodDescription") ?? "").trim(),
    },
    listingType: listingType === "Land" ? "Land" : "Building",
  };
}

function revalidatePropertyPaths(slug?: string) {
  revalidatePath("/admin/properties");
  revalidatePath("/properties");
  if (slug) revalidatePath(`/properties/${slug}`);
}

export async function createPropertyAction(formData: FormData) {
  let slug: string;

  try {
    const input = await readPropertyInput(formData);
    slug = input.slug;
    await createProperty(input);
  } catch (err) {
    console.error("[properties] create failed:", err);
    redirect(
      withToast("/admin/properties", "error", "Could not create the property.")
    );
  }

  revalidatePropertyPaths(slug);
  redirect(withToast("/admin/properties", "success", "Property created."));
}

export async function updatePropertyAction(id: string, formData: FormData) {
  let slug: string;

  try {
    const input = await readPropertyInput(formData);
    slug = input.slug;
    await updateProperty(id, input);
  } catch (err) {
    console.error("[properties] update failed:", err);
    redirect(
      withToast("/admin/properties", "error", "Could not update the property.")
    );
  }

  revalidatePropertyPaths(slug);
  redirect(withToast("/admin/properties", "success", "Property updated."));
}

export async function deletePropertyAction(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const slug = String(formData.get("slug") ?? "");
  if (!id) return;

  try {
    await deleteProperty(id);
  } catch (err) {
    console.error("[properties] delete failed:", err);
    redirect(
      withToast("/admin/properties", "error", "Could not delete the property.")
    );
  }

  revalidatePropertyPaths(slug);
  redirect(withToast("/admin/properties", "success", "Property deleted."));
}
