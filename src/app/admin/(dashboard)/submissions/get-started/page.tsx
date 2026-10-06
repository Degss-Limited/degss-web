import Link from "next/link";
import EmptyState from "@/components/admin/EmptyState";
import GetStartedLeadsTable from "@/components/admin/GetStartedLeadsTable";
import { SearchIcon } from "@/components/admin/icons";
import { listGetStartedSubmissions } from "@/lib/data/submissions";
import {
  deleteGetStartedSubmissionAction,
  toggleGetStartedReadAction,
} from "./actions";

const PAGE_SIZE = 10;

export default async function AdminGetStartedSubmissionsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; q?: string }>;
}) {
  const { page: pageParam, q = "" } = await searchParams;
  const allSubmissions = await listGetStartedSubmissions();

  const query = q.trim().toLowerCase();
  const submissions = query
    ? allSubmissions.filter((s) =>
        [s.firstName, s.lastName, s.email, s.phone, s.reason, s.budget, s.timeline, s.message]
          .join(" ")
          .toLowerCase()
          .includes(query)
      )
    : allSubmissions;

  const totalPages = Math.max(1, Math.ceil(submissions.length / PAGE_SIZE));
  const page = Math.min(Math.max(1, Number(pageParam) || 1), totalPages);
  const paginated = submissions.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const pageHref = (p: number) =>
    `/admin/submissions/get-started?${new URLSearchParams({
      ...(query ? { q } : {}),
      page: String(p),
    }).toString()}`;

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Get started leads</h1>
      <p className="mt-1 text-sm text-neutral-500">
        Submitted through the public /get-started form.
      </p>

      <form className="mt-6 max-w-sm" action="/admin/submissions/get-started">
        <div className="flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2.5">
          <SearchIcon className="h-4 w-4 shrink-0 text-neutral-400" />
          <input
            type="text"
            name="q"
            defaultValue={q}
            placeholder="Search by name, email, phone..."
            className="w-full bg-transparent text-sm text-neutral-900 outline-none placeholder:text-neutral-400"
          />
        </div>
      </form>

      <div className="mt-4 overflow-hidden rounded-2xl border border-black/10 bg-white">
        {submissions.length === 0 ? (
          <EmptyState title={query ? "No matching leads" : "No leads yet"} />
        ) : (
          <>
            <GetStartedLeadsTable
              submissions={paginated}
              toggleReadAction={toggleGetStartedReadAction}
              deleteAction={deleteGetStartedSubmissionAction}
              returnTo={pageHref(page)}
            />

            {totalPages > 1 && (
              <div className="flex items-center justify-between border-t border-black/10 px-6 py-4">
                <p className="text-xs text-neutral-500">
                  Page {page} of {totalPages}
                </p>
                <div className="flex gap-2">
                  <Link
                    href={pageHref(page - 1)}
                    className={`rounded-full border border-black/10 px-3 py-1.5 text-xs font-medium text-neutral-700 transition-colors ${
                      page <= 1
                        ? "pointer-events-none opacity-40"
                        : "hover:bg-neutral-100"
                    }`}
                  >
                    Previous
                  </Link>
                  <Link
                    href={pageHref(page + 1)}
                    className={`rounded-full border border-black/10 px-3 py-1.5 text-xs font-medium text-neutral-700 transition-colors ${
                      page >= totalPages
                        ? "pointer-events-none opacity-40"
                        : "hover:bg-neutral-100"
                    }`}
                  >
                    Next
                  </Link>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
