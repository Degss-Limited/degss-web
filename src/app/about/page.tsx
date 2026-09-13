import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "About | DEGSS",
  description:
    "DEGSS Limited is a Lagos-based real estate company helping people find, compare, and secure properties they're proud to call home.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main className="flex-1 bg-neutral-50 pb-24 pt-32 sm:pt-26">
        <section className="mx-auto max-w-8xl px-10">
          <div className="relative flex min-h-[360px] flex-col justify-end overflow-hidden rounded-[2rem] bg-neutral-950 px-6 pb-10 pt-10 sm:min-h-[420px] sm:px-10 lg:min-h-[580px] lg:px-16">
            <Image
              src="/abt-hero.jpg"
              alt="Modern residential building in Lagos"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-neutral-950/55"
            />

            <div className="relative z-10 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
              <h1 className="text-5xl font-bold leading-[0.95] tracking-tight text-white sm:text-6xl md:text-7xl">
                <span className="block">About us</span>
              </h1>
              <div className="max-w-lg space-y-0.5 text-lg font-medium text-white/70 sm:text-xl lg:text-right">
                <p>We don’t just develop property. We create opportunities, build communities, and shape what’s next.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pt-20 sm:px-10 sm:pt-28 lg:px-16">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-400">
              /Mission &amp; Vision
            </span>
            <span className="text-sm font-medium text-neutral-400">(01)</span>
          </div>

          <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-neutral-950 sm:text-4xl">
                What if real estate could do more?{" "}
                <span className="text-neutral-400">
                  That question sits at the heart of DEGSS.
                </span>
              </h2>
              <p className="mt-6 text-neutral-600">
                We are a diversified property, hospitality and community-development company creating opportunities across
landbanking, agro-real estate, housing and development.
              </p>
              <Link
                href="/contact"
                className="mt-8 inline-flex items-center gap-3 rounded-full border border-black/10 bg-white py-1.5 pl-6 pr-1.5 text-sm font-medium text-neutral-950 transition-colors hover:bg-neutral-50"
              >
                Get in touch
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-950 text-white">
                  <ArrowUpRightIcon className="h-3.5 w-3.5" />
                </span>
              </Link>
            </div>

            <div className="space-y-10">
              <div>
                <h3 className="text-lg font-semibold text-neutral-950">Our Vision</h3>
                <p className="mt-3 text-neutral-600">
                  To be Africa’s most transformative real estate brand, where land feeds, homes inspire, and communities flourish.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-neutral-950">Our Mission</h3>
                <p className="mt-3 text-neutral-600">
                  To enable individuals and families build, grow and preserve wealth through real estate solutions, creating meaningful lives and lasting legacies for generations.
                </p>
              </div>
            </div>
          </div>
        </section>

        

        <section className="mx-auto max-w-7xl px-6 pt-16 sm:px-10 sm:pt-20 lg:px-16">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div className="relative min-h-[320px] overflow-hidden rounded-3xl sm:min-h-[620px]">
              <Image
                src="/abt-img.jpg"
                alt="DEGSS residential development"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>

            <div>
              <span className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-400">
                Our Belief
              </span>
              
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-neutral-950 sm:text-3xl">
                WHO WE ARE
              </h2>
              <p className="mt-4 text-neutral-600">
                DEGSS is built for people who think ahead.
              </p>
              <p className="mt-4 text-neutral-600">
                Professionals building their first asset.<br />
                Families looking for a place to grow.<br />
                Entrepreneurs looking for strategic opportunities.<br />
                Africans in the diaspora looking for meaningful ways to invest back home.<br />
                And partners who believe the future is worth building.
              </p>
              <h2 className="mt-3 text-xl font-bold tracking-tight text-neutral-950 sm:text-2xl">
                We don&apos;t believe land should sit still
              </h2>
              <p className="text-neutral-600">
                Land can feed.<br />
                It can shelter.<br />
                It can create wealth.<br />
                It can bring people together.<br />
                It can become a legacy.
              </p>
              <p className="mt-4 text-neutral-600">
                So we approach real estate with a bigger ambition:<br />
                to turn land into lasting wealth, spaces into thriving communities, and ownership into opportunity.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pt-20 sm:px-10 sm:pt-28 lg:px-16">
          <div className="relative flex min-h-[420px] flex-col items-center justify-center gap-10 overflow-hidden rounded-3xl px-8 py-20 text-center sm:min-h-[520px] sm:px-12 sm:py-28">
            <Image
              src="/about-cta.jpg"
              alt="DEGSS residential building"
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-neutral-950/70"
            />

            <div className="relative z-10">
              <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                Turn land into lasting wealth.
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-lg text-white/70">
                Whether you&apos;re building your first asset, growing your family, or
                investing from the diaspora, explore our listings or talk to our team
                about what&apos;s next.
              </p>
            </div>
            <div className="relative z-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Link
                href="/properties"
                className="flex items-center justify-center gap-1.5 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-neutral-950 transition-colors hover:bg-white/90"
              >
                View properties
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

        <section className="mx-auto max-w-7xl px-6 pt-20 sm:px-10 sm:pt-28 lg:px-16">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-400">
              /Success Matrix
            </span>
            <span className="text-sm font-medium text-neutral-400">(02)</span>
          </div>

          <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
            <h2 className="text-3xl font-bold tracking-tight text-neutral-950 sm:text-4xl">
              Don&apos;t wait to own land.{" "}
              <span className="block text-neutral-400">
                Own land and watch it grow.
              </span>
            </h2>
            <p className="text-neutral-600 lg:pt-2">
              Property value grows with location, development, and time. Our team
              helps you get the timing, paperwork, and details right from day one.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
            {[
              { value: "50+", label: "Properties Listed" },
              { value: "98%", label: "Client Satisfaction" },
              { value: "5+", label: "Years of Service" },
              { value: "300+", label: "Families Housed" },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="text-5xl font-bold tracking-tight text-neutral-950 sm:text-6xl">
                  {value}
                </p>
                <p className="mt-2 text-sm text-neutral-500">{label}</p>
              </div>
            ))}
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

