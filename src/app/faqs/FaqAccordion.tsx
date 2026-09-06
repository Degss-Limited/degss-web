"use client";

import { useState } from "react";

export default function FaqAccordion({
  faqs,
}: {
  faqs: { question: string; answer: string }[];
}) {
  return (
    <div className="mt-10 space-y-3">
      {faqs.map((faq) => (
        <FaqItem key={faq.question} {...faq} />
      ))}
    </div>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="overflow-hidden rounded-2xl border border-black/10 bg-white">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="font-medium text-neutral-950">{question}</span>
        <PlusIcon
          open={open}
          className="h-5 w-5 shrink-0 text-neutral-950"
        />
      </button>
      {open && (
        <div className="px-6 pb-5 text-neutral-600">
          <p>{answer}</p>
        </div>
      )}
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
        className="origin-center transition-transform duration-200"
        style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)" }}
      />
    </svg>
  );
}
