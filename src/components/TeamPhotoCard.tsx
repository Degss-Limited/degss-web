"use client";

import Image from "next/image";

export type TeamMember = {
  role: string;
  department: string;
  photo: string;
  bio?: string;
};

export default function TeamPhotoCard({
  member,
  open,
  onOpen,
  onClose,
}: {
  member: TeamMember;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  return (
    <div className="relative aspect-3/4 overflow-hidden rounded-3xl bg-neutral-100">
      <Image
        src={member.photo}
        alt={member.role}
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover"
      />
      <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-4 rounded-2xl bg-white/95 p-5 backdrop-blur-sm">
        <div>
          <h4 className="text-lg font-semibold text-neutral-950">{member.role}</h4>
          <p className="mt-0.5 text-sm text-neutral-500">{member.department}</p>
        </div>
        {member.bio && (
          <button
            type="button"
            onClick={onOpen}
            aria-label={`Read more about the ${member.role}`}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-950 text-white transition-transform hover:scale-105"
          >
            <ArrowUpRightIcon className="h-4 w-4" />
          </button>
        )}
      </div>

      {member.bio && (
        <div
          className={`absolute inset-0 flex flex-col bg-white p-7 m-3 rounded-2xl transition-opacity duration-200 ${
            open ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-neutral-950 transition-colors hover:bg-neutral-200"
          >
            <CloseIcon className="h-4 w-4" />
          </button>

          <h4 className="text-lg font-semibold text-neutral-950">
            {member.role}
          </h4>
          <p className="mt-0.5 text-sm text-neutral-500">
            {member.department}
          </p>
          <p className="mt-4 text-sm leading-6 text-neutral-600">
            {member.bio}
          </p>
        </div>
      )}
    </div>
  );
}

function ArrowUpRightIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M7 17L17 7M17 7H8M17 7V16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M6 6L18 18M18 6L6 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
