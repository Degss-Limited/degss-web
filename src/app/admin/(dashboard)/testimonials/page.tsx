import Link from "next/link";
import ConfirmSubmitButton from "@/components/admin/ConfirmSubmitButton";
import EmptyState from "@/components/admin/EmptyState";
import { listTestimonials } from "@/lib/data/testimonials";
import { deleteTestimonialAction } from "./actions";

export default async function AdminTestimonialsPage() {
  const testimonials = await listTestimonials();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Testimonials</h1>
          <p className="mt-1 text-sm text-neutral-500">
            Shown on the homepage, in this order.
          </p>
        </div>
        <Link
          href="/admin/testimonials/new"
          className="rounded-full bg-neutral-950 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
        >
          New testimonial
        </Link>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.length === 0 && (
          <div className="rounded-2xl border border-black/10 bg-white sm:col-span-2 lg:col-span-3">
            <EmptyState title="No testimonials yet" />
          </div>
        )}
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="rounded-2xl border border-black/10 bg-white p-5">
            <div>
              <p className="truncate font-semibold text-neutral-950">
                {testimonial.name}
              </p>
              <p className="truncate text-sm text-neutral-500">{testimonial.role}</p>
            </div>
            <p className="mt-3 text-sm text-amber-500">
              {"★".repeat(testimonial.rating)}
              <span className="text-neutral-200">
                {"★".repeat(5 - testimonial.rating)}
              </span>
            </p>
            <p className="mt-2 line-clamp-3 text-sm leading-6 text-neutral-600">
              {testimonial.quote}
            </p>
            <div className="mt-4 flex items-center gap-2">
              <Link
                href={`/admin/testimonials/${testimonial.id}/edit`}
                className="rounded-full border border-black/10 px-3 py-1.5 text-xs font-medium text-neutral-700 transition-colors hover:bg-neutral-100"
              >
                Edit
              </Link>
              <form action={deleteTestimonialAction}>
                <input type="hidden" name="id" value={testimonial.id} />
                <ConfirmSubmitButton
                  confirmMessage={`Remove ${testimonial.name}'s testimonial?`}
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
