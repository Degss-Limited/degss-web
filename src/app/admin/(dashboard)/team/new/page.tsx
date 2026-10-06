import TeamMemberForm from "../TeamMemberForm";
import { createTeamMemberAction } from "../actions";

export default function NewTeamMemberPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">New team member</h1>
      <div className="mt-6">
        <TeamMemberForm action={createTeamMemberAction} />
      </div>
    </div>
  );
}
