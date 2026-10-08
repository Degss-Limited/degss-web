import Image from "next/image";
import Link from "next/link";
import Hero, { defaultHeroSlides } from "@/components/Hero";
import TestimonialsSlider from "@/components/TestimonialsSlider";
import VideoPlayer from "@/components/VideoPlayer";
import WhatWeDoSlider, { type Pillar } from "@/components/WhatWeDoSlider";
import { unsplash } from "@/data/properties";
import { serviceContent } from "@/data/service-content";
import { listHeroSlides } from "@/lib/data/heroSlides";
import { listProperties, type Property } from "@/lib/data/properties";
import { listTestimonials } from "@/lib/data/testimonials";

const pillars: Pillar[] = [
  {
    label: "Agro",
    href: "/services/agro-farming",
    image: serviceContent["agro-farming"].heroImage,
    paragraph:
      "Agricultural land that creates food, income and long-term value — connecting productive land with thoughtful investment.",
    highlights: [
      "Productive land positioned for long-term value",
      "Food, income and employment opportunities",
      "Hands-on agro-real-estate management",
    ],
    cta: "Explore Agro",
  },
  {
    label: "Residential",
    href: "/properties",
    image: unsplash("1583608205776-bfd35f0d9f83"),
    paragraph:
      "Residential environments built for everyday life — space, planning and a real sense of community.",
    highlights: [
      "Homes planned around how you actually live",
      "A real sense of neighbourhood and community",
      "Ownership that feels like more than an address",
    ],
    cta: "Explore Residential",
  },
  {
    label: "Development",
    href: "/services/development",
    image: serviceContent["development"].heroImage,
    paragraph:
      "Thoughtfully designed developments, built to stay valuable, useful and alive for years to come.",
    highlights: [
      "Infrastructure and shared spaces done right",
      "Designed for what a place can become",
      "Built to hold its value long-term",
    ],
    cta: "Explore Development",
  },
  {
    label: "Landbanking (Prime Circle)",
    href: "/services/prime-circle",
    image: serviceContent["prime-circle"].heroImage,
    paragraph:
      "Structured landbanking that positions investors around emerging growth and long-term appreciation.",
    highlights: [
      "Positioned ahead of emerging growth",
      "Structured entry into landbanking deals",
      "Long-term appreciation focus",
    ],
    cta: "Explore Landbanking",
  },
];

const whyDegss = [
  {
    heading: "Purposeful Assets",
    description:
      "We look for opportunities where land has a real role to play. In wealth creation, agriculture, housing, development and community.",
    icon: TargetIcon,
  },
  {
    heading: "Long-Horizon Thinking",
    description:
      "We are interested in what a place can become, not just what it looks like today.",
    icon: HorizonIcon,
  },
  {
    heading: "Thoughtful Development",
    description:
      "Nothing is overcrowded or rushed. Every site is planned for how it will feel to live in, not just how fast it can sell.",
    icon: CompassIcon,
  },
  {
    heading: "Diversified Opportunities",
    description:
      "From agro-real estate and landbanking to residential and development, DEGSS creates different pathways into real estate, and more than one way to grow.",
    icon: BranchIcon,
  },
  {
    heading: "People First",
    description:
      "You’re not a unit number to us. You’re a future partner in a community we’re both building.",
    icon: PeopleIcon,
  },
  {
    heading: "Clarity & Trust",
    description:
      "Good investment should not feel like a guessing game. We believe in clear conversations, thoughtful guidance and a considered ownership experience.",
    icon: ShieldCheckIcon,
  },
];

const coreValues = [
  {
    heading: "Excellence",
    description: "We care about quality, competence and delivery.",
    icon: StarIcon,
  },
  {
    heading: "Transformation",
    description: "We turn land, capital and ideas into lasting value.",
    icon: RefreshIcon,
  },
  {
    heading: "Humanity",
    description:
      "We consider the people who live, work and invest in the places we create.",
    icon: HeartIcon,
  },
  {
    heading: "Integrity",
    description:
      "We believe trust is built through honesty, transparency and consistency.",
    icon: ScaleIcon,
  },
  {
    heading: "Community",
    description: "We create environments where people can connect and grow.",
    icon: GroupIcon,
  },
];

