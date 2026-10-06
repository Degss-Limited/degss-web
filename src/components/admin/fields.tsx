export const inputClass =
  "w-full rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm text-neutral-950 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-950/20";

export function Field({
  label,
  name,
  type = "text",
  defaultValue,
  placeholder,
  required,
  hint,
}: {
  label: string;
  name: string;
  type?: string;
  defaultValue?: string | number;
  placeholder?: string;
  required?: boolean;
  hint?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-neutral-700">
        {label}
        {required && <span className="text-neutral-950"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required={required}
        className={inputClass}
      />
      {hint && <p className="mt-1 text-xs text-neutral-400">{hint}</p>}
    </div>
  );
}

export function TextareaField({
  label,
  name,
  defaultValue,
  placeholder,
  required,
  rows = 4,
  hint,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  hint?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-neutral-700">
        {label}
        {required && <span className="text-neutral-950"> *</span>}
      </label>
      <textarea
        id={name}
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required={required}
        rows={rows}
        className={`${inputClass} resize-y`}
      />
      {hint && <p className="mt-1 text-xs text-neutral-400">{hint}</p>}
    </div>
  );
}

export function SelectField({
  label,
  name,
  defaultValue,
  options,
  required,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  options: { label: string; value: string }[];
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-neutral-700">
        {label}
        {required && <span className="text-neutral-950"> *</span>}
      </label>
      <select
        id={name}
        name={name}
        defaultValue={defaultValue}
        required={required}
        className={inputClass}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function linesToArray(value: FormDataEntryValue | null): string[] {
  return String(value ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}
