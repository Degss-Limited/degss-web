"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

// Safety net for actions that revalidate in place instead of redirecting
// (e.g. mark read/unread) — without this the overlay would never clear.
const SAFETY_TIMEOUT_MS = 6000;

export default function PendingOverlay() {
  const [busy, setBusy] = useState(false);
  const pathname = usePathname();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Capture phase so this still fires even if a form handler elsewhere
    // calls stopPropagation on the bubble phase.
    function handleSubmit(event: SubmitEvent) {
      const form = event.target;
      if (form instanceof HTMLFormElement && !event.defaultPrevented) {
        setBusy(true);
      }
    }

    document.addEventListener("submit", handleSubmit, true);
    return () => document.removeEventListener("submit", handleSubmit, true);
  }, []);

  // A redirecting action lands here once the new page has rendered.
  useEffect(() => {
    setBusy(false);
  }, [pathname]);

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (busy) {
      timeoutRef.current = setTimeout(() => setBusy(false), SAFETY_TIMEOUT_MS);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [busy]);

  if (!busy) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-white/40 backdrop-blur-[1px] cursor-wait"
    >
      <div className="flex items-center gap-3 rounded-full border border-black/10 bg-white px-5 py-3 shadow-lg shadow-black/5">
        <span className="h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-neutral-950/20 border-t-neutral-950" />
        <span className="text-sm font-medium text-neutral-700">Working…</span>
      </div>
    </div>
  );
}
