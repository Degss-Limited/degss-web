import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import PropertyGallery from "@/components/PropertyGallery";
import { getProperty, properties } from "@/data/properties";

export function generateStaticParams() {
  return properties.map((property) => ({ slug: property.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/properties/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const property = getProperty(slug);

  if (!property) {
    return { title: "Property | DEGSS" };
  }

  return {
    title: `${property.title} | DEGSS`,
    description: property.description,
  };
}

export default async function PropertyPage({
  params,
}: PageProps<"/properties/[slug]">) {
  const { slug } = await params;
  const property = getProperty(slug);

  if (!property) {
    notFound();
  }

  const {
    title,
    location,
    price,
    about,
    gallery,
    beds,
    baths,
    sqft,
    highlight,
    status,
    propertyType,
    yearBuilt,
    lotSize,
    parking,
    features,
    neighborhood,
  } = property;

  return (
    <>
      <Navbar />

      <main className="flex-1 bg-neutral-50 pb-24 pt-32 sm:pt-36">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
          <Link
            href="/properties"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-950"
          >
            <ArrowLeftIcon className="h-3.5 w-3.5" />
            Back to properties
          </Link>

          <div className="mt-6">
            <PropertyGallery images={gallery} alt={title} />
          </div>

          <div className="mt-8 flex flex-col justify-between gap-6 border-b border-black/10 pb-8 lg:flex-row lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                {location}
              </p>
              <h1 className="mt-2 text-4xl font-bold tracking-tight text-neutral-950 sm:text-5xl">
                {title}
              </h1>
              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-neutral-600">
                <span>{beds} Bedrooms</span>
                <Dot />
                <span>{baths} Bathrooms</span>
                <Dot />
                <span>{sqft} Sq Ft</span>
                <Dot />
                <span>{highlight}</span>
              </div>
            </div>

            <div className="flex flex-col items-start gap-2 lg:items-end">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                Price
              </p>
              <p className="text-3xl font-bold text-neutral-950">{price}</p>
              <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700">
                {status}
              </span>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-3">
            <div className="space-y-10 lg:col-span-2">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-neutral-950">
                  About this property
                </h2>
                <div className="mt-4 space-y-4 text-neutral-600">
                  {about.map((paragraph) => (
                    <p key={paragraph} className="leading-7">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold tracking-tight text-neutral-950">
                  Property features
                </h2>
                <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
                  {features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-2.5 text-sm text-neutral-700"
                    >
                      <CheckIcon className="h-4 w-4 shrink-0 text-neutral-950" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold tracking-tight text-neutral-950">
                  The neighborhood
                </h2>
                <div className="mt-4 flex items-start gap-4 rounded-3xl bg-neutral-950 p-6 text-white sm:p-8">
                  <MapPinIcon className="mt-1 h-5 w-5 shrink-0 text-white/70" />
                  <div>
                    <h3 className="text-lg font-semibold">
                      {neighborhood.name}
                    </h3>
                    <p className="text-sm text-white/60">
                      {neighborhood.city}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-white/70">
                      {neighborhood.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-3xl bg-neutral-950 p-6 text-white sm:p-8">
                <h3 className="text-lg font-semibold">
                  Interested in this property?
                </h3>
                <p className="mt-2 text-sm leading-6 text-white/60">
                  Reach out to the DEGSS team for viewings, pricing details, or
                  help comparing this property with others on our list.
                </p>
                <Link
                  href="/contact"
                  className="mt-6 flex w-full items-center justify-center gap-1.5 rounded-full bg-white px-6 py-3 text-sm font-medium text-neutral-950 transition-colors hover:bg-white/90"
                >
                  Contact us
                  <ArrowUpRightIcon className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="rounded-3xl border border-black/10 bg-white p-6 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                  Key details
                </p>
                <dl className="mt-4 divide-y divide-black/5">
                  <DetailRow label="Price" value={price} />
                  <DetailRow label="Status" value={status} />
                  <DetailRow label="Property type" value={propertyType} />
                  <DetailRow label="Year built" value={String(yearBuilt)} />
                  <DetailRow label="Lot size" value={lotSize} />
                  <DetailRow label="Parking" value={parking} />
                </dl>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-3 text-sm">
      <dt className="text-neutral-500">{label}</dt>
      <dd className="font-medium text-neutral-950">{value}</dd>
    </div>
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

function ArrowLeftIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M19 12H5M5 12L11 6M5 12L11 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowUpRightIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M7 17L17 7M17 7H8M17 7V16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="9.25" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M8.5 12.5L10.75 14.75L15.5 9.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="9.5" r="2.3" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}
