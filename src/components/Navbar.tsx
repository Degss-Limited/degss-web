"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type NavItem =
  | { label: string; href: string; children?: undefined }
  | { label: string; href?: undefined; children: { label: string; href: string }[] };

const navItems: NavItem[] = [
  {
    label: "Company",
    children: [
      { label: "About us", href: "/about" },
      { label: "Team", href: "/about/team" },
    ],
  },
  { label: "Services", href: "/services" },
  { label: "Properties", href: "/properties" },
  { label: "Contact us", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [overDark, setOverDark] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

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

                  <div className="invisible absolute left-0 top-full pt-2 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100">
                    <div className="flex min-w-48 flex-col gap-1 rounded-2xl border border-black/10 bg-white p-2 shadow-lg shadow-black/10">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="rounded-xl px-3 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-black/5 hover:text-neutral-950"
                        >
                          {child.label}
                        </Link>
                      ))}
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
                {item.children.map((child) => (
                  <Link
                    key={child.label}
                    href={child.href}
                    onClick={() => setOpen(false)}
                    className="rounded-full px-4 py-2.5 text-sm font-medium text-neutral-700 hover:bg-black/5 hover:text-neutral-950"
                  >
                    {child.label}
                  </Link>
                ))}
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
