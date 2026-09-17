"use client";

import { useState } from "react";
import TeamPhotoCard, { type TeamMember } from "@/components/TeamPhotoCard";

export default function TeamGrid({ members }: { members: TeamMember[] }) {
  const [openRole, setOpenRole] = useState<string | null>(null);

  return (
    <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {members.map((member) => (
        <TeamPhotoCard
          key={member.role}
          member={member}
          open={openRole === member.role}
          onOpen={() => setOpenRole(member.role)}
          onClose={() => setOpenRole(null)}
        />
      ))}
    </div>
  );
}
