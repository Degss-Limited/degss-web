"use client";

import Image from "next/image";
import Navbar from "./Navbar";

export default function Hero() {
  return (
    <section
      data-navbar-variant="dark"
      className="relative flex min-h-screen flex-col overflow-hidden bg-neutral-950"
    >
      <Image
        src="/hero-img.jpg"
        alt="DEGSS residential building"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-t from-black/85 via-black/40 to-black/30"
      />

      <Navbar />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end gap-10 px-6 pb-14 pt-40 sm:px-10 lg:px-16">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <h1 className="max-w-3xl text-balance text-5xl font-bold leading-[0.95] tracking-tight text-white sm:text-6xl md:text-7xl">
            Find a Place
            <br />
            You&apos;ll Call Home
          </h1>
          <p className="max-w-sm text-lg leading-7 text-white/60 lg:text-right">
            DEGSS helps you find, compare, and secure the right property — fast and easily.
          </p>
        </div>

        <a
          href="/properties"
          className="flex w-fit items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-neutral-950 transition-colors hover:bg-white/90"
        >
          View properties
          <ArrowUpRightIcon className="h-4 w-4" />
        </a>
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
