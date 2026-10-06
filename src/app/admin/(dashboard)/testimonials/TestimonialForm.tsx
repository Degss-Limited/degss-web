import Link from "next/link";
import { Field, SelectField, TextareaField } from "@/components/admin/fields";
import type { Testimonial } from "@/lib/data/testimonials";

const ratingOptions = [
  { label: "5 stars", value: "5" },
  { label: "4 stars", value: "4" },
  { label: "3 stars", value: "3" },
  { label: "2 stars", value: "2" },
  { label: "1 star", value: "1" },
];

export default function TestimonialForm({
  testimonial,
  action,
}: {
  testimonial?: Testimonial;
  action: (formData: FormData) => void;
}) {
  return (
    <form action={action} className="space-y-5 rounded-2xl border border-black/10 bg-white p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Client name" name="name" defaultValue={testimonial?.name} required />
        <Field
          label="Role / location"
          name="role"
          placeholder="Landowner, Lagos"
          defaultValue={testimonial?.role}
          required
        />
      </div>
      <SelectField
        label="Rating"
        name="rating"
        defaultValue={String(testimonial?.rating ?? 5)}
        options={ratingOptions}
        required
      />
      <TextareaField
        label="Quote"
        name="quote"
        defaultValue={testimonial?.quote}
        rows={4}
        required
      />

      <div className="flex items-center gap-3">
        <button
          type="submit"
          className="rounded-full bg-neutral-950 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
        >
          {testimonial ? "Save changes" : "Add testimonial"}
        </button>
        <Link
          href="/admin/testimonials"
          className="rounded-full border border-black/10 px-6 py-3 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
