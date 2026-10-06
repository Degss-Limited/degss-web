import Link from "next/link";
import { MailIcon, TargetIcon, TrendingUpIcon } from "@/components/admin/icons";
import {
  listContactSubmissions,
  listGetStartedSubmissions,
} from "@/lib/data/submissions";
import { getTrafficSummary, type TrafficRangeKey } from "@/lib/data/visits";
import { getSupabase } from "@/lib/supabase";

function timeAgo(iso: string) {
  const diffMs = Date.now() - new Date(iso).getTime();
  const minutes = Math.round(diffMs / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  return `${days}d ago`;
}

const RANGE_OPTIONS: { key: TrafficRangeKey; label: string }[] = [
  { key: "day", label: "Day" },
  { key: "week", label: "Week" },
  { key: "month", label: "Month" },
  { key: "year", label: "Year" },
];

export default async function AdminDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ range?: string; from?: string; to?: string }>;
}) {
  const configured = Boolean(getSupabase());
  const { range: rangeParam, from, to } = await searchParams;

  const range: TrafficRangeKey =
    rangeParam === "day" ||
    rangeParam === "week" ||
    rangeParam === "month" ||
    rangeParam === "year" ||
    rangeParam === "custom"
      ? rangeParam
      : "week";

  const [contacts, leads, traffic] = await Promise.all([
    listContactSubmissions(),
    listGetStartedSubmissions(),
    getTrafficSummary({ range, from, to }),
  ]);

  const maxChartCount = Math.max(1, ...traffic.chart.map((d) => d.count));

  const unreadContacts = contacts.filter((c) => !c.isRead).length;
  const unreadLeads = leads.filter((l) => !l.isRead).length;
  const totalSubmissions = contacts.length + leads.length;
  const readSubmissions = totalSubmissions - unreadContacts - unreadLeads;
  const readPct = totalSubmissions
    ? Math.round((readSubmissions / totalSubmissions) * 100)
    : 0;

  const activity = [
    ...contacts.map((c) => ({
      id: c.id,
      name: `${c.firstName} ${c.lastName}`,
      type: "Contact message",
      href: "/admin/submissions/contact",
      icon: MailIcon,
      isRead: c.isRead,
      createdAt: c.createdAt,
    })),
    ...leads.map((l) => ({
      id: l.id,
      name: `${l.firstName} ${l.lastName}`,
      type: "Get started lead",
      href: "/admin/submissions/get-started",
      icon: TargetIcon,
      isRead: l.isRead,
      createdAt: l.createdAt,
    })),
  ]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 6);

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-neutral-950">Dashboard</h1>
      <p className="mt-1 text-sm text-neutral-500">
        A quick look at what&apos;s live on the site and what needs your attention.
      </p>

      {!configured && (
        <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          Supabase isn&apos;t configured yet — every count below will read as
          zero until <code className="font-mono">NEXT_PUBLIC_SUPABASE_URL</code>{" "}
          and <code className="font-mono">SUPABASE_SERVICE_ROLE_KEY</code> are
          set. See <code className="font-mono">supabase/schema.sql</code> and
          the project README for setup steps.
        </div>
      )}

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="relative overflow-hidden rounded-3xl bg-neutral-950 p-7 text-white lg:col-span-2">
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
            <ProgressRing percent={readPct} />
            <div>
              <p className="text-sm text-white/50">Submissions handled</p>
              <p className="mt-1 text-4xl font-bold tracking-tight">
                {readSubmissions}
                <span className="text-xl text-white/40"> / {totalSubmissions}</span>
              </p>
              <p className="mt-1 text-sm text-white/50">
                {unreadContacts + unreadLeads > 0
                  ? `${unreadContacts + unreadLeads} still need a reply`
                  : "You're all caught up"}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-black/10 bg-white p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-neutral-950">Recent activity</h2>
          </div>

          <div className="mt-4 flex flex-col divide-y divide-black/5">
            {activity.length === 0 && (
              <p className="py-6 text-sm text-neutral-500">
                No form submissions yet.
              </p>
            )}
            {activity.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="flex items-center gap-3 py-3 transition-colors hover:bg-neutral-50"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-neutral-600">
                  <item.icon className="h-4 w-4" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-1.5">
                    <span className="truncate text-sm font-medium text-neutral-950">
                      {item.name}
                    </span>
                    {!item.isRead && (
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-950" />
                    )}
                  </span>
                  <span className="block truncate text-xs text-neutral-500">
                    {item.type}
                  </span>
                </span>
                <span className="shrink-0 text-xs text-neutral-400">
                  {timeAgo(item.createdAt)}
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-2 flex gap-2 border-t border-black/5 pt-4">
            <Link
              href="/admin/submissions/contact"
              className="flex-1 rounded-full border border-black/10 px-3 py-2 text-center text-xs font-medium text-neutral-700 transition-colors hover:bg-neutral-100"
            >
              Messages
            </Link>
            <Link
              href="/admin/submissions/get-started"
              className="flex-1 rounded-full border border-black/10 px-3 py-2 text-center text-xs font-medium text-neutral-700 transition-colors hover:bg-neutral-100"
            >
              Leads
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="rounded-3xl border border-black/10 bg-white p-6 lg:col-span-2">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="font-semibold text-neutral-950">Site traffic</h2>
              <p className="text-xs text-neutral-500">
                {traffic.rangeLabel}, public pages only
              </p>
            </div>
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-neutral-950/10 text-neutral-950">
              <TrendingUpIcon className="h-4.5 w-4.5" />
            </span>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            {RANGE_OPTIONS.map((option) => (
              <Link
                key={option.key}
                href={`/admin?range=${option.key}`}
                className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                  range === option.key
                    ? "bg-neutral-950 text-white"
                    : "border border-black/10 text-neutral-600 hover:bg-neutral-100"
                }`}
              >
                {option.label}
              </Link>
            ))}

            <details className="relative">
              <summary
                className={`cursor-pointer list-none rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                  range === "custom"
                    ? "bg-neutral-950 text-white"
                    : "border border-black/10 text-neutral-600 hover:bg-neutral-100"
                }`}
              >
                Custom
              </summary>
              <form
                method="GET"
                action="/admin"
                className="absolute right-0 top-full z-10 mt-2 flex flex-col gap-3 rounded-2xl border border-black/10 bg-white p-4 shadow-lg shadow-black/5"
              >
                <input type="hidden" name="range" value="custom" />
                <label className="text-xs font-medium text-neutral-700">
                  From
                  <input
                    type="date"
                    name="from"
                    defaultValue={from}
                    required
                    className="mt-1 w-full rounded-lg border border-black/10 px-3 py-1.5 text-sm text-neutral-950 focus:outline-none focus:ring-2 focus:ring-neutral-950/10"
                  />
                </label>
                <label className="text-xs font-medium text-neutral-700">
                  To
                  <input
                    type="date"
                    name="to"
                    defaultValue={to}
                    required
                    className="mt-1 w-full rounded-lg border border-black/10 px-3 py-1.5 text-sm text-neutral-950 focus:outline-none focus:ring-2 focus:ring-neutral-950/10"
                  />
                </label>
                <button
                  type="submit"
                  className="rounded-full bg-neutral-950 px-3.5 py-1.5 text-xs font-medium text-white transition-colors hover:bg-neutral-800"
                >
                  Apply
                </button>
              </form>
            </details>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div>
              <p className="text-2xl font-bold tracking-tight text-neutral-950">
                {traffic.allTimeVisits}
              </p>
              <p className="text-xs text-neutral-500">All-time visits</p>
            </div>
            <div>
              <p className="text-2xl font-bold tracking-tight text-neutral-950">
                {traffic.rangeVisits}
              </p>
              <p className="text-xs text-neutral-500">Visits (selected)</p>
            </div>
            <div>
              <p className="text-2xl font-bold tracking-tight text-neutral-950">
                {traffic.rangeUniqueVisitors}
              </p>
              <p className="text-xs text-neutral-500">Unique visitors</p>
            </div>
            <div>
              <p className="text-2xl font-bold tracking-tight text-neutral-950">
                {traffic.todayVisits}
              </p>
              <p className="text-xs text-neutral-500">Today</p>
            </div>
          </div>

          <div className="mt-6 overflow-x-auto">
            <div className="flex h-28 min-w-full items-end gap-2">
              {traffic.chart.map((bucket) => (
                <div
                  key={bucket.key}
                  className="flex min-w-[10px] flex-1 flex-col items-center gap-2"
                >
                  <div className="flex h-20 w-full items-end">
                    <div
                      className="w-full rounded-t-md bg-neutral-950"
                      style={{
                        height: `${
                          bucket.count
                            ? Math.max(6, (bucket.count / maxChartCount) * 100)
                            : 2
                        }%`,
                        opacity: bucket.count ? 1 : 0.15,
                      }}
                    />
                  </div>
                  <span className="whitespace-nowrap text-[11px] text-neutral-400">
                    {bucket.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-black/10 bg-white p-6">
          <h2 className="font-semibold text-neutral-950">Top pages</h2>
          <p className="text-xs text-neutral-500">{traffic.rangeLabel}</p>

          <div className="mt-4 flex flex-col divide-y divide-black/5">
            {traffic.topPages.length === 0 && (
              <p className="py-6 text-sm text-neutral-500">
                No traffic recorded yet.
              </p>
            )}
            {traffic.topPages.map((page) => (
              <div
                key={page.path}
                className="flex items-center justify-between gap-3 py-2.5"
              >
                <span className="truncate text-sm text-neutral-700">
                  {page.path}
                </span>
                <span className="shrink-0 text-sm font-medium text-neutral-950">
                  {page.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProgressRing({ percent }: { percent: number }) {
  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - percent / 100);

  return (
    <div className="relative flex h-24 w-24 shrink-0 items-center justify-center">
      <svg viewBox="0 0 80 80" className="h-24 w-24 -rotate-90">
        <circle cx="40" cy="40" r={radius} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="7" />
        <circle
          cx="40"
          cy="40"
          r={radius}
          fill="none"
          stroke="white"
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <span className="absolute text-lg font-bold">{percent}%</span>
    </div>
  );
}
