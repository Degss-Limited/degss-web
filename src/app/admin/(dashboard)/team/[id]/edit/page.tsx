import { notFound } from "next/navigation";
import TeamMemberForm from "../../TeamMemberForm";
import { updateTeamMemberAction } from "../../actions";
import { getTeamMemberById } from "@/lib/data/team";

export default async function EditTeamMemberPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const member = await getTeamMemberById(id);

  if (!member) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Edit team member</h1>
      <div className="mt-6">
        <TeamMemberForm
          member={member}
          action={updateTeamMemberAction.bind(null, member.id)}
        />
      </div>
    </div>
  );
}
