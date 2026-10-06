"use client";

import { formatAndPreserveCaret } from "@/components/admin/formatOnChange";
import { formatThousands } from "@/lib/format";

export default function BudgetField({
  label,
  name,
  placeholder,
  required,
}: {
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1.5 block text-sm font-medium text-neutral-700"
      >
        {label}
        {required && <span className="text-[#39548b]">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type="text"
        inputMode="numeric"
        placeholder={placeholder}
        required={required}
        onChange={(event) => formatAndPreserveCaret(event.currentTarget, formatThousands)}
        className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-neutral-950 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-950/10"
      />
    </div>
  );
}
