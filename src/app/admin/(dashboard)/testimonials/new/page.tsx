import TestimonialForm from "../TestimonialForm";
import { createTestimonialAction } from "../actions";

export default function NewTestimonialPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">New testimonial</h1>
      <div className="mt-6">
        <TestimonialForm action={createTestimonialAction} />
      </div>
    </div>
  );
}
