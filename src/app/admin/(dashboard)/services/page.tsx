import Link from "next/link";
import ConfirmSubmitButton from "@/components/admin/ConfirmSubmitButton";
import EmptyState from "@/components/admin/EmptyState";
import { listServices } from "@/lib/data/services";
import { deleteServiceAction } from "./actions";

export default async function AdminServicesPage() {
  const services = await listServices();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Services</h1>
          <p className="mt-1 text-sm text-neutral-500">
            Populates the &quot;What We Do&quot; menu in the site navbar.
          </p>
        </div>
        <Link
          href="/admin/services/new"
          className="rounded-full bg-neutral-950 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
        >
          New service
        </Link>
      </div>

      <div className="mt-6 space-y-3">
        {services.length === 0 && (
          <div className="rounded-2xl border border-black/10 bg-white">
            <EmptyState title="No services yet" />
          </div>
        )}
        {services.map((service) => (
          <div
            key={service.id}
            className="flex items-center justify-between gap-4 rounded-2xl border border-black/10 bg-white p-5"
          >
            <div>
              <p className="font-medium text-neutral-950">{service.label}</p>
              <p className="text-sm text-neutral-500">{service.description}</p>
              <p className="mt-1 text-xs text-neutral-400">/services/{service.slug} &middot; {service.iconName}</p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <Link
                href={`/admin/services/${service.id}/edit`}
                className="rounded-full border border-black/10 px-3 py-1.5 text-xs font-medium text-neutral-700 transition-colors hover:bg-neutral-100"
              >
                Edit
              </Link>
              <form action={deleteServiceAction}>
                <input type="hidden" name="id" value={service.id} />
                <ConfirmSubmitButton
                  confirmMessage={`Delete "${service.label}"?`}
                  className="rounded-full border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-50"
                >
                  Delete
                </ConfirmSubmitButton>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
