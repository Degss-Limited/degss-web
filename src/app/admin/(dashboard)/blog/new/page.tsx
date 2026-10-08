import BlogPostForm from "../BlogPostForm";
import { createBlogPostAction } from "../actions";

export default function NewBlogPostPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">New post</h1>
      <div className="mt-6">
        <BlogPostForm action={createBlogPostAction} />
      </div>
    </div>
  );
}
