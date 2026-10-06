import Link from "next/link";
import ConfirmSubmitButton from "@/components/admin/ConfirmSubmitButton";
import EmptyState from "@/components/admin/EmptyState";
import { listProperties } from "@/lib/data/properties";
import { deletePropertyAction } from "./actions";

export default async function AdminPropertiesPage() {
  const properties = await listProperties();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Properties</h1>
          <p className="mt-1 text-sm text-neutral-500">
            Listings shown on the public /properties page.
          </p>
        </div>
        <Link
          href="/admin/properties/new"
          className="rounded-full bg-neutral-950 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
        >
          New property
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-black/10 bg-white">
        {properties.length === 0 ? (
          <EmptyState
            title="No properties yet"
            description="Create one to get started."
          />
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="border-b border-black/10 text-xs uppercase tracking-wide text-neutral-400">
              <tr>
                <th className="px-6 py-3 font-medium">Title</th>
                <th className="px-6 py-3 font-medium">Location</th>
                <th className="px-6 py-3 font-medium">Price</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium" />
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {properties.map((property) => (
                <tr key={property.id}>
                  <td className="px-6 py-4 font-medium text-neutral-950">
                    {property.title}
                  </td>
                  <td className="px-6 py-4 text-neutral-600">{property.location}</td>
                  <td className="px-6 py-4 text-neutral-600">{property.price}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        property.status === "Available"
                          ? "bg-emerald-50 text-emerald-700"
                          : property.status === "Under Offer"
                            ? "bg-amber-50 text-amber-700"
                            : "bg-neutral-100 text-neutral-600"
                      }`}
                    >
                      {property.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/properties/${property.id}/edit`}
                        className="rounded-full border border-black/10 px-3 py-1.5 text-xs font-medium text-neutral-700 transition-colors hover:bg-neutral-100"
                      >
                        Edit
                      </Link>
                      <form action={deletePropertyAction}>
                        <input type="hidden" name="id" value={property.id} />
                        <input type="hidden" name="slug" value={property.slug} />
                        <ConfirmSubmitButton
                          confirmMessage={`Delete "${property.title}"? This can't be undone.`}
                          className="rounded-full border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-50"
                        >
                          Delete
                        </ConfirmSubmitButton>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
