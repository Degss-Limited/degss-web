import Link from "next/link";
import { Field } from "@/components/admin/fields";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { RichTextField } from "@/components/admin/RichTextField";
import type { TeamMember } from "@/lib/data/team";

export default function TeamMemberForm({
  member,
  action,
}: {
  member?: TeamMember;
  action: (formData: FormData) => void;
}) {
  return (
    <form action={action} className="space-y-5 rounded-2xl border border-black/10 bg-white p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" name="name" defaultValue={member?.name} required />
        <Field label="Title / role" name="title" defaultValue={member?.title} required />
      </div>
      <ImageUploadField
        label="Photo"
        name="photo"
        defaultValue={member?.photo}
        required
      />
      <RichTextField label="Bio" name="bio" defaultValue={member?.bio} />

      <div className="flex items-center gap-3">
        <button
          type="submit"
          className="rounded-full bg-neutral-950 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
        >
          {member ? "Save changes" : "Add team member"}
        </button>
        <Link
          href="/admin/team"
          className="rounded-full border border-black/10 px-6 py-3 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
