import Image from "next/image";
import Link from "next/link";
import type { Property } from "@/data/properties";

export default function PropertyCard({ property }: { property: Property }) {
  const { slug, title, price, description, image, beds, baths, sqft } =
    property;

  return (
    <Link
      href={`/properties/${slug}`}
      className="group block overflow-hidden rounded-3xl border border-black/10 bg-white transition-shadow hover:shadow-lg hover:shadow-black/5"
    >
      <div className="p-3 pb-0">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </div>

      <div className="flex flex-col gap-3 p-6">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-lg font-semibold text-neutral-950">{title}</h3>
          <span className="whitespace-nowrap text-lg font-semibold text-neutral-950">
            {price}
          </span>
        </div>

        <p className="text-sm leading-6 text-neutral-600">{description}</p>

        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-neutral-600">
          <span>{beds} Bedrooms</span>
          <Dot />
          <span>{baths} Bathrooms</span>
          <Dot />
          <span>{sqft} SQ.FT</span>
        </div>
      </div>
    </Link>
  );
}

function Dot() {
  return (
    <span
      aria-hidden="true"
      className="h-1 w-1 shrink-0 rounded-full bg-neutral-300"
    />
  );
}
