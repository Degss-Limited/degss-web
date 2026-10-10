import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import { getServiceBySlug, listServices } from "@/lib/data/services";
import { serviceContent } from "@/data/service-content";
import { buildMetadata } from "@/lib/seo";

export async function generateStaticParams() {
  const dbServices = await listServices();
  const slugs = new Set([
    ...Object.keys(serviceContent),
    ...dbServices.map((service) => service.slug),
  ]);
  return Array.from(slugs).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  const content = serviceContent[slug];

  if (!service && !content) {
    return { title: "Service" };
  }

  const label = service?.label ?? content?.label ?? slug;
  const description = service?.description || content?.intro || "";

  return buildMetadata({
    title: label,
    description,
    path: `/services/${slug}`,
    image: service?.heroImage || content?.heroImage,
  });
}

export default async function ServicePage({
  params,
}: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  const content = serviceContent[slug];

  if (!service && !content) {
    notFound();
  }

  const label = service?.label ?? content!.label;
  const tagline = service?.description || content?.tagline || "";
  const heroImage =
    service?.heroImage ||
    content?.heroImage ||
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop";
  const intro = service?.intro || content?.intro || tagline;
  const features =
    service?.features && service.features.length > 0
      ? service.features
      : content?.features && content.features.length > 0
        ? content.features
        : [
            "Personalized consultation",
            "Transparent, step-by-step process",
            "Dedicated support from our team",
            "Clear documentation throughout",
          ];

  return (
    <>
      <Navbar />

      <main className="flex-1 bg-neutral-50 pb-24 pt-32 sm:pt-26">
        <PageHero title={label} image={heroImage} imageAlt={label} />

        <section className="mx-auto max-w-7xl px-6 pt-12 sm:px-10 sm:pt-16 lg:px-16">
          <div className="grid gap-10 lg:grid-cols-3 lg:gap-16">
            <div className="lg:col-span-2">
              <div className="overflow-hidden rounded-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element -- admin-entered URLs can be any domain */}
                <img
                  src={heroImage}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
              <p className="mt-6 text-lg leading-7 text-neutral-600">{intro}</p>

              <h2 className="mt-12 text-lg font-semibold text-neutral-950">
                What&apos;s included
              </h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {features.map((feature) => (
                  <div
                    key={feature}
                    className="rounded-2xl border border-black/10 bg-white p-5"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#39548b]/10 text-[#39548b]">
                      <CheckIcon className="h-5 w-5" />
                    </span>
                    <p className="mt-4 text-sm font-medium leading-6 text-neutral-800">
                      {feature}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-3xl bg-[#39548b] p-6 text-white sm:p-8">
                <h3 className="text-lg font-semibold">Talk to us about {label}</h3>
                <p className="mt-2 text-sm leading-6 text-white/60">
                  Tell us what you&apos;re looking for and one of our property
                  consultants will reach out with next steps.
                </p>
                <Link
                  href={`/contact?service=${encodeURIComponent(label)}#contact-form`}
                  className="mt-6 flex w-full items-center justify-center gap-1.5 rounded-full bg-white px-6 py-3 text-sm font-medium text-neutral-950 transition-colors hover:bg-white/90"
                >
                  Enquire now
                  <ArrowUpRightIcon className="h-3.5 w-3.5" />
                </Link>
                <Link
                  href={`/get-started?service=${encodeURIComponent(label)}`}
                  className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
                >
                  Get started
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pt-20 sm:px-10 sm:pt-28 lg:px-16">
          <div className="relative flex flex-col items-start justify-between gap-8 overflow-hidden rounded-3xl bg-[#39548b] px-8 py-12 text-white sm:px-12 sm:py-16 lg:flex-row lg:items-center">
            <Image
              src={heroImage}
              alt=""
              aria-hidden="true"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-black/70"
            />
            <Image
              src="/icon-light.png"
              alt=""
              aria-hidden="true"
              width={500}
              height={500}
              className="pointer-events-none absolute -right-14 -bottom-14 h-56 w-auto opacity-10"
            />
            <div className="relative z-10 max-w-lg">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Ready to talk about {label}?
              </h2>
              <p className="mt-3 text-white/70">
                Tell us what you&apos;re looking for and one of our property
                consultants will reach out with next steps.
              </p>
            </div>
            <div className="relative z-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Link
                href={`/get-started?service=${encodeURIComponent(label)}`}
                className="flex items-center justify-center gap-1.5 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-neutral-950 transition-colors hover:bg-white/90"
              >
                Get started
                <ArrowUpRightIcon className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/contact"
                className="flex items-center justify-center gap-1.5 rounded-full border border-white/20 px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
              >
                Contact us
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
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

