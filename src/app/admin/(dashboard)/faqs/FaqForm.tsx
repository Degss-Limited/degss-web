import { Field, TextareaField } from "@/components/admin/fields";
import type { Faq } from "@/lib/data/faqs";

export default function FaqForm({
  faq,
  action,
  onCancel,
}: {
  faq?: Faq;
  action: (formData: FormData) => void;
  onCancel: () => void;
}) {
  return (
    <form action={action} className="space-y-5">
      <Field label="Question" name="question" defaultValue={faq?.question} required />
      <TextareaField label="Answer" name="answer" defaultValue={faq?.answer} rows={5} required />

      <div className="flex items-center gap-3">
        <button
          type="submit"
          className="rounded-full bg-neutral-950 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
        >
          {faq ? "Save changes" : "Create FAQ"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-full border border-black/10 px-6 py-3 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
