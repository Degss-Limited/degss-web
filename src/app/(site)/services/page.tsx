import Link from "next/link";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import { listServices } from "@/lib/data/services";
import { serviceContent, serviceContentList } from "@/data/service-content";
import { unsplash } from "@/data/properties";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Services",
  description:
    "Explore what DEGSS Limited does — development, acquisition, consulting, management, agro farming and Prime Circle.",
  path: "/services",
});

export default async function ServicesPage() {
  const dbServices = await listServices();

  const services =
    dbServices.length > 0
      ? dbServices.map((service) => ({
          slug: service.slug,
          label: service.label,
          description:
            service.description || serviceContent[service.slug]?.tagline || "",
          heroImage:
            service.heroImage ||
            serviceContent[service.slug]?.heroImage ||
            unsplash("1486406146926-c627a92ad1ab"),
        }))
      : serviceContentList.map((content) => ({
          slug: content.slug,
          label: content.label,
          description: content.tagline,
          heroImage: content.heroImage,
        }));

  return (
    <>
      <Navbar />

      <main className="flex-1 bg-neutral-50 pb-24 pt-32 sm:pt-26">
        <PageHero
          title="What we do"
          description="From development to Prime Circle, every service built around real estate that works harder for you."
          image={unsplash("1486406146926-c627a92ad1ab")}
          imageAlt="DEGSS services"
        />

        <div className="mx-auto max-w-7xl px-6 pt-12 sm:px-10 sm:pt-16 lg:px-16">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group block overflow-hidden rounded-3xl border border-black/10 bg-white transition-shadow hover:shadow-lg hover:shadow-black/5"
              >
                <div className="p-3 pb-0">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                    {/* eslint-disable-next-line @next/next/no-img-element -- admin-entered URLs can be any domain */}
                    <img
                      src={service.heroImage}
                      alt={service.label}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2 p-6">
                  <h3 className="text-lg font-semibold text-neutral-950">
                    {service.label}
                  </h3>
                  <p className="text-sm leading-6 text-neutral-600">
                    {service.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
