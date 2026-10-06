"use client";

import { formatThousands } from "@/lib/format";
import { formatAndPreserveCaret } from "./formatOnChange";

const inputClass =
  "w-full rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm text-neutral-950 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-950/20";

export default function SqftField({ defaultValue }: { defaultValue?: string }) {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    formatAndPreserveCaret(event.currentTarget, formatThousands);
  }

  return (
    <div>
      <label htmlFor="sqft" className="mb-1.5 block text-sm font-medium text-neutral-700">
        Square footage<span className="text-neutral-950"> *</span>
      </label>
      <input
        id="sqft"
        name="sqft"
        type="text"
        defaultValue={defaultValue ? formatThousands(defaultValue) : defaultValue}
        onChange={handleChange}
        placeholder="e.g. 5,000"
        required
        className={inputClass}
      />
      <p className="mt-1 text-xs text-neutral-400">
        Commas are added automatically as you type, e.g. 5,000.
      </p>
    </div>
  );
}
