import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import { getServiceBySlug, listServices, type ServiceIconName } from "@/lib/data/services";
import { serviceContent, serviceContentList } from "@/data/service-content";
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
    image: content?.heroImage,
  });
}

export default async function ServicePage({
  params,
}: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const [service, dbServices] = await Promise.all([
    getServiceBySlug(slug),
    listServices(),
  ]);
  const content = serviceContent[slug];

  if (!service && !content) {
    notFound();
  }

  const label = service?.label ?? content!.label;
  const tagline = service?.description || content?.tagline || "";
  const iconName: ServiceIconName =
    service?.iconName ?? content?.iconName ?? "BuildingIcon";
  const Icon = iconMap[iconName];
  const heroImage =
    content?.heroImage ??
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop";
  const intro = content?.intro ?? tagline;
  const features =
    content?.features && content.features.length > 0
      ? content.features
      : [
          "Personalized consultation",
          "Transparent, step-by-step process",
          "Dedicated support from our team",
          "Clear documentation throughout",
        ];

  const otherServices = (
    dbServices.length > 0
      ? dbServices.map((s) => ({
          slug: s.slug,
          label: s.label,
          tagline: s.description,
          iconName: s.iconName,
        }))
      : serviceContentList
  ).filter((s) => s.slug !== slug);

  return (
    <>
      <Navbar />

      <main className="flex-1 bg-neutral-50 pb-24 pt-32 sm:pt-26">
        <PageHero title={label} image={heroImage} imageAlt={label} />

        <section className="mx-auto max-w-7xl px-6 pt-12 sm:px-10 sm:pt-16 lg:px-16">
          <div className="grid gap-10 lg:grid-cols-3 lg:gap-16">
            <div className="lg:col-span-2">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#39548b]/10 text-[#39548b]">
                <Icon className="h-7 w-7" />
              </span>
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
                  href="/get-started"
                  className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
                >
                  Get started
                </Link>
              </div>
            </div>
          </div>
        </section>

        {otherServices.length > 0 && (
          <section className="mx-auto max-w-7xl px-6 pt-20 sm:px-10 sm:pt-28 lg:px-16">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-400">
                /Explore more
              </span>
              <span className="text-sm font-medium text-neutral-400">(01)</span>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {otherServices.map((other) => {
                const OtherIcon = iconMap[other.iconName] ?? BuildingIcon;
                return (
                  <Link
                    key={other.slug}
                    href={`/services/${other.slug}`}
                    className="group flex items-start gap-3 rounded-2xl border border-black/10 bg-white p-5 transition-colors hover:border-[#39548b]/30 hover:bg-[#39548b]/[0.03]"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#39548b]/10 text-[#39548b] transition-colors group-hover:bg-[#39548b] group-hover:text-white">
                      <OtherIcon className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-neutral-950">
                        {other.label}
                      </span>
                      <span className="mt-1 block text-sm text-neutral-500">
                        {other.tagline}
                      </span>
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        <section className="mx-auto max-w-7xl px-6 pt-20 sm:px-10 sm:pt-28 lg:px-16">
          <div className="relative flex flex-col items-start justify-between gap-8 overflow-hidden rounded-3xl bg-[#39548b] px-8 py-12 text-white sm:px-12 sm:py-16 lg:flex-row lg:items-center">
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
                href="/get-started"
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

const iconMap: Record<ServiceIconName, (props: { className?: string }) => React.JSX.Element> = {
  BuildingIcon,
  KeyIcon,
  ClipboardCheckIcon,
  ShieldCheckIcon,
  LeafIcon,
  OrbitIcon,
};

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

function BuildingIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="5" y="3.5" width="10" height="17" rx="1.2" stroke="currentColor" strokeWidth="1.7" />
      <path d="M15 10.5H18.5C19.0523 10.5 19.5 10.9477 19.5 11.5V20.5H15" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M8 7.5H12M8 11H12M8 14.5H12" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M9.5 20.5V17.5H10.5V20.5" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  );
}

function KeyIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="8" cy="9" r="4" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M11 12L18.5 19.5M18.5 19.5L21 17M18.5 19.5L16.5 21.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ClipboardCheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="5.5" y="4.5" width="13" height="16" rx="1.8" stroke="currentColor" strokeWidth="1.7" />
      <path d="M9 4.5C9 3.67 9.9 3 11 3H13C14.1 3 15 3.67 15 4.5V5.5H9V4.5Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M8.5 13L10.8 15.3L15.5 10.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ShieldCheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M12 3.5L19 6V11C19 15.5 16 18.8 12 20.5C8 18.8 5 15.5 5 11V6L12 3.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="M8.7 11.5L10.8 13.6L15.3 9.1" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LeafIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M6 19C4 12 8 5 19 5C19 16 12 20 6 19Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="M6 19L13 12" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function OrbitIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="2.2" fill="currentColor" />
      <ellipse cx="12" cy="12" rx="9" ry="4" stroke="currentColor" strokeWidth="1.7" />
      <ellipse cx="12" cy="12" rx="9" ry="4" stroke="currentColor" strokeWidth="1.7" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="9" ry="4" stroke="currentColor" strokeWidth="1.7" transform="rotate(120 12 12)" />
    </svg>
  );
}
