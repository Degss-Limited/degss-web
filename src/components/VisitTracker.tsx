"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const VISITOR_ID_KEY = "degss_visitor_id";

function getVisitorId() {
  try {
    const existing = localStorage.getItem(VISITOR_ID_KEY);
    if (existing) return existing;
    const id = crypto.randomUUID();
    localStorage.setItem(VISITOR_ID_KEY, id);
    return id;
  } catch {
    return "";
  }
}

// Fires a best-effort, first-party pageview beacon on every public route
// change. Skips /admin entirely so staff browsing the dashboard doesn't
// inflate the site's own traffic numbers.
export default function VisitTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname || pathname.startsWith("/admin")) return;

    const visitorId = getVisitorId();
    if (!visitorId) return;

    fetch("/api/track-visit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        path: pathname,
        referrer: document.referrer || "",
        visitorId,
      }),
      keepalive: true,
    }).catch(() => {});
  }, [pathname]);

  return null;
}
