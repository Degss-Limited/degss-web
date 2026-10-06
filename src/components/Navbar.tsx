"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type NavChild = {
  label: string;
  href: string;
  description?: string;
  icon?: (props: { className?: string }) => React.JSX.Element;
};

type NavItem =
  | { label: string; href: string; children?: undefined }
  | { label: string; href?: undefined; children: NavChild[] };

const iconMap: Record<string, (props: { className?: string }) => React.JSX.Element> = {
  BuildingIcon,
  KeyIcon,
  ClipboardCheckIcon,
  ShieldCheckIcon,
  LeafIcon,
  OrbitIcon,
};

const defaultServiceChildren: NavChild[] = [
  {
    label: "Development",
    href: "/services/development",
    description: "Creating spaces designed for life and value.",
    icon: BuildingIcon,
  },
  {
    label: "Acquisition",
    href: "/services/acquisition",
    description: "Securing assets positioned for tomorrow.",
    icon: KeyIcon,
  },
  {
    label: "Consulting",
    href: "/services/consulting",
    description: "Turning property decisions into informed decisions.",
    icon: ClipboardCheckIcon,
  },
  {
    label: "Management",
    href: "/services/management",
    description: "Protecting and growing real estate value.",
    icon: ShieldCheckIcon,
  },
  {
    label: "Agro Farming",
    href: "/services/agro-farming",
    description: "Making land productive.",
    icon: LeafIcon,
  },
  {
    label: "Prime Circle",
    href: "/services/prime-circle",
    description: "Structured access to real estate investment.",
    icon: OrbitIcon,
  },
];

type ServiceApiRow = {
  label: string;
  slug: string;
  description: string;
  iconName: string;
};

