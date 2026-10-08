"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { resolveUploadedImage } from "@/lib/cloudinary";
import { sanitizeRichText } from "@/lib/sanitize";
import { withToast } from "@/lib/toast";
import {
  createBlogPost,
  deleteBlogPost,
  isBlogPostStatus,
  updateBlogPost,
  type BlogPostInput,
} from "@/lib/data/blog";

async function readBlogPostInput(formData: FormData): Promise<BlogPostInput> {
  const status = String(formData.get("status") ?? "");
  const coverImage = await resolveUploadedImage(formData, "coverImage", "blog");

  return {
    slug: String(formData.get("slug") ?? "").trim(),
    title: String(formData.get("title") ?? "").trim(),
    excerpt: String(formData.get("excerpt") ?? "").trim(),
    content: sanitizeRichText(String(formData.get("content") ?? "").trim()),
    coverImage,
    author: String(formData.get("author") ?? "").trim(),
    status: isBlogPostStatus(status) ? status : "draft",
  };
}

function revalidateBlogPaths() {
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath("/", "layout");
}

export async function createBlogPostAction(formData: FormData) {
  try {
    const input = await readBlogPostInput(formData);
    await createBlogPost(input);
  } catch (err) {
    console.error("[blog] create failed:", err);
    redirect(withToast("/admin/blog", "error", "Could not create the post."));
  }

  revalidateBlogPaths();
  redirect(withToast("/admin/blog", "success", "Post created."));
}

export async function updateBlogPostAction(id: string, formData: FormData) {
  try {
    const input = await readBlogPostInput(formData);
    await updateBlogPost(id, input);
  } catch (err) {
    console.error("[blog] update failed:", err);
    redirect(withToast("/admin/blog", "error", "Could not update the post."));
  }

  revalidateBlogPaths();
  redirect(withToast("/admin/blog", "success", "Post updated."));
}

export async function deleteBlogPostAction(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  try {
    await deleteBlogPost(id);
  } catch (err) {
    console.error("[blog] delete failed:", err);
    redirect(withToast("/admin/blog", "error", "Could not delete the post."));
  }

  revalidateBlogPaths();
  redirect(withToast("/admin/blog", "success", "Post deleted."));
}
