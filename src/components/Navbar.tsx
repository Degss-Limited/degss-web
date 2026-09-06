"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Properties", href: "/properties" },
  { label: "Contact us", href: "/contact" },
];

const HEADER_BAND_TOP = 20;
const HEADER_BAND_BOTTOM = 90;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [overDark, setOverDark] = useState(false);

  useEffect(() => {
    const darkZones = document.querySelectorAll<HTMLElement>(
      '[data-navbar-variant="dark"]'
    );

    if (darkZones.length === 0) {
      return;
    }

    let observer: IntersectionObserver;

    const observe = () => {
      observer?.disconnect();
      const bandBottomFromEnd = Math.max(
        window.innerHeight - HEADER_BAND_BOTTOM,
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
          rootMargin: `-${HEADER_BAND_TOP}px 0px -${bandBottomFromEnd}px 0px`,
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
    <header className="fixed inset-x-0 top-6 z-30 px-4 sm:px-6">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        <div className="flex h-14 items-center gap-4 rounded-full border border-black/10 bg-white pl-6 pr-3 backdrop-blur">
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
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-black/5 hover:text-neutral-950"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-950 md:hidden"
          >
            <MenuIcon open={open} className="h-5 w-5" />
          </button>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/get-started"
            className={`flex h-14 items-center gap-1.5 rounded-full px-6 text-sm font-medium transition-colors ${
              overDark
                ? "bg-white text-neutral-950 hover:bg-white/90"
                : "bg-neutral-950 text-white hover:bg-neutral-800"
            }`}
          >
            Get started
            <ArrowUpRightIcon className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {open && (
        <div className="mx-auto mt-2 flex max-w-6xl flex-col gap-1 rounded-3xl border border-black/5 bg-white/95 p-3 shadow-lg shadow-black/10 backdrop-blur md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-full px-4 py-2.5 text-sm font-medium text-neutral-700 hover:bg-black/5 hover:text-neutral-950"
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-1 flex flex-col gap-2 border-t border-black/5 pt-2">
            <Link
              href="/get-started"
              className="rounded-full bg-neutral-950 px-4 py-2.5 text-center text-sm font-medium text-white"
            >
              Get started
            </Link>
          </div>
        </div>
      )}
    </header>
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
