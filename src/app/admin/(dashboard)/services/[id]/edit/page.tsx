import { notFound } from "next/navigation";
import ServiceForm from "../../ServiceForm";
import { updateServiceAction } from "../../actions";
import { getServiceById } from "@/lib/data/services";

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const service = await getServiceById(id);

  if (!service) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Edit service</h1>
      <div className="mt-6">
        <ServiceForm
          service={service}
          action={updateServiceAction.bind(null, service.id)}
        />
      </div>
    </div>
  );
}
