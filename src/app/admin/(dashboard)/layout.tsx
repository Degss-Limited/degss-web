import type { Metadata } from "next";
import { Suspense } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import PendingOverlay from "@/components/admin/PendingOverlay";
import Sidebar from "@/components/admin/Sidebar";
import Toaster from "@/components/admin/Toaster";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import {
  countUnreadContactSubmissions,
  countUnreadGetStartedSubmissions,
} from "@/lib/data/submissions";
import { logout } from "../(auth)/login/actions";

export const metadata: Metadata = {
  title: {
    default: "Admin | DEGSS",
    template: "%s | DEGSS Admin",
  },
  robots: { index: false, follow: false },
};

function initials(label: string) {
  const parts = label.trim().split(/\s+/);
  return (parts[0]?.[0] ?? "") + (parts.length > 1 ? (parts[parts.length - 1]?.[0] ?? "") : "");
}

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  const session = token ? await verifySessionToken(token) : null;

  if (!session) {
    redirect("/admin/login");
  }

  const displayName = session.name || session.email;
  const [unreadContactCount, unreadGetStartedCount] = await Promise.all([
    countUnreadContactSubmissions(),
    countUnreadGetStartedSubmissions(),
  ]);

  return (
    <div className="flex min-h-screen bg-neutral-100">
      <PendingOverlay />
      <Suspense fallback={null}>
        <Toaster />
      </Suspense>
      <Sidebar
        onLogout={logout}
        unreadContactCount={unreadContactCount}
        unreadGetStartedCount={unreadGetStartedCount}
      />

      <div className="flex min-h-screen flex-1 flex-col">
        <header className="flex items-center justify-end gap-4 px-6 py-5 sm:px-8">
          <div className="flex items-center gap-2.5 rounded-full border border-black/10 bg-white py-1.5 pl-1.5 pr-4">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-950 text-xs font-semibold uppercase text-white">
              {initials(displayName) || "A"}
            </span>
            <span className="text-sm font-medium text-neutral-950">
              {displayName}
            </span>
          </div>
        </header>

        <main className="flex-1 px-6 pb-8 sm:px-8">{children}</main>
      </div>
    </div>
  );
}
