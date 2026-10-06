import Image from "next/image";

export default function EmptyState({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-6 py-10 text-center">
      <Image
        src="/empty-state.svg"
        alt=""
        width={200}
        height={180}
        className="h-32 w-auto"
      />
      <div>
        <p className="text-sm font-medium text-neutral-700">{title}</p>
        {description && (
          <p className="mt-1 text-xs text-neutral-500">{description}</p>
        )}
      </div>
    </div>
  );
}