const staticNavItems: NavItem[] = [
  {
    label: "Company",
    children: [
      { label: "About us", href: "/about" },
      { label: "Team", href: "/about/team" },
    ],
  },
  { label: "Properties", href: "/properties" },
  { label: "Contact us", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [overDark, setOverDark] = useState(false);
  const [serviceChildren, setServiceChildren] = useState<NavChild[]>(
    defaultServiceChildren
  );
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/services")
      .then((res) => (res.ok ? res.json() : null))
      .then((data: ServiceApiRow[] | null) => {
        if (cancelled || !data || data.length === 0) return;
        setServiceChildren(
          data.map((service) => ({
            label: service.label,
            href: `/services/${service.slug}`,
            description: service.description,
            icon: iconMap[service.iconName] ?? BuildingIcon,
          }))
        );
      })
      .catch(() => {
        // Keep the default services list if the request fails.
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const navItems: NavItem[] = [
    staticNavItems[0],
    { label: "What We Do", children: serviceChildren },
    ...staticNavItems.slice(1),
  ];

  useEffect(() => {
    const darkZones = document.querySelectorAll<HTMLElement>(
      '[data-navbar-variant="dark"]'
    );

    if (darkZones.length === 0 || !headerRef.current) {
      return;
    }

    let observer: IntersectionObserver;

    const observe = () => {
      observer?.disconnect();
      const rect = headerRef.current!.getBoundingClientRect();
      const bandTop = Math.max(rect.top, 0);
      const bandBottomFromEnd = Math.max(
        window.innerHeight - rect.bottom,
        0
      );
      observer = new IntersectionObserver(
        (entries) => {
          setOverDark((current) => {
            const stillHasDark = entries.some((entry) => entry.isIntersecting);
            const anyLost = entries.some((entry) => !entry.isIntersecting);
            if (stillHasDark) return true;
            if (anyLost) return false;
            return current;
          });
        },
        {
          rootMargin: `-${bandTop}px 0px -${bandBottomFromEnd}px 0px`,
          threshold: 0,
        }
      );
      darkZones.forEach((zone) => observer.observe(zone));
    };

    observe();
    window.addEventListener("resize", observe);
    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", observe);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className="fixed inset-x-0 top-6 z-30 px-4 sm:px-6"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <div className="flex h-14 items-center gap-4 rounded-full border border-black/10 bg-white pl-6 pr-6 backdrop-blur">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo-dark.svg"
              alt="DEGSS"
              width={362}
              height={124}
              unoptimized
              priority
              className="h-9 w-auto"
            />
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) =>
              item.children ? (
                <div key={item.label} className="group relative">
                  <button
                    type="button"
                    className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-black/5 hover:text-neutral-950"
                  >
                    {item.label}
                    <ChevronDownIcon className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180" />
                  </button>

                  <div className="invisible absolute left-0 top-full pt-4 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100">
                    <div
                      className={
                        item.children.some((child) => child.description)
                          ? "grid w-[760px] grid-cols-2 gap-2 rounded-3xl border border-black/10 bg-white p-4 shadow-xl shadow-black/10"
                          : "flex min-w-48 flex-col gap-1 rounded-2xl border border-black/10 bg-white p-2 shadow-lg shadow-black/10"
                      }
                    >
                      {item.children.map((child) =>
                        child.description ? (
                          <Link
                            key={child.label}
                            href={child.href}
                            className="group/card flex items-start gap-3 rounded-2xl p-3 transition-colors hover:bg-black/[0.04]"
                          >
                            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#39548b]/10 text-[#39548b] transition-colors group-hover/card:bg-[#39548b] group-hover/card:text-white">
                              {child.icon && <child.icon className="h-5 w-5" />}
                            </span>
                            <span className="flex flex-col gap-1 pt-0.5">
                              <span className="text-sm font-semibold text-neutral-950">
                                {child.label}
                              </span>
                              <span className="text-sm italic text-neutral-500">
                                {child.description}
                              </span>
                              <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-[#39548b]">
                                Explore {child.label}
                                <ArrowUpRightIcon className="h-3.5 w-3.5 transition-transform duration-150 group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5" />
                              </span>
                            </span>
                          </Link>
                        ) : (
                          <Link
                            key={child.label}
                            href={child.href}
                            className="rounded-xl px-3 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-black/5 hover:text-neutral-950"
                          >
                            {child.label}
                          </Link>
                        )
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className="rounded-full px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-black/5 hover:text-neutral-950"
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/get-started"
            className={`flex h-14 items-center gap-1.5 rounded-full px-6 text-sm font-medium transition-colors ${
              overDark
                ? "bg-white text-neutral-950 hover:bg-white/90"
                : "bg-[#39548b] text-white hover:bg-[#263d6b]"
            }`}
          >
            Get started
            <ArrowUpRightIcon className="h-3.5 w-3.5" />
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white text-neutral-950 backdrop-blur md:hidden"
        >
          <MenuIcon open={open} className="h-5 w-5" />
        </button>
      </div>

      {open && (
        <div className="mx-auto mt-2 flex max-w-6xl flex-col gap-1 rounded-3xl border border-black/5 bg-white/95 p-3 shadow-lg shadow-black/10 backdrop-blur md:hidden">
          {navItems.map((item) =>
            item.children ? (
              <div key={item.label} className="flex flex-col">
                <span className="px-4 pb-1 pt-2 text-xs font-semibold uppercase tracking-wide text-neutral-400">
                  {item.label}
                </span>
                {item.children.map((child) =>
                  child.description ? (
                    <Link
                      key={child.label}
                      href={child.href}
                      onClick={() => setOpen(false)}
                      className="flex items-start gap-3 rounded-2xl px-4 py-2.5 hover:bg-black/5"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#39548b]/10 text-[#39548b]">
                        {child.icon && <child.icon className="h-5 w-5" />}
                      </span>
                      <span className="flex flex-col gap-1 pt-0.5">
                        <span className="text-sm font-semibold text-neutral-950">
                          {child.label}
                        </span>
                        <span className="text-sm italic text-neutral-500">
                          {child.description}
                        </span>
                        <span className="mt-0.5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#39548b]">
                          Explore {child.label}
                          <ArrowUpRightIcon className="h-3.5 w-3.5" />
                        </span>
                      </span>
                    </Link>
                  ) : (
                    <Link
                      key={child.label}
                      href={child.href}
                      onClick={() => setOpen(false)}
                      className="rounded-full px-4 py-2.5 text-sm font-medium text-neutral-700 hover:bg-black/5 hover:text-neutral-950"
                    >
                      {child.label}
                    </Link>
                  )
                )}
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-full px-4 py-2.5 text-sm font-medium text-neutral-700 hover:bg-black/5 hover:text-neutral-950"
              >
                {item.label}
              </Link>
            )
          )}
          <div className="mt-1 flex flex-col gap-2 border-t border-black/5 pt-2">
            <Link
              href="/get-started"
              className="rounded-full bg-[#39548b] px-4 py-2.5 text-center text-sm font-medium text-white"
            >
              Get started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M6 9L12 15L18 9"
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

function MenuIcon({ open, className }: { open: boolean; className?: string }) {
  if (open) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M4 7H20M4 12H20M4 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
