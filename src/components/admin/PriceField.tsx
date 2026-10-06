"use client";

import { formatPrice } from "@/lib/format";
import { formatAndPreserveCaret } from "./formatOnChange";

const inputClass =
  "w-full rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm text-neutral-950 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-950/20";

export default function PriceField({ defaultValue }: { defaultValue?: string }) {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    formatAndPreserveCaret(event.currentTarget, formatPrice);
  }

  return (
    <div>
      <label htmlFor="price" className="mb-1.5 block text-sm font-medium text-neutral-700">
        Price<span className="text-neutral-950"> *</span>
      </label>
      <input
        id="price"
        name="price"
        type="text"
        defaultValue={defaultValue ? formatPrice(defaultValue) : defaultValue}
        onChange={handleChange}
        placeholder="e.g. ₦850,000,000"
        required
        className={inputClass}
      />
      <p className="mt-1 text-xs text-neutral-400">
        Commas are added automatically as you type, e.g. ₦850,000,000.
      </p>
    </div>
  );
}
