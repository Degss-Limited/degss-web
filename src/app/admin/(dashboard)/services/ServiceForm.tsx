import Link from "next/link";
import { Field, SelectField, TextareaField } from "@/components/admin/fields";
import { SERVICE_ICON_NAMES, type Service } from "@/lib/data/services";

export default function ServiceForm({
  service,
  action,
}: {
  service?: Service;
  action: (formData: FormData) => void;
}) {
  return (
    <form action={action} className="max-w-2xl space-y-5 rounded-2xl border border-black/10 bg-white p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Label" name="label" defaultValue={service?.label} required hint="e.g. Development" />
        <Field
          label="Slug"
          name="slug"
          defaultValue={service?.slug}
          required
          hint="Used in the URL, e.g. /services/development"
        />
      </div>
      <TextareaField
        label="Short description"
        name="description"
        defaultValue={service?.description}
        rows={2}
        hint="Shown under the label in the navbar menu."
      />
      <SelectField
        label="Icon"
        name="iconName"
        defaultValue={service?.iconName ?? "BuildingIcon"}
        options={SERVICE_ICON_NAMES.map((name) => ({ label: name, value: name }))}
        required
      />

      <div className="flex items-center gap-3">
        <button
          type="submit"
          className="rounded-full bg-neutral-950 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
        >
          {service ? "Save changes" : "Create service"}
        </button>
        <Link
          href="/admin/services"
          className="rounded-full border border-black/10 px-6 py-3 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
