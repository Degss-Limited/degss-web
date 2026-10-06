import Link from "next/link";
import ConfirmSubmitButton from "@/components/admin/ConfirmSubmitButton";
import EmptyState from "@/components/admin/EmptyState";
import { listTeamMembers } from "@/lib/data/team";
import { deleteTeamMemberAction } from "./actions";

export default async function AdminTeamPage() {
  const members = await listTeamMembers();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Team</h1>
          <p className="mt-1 text-sm text-neutral-500">
            Shown on the public /about/team page, in this order.
          </p>
        </div>
        <Link
          href="/admin/team/new"
          className="rounded-full bg-neutral-950 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
        >
          New team member
        </Link>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {members.length === 0 && (
          <div className="rounded-2xl border border-black/10 bg-white sm:col-span-2 lg:col-span-3">
            <EmptyState title="No team members yet" />
          </div>
        )}
        {members.map((member) => (
          <div key={member.id} className="rounded-2xl border border-black/10 bg-white p-5">
            {/* eslint-disable-next-line @next/next/no-img-element -- admin-entered URLs can be any domain */}
            <img
              src={member.photo}
              alt={member.name}
              className="h-40 w-full rounded-xl object-cover object-top"
            />
            <p className="mt-3 font-semibold text-neutral-950">{member.name}</p>
            <p className="text-sm text-neutral-500">{member.title}</p>
            <div className="mt-4 flex items-center gap-2">
              <Link
                href={`/admin/team/${member.id}/edit`}
                className="rounded-full border border-black/10 px-3 py-1.5 text-xs font-medium text-neutral-700 transition-colors hover:bg-neutral-100"
              >
                Edit
              </Link>
              <form action={deleteTeamMemberAction}>
                <input type="hidden" name="id" value={member.id} />
                <ConfirmSubmitButton
                  confirmMessage={`Remove ${member.name} from the team page?`}
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
