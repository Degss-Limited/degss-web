import ServiceForm from "../ServiceForm";
import { createServiceAction } from "../actions";

export default function NewServicePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">New service</h1>
      <div className="mt-6">
        <ServiceForm action={createServiceAction} />
      </div>
    </div>
  );
}
