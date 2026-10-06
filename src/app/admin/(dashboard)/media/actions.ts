"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { deleteMediaAsset } from "@/lib/cloudinary";
import { withToast } from "@/lib/toast";

export async function deleteMediaAssetAction(formData: FormData) {
  const publicId = String(formData.get("publicId") ?? "");
  const returnTo = String(formData.get("returnTo") ?? "/admin/media");
  if (!publicId) return;

  try {
    await deleteMediaAsset(publicId);
  } catch (err) {
    console.error("[media] delete failed:", err);
    redirect(withToast(returnTo, "error", "Could not delete the image."));
  }

  revalidatePath("/admin/media");
  redirect(withToast(returnTo, "success", "Image deleted."));
}
