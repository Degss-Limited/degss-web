import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import TeamGrid from "@/components/TeamGrid";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Our Team",
  description:
    "Meet the people behind DEGSS Limited — the team helping clients find, compare, and secure property across Lagos.",
  path: "/about/team",
  image: "/team-hero.jpg",
});


const teamMembers = [
  {
    role: "Daniel Onwuzuka",
    department: "Managing Director",
    photo: "/team/Daniel.jpeg",
    bio: "A business strategist and entrepreneur with extensive experience across sales, marketing, business development and operations. As Managing Director, Daniel provides strategic direction for the organisation, driving growth, strengthening operations and developing high-performing teams. With experience spanning real estate, technology, fashion and emerging business sectors, he combines strategic thinking with hands-on execution to identify opportunities, build scalable systems and create sustainable value for customers, investors and stakeholders.",
  },
  {
    role: "Emmanuel Aiyepada",
    department: "Head, Branding and Corporate Communications",
    photo: "/team/Emmanuel.jpeg",
    bio: "A brand strategist and corporate communications professional with close to a decade of experience across branding, strategic communications, public relations and stakeholder engagement. As Head of Branding and Corporate Communications, Emmanuel drives the organization’s brand positioning, communications and market visibility. His experience spans real estate, technology, oil and gas, public sector and nonprofit sectors, combining strategic thinking, creative execution and leadership development to strengthen brands and drive sustainable growth.",
  },
  {
    role: "Ogbonnaya Chukwu Samuel",
    department: "Head, Operations",
    photo: "/team/Ogbonnaya.jpeg",
    bio: "A real estate professional and strategic business leader with over 17 years of experience across sales, business development, operations and market growth. As Head of Operations, Ogbonnaya drives operational efficiency, team performance and business growth. With expertise spanning real estate, agrochemicals, industrial chemicals and cosmetics, he combines commercial strategy, industry knowledge and people leadership to build high-performing teams and create sustainable value.",
  },
  {
    role: "Godswill Onyegbule",
    department: "Head, IT",
    photo: "/team/Godswill.jpg",
    bio: "A technology professional, real estate consultant and business strategist with over 10 years of experience across technology, sales and property advisory. As Head of IT, Godswill provides strategic direction for the organisation’s technology and digital systems. With a background spanning technology leadership and real estate investment advisory, he combines technical expertise, commercial insight and strategic thinking to improve business processes and help clients make smarter investment decisions.",
  },
];

export default function TeamPage() {
  return (
    <>
      <Navbar />

      <main className="flex-1 bg-neutral-50 pb-24 pt-32 sm:pt-26">
        <section className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-10" data-navbar-variant="dark">
          <div className="relative flex min-h-[360px] flex-col justify-end overflow-hidden rounded-[2rem] bg-neutral-950 px-6 pb-10 pt-10 sm:min-h-[420px] sm:px-10 lg:min-h-[580px] lg:px-16">
            <Image
              src="/team-hero.jpg"
              alt="The DEGSS team"
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
                <span className="block">Our Team</span>
              </h1>
              <p className="max-w-lg text-lg font-medium text-white/70 sm:text-xl lg:text-right">
                The people behind DEGSS — bringing local expertise and a client-first
                approach to every property decision.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pt-20 sm:px-10 sm:pt-28 lg:px-16">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-400">
              Meet the Team
            </span>
          </div>

          <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-neutral-950 sm:text-4xl">
                The people behind the places.{" "}
                <span className="text-neutral-400">
                  Good places don&apos;t happen by accident.
                </span>
              </h2>
            </div>

            <div className="space-y-10">
              <div>
                <p className="mt-3 text-neutral-600">
                  They are imagined, questioned, planned, built and cared for by people who believe the details matter.
                </p>
                <p className="mt-3 text-neutral-600">
                  Meet the people helping DEGSS turn possibility into places.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pt-20 sm:px-10 lg:px-16">
          <TeamGrid members={teamMembers} />
        </section>

        <section className="mx-auto max-w-7xl px-6 pt-20 sm:px-10 sm:pt-28 lg:px-16">
          <div className="relative flex flex-col items-start justify-between gap-8 overflow-hidden rounded-3xl bg-[#39548b] px-8 py-12 sm:px-12 sm:py-16 lg:flex-row lg:items-center">
            <Image
              src="/icon-light.png"
              alt=""
              aria-hidden="true"
              width={1700}
              height={1700}
              className="pointer-events-none absolute -right-10 top-1/2 h-[150%] w-auto -translate-y-1/2 opacity-6"
            />

            <div className="relative z-10">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Want to work with us?
              </h2>
              <p className="mt-3 max-w-md text-white/60">
                We&apos;re always glad to hear from people who share our approach to
                real estate. Reach out and let&apos;s talk.
              </p>
            </div>
            <Link
              href="/contact"
              className="relative z-10 flex items-center justify-center gap-1.5 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-neutral-950 transition-colors hover:bg-white/90"
            >
              Get in touch
              <ArrowUpRightIcon className="h-3.5 w-3.5" />
            </Link>
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
