import PropertyForm from "../PropertyForm";
import { createPropertyAction } from "../actions";

export default function NewPropertyPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">New property</h1>
      <p className="mt-1 text-sm text-neutral-500">
        This will appear on the public properties page once created.
      </p>

      <div className="mt-6">
        <PropertyForm action={createPropertyAction} />
      </div>
    </div>
  );
}
