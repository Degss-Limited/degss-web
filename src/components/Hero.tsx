"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";

export const defaultHeroSlides = [
  { src: "/hero-img.jpg", alt: "DEGSS residential building" },
  { src: "/abt-hero.jpg", alt: "A DEGSS property" },
  { src: "/team-hero.jpg", alt: "The DEGSS team at work" },
];

const SLIDE_INTERVAL_MS = 6000;

export default function Hero({
  slides = defaultHeroSlides,
}: {
  slides?: { src: string; alt: string }[];
}) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(id);
  }, [slides.length]);

  return (
    <section
      data-navbar-variant="dark"
      className="relative flex min-h-screen flex-col overflow-hidden bg-neutral-950"
    >
      <div className="absolute inset-0 h-full w-full">
        {slides.map((slide, index) => (
          <div
            key={slide.src}
            className="absolute inset-0 h-full w-full transition-transform duration-1000 ease-in-out"
            style={{ transform: `translateX(${(index - active) * 100}%)` }}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-t from-black/85 via-black/40 to-black/30"
      />

      <Navbar />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end gap-10 px-6 pb-14 pt-40 sm:px-10 lg:px-0">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <h1 className="max-w-3xl text-balance text-5xl font-bold leading-[0.95] tracking-tight text-white sm:text-6xl md:text-7xl">
            Welcome to
            <br />
            More.
          </h1>
          <p className="max-w-sm text-lg leading-7 text-white/60 lg:text-right">
            Real estate should give you more than somewhere to put your money.
            It should create room for life, wealth, possibility and legacy.
          </p>
        </div>

        <div className="flex w-fit flex-col gap-3 sm:flex-row">
          <Link
            href="/properties"
            className="flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-neutral-950 transition-colors hover:bg-white/90"
          >
            Explore properties
            <ArrowUpRightIcon className="h-4 w-4" />
          </Link>
          <Link
            href="/contact"
            className="flex items-center justify-center gap-2 rounded-full border border-white/30 px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
          >
            Get in touch
          </Link>
        </div>
      </div>

      <div className="absolute bottom-14 right-6 z-10 flex gap-2 sm:right-10 lg:right-16">
        {slides.map((slide, index) => (
          <button
            key={slide.src}
            type="button"
            onClick={() => setActive(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === active}
            className={`h-1.5 rounded-full transition-all ${
              index === active ? "w-8 bg-white" : "w-1.5 bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={() => {
          if (typeof window !== "undefined") {
            window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
          }
        }}
        aria-label="Scroll down"
        className="group relative z-10 mb-10 flex flex-col items-center gap-3 self-center text-white/70 transition-colors hover:text-white"
      >
        <span className="flex h-10 w-6 items-start justify-center rounded-full border border-white/40 p-1.5">
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/70 group-hover:bg-white" />
        </span>
        <span className="text-[11px] font-medium uppercase tracking-[0.2em]">
          Scroll down
        </span>
      </button>
    </section>
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
