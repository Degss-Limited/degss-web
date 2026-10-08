import Link from "next/link";
import { Field } from "@/components/admin/fields";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import type { HeroSlide } from "@/lib/data/heroSlides";

export default function HeroSlideForm({
  slide,
  action,
}: {
  slide?: HeroSlide;
  action: (formData: FormData) => void;
}) {
  return (
    <form action={action} className="w-full space-y-5 rounded-2xl border border-black/10 bg-white p-6">
      <ImageUploadField
        label="Slide image"
        name="image"
        defaultValue={slide?.image}
        required
      />
      <Field
        label="Alt text"
        name="alt"
        defaultValue={slide?.alt}
        placeholder="DEGSS residential building"
        hint="Describes the image for accessibility and SEO."
      />
      <Field
        label="Order"
        name="sortOrder"
        type="number"
        defaultValue={slide?.sortOrder ?? 0}
        hint="Lower numbers appear first in the slideshow."
      />

      <div className="flex items-center gap-3">
        <button
          type="submit"
          className="rounded-full bg-neutral-950 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
        >
          {slide ? "Save changes" : "Add slide"}
        </button>
        <Link
          href="/admin/hero-slides"
          className="rounded-full border border-black/10 px-6 py-3 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
