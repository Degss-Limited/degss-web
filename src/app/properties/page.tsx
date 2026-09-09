import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import PropertyCard from "@/components/PropertyCard";
import { properties, unsplash } from "@/data/properties";

export const metadata: Metadata = {
  title: "Properties | DEGSS",
  description:
    "Browse homes and estates available through DEGSS — find, compare, and secure the right property.",
};

export default function PropertiesPage() {
  return (
    <>
      <Navbar />

      <main className="flex-1 bg-neutral-50 pb-24 pt-32 sm:pt-26">
        <PageHero
          title="Properties"
          description="Find the perfect property with detailed listings tailored to your needs and lifestyle."
          image={unsplash("1583608205776-bfd35f0d9f83")}
          imageAlt="DEGSS property"
        />

        <div className="mx-auto max-w-7xl px-6 pt-12 sm:px-10 sm:pt-16 lg:px-16">
          <div className="grid gap-6 sm:grid-cols-3">
            {properties.map((property) => (
              <PropertyCard key={property.slug} property={property} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
