import Link from "next/link";
import type { Property } from "@/lib/data/properties";

export default function PropertyCard({ property }: { property: Property }) {
  const {
    slug,
    title,
    price,
    description,
    image,
    beds,
    baths,
    sqft,
    lotSize,
    listingType,
    status,
  } = property;
  const isLand = listingType === "Land";
  const statusLabel = status === "Available" ? "For Sale" : status;

  return (
    <Link
      href={`/properties/${slug}`}
      className="group block overflow-hidden rounded-3xl border border-black/10 bg-white transition-shadow hover:shadow-lg hover:shadow-black/5"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element -- admin-entered URLs can be any domain */}
        <img
          src={image}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-neutral-950/70 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
          {statusLabel}
        </span>
      </div>

      <div className="flex flex-col gap-3 p-6">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-lg font-semibold text-neutral-950">{title}</h3>
          <span className="whitespace-nowrap text-lg font-semibold text-neutral-950">
            ₦{price}
          </span>
        </div>

        <p className="text-sm leading-6 text-neutral-600">{description}</p>

        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-neutral-600">
          {isLand ? (
            <>
              <span>{lotSize}</span>
              <Dot />
              <span>{sqft} SQ.FT</span>
            </>
          ) : (
            <>
              <span>{beds} Bedrooms</span>
              <Dot />
              <span>{baths} Bathrooms</span>
              <Dot />
              <span>{sqft} SQ.FT</span>
            </>
          )}
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