export default async function Home() {
  const [testimonials, properties, heroSlidesFromDb] = await Promise.all([
    listTestimonials(),
    listProperties(),
    listHeroSlides(),
  ]);
  const featuredProperties = properties.slice(0, 3);
  const heroSlides =
    heroSlidesFromDb.length > 0
      ? heroSlidesFromDb.map((slide) => ({ src: slide.image, alt: slide.alt }))
      : defaultHeroSlides;

  return (
    <>
      <Hero slides={heroSlides} />

      <main className="flex-1 bg-neutral-50">
        {/* Opening thought */}
        <section className="mx-auto max-w-7xl px-6 pt-20 sm:px-10 sm:pt-28 lg:px-16">

          <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-neutral-950 sm:text-4xl">
                What if land could do more?
              </h2>
              <p className="mt-3 text-lg text-neutral-500">
                We think about land differently.
              </p>
            </div>
            <div className="space-y-4 text-neutral-600 lg:pt-2">
              <p>
                Not simply as something to own, but as something that can
                create. We see land that feeds. Spaces that bring people
                together. Places that grow in value while giving people room
                to grow too.
              </p>
              <p>That is the idea behind DEGSS.</p>
            </div>
          </div>
        </section>

        {/* What we do */}
        <section
          className="mt-20 bg-neutral-950 py-16 sm:mt-28 sm:py-30"
          data-navbar-variant="dark"
        >
          <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium uppercase tracking-[0.2em] text-white">
                What we do
              </span>
            </div>

            <div className="mt-8 max-w-3xl">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                More than real estate.
              </h2>
              <p className="mt-4 text-white/60">
                From productive land to thoughtfully planned communities, we
                create opportunities around one simple belief: real estate
                should work harder for people.
              </p>
            </div>

            <div className="mt-10">
              <WhatWeDoSlider pillars={pillars} />
            </div>
          </div>
        </section>

        {/* Experience more */}
        <section className="bg-white py-20 sm:py-38">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 sm:px-10 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-16">
            <div>
              <span className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-400">
                Experience more
              </span>
              <h2 className="mt-6 text-4xl font-bold tracking-tight text-neutral-950 sm:text-5xl">
                Real estate, with more to it.
              </h2>
              <p className="mt-2 text-xl text-neutral-500">
                Not a bigger plot. A fuller purpose.
              </p>
              <p className="mt-6 max-w-md text-neutral-600">
                We don’t think of land as something you simply hold. We
                think of it as something that works — land that feeds a
                family, land that houses one, land that quietly compounds
                into wealth while a community grows up around it. We’re
                interested in living systems: ground that earns, spaces
                that gather people, ownership that outlives the person who
                signed for it. That’s the difference between buying land
                and building a legacy.
              </p>
            </div>

            <div className="relative min-h-[320px] overflow-hidden rounded-3xl lg:min-h-[480px]">
              <VideoPlayer
                src="https://www.youtube.com/watch?v=OIPfnC1mHpk"
                poster="/abt-img.jpg"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Why DEGSS */}
        <section className="bg-[#faf8f5] pt-20 pb-20 sm:pt-28 sm:pb-28">
          <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
            <SectionEyebrow label="Why DEGSS" />

            <h2 className="mt-8 max-w-3xl text-3xl font-bold tracking-tight text-neutral-950 sm:text-4xl">
              Because what you own should work for you.
            </h2>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {whyDegss.map(({ heading, description, icon: Icon }) => (
                <div
                  key={heading}
                  className="rounded-3xl border border-black/10 bg-white p-6"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f7efe4] text-[#442a03]">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-neutral-950">
                    {heading}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-neutral-600">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Core values */}
        <section className="bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
            <div className="text-center">
              <span className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-400">
                Our core values
              </span>
              <h2 className="mx-auto mt-8 max-w-3xl text-3xl font-bold tracking-tight text-neutral-950 sm:text-4xl">
                The values behind every decision.
              </h2>
            </div>

            <div className="mt-12 grid gap-16 lg:grid-cols-2 lg:items-center lg:gap-16">
              <div className="relative mx-auto h-[480px] w-full max-w-xl sm:h-[600px]">
                <div className="absolute left-0 top-0 h-[75%] w-[80%] overflow-hidden rounded-3xl">
                  <Image
                    src="/abt-hero.jpg"
                    alt="A DEGSS property"
                    fill
                    sizes="(min-width: 1024px) 25vw, 60vw"
                    className="object-cover"
                  />
                </div>
                <div className="absolute bottom-0 right-0 h-[60%] w-[68%] overflow-hidden rounded-3xl">
                  <Image
                    src="/team-hero.jpg"
                    alt="The DEGSS team at work"
                    fill
                    sizes="(min-width: 1024px) 22vw, 55vw"
                    className="object-cover"
                  />
                </div>
              </div>

              <div>
                {coreValues.map(({ heading, description, icon: Icon }, index) => (
                  <div key={heading} className="relative flex gap-5 pb-10 last:pb-0">
                    {index < coreValues.length - 1 && (
                      <span
                        aria-hidden="true"
                        className="absolute left-6 top-12 h-[calc(100%-2.5rem)] border-l border-dashed border-black/15"
                      />
                    )}
                    <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#39548b] text-white">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold text-neutral-950">
                        {heading}
                      </h3>
                      <p className="mt-1.5 text-sm leading-6 text-neutral-600">
                        {description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Featured properties */}
        {featuredProperties.length > 0 && (
          <section className="bg-[#fafafa] py-20 sm:py-28">
            <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
              <span className="inline-flex items-center gap-2 rounded-full bg-neutral-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-neutral-600">
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full bg-neutral-950"
                />
                Properties
              </span>

              <div className="mt-6 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
                <h2 className="max-w-lg text-3xl font-bold tracking-tight text-neutral-950 sm:text-4xl">
                  Explore our featured properties
                </h2>
                <Link
                  href="/properties"
                  className="inline-flex shrink-0 items-center gap-2 rounded-full bg-neutral-950 px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
                >
                  View all properties
                  <ArrowUpRightIcon className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {featuredProperties.map((property) => (
                  <FeaturedPropertyCard key={property.id} property={property} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* The DEGSS journal */}
        <section className="relative flex min-h-[480px] flex-col justify-between overflow-hidden py-10 sm:min-h-[560px] sm:py-12">
          <Image
            src="/hme-cta.jpg"
            alt="DEGSS property"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-black/65"
          />

          <div className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-6 sm:px-10 lg:px-16">
            <span className="text-sm font-medium uppercase tracking-[0.2em] text-white">
              The DEGSS journal
            </span>
          </div>

          <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-16">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
                Thinking <span className="italic text-[#ee3442]">beyond</span> the plot.
              </h2>
              <p className="mt-4 max-w-lg text-white/70">
                Real estate is changing. The opportunities are changing with
                it. From emerging trends to shifting buyer behaviour, market
                movements and the ideas shaping the future of real estate, we
                look beyond the obvious to understand what matters, and what
                comes next.
              </p>
              <Link
                href="/blog"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-white/80 transition-colors hover:text-white"
              >
                Explore insights
                <ArrowUpRightIcon className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        {testimonials.length > 0 && (
          <section className="pt-20 pb-24 sm:pt-28 sm:pb-32">
            <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
              <SectionEyebrow label="Testimonials" />

              <h2 className="mt-8 text-3xl font-bold tracking-tight text-neutral-950 sm:text-4xl">
                What our clients say.
              </h2>
            </div>

            <div className="mx-auto mt-10 max-w-7xl px-6 sm:px-10 lg:px-16">
              <TestimonialsSlider testimonials={testimonials} />
            </div>
          </section>
        )}
      </main>
    </>
  );
}

function FeaturedPropertyCard({ property }: { property: Property }) {
  const {
    slug,
    title,
    price,
    location,
    description,
    image,
    beds,
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
      <div className="p-3 pb-0">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
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
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-lg font-semibold text-neutral-950">{title}</h3>
          <span className="whitespace-nowrap text-lg font-semibold text-neutral-950">
            ₦{price}
          </span>
        </div>

        <p className="mt-1.5 line-clamp-2 text-sm leading-6 text-neutral-600">
          {description}
        </p>

        <p className="mt-2 flex items-center gap-1.5 text-sm text-neutral-500">
          <MapPinIcon className="h-4 w-4 shrink-0" />
          {location}
        </p>

        <p className="mt-2 text-sm text-neutral-500">
          {isLand ? (
            <>
              {lotSize} <span className="mx-1.5 text-neutral-300">|</span> {sqft} sq.ft
            </>
          ) : (
            <>
              {beds} rooms <span className="mx-1.5 text-neutral-300">|</span> {sqft} sq.ft
            </>
          )}
        </p>
      </div>
    </Link>
  );
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 3.5L14.6 9.1L20.5 9.8L16.1 13.8L17.4 19.8L12 16.7L6.6 19.8L7.9 13.8L3.5 9.8L9.4 9.1L12 3.5Z" />
    </svg>
  );
}

function RefreshIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.65 6.35A7.96 7.96 0 0 0 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35Z" />
    </svg>
  );
}

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 20s-7.5-4.6-9.8-9.3C.7 7.3 2.4 4 5.8 4c2 0 3.5 1 6.2 3.6C14.7 5 16.2 4 18.2 4c3.4 0 5.1 3.3 3.6 6.7C19.5 15.4 12 20 12 20Z" />
    </svg>
  );
}

function ScaleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <rect x="11.25" y="2.5" width="1.5" height="18.5" rx="0.75" />
      <rect x="7" y="20" width="10" height="1.5" rx="0.75" />
      <rect x="4.5" y="4.3" width="14.5" height="1.5" rx="0.75" />
      <circle cx="12" cy="5" r="1.4" />
      <path d="M2 8.2 5 7.4l3 .8-1.4 5.1a3 3 0 0 1-1.6 1-3 3 0 0 1-1.6-1L2 8.2Z" />
      <path d="M16 8.2l3-.8 3 .8-1.4 5.1a3 3 0 0 1-1.6 1 3 3 0 0 1-1.6-1L16 8.2Z" />
    </svg>
  );
}

function GroupIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <circle cx="9" cy="12" r="5.5" />
      <circle cx="15" cy="12" r="6.7" fill="#39548b" />
      <circle cx="15" cy="12" r="5.5" />
    </svg>
  );
}

function TargetIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="12" r="0.8" fill="currentColor" />
    </svg>
  );
}

function HorizonIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M4 16a8 8 0 0 1 16 0"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M2 16h20"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M12 5v2.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CompassIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M14.8 9.2 13 13l-3.8 1.8L11 11l3.8-1.8Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BranchIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="6" cy="6" r="2.2" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="6" cy="18" r="2.2" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="18" cy="12" r="2.2" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M8 6.8c3 0 3 4.4 8 5.2M8 17.2c3 0 3-4.4 8-5.2"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PeopleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M3.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M15.5 5.3c1.4.4 2.4 1.7 2.4 3.2 0 1.5-1 2.8-2.4 3.2"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M16.5 14.2c2.3.5 4 2.3 4 4.8"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ShieldCheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M12 3.5 19 6v6c0 4.5-3 7.5-7 8.5-4-1-7-4-7-8.5V6l7-2.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M9 12.2l2 2 4-4.4"
        stroke="currentColor"
        strokeWidth="1.7"
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

function SectionEyebrow({ label, number }: { label: string; number?: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-400">
      {label}
      </span>
      {number && (
        <span className="text-sm font-medium text-neutral-400">({number})</span>
      )}
    </div>
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

