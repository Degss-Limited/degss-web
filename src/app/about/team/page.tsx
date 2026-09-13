import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Our Team | DEGSS",
  description:
    "Meet the people behind DEGSS Limited — the team helping clients find, compare, and secure property across Lagos.",
};

// NOTE: photos below are stock Unsplash portraits used as layout placeholders only —
// they are not real DEGSS staff. Replace with actual team photos before this page goes live.
function headshot(photoId: string) {
  return `https://images.unsplash.com/photo-${photoId}?q=80&w=400&h=400&fit=crop&crop=faces`;
}

const departments = [
  {
    name: "Executive",
    members: [
      { role: "Managing Director", photo: headshot("1519244703995-f4e0f30006d5") },
      { role: "Chief Operating Officer", photo: headshot("1438761681033-6461ffad8d80") },
    ],
  },
  {
    name: "Sales & Marketing",
    members: [
      { role: "Head of Sales", photo: headshot("1472099645785-5658abf4ff4e") },
      { role: "Senior Property Advisor", photo: headshot("1494790108377-be9c29b29330") },
      { role: "Property Advisor", photo: headshot("1519345182560-3f2917c472ef") },
    ],
  },
  {
    name: "Client Services & Operations",
    members: [
      { role: "Client Relations Lead", photo: headshot("1544725176-7c40e5a71c5e") },
      { role: "Operations Manager", photo: headshot("1487412720507-e7ab37603c6f") },
      { role: "Legal & Compliance Officer", photo: headshot("1500917293891-ef795e70e1f6") },
    ],
  },
];

export default function TeamPage() {
  return (
    <>
      <Navbar />

      <main className="flex-1 bg-neutral-50 pb-24 pt-32 sm:pt-26">
        <section className="mx-auto max-w-8xl px-10" data-navbar-variant="dark">
          <div className="relative flex min-h-[360px] flex-col justify-end overflow-hidden rounded-[2rem] bg-neutral-950 px-6 pb-10 pt-10 sm:min-h-[420px] sm:px-10 lg:min-h-[480px] lg:px-16">
            <Image
              src="/abt-hero.jpg"
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

        <section className="mx-auto max-w-7xl px-6 pt-16 sm:px-10 sm:pt-20 lg:px-16">
          <div className="max-w-2xl">
            <span className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-400">
              Who we are
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-neutral-950 sm:text-4xl">
              A team built for people who think ahead
            </h2>
            <p className="mt-5 text-neutral-600">
              From first enquiry to closing day, every DEGSS team member brings the
              same commitment: clear advice, local expertise, and a genuine interest
              in helping you make the right decision.
            </p>
          </div>
        </section>

        {departments.map((department) => (
          <section
            key={department.name}
            className="mx-auto max-w-7xl px-6 pt-16 sm:px-10 lg:px-16"
          >
            <h3 className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-400">
              {department.name}
            </h3>

            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {department.members.map(({ role, photo }) => (
                <div
                  key={role}
                  className="rounded-3xl border border-black/5 bg-white p-8"
                >
                  <Image
                    src={photo}
                    alt={role}
                    width={64}
                    height={64}
                    className="h-16 w-16 rounded-full object-cover"
                  />
                  <h4 className="mt-6 text-lg font-semibold text-neutral-950">
                    {role}
                  </h4>
                  <p className="mt-1 text-sm text-neutral-400">
                    {department.name}
                  </p>
                </div>
              ))}
            </div>
          </section>
        ))}

        <section className="mx-auto max-w-7xl px-6 pt-20 sm:px-10 sm:pt-28 lg:px-16">
          <div className="flex flex-col items-start justify-between gap-8 rounded-3xl bg-neutral-950 px-8 py-12 sm:px-12 sm:py-16 lg:flex-row lg:items-center">
            <div>
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
              className="flex items-center justify-center gap-1.5 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-neutral-950 transition-colors hover:bg-white/90"
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
