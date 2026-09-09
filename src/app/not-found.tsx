import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Page Not Found | DEGSS",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <>
      <Navbar />

      <main className="flex flex-1 flex-col items-center justify-center bg-neutral-50 px-6 py-32 text-center sm:px-10">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-400">
          404 error
        </p>
        <h1 className="mt-4 text-6xl font-bold tracking-tight text-neutral-950 sm:text-7xl">
          Page not found
        </h1>
        <p className="mt-4 max-w-md text-neutral-600">
          The page you&apos;re looking for doesn&apos;t exist or may have
          been moved. Let&apos;s get you back on track.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-1.5 rounded-full bg-neutral-950 px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
          >
            Back to home
          </Link>
          <Link
            href="/contact"
            className="flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-6 py-3.5 text-sm font-medium text-neutral-950 transition-colors hover:bg-neutral-100"
          >
            Contact us
          </Link>
        </div>
      </main>
    </>
  );
}
