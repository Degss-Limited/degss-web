"use client";

import { useState } from "react";
import { Field, SelectField } from "@/components/admin/fields";
import SqftField from "@/components/admin/SqftField";
import type { Property } from "@/lib/data/properties";

export default function DetailsFields({ property }: { property?: Property }) {
  const [listingType, setListingType] = useState<"Building" | "Land">(
    property?.listingType ?? "Building"
  );
  const isLand = listingType === "Land";

  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-neutral-700">
            Listing type <span className="text-neutral-950">*</span>
          </label>
          <div className="inline-flex rounded-xl border border-black/10 bg-neutral-100 p-1">
            {(["Building", "Land"] as const).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setListingType(option)}
                aria-pressed={listingType === option}
                className={`rounded-lg px-4 py-1.5 text-sm font-medium transition-colors ${
                  listingType === option
                    ? "bg-neutral-950 text-white"
                    : "text-neutral-600 hover:text-neutral-950"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
          <input type="hidden" name="listingType" value={listingType} />
          <p className="mt-1.5 text-xs text-neutral-400">
            Land listings hide bedrooms, bathrooms, year built, and parking.
          </p>
        </div>
        <SelectField
          label="Status"
          name="status"
          defaultValue={property?.status ?? "Available"}
          options={[
            { label: "Available", value: "Available" },
            { label: "Under Offer", value: "Under Offer" },
            { label: "Sold", value: "Sold" },
          ]}
          required
        />
      </div>

      {!isLand && (
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Bedrooms" name="beds" type="number" defaultValue={property?.beds ?? 0} required />
          <Field label="Bathrooms" name="baths" type="number" defaultValue={property?.baths ?? 0} required />
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <SqftField defaultValue={property?.sqft} />
        <Field label="Lot size" name="lotSize" defaultValue={property?.lotSize} placeholder="e.g. 0.35 Acres" required />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Highlight tag" name="highlight" defaultValue={property?.highlight} placeholder="e.g. Private Pool" />
        <Field
          label="Property type"
          name="propertyType"
          defaultValue={property?.propertyType}
          placeholder={isLand ? "e.g. Residential Land" : "e.g. Detached Villa"}
          required
        />
      </div>

      {!isLand && (
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Year built" name="yearBuilt" type="number" defaultValue={property?.yearBuilt ?? undefined} />
          <Field label="Parking" name="parking" defaultValue={property?.parking} placeholder="e.g. 4-Car Garage" required />
        </div>
      )}
    </>
  );
}
