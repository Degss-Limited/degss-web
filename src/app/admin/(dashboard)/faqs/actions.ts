"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createFaq, deleteFaq, updateFaq, type FaqInput } from "@/lib/data/faqs";
import { withToast } from "@/lib/toast";

function readFaqInput(formData: FormData): FaqInput {
  return {
    question: String(formData.get("question") ?? "").trim(),
    answer: String(formData.get("answer") ?? "").trim(),
  };
}

function revalidateFaqPaths() {
  revalidatePath("/admin/faqs");
  revalidatePath("/faqs");
}

export async function createFaqAction(formData: FormData) {
  try {
    await createFaq(readFaqInput(formData));
  } catch (err) {
    console.error("[faqs] create failed:", err);
    redirect(withToast("/admin/faqs", "error", "Could not create the FAQ."));
  }

  revalidateFaqPaths();
  redirect(withToast("/admin/faqs", "success", "FAQ created."));
}

export async function updateFaqAction(id: string, formData: FormData) {
  try {
    await updateFaq(id, readFaqInput(formData));
  } catch (err) {
    console.error("[faqs] update failed:", err);
    redirect(withToast("/admin/faqs", "error", "Could not update the FAQ."));
  }

  revalidateFaqPaths();
  redirect(withToast("/admin/faqs", "success", "FAQ updated."));
}

export async function deleteFaqAction(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  try {
    await deleteFaq(id);
  } catch (err) {
    console.error("[faqs] delete failed:", err);
    redirect(withToast("/admin/faqs", "error", "Could not delete the FAQ."));
  }

  revalidateFaqPaths();
  redirect(withToast("/admin/faqs", "success", "FAQ deleted."));
}
