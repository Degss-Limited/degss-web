"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { resolveUploadedImage } from "@/lib/cloudinary";
import { withToast } from "@/lib/toast";
import {
  createHeroSlide,
  deleteHeroSlide,
  updateHeroSlide,
  type HeroSlideInput,
} from "@/lib/data/heroSlides";

async function readHeroSlideInput(formData: FormData): Promise<HeroSlideInput> {
  const image = await resolveUploadedImage(formData, "image", "hero-slides");
  const sortOrder = Number(formData.get("sortOrder"));

  return {
    image,
    alt: String(formData.get("alt") ?? "").trim(),
    sortOrder: Number.isFinite(sortOrder) ? sortOrder : 0,
  };
}

function revalidateHeroSlidePaths() {
  revalidatePath("/admin/hero-slides");
  revalidatePath("/", "layout");
}

export async function createHeroSlideAction(formData: FormData) {
  try {
    const input = await readHeroSlideInput(formData);
    await createHeroSlide(input);
  } catch (err) {
    console.error("[heroSlides] create failed:", err);
    redirect(withToast("/admin/hero-slides", "error", "Could not add the slide."));
  }

  revalidateHeroSlidePaths();
  redirect(withToast("/admin/hero-slides", "success", "Slide added."));
}

export async function updateHeroSlideAction(id: string, formData: FormData) {
  try {
    const input = await readHeroSlideInput(formData);
    await updateHeroSlide(id, input);
  } catch (err) {
    console.error("[heroSlides] update failed:", err);
    redirect(withToast("/admin/hero-slides", "error", "Could not update the slide."));
  }

  revalidateHeroSlidePaths();
  redirect(withToast("/admin/hero-slides", "success", "Slide updated."));
}

export async function deleteHeroSlideAction(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  try {
    await deleteHeroSlide(id);
  } catch (err) {
    console.error("[heroSlides] delete failed:", err);
    redirect(withToast("/admin/hero-slides", "error", "Could not delete the slide."));
  }

  revalidateHeroSlidePaths();
  redirect(withToast("/admin/hero-slides", "success", "Slide deleted."));
}
