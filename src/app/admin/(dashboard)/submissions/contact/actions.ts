"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  deleteContactSubmission,
  setContactSubmissionRead,
} from "@/lib/data/submissions";
import { withToast } from "@/lib/toast";

export async function toggleContactReadAction(
  id: string,
  isRead: boolean,
  returnTo: string
) {
  try {
    await setContactSubmissionRead(id, isRead);
  } catch (err) {
    console.error("[contact] toggle read failed:", err);
    redirect(withToast(returnTo, "error", "Could not update the message."));
  }

  revalidatePath("/admin/submissions/contact");
  revalidatePath("/admin");
  redirect(
    withToast(returnTo, "success", isRead ? "Marked as read." : "Marked as unread.")
  );
}

export async function deleteContactSubmissionAction(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const returnTo = String(formData.get("returnTo") ?? "/admin/submissions/contact");
  if (!id) return;

  try {
    await deleteContactSubmission(id);
  } catch (err) {
    console.error("[contact] delete failed:", err);
    redirect(withToast(returnTo, "error", "Could not delete the message."));
  }

  revalidatePath("/admin/submissions/contact");
  revalidatePath("/admin");
  redirect(withToast(returnTo, "success", "Message deleted."));
}
