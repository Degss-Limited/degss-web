import { NextRequest, NextResponse } from "next/server";
import { recordVisit } from "@/lib/data/visits";

// Public, write-only: records a single first-party pageview. Never reads
// anything back, and silently no-ops when Supabase isn't configured.
export async function POST(request: NextRequest) {
  let body: { path?: unknown; referrer?: unknown; visitorId?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const path = typeof body.path === "string" ? body.path : "";
  const visitorId = typeof body.visitorId === "string" ? body.visitorId : "";
  if (!path || !visitorId) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  await recordVisit({
    path,
    referrer: typeof body.referrer === "string" ? body.referrer : "",
    visitorId,
  });

  return NextResponse.json({ ok: true });
}
