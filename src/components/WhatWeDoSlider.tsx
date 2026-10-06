"use client";

import Link from "next/link";
import { useState } from "react";

export type Pillar = {
  label: string;
  href: string;
  image: string;
  paragraph: string;
  highlights: string[];
  cta: string;
};

export default function WhatWeDoSlider({ pillars }: { pillars: Pillar[] }) {
  const [index, setIndex] = useState(0);
  const pillar = pillars[index];
  const isFirst = index === 0;
  const isLast = index === pillars.length - 1;

  function prev() {
    setIndex((i) => Math.max(i - 1, 0));
  }

  function next() {
    setIndex((i) => Math.min(i + 1, pillars.length - 1));
  }

  return (
    <div className="grid overflow-hidden rounded-3xl bg-white lg:grid-cols-2">
      <div className="flex items-center p-4 sm:p-6">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
          {/* eslint-disable-next-line @next/next/no-img-element -- placeholder photography */}
          <img
            key={pillar.image}
            src={pillar.image}
            alt={pillar.label}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>

      <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
        <h3 className="text-3xl font-bold tracking-tight text-neutral-950 sm:text-4xl">
          {pillar.label}
        </h3>
        <p className="mt-4 text-neutral-600">{pillar.paragraph}</p>

        <div className="mt-6 space-y-3">
          {pillar.highlights.map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 text-sm font-medium text-neutral-800"
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-neutral-950 text-white">
                <CheckIcon className="h-3.5 w-3.5" />
              </span>
              {item}
            </div>
          ))}
        </div>

        <Link
          href={pillar.href}
          className="mt-8 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-[#ee3442]"
        >
          {pillar.cta}
          <ArrowUpRightIcon className="h-3.5 w-3.5" />
        </Link>

        <div className="mt-10 ml-auto flex items-center gap-3">
          <button
            type="button"
            onClick={prev}
            disabled={isFirst}
            aria-label="Previous"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-[#ee3442] text-white transition-colors hover:bg-[#c92531] disabled:cursor-not-allowed disabled:bg-[#ee3442]/20 disabled:hover:bg-[#ee3442]/20"
          >
            <ArrowLeftIcon className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={next}
            disabled={isLast}
            aria-label="Next"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-[#ee3442] text-white transition-colors hover:bg-[#c92531] disabled:cursor-not-allowed disabled:bg-[#ee3442]/20 disabled:hover:bg-[#ee3442]/20"
          >
            <ArrowRightIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M5 12.5L9.5 17L19 7.5"
        stroke="currentColor"
        strokeWidth="2.2"
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

function ArrowLeftIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M19 12H5M5 12L11 6M5 12L11 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M5 12H19M19 12L13 6M19 12L13 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
