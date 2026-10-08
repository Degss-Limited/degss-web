import Link from "next/link";
import type { BlogPost } from "@/lib/data/blog";

export function formatBlogDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function BlogPostCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block overflow-hidden rounded-3xl border border-black/10 bg-white transition-shadow hover:shadow-lg hover:shadow-black/5"
    >
      <div className="p-3 pb-0">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
          {/* eslint-disable-next-line @next/next/no-img-element -- admin-entered URLs can be any domain */}
          <img
            src={post.coverImage}
            alt={post.title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2 p-6">
        <span className="text-xs font-medium uppercase tracking-[0.15em] text-neutral-400">
          {formatBlogDate(post.createdAt)}
        </span>
        <h3 className="text-lg font-semibold text-neutral-950">{post.title}</h3>
        <p className="line-clamp-2 text-sm leading-6 text-neutral-600">{post.excerpt}</p>
      </div>
    </Link>
  );
}
