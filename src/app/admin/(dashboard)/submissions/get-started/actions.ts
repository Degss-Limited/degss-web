"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  deleteGetStartedSubmission,
  setGetStartedSubmissionRead,
} from "@/lib/data/submissions";
import { withToast } from "@/lib/toast";

const BASE_PATH = "/admin/submissions/get-started";

export async function toggleGetStartedReadAction(
  id: string,
  isRead: boolean,
  returnTo: string
) {
  try {
    await setGetStartedSubmissionRead(id, isRead);
  } catch (err) {
    console.error("[get-started] toggle read failed:", err);
    redirect(withToast(returnTo, "error", "Could not update the lead."));
  }

  revalidatePath(BASE_PATH);
  revalidatePath("/admin");
  redirect(
    withToast(returnTo, "success", isRead ? "Marked as read." : "Marked as unread.")
  );
}

export async function deleteGetStartedSubmissionAction(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const returnTo = String(formData.get("returnTo") ?? BASE_PATH);
  if (!id) return;

  try {
    await deleteGetStartedSubmission(id);
  } catch (err) {
    console.error("[get-started] delete failed:", err);
    redirect(withToast(returnTo, "error", "Could not delete the lead."));
  }

  revalidatePath(BASE_PATH);
  revalidatePath("/admin");
  redirect(withToast(returnTo, "success", "Lead deleted."));
}
