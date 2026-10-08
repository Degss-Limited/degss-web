import Link from "next/link";
import ConfirmSubmitButton from "@/components/admin/ConfirmSubmitButton";
import EmptyState from "@/components/admin/EmptyState";
import { listHeroSlides } from "@/lib/data/heroSlides";
import { deleteHeroSlideAction } from "./actions";

export default async function AdminHeroSlidesPage() {
  const slides = await listHeroSlides();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Hero slides</h1>
          <p className="mt-1 text-sm text-neutral-500">
            The rotating background on the homepage hero, in this order.
          </p>
        </div>
        <Link
          href="/admin/hero-slides/new"
          className="rounded-full bg-neutral-950 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
        >
          New slide
        </Link>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {slides.length === 0 && (
          <div className="rounded-2xl border border-black/10 bg-white sm:col-span-2 lg:col-span-3">
            <EmptyState
              title="No hero slides yet"
              description="The homepage falls back to its default images until you add some here."
            />
          </div>
        )}
        {slides.map((slide) => (
          <div key={slide.id} className="rounded-2xl border border-black/10 bg-white p-5">
            {/* eslint-disable-next-line @next/next/no-img-element -- admin-entered URLs can be any domain */}
            <img
              src={slide.image}
              alt={slide.alt}
              className="h-40 w-full rounded-xl object-cover"
            />
            <p className="mt-3 text-sm text-neutral-500">{slide.alt || "No alt text"}</p>
            <p className="mt-1 text-xs text-neutral-400">Order: {slide.sortOrder}</p>
            <div className="mt-4 flex items-center gap-2">
              <Link
                href={`/admin/hero-slides/${slide.id}/edit`}
                className="rounded-full border border-black/10 px-3 py-1.5 text-xs font-medium text-neutral-700 transition-colors hover:bg-neutral-100"
              >
                Edit
              </Link>
              <form action={deleteHeroSlideAction}>
                <input type="hidden" name="id" value={slide.id} />
                <ConfirmSubmitButton
                  confirmMessage="Remove this slide from the homepage?"
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
