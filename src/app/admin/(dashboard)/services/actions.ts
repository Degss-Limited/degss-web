"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { withToast } from "@/lib/toast";
import {
  createService,
  deleteService,
  isServiceIconName,
  updateService,
  type ServiceInput,
} from "@/lib/data/services";

function readServiceInput(formData: FormData): ServiceInput {
  const iconName = String(formData.get("iconName") ?? "");

  return {
    slug: String(formData.get("slug") ?? "").trim(),
    label: String(formData.get("label") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    iconName: isServiceIconName(iconName) ? iconName : "BuildingIcon",
  };
}

function revalidateServicePaths() {
  revalidatePath("/admin/services");
  revalidatePath("/", "layout");
}

export async function createServiceAction(formData: FormData) {
  const input = readServiceInput(formData);

  try {
    await createService(input);
  } catch (err) {
    console.error("[services] create failed:", err);
    redirect(
      withToast("/admin/services", "error", "Could not create the service.")
    );
  }

  revalidateServicePaths();
  redirect(withToast("/admin/services", "success", "Service created."));
}

export async function updateServiceAction(id: string, formData: FormData) {
  const input = readServiceInput(formData);

  try {
    await updateService(id, input);
  } catch (err) {
    console.error("[services] update failed:", err);
    redirect(
      withToast("/admin/services", "error", "Could not update the service.")
    );
  }

  revalidateServicePaths();
  redirect(withToast("/admin/services", "success", "Service updated."));
}

export async function deleteServiceAction(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  try {
    await deleteService(id);
  } catch (err) {
    console.error("[services] delete failed:", err);
    redirect(
      withToast("/admin/services", "error", "Could not delete the service.")
    );
  }

  revalidateServicePaths();
  redirect(withToast("/admin/services", "success", "Service deleted."));
}
