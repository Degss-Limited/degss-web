import Link from "next/link";
import { Field, TextareaField } from "@/components/admin/fields";
import { ImageUploadField, MultiImageUploadField } from "@/components/admin/ImageUploadField";
import PriceField from "@/components/admin/PriceField";
import SlugField from "@/components/admin/SlugField";
import type { Property } from "@/lib/data/properties";
import DetailsFields from "./DetailsFields";

export default function PropertyForm({
  property,
  action,
}: {
  property?: Property;
  action: (formData: FormData) => void;
}) {
  return (
    <form action={action} className="space-y-8">
      <section className="space-y-5 rounded-2xl border border-black/10 bg-white p-6">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-400">
          Basics
        </h2>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Title" name="title" defaultValue={property?.title} required />
          <SlugField defaultValue={property?.slug} />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Location" name="location" defaultValue={property?.location} required />
          <PriceField defaultValue={property?.price} />
        </div>
        <TextareaField
          label="Short description"
          name="description"
          defaultValue={property?.description}
          rows={2}
          required
          hint="Shown on property cards and in the listing grid."
        />
        <TextareaField
          label="About this property"
          name="about"
          defaultValue={property?.about.join("\n")}
          rows={6}
          hint="One paragraph per line."
        />
      </section>

      <section className="space-y-5 rounded-2xl border border-black/10 bg-white p-6">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-400">
          Images
        </h2>
        <ImageUploadField
          label="Main image"
          name="image"
          defaultValue={property?.image}
          required
          hint="Shown on property cards."
        />
        <MultiImageUploadField
          label="Gallery images"
          name="gallery"
          defaultValue={property?.gallery}
          hint="Hover an image to remove it. Newly added files are appended."
        />
      </section>

      <section className="space-y-5 rounded-2xl border border-black/10 bg-white p-6">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-400">
          Details
        </h2>
        <DetailsFields property={property} />
        <TextareaField
          label="Features"
          name="features"
          defaultValue={property?.features.join("\n")}
          rows={5}
          hint="One feature per line."
        />
      </section>

      <section className="space-y-5 rounded-2xl border border-black/10 bg-white p-6">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-400">
          Neighborhood
        </h2>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Neighborhood name" name="neighborhoodName" defaultValue={property?.neighborhood.name} required />
          <Field label="City" name="neighborhoodCity" defaultValue={property?.neighborhood.city} required />
        </div>
        <TextareaField
          label="Neighborhood description"
          name="neighborhoodDescription"
          defaultValue={property?.neighborhood.description}
          rows={3}
          required
        />
      </section>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          className="rounded-full bg-neutral-950 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
        >
          {property ? "Save changes" : "Create property"}
        </button>
        <Link
          href="/admin/properties"
          className="rounded-full border border-black/10 px-6 py-3 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
