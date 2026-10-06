"use client";

import { useId, useState } from "react";

export default function PasswordField({
  label,
  name,
  autoComplete,
}: {
  label: string;
  name: string;
  autoComplete?: string;
}) {
  const [visible, setVisible] = useState(false);
  const id = useId();

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-neutral-700">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          name={name}
          type={visible ? "text" : "password"}
          required
          autoComplete={autoComplete}
          className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 pr-11 text-sm text-neutral-950 focus:outline-none focus:ring-2 focus:ring-neutral-950/10"
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Hide password" : "Show password"}
          aria-pressed={visible}
          className="absolute right-1 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-700"
        >
          {visible ? <EyeOffIcon className="h-4.5 w-4.5" /> : <EyeIcon className="h-4.5 w-4.5" />}
        </button>
      </div>
    </div>
  );
}

function EyeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="2.75" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

function EyeOffIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M3 3L21 21"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M10.6 5.64A10.6 10.6 0 0 1 12 5.5C18 5.5 21.5 12 21.5 12C21.06 12.86 20.3 13.96 19.27 15M6.6 6.6C4.14 8.2 2.5 12 2.5 12S6 18.5 12 18.5C13.71 18.5 15.19 17.97 16.42 17.19"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.9 14.1A2.75 2.75 0 0 1 14.1 9.9"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}
