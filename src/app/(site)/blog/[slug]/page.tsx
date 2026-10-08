import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import { formatBlogDate } from "@/components/BlogPostCard";
import { getBlogPostBySlug, listPublishedBlogPosts } from "@/lib/data/blog";
import { buildMetadata } from "@/lib/seo";

export async function generateStaticParams() {
  const posts = await listPublishedBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return { title: "Journal" };
  }

  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.coverImage,
  });
}

export default async function BlogPostPage({
  params,
}: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Navbar />

      <main className="flex-1 bg-neutral-50 pb-24 pt-32 sm:pt-26">
        <section
          className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-10"
          data-navbar-variant="dark"
        >
          <div className="relative flex min-h-[360px] flex-col justify-end overflow-hidden rounded-[2rem] bg-neutral-950 px-6 pb-10 pt-10 sm:min-h-[420px] sm:px-10 lg:min-h-[480px] lg:px-16">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-linear-to-t from-black/85 via-black/30 to-black/10"
            />
            <div className="relative z-10">
              <span className="text-sm font-medium uppercase tracking-[0.2em] text-white/70">
                {formatBlogDate(post.createdAt)}
                {post.author && <> &middot; {post.author}</>}
              </span>
              <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl">
                {post.title}
              </h1>
            </div>
          </div>
        </section>

        <article className="mx-auto max-w-3xl px-6 pt-12 sm:px-10 sm:pt-16 lg:px-16">
          <div
            className="prose-sm max-w-none text-base leading-7 text-neutral-700 [&_ol]:list-decimal [&_ol]:pl-5 [&_p+p]:mt-4 [&_ul]:list-disc [&_ul]:pl-5"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <Link
            href="/blog"
            className="mt-12 inline-flex items-center gap-1.5 text-sm font-semibold text-[#39548b] hover:underline"
          >
            &larr; Back to the journal
          </Link>
        </article>
      </main>
    </>
  );
}
