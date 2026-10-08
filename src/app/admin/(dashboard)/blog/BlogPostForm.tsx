import Link from "next/link";
import { Field, SelectField, TextareaField } from "@/components/admin/fields";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { RichTextField } from "@/components/admin/RichTextField";
import SlugField from "@/components/admin/SlugField";
import { BLOG_POST_STATUSES, type BlogPost } from "@/lib/data/blog";

export default function BlogPostForm({
  post,
  action,
}: {
  post?: BlogPost;
  action: (formData: FormData) => void;
}) {
  return (
    <form action={action} className="w-full space-y-5 rounded-2xl border border-black/10 bg-white p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Title" name="title" defaultValue={post?.title} required />
        <SlugField
          defaultValue={post?.slug}
          hint="Used in the URL, e.g. /blog/thinking-beyond-the-plot"
        />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Author" name="author" defaultValue={post?.author} placeholder="DEGSS Limited" />
        <SelectField
          label="Status"
          name="status"
          defaultValue={post?.status ?? "draft"}
          options={BLOG_POST_STATUSES.map((status) => ({
            label: status === "published" ? "Published" : "Draft",
            value: status,
          }))}
          required
        />
      </div>

      <ImageUploadField
        label="Cover image"
        name="coverImage"
        defaultValue={post?.coverImage}
        required
      />

      <TextareaField
        label="Excerpt"
        name="excerpt"
        defaultValue={post?.excerpt}
        rows={2}
        hint="Shown on the blog listing card and used as the page description."
      />

      <RichTextField label="Content" name="content" defaultValue={post?.content} required />

      <div className="flex items-center gap-3">
        <button
          type="submit"
          className="rounded-full bg-neutral-950 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
        >
          {post ? "Save changes" : "Create post"}
        </button>
        <Link
          href="/admin/blog"
          className="rounded-full border border-black/10 px-6 py-3 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
