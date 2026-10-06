"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { resolveUploadedImage } from "@/lib/cloudinary";
import { sanitizeRichText } from "@/lib/sanitize";
import { withToast } from "@/lib/toast";
import {
  createTeamMember,
  deleteTeamMember,
  updateTeamMember,
  type TeamMemberInput,
} from "@/lib/data/team";

async function readTeamMemberInput(formData: FormData): Promise<TeamMemberInput> {
  const photo = await resolveUploadedImage(formData, "photo", "team");

  return {
    name: String(formData.get("name") ?? "").trim(),
    title: String(formData.get("title") ?? "").trim(),
    photo,
    bio: sanitizeRichText(String(formData.get("bio") ?? "").trim()),
  };
}

function revalidateTeamPaths() {
  revalidatePath("/admin/team");
  revalidatePath("/about/team");
}

export async function createTeamMemberAction(formData: FormData) {
  try {
    const input = await readTeamMemberInput(formData);
    await createTeamMember(input);
  } catch (err) {
    console.error("[team] create failed:", err);
    redirect(
      withToast("/admin/team", "error", "Could not add the team member.")
    );
  }

  revalidateTeamPaths();
  redirect(withToast("/admin/team", "success", "Team member added."));
}

export async function updateTeamMemberAction(id: string, formData: FormData) {
  try {
    const input = await readTeamMemberInput(formData);
    await updateTeamMember(id, input);
  } catch (err) {
    console.error("[team] update failed:", err);
    redirect(
      withToast("/admin/team", "error", "Could not update the team member.")
    );
  }

  revalidateTeamPaths();
  redirect(withToast("/admin/team", "success", "Team member updated."));
}

export async function deleteTeamMemberAction(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  try {
    await deleteTeamMember(id);
  } catch (err) {
    console.error("[team] delete failed:", err);
    redirect(
      withToast("/admin/team", "error", "Could not remove the team member.")
    );
  }

  revalidateTeamPaths();
  redirect(withToast("/admin/team", "success", "Team member removed."));
}
