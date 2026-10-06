import { notFound } from "next/navigation";
import PropertyForm from "../../PropertyForm";
import { updatePropertyAction } from "../../actions";
import { getPropertyById } from "@/lib/data/properties";

export default async function EditPropertyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const property = await getPropertyById(id);

  if (!property) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Edit property</h1>
      <p className="mt-1 text-sm text-neutral-500">{property.title}</p>

      <div className="mt-6">
        <PropertyForm
          property={property}
          action={updatePropertyAction.bind(null, property.id)}
        />
      </div>
    </div>
  );
}
