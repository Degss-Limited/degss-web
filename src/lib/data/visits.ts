import "server-only";
import { getSupabase } from "@/lib/supabase";

export type VisitInput = {
  path: string;
  referrer: string;
  visitorId: string;
};

export type TrafficRangeKey = "day" | "week" | "month" | "year" | "custom";

export type TrafficFilter = {
  range: TrafficRangeKey;
  /** yyyy-mm-dd, custom range only */
  from?: string;
  /** yyyy-mm-dd, custom range only */
  to?: string;
};

export type TrafficSummary = {
  allTimeVisits: number;
  rangeVisits: number;
  rangeUniqueVisitors: number;
  todayVisits: number;
  rangeLabel: string;
  chart: { key: string; label: string; count: number }[];
  topPages: { path: string; count: number }[];
};

type BucketUnit = "hour" | "day" | "month";

function localDateKey(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function localHourKey(d: Date) {
  return `${localDateKey(d)}T${String(d.getHours()).padStart(2, "0")}`;
}

function localMonthKey(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

function startOfDay(d: Date) {
  const copy = new Date(d);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

function parseLocalDate(value: string) {
  const [y, m, d] = value.split("-").map(Number);
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d);
}

function resolveRange(filter: TrafficFilter): {
  start: Date;
  end: Date;
  bucket: BucketUnit;
  rangeLabel: string;
} {
  const now = new Date();

  if (filter.range === "day") {
    return { start: startOfDay(now), end: now, bucket: "hour", rangeLabel: "Today" };
  }

  if (filter.range === "week") {
    const start = startOfDay(now);
    start.setDate(start.getDate() - 6);
    return { start, end: now, bucket: "day", rangeLabel: "Last 7 days" };
  }

  if (filter.range === "month") {
    const start = startOfDay(now);
    start.setDate(start.getDate() - 29);
    return { start, end: now, bucket: "day", rangeLabel: "Last 30 days" };
  }

  if (filter.range === "year") {
    const start = startOfDay(now);
    start.setDate(1);
    start.setMonth(start.getMonth() - 11);
    return { start, end: now, bucket: "month", rangeLabel: "Last 12 months" };
  }

  // custom
  const fallbackStart = startOfDay(now);
  fallbackStart.setDate(fallbackStart.getDate() - 6);

  const parsedStart = filter.from ? parseLocalDate(filter.from) : null;
  const parsedEnd = filter.to ? parseLocalDate(filter.to) : null;

  const start = parsedStart ? startOfDay(parsedStart) : fallbackStart;
  let end = parsedEnd ? startOfDay(parsedEnd) : now;
  end.setHours(23, 59, 59, 999);
  if (end > now) end = now;
  if (end < start) end = start;

  const spanDays = Math.max(1, Math.ceil((end.getTime() - start.getTime()) / 86400000));
  const bucket: BucketUnit = spanDays <= 2 ? "hour" : spanDays <= 120 ? "day" : "month";

  const rangeLabel =
    filter.from && filter.to
      ? `${filter.from} – ${filter.to}`
      : "Custom range";

  return { start, end, bucket, rangeLabel };
}

function buildBuckets(start: Date, end: Date, unit: BucketUnit) {
  const buckets: { key: string; label: string }[] = [];

  if (unit === "hour") {
    const cursor = new Date(start);
    cursor.setMinutes(0, 0, 0);
    const endHour = new Date(end);
    endHour.setMinutes(0, 0, 0);
    while (cursor <= endHour) {
      buckets.push({
        key: localHourKey(cursor),
        label: cursor.toLocaleTimeString("en-US", { hour: "numeric" }),
      });
      cursor.setHours(cursor.getHours() + 1);
    }
  } else if (unit === "day") {
    const cursor = startOfDay(start);
    const endDay = startOfDay(end);
    while (cursor <= endDay) {
      buckets.push({
        key: localDateKey(cursor),
        label: cursor.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      });
      cursor.setDate(cursor.getDate() + 1);
    }
  } else {
    const cursor = new Date(start.getFullYear(), start.getMonth(), 1);
    const endMonth = new Date(end.getFullYear(), end.getMonth(), 1);
    while (cursor <= endMonth) {
      buckets.push({
        key: localMonthKey(cursor),
        label: cursor.toLocaleDateString("en-US", { month: "short" }),
      });
      cursor.setMonth(cursor.getMonth() + 1);
    }
  }

  return buckets;
}

function bucketKeyFor(date: Date, unit: BucketUnit) {
  if (unit === "hour") return localHourKey(date);
  if (unit === "month") return localMonthKey(date);
  return localDateKey(date);
}

export async function recordVisit(input: VisitInput) {
  const supabase = getSupabase();
  if (!supabase) return;

  const { error } = await supabase.from("site_visits").insert({
    path: input.path.slice(0, 500),
    referrer: input.referrer.slice(0, 500),
    visitor_id: input.visitorId.slice(0, 100),
  });

  if (error) console.error("[visits] recordVisit failed:", error.message);
}

export async function getTrafficSummary(
  filter: TrafficFilter = { range: "week" }
): Promise<TrafficSummary> {
  const { start, end, bucket, rangeLabel } = resolveRange(filter);
  const emptyChart = buildBuckets(start, end, bucket).map((b) => ({ ...b, count: 0 }));

  const empty: TrafficSummary = {
    allTimeVisits: 0,
    rangeVisits: 0,
    rangeUniqueVisitors: 0,
    todayVisits: 0,
    rangeLabel,
    chart: emptyChart,
    topPages: [],
  };

  const supabase = getSupabase();
  if (!supabase) return empty;

  const todayStart = startOfDay(new Date());

  const [{ count: allTimeVisits }, { count: todayVisits }, { data: rows, error }] =
    await Promise.all([
      supabase.from("site_visits").select("*", { count: "exact", head: true }),
      supabase
        .from("site_visits")
        .select("*", { count: "exact", head: true })
        .gte("created_at", todayStart.toISOString()),
      supabase
        .from("site_visits")
        .select("path, visitor_id, created_at")
        .gte("created_at", start.toISOString())
        .lte("created_at", end.toISOString()),
    ]);

  if (error || !rows) {
    if (error) console.error("[visits] getTrafficSummary failed:", error.message);
    return { ...empty, allTimeVisits: allTimeVisits ?? 0, todayVisits: todayVisits ?? 0 };
  }

  const chartMap = new Map(emptyChart.map((b) => [b.key, { ...b }]));
  const uniqueVisitors = new Set<string>();
  const pageCounts = new Map<string, number>();

  for (const row of rows) {
    const createdAt = new Date(row.created_at as string);
    const key = bucketKeyFor(createdAt, bucket);
    const existing = chartMap.get(key);
    if (existing) existing.count += 1;
    if (row.visitor_id) uniqueVisitors.add(row.visitor_id);
    pageCounts.set(row.path, (pageCounts.get(row.path) ?? 0) + 1);
  }

  const topPages = [...pageCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([path, count]) => ({ path, count }));

  return {
    allTimeVisits: allTimeVisits ?? 0,
    rangeVisits: rows.length,
    rangeUniqueVisitors: uniqueVisitors.size,
    todayVisits: todayVisits ?? 0,
    rangeLabel,
    chart: [...chartMap.values()],
    topPages,
  };
}
