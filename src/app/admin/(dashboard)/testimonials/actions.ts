"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { withToast } from "@/lib/toast";
import {
  createTestimonial,
  deleteTestimonial,
  updateTestimonial,
  type TestimonialInput,
} from "@/lib/data/testimonials";

function readTestimonialInput(formData: FormData): TestimonialInput {
  return {
    name: String(formData.get("name") ?? "").trim(),
    role: String(formData.get("role") ?? "").trim(),
    rating: Number(formData.get("rating") ?? 5),
    quote: String(formData.get("quote") ?? "").trim(),
  };
}

function revalidateTestimonialPaths() {
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
}

export async function createTestimonialAction(formData: FormData) {
  try {
    const input = readTestimonialInput(formData);
    await createTestimonial(input);
  } catch (err) {
    console.error("[testimonials] create failed:", err);
    redirect(
      withToast("/admin/testimonials", "error", "Could not add the testimonial.")
    );
  }

  revalidateTestimonialPaths();
  redirect(withToast("/admin/testimonials", "success", "Testimonial added."));
}

export async function updateTestimonialAction(id: string, formData: FormData) {
  try {
    const input = readTestimonialInput(formData);
    await updateTestimonial(id, input);
  } catch (err) {
    console.error("[testimonials] update failed:", err);
    redirect(
      withToast("/admin/testimonials", "error", "Could not update the testimonial.")
    );
  }

  revalidateTestimonialPaths();
  redirect(withToast("/admin/testimonials", "success", "Testimonial updated."));
}

export async function deleteTestimonialAction(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  try {
    await deleteTestimonial(id);
  } catch (err) {
    console.error("[testimonials] delete failed:", err);
    redirect(
      withToast("/admin/testimonials", "error", "Could not delete the testimonial.")
    );
  }

  revalidateTestimonialPaths();
  redirect(withToast("/admin/testimonials", "success", "Testimonial deleted."));
}
