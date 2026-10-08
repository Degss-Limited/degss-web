import Link from "next/link";
import ConfirmSubmitButton from "@/components/admin/ConfirmSubmitButton";
import EmptyState from "@/components/admin/EmptyState";
import { listBlogPosts } from "@/lib/data/blog";
import { deleteBlogPostAction } from "./actions";

export default async function AdminBlogPage() {
  const posts = await listBlogPosts();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Blog</h1>
          <p className="mt-1 text-sm text-neutral-500">
            Shown on the public /blog page. Drafts stay hidden until published.
          </p>
        </div>
        <Link
          href="/admin/blog/new"
          className="rounded-full bg-neutral-950 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
        >
          New post
        </Link>
      </div>

      <div className="mt-6 space-y-3">
        {posts.length === 0 && (
          <div className="rounded-2xl border border-black/10 bg-white">
            <EmptyState title="No blog posts yet" />
          </div>
        )}
        {posts.map((post) => (
          <div
            key={post.id}
            className="flex items-center justify-between gap-4 rounded-2xl border border-black/10 bg-white p-5"
          >
            <div className="flex min-w-0 items-center gap-4">
              {post.coverImage && (
                // eslint-disable-next-line @next/next/no-img-element -- admin-entered URLs can be any domain
                <img
                  src={post.coverImage}
                  alt=""
                  className="h-14 w-20 shrink-0 rounded-xl object-cover"
                />
              )}
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="truncate font-medium text-neutral-950">{post.title}</p>
                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium ${
                      post.status === "published"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-neutral-100 text-neutral-500"
                    }`}
                  >
                    {post.status === "published" ? "Published" : "Draft"}
                  </span>
                </div>
                <p className="truncate text-sm text-neutral-500">{post.excerpt}</p>
                <p className="mt-1 text-xs text-neutral-400">
                  /blog/{post.slug}
                  {post.author && <> &middot; {post.author}</>}
                </p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <Link
                href={`/admin/blog/${post.id}/edit`}
                className="rounded-full border border-black/10 px-3 py-1.5 text-xs font-medium text-neutral-700 transition-colors hover:bg-neutral-100"
              >
                Edit
              </Link>
              <form action={deleteBlogPostAction}>
                <input type="hidden" name="id" value={post.id} />
                <ConfirmSubmitButton
                  confirmMessage={`Delete "${post.title}"?`}
                  className="rounded-full border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-50"
                >
                  Delete
                </ConfirmSubmitButton>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
