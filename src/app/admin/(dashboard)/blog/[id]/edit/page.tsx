import { notFound } from "next/navigation";
import BlogPostForm from "../../BlogPostForm";
import { updateBlogPostAction } from "../../actions";
import { getBlogPostById } from "@/lib/data/blog";

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getBlogPostById(id);

  if (!post) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Edit post</h1>
      <div className="mt-6">
        <BlogPostForm post={post} action={updateBlogPostAction.bind(null, post.id)} />
      </div>
    </div>
  );
}
