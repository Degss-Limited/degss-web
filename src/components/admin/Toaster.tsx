"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

let notyf: Notyf | null = null;

function getNotyf() {
  if (!notyf) {
    notyf = new Notyf({
      duration: 4000,
      ripple: false,
      position: { x: "right", y: "top" },
      dismissible: true,
      types: [
        {
          type: "success",
          background: "#0a0a0a",
          icon: false,
        },
        {
          type: "error",
          background: "#dc2626",
          icon: false,
        },
      ],
    });
  }
  return notyf;
}

/**
 * Mounted once in the dashboard layout. Server actions redirect with
 * ?toastSuccess=... / ?toastError=... (see src/lib/toast.ts); this picks
 * those up, fires the matching notyf toast, and strips them from the URL
 * so a refresh doesn't replay the toast.
 */
export default function Toaster() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const success = searchParams.get("toastSuccess");
    const error = searchParams.get("toastError");
    if (!success && !error) return;

    const instance = getNotyf();
    if (success) instance.success(success);
    if (error) instance.error(error);

    const params = new URLSearchParams(searchParams.toString());
    params.delete("toastSuccess");
    params.delete("toastError");
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    // Only re-run when the search params actually change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return null;
}
