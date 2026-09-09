"use client";

import { useState } from "react";

export default function FaqAccordion({
  faqs,
}: {
  faqs: { question: string; answer: string }[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="mt-10 space-y-3">
      {faqs.map((faq, index) => (
        <FaqItem
          key={faq.question}
          {...faq}
          open={openIndex === index}
          onToggle={() =>
            setOpenIndex((current) => (current === index ? null : index))
          }
        />
      ))}
    </div>
  );
}

function FaqItem({
  question,
  answer,
  open,
  onToggle,
}: {
  question: string;
  answer: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-black/10 bg-white">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="font-medium text-neutral-950">{question}</span>
        <PlusIcon open={open} className="h-5 w-5 shrink-0 text-neutral-950" />
      </button>

      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-6 pb-5 text-neutral-600">{answer}</p>
        </div>
      </div>
    </div>
  );
}

function PlusIcon({ open, className }: { open: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M12 5V19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        className="origin-center transition-transform duration-300 ease-in-out"
        style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)" }}
      />
    </svg>
  );
}
