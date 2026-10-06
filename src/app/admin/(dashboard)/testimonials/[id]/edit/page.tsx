import { notFound } from "next/navigation";
import TestimonialForm from "../../TestimonialForm";
import { updateTestimonialAction } from "../../actions";
import { getTestimonialById } from "@/lib/data/testimonials";

export default async function EditTestimonialPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const testimonial = await getTestimonialById(id);

  if (!testimonial) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Edit testimonial</h1>
      <div className="mt-6">
        <TestimonialForm
          testimonial={testimonial}
          action={updateTestimonialAction.bind(null, testimonial.id)}
        />
      </div>
    </div>
  );
}
