"use client";

import { useEffect, useState } from "react";
import ConfirmSubmitButton from "@/components/admin/ConfirmSubmitButton";
import { CloseIcon } from "@/components/admin/icons";
import type { GetStartedSubmission } from "@/lib/data/submissions";

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("en-NG", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function Chips({ submission }: { submission: GetStartedSubmission }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {submission.reason && (
        <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs text-neutral-600">
          {submission.reason}
        </span>
      )}
      {submission.budget && (
        <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs text-neutral-600">
          {submission.budget}
        </span>
      )}
      {submission.timeline && (
        <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs text-neutral-600">
          {submission.timeline}
        </span>
      )}
    </div>
  );
}

export default function GetStartedLeadsTable({
  submissions,
  toggleReadAction,
  deleteAction,
  returnTo,
}: {
  submissions: GetStartedSubmission[];
  toggleReadAction: (
    id: string,
    isRead: boolean,
    returnTo: string
  ) => Promise<void>;
  deleteAction: (formData: FormData) => Promise<void>;
  returnTo: string;
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = submissions.find((s) => s.id === selectedId) ?? null;

  useEffect(() => {
    if (!selectedId) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedId(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedId]);

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-black/10 text-xs uppercase tracking-wide text-neutral-400">
            <tr>
              <th className="px-6 py-3 font-medium">Name</th>
              <th className="px-6 py-3 font-medium">Contact</th>
              <th className="px-6 py-3 font-medium">Looking for</th>
              <th className="px-6 py-3 font-medium">Received</th>
              <th className="px-6 py-3 font-medium" />
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5">
            {submissions.map((submission) => (
              <tr
                key={submission.id}
                className={submission.isRead ? undefined : "bg-neutral-950/3"}
              >
                <td className="px-6 py-4 align-top font-medium text-neutral-950">
                  <span className="flex items-center gap-2">
                    {submission.firstName} {submission.lastName}
                    {!submission.isRead && (
                      <span className="rounded-full bg-neutral-950 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                        New
                      </span>
                    )}
                  </span>
                </td>
                <td className="px-6 py-4 align-top text-neutral-600">
                  <span className="block">{submission.email}</span>
                  {submission.phone && (
                    <span className="block text-neutral-400">
                      {submission.phone}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 align-top">
                  <Chips submission={submission} />
                </td>
                <td className="whitespace-nowrap px-6 py-4 align-top text-xs text-neutral-400">
                  {formatDate(submission.createdAt)}
                </td>
                <td className="px-6 py-4 align-top">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedId(submission.id)}
                      className="rounded-full border border-black/10 px-3 py-1.5 text-xs font-medium text-neutral-700 transition-colors hover:bg-neutral-100"
                    >
                      View
                    </button>
                    <form
                      action={toggleReadAction.bind(
                        null,
                        submission.id,
                        !submission.isRead,
                        returnTo
                      )}
                    >
                      <button
                        type="submit"
                        className="rounded-full border border-black/10 px-3 py-1.5 text-xs font-medium text-neutral-700 transition-colors hover:bg-neutral-100"
                      >
                        {submission.isRead ? "Mark unread" : "Mark read"}
                      </button>
                    </form>
                    <form action={deleteAction}>
                      <input type="hidden" name="id" value={submission.id} />
                      <input type="hidden" name="returnTo" value={returnTo} />
                      <ConfirmSubmitButton
                        confirmMessage="Delete this lead?"
                        className="rounded-full border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-50"
                      >
                        Delete
                      </ConfirmSubmitButton>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => setSelectedId(null)}
        >
          <div
            className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="flex items-center gap-2 text-lg font-semibold text-neutral-950">
                  {selected.firstName} {selected.lastName}
                  {!selected.isRead && (
                    <span className="rounded-full bg-neutral-950 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                      New
                    </span>
                  )}
                </p>
                <p className="mt-1 text-sm text-neutral-500">
                  {selected.email}
                  {selected.phone && ` · ${selected.phone}`}
                </p>
                <p className="mt-1 text-xs text-neutral-400">
                  {formatDate(selected.createdAt)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedId(null)}
                aria-label="Close"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-700"
              >
                <CloseIcon className="h-4.5 w-4.5" />
              </button>
            </div>

            <div className="mt-4">
              <Chips submission={selected} />
            </div>

            {selected.message && (
              <p className="mt-5 whitespace-pre-wrap text-sm leading-relaxed text-neutral-700">
                {selected.message}
              </p>
            )}

            <div className="mt-6 flex items-center gap-2 border-t border-black/5 pt-4">
              <form
                action={toggleReadAction.bind(
                  null,
                  selected.id,
                  !selected.isRead,
                  returnTo
                )}
              >
                <button
                  type="submit"
                  className="rounded-full border border-black/10 px-3 py-1.5 text-xs font-medium text-neutral-700 transition-colors hover:bg-neutral-100"
                >
                  {selected.isRead ? "Mark unread" : "Mark read"}
                </button>
              </form>
              <form action={deleteAction}>
                <input type="hidden" name="id" value={selected.id} />
                <input type="hidden" name="returnTo" value={returnTo} />
                <ConfirmSubmitButton
                  confirmMessage="Delete this lead?"
                  className="rounded-full border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-50"
                >
                  Delete
                </ConfirmSubmitButton>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
