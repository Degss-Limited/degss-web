import Link from "next/link";
import ConfirmSubmitButton from "@/components/admin/ConfirmSubmitButton";
import EmptyState from "@/components/admin/EmptyState";
import { isCloudinaryConfigured, listMediaAssets } from "@/lib/cloudinary";
import { deleteMediaAssetAction } from "./actions";

const PAGE_SIZE = 15;

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("en-NG", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default async function AdminMediaPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const configured = isCloudinaryConfigured();
  const assets = configured ? await listMediaAssets() : [];

  const totalPages = Math.max(1, Math.ceil(assets.length / PAGE_SIZE));
  const page = Math.min(Math.max(1, Number(pageParam) || 1), totalPages);
  const paginated = assets.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Media library</h1>
      <p className="mt-1 text-sm text-neutral-500">
        Every image uploaded through the property and team forms.
      </p>

      {!configured && (
        <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          Cloudinary isn&apos;t configured yet — uploaded images can&apos;t be
          listed until <code className="font-mono">CLOUDINARY_URL</code> (or
          the <code className="font-mono">CLOUDINARY_CLOUD_NAME</code> /{" "}
          <code className="font-mono">API_KEY</code> /{" "}
          <code className="font-mono">API_SECRET</code> vars) is set.
        </div>
      )}

      <div className="mt-6 overflow-hidden rounded-2xl border border-black/10 bg-white">
        {configured && assets.length === 0 ? (
          <EmptyState
            title="No images yet"
            description="Images you upload through property or team forms will show up here."
          />
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-black/10 text-xs uppercase tracking-wide text-neutral-400">
                  <tr>
                    <th className="px-6 py-3 font-medium" />
                    <th className="px-6 py-3 font-medium">File</th>
                    <th className="px-6 py-3 font-medium">Dimensions</th>
                    <th className="px-6 py-3 font-medium">Size</th>
                    <th className="px-6 py-3 font-medium">Uploaded</th>
                    <th className="px-6 py-3 font-medium" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5">
                  {paginated.map((asset) => (
                    <tr key={asset.publicId}>
                      <td className="px-6 py-3 align-middle">
                        {/* eslint-disable-next-line @next/next/no-img-element -- Cloudinary-hosted, arbitrary dimensions */}
                        <img
                          src={asset.thumbnailUrl}
                          alt=""
                          className="h-12 w-12 rounded-lg object-cover"
                          loading="lazy"
                        />
                      </td>
                      <td
                        className="max-w-xs truncate px-6 py-3 align-middle font-medium text-neutral-950"
                        title={asset.publicId}
                      >
                        {asset.publicId.split("/").pop()}
                      </td>
                      <td className="whitespace-nowrap px-6 py-3 align-middle text-neutral-600">
                        {asset.width}×{asset.height}
                      </td>
                      <td className="whitespace-nowrap px-6 py-3 align-middle text-neutral-600">
                        {formatBytes(asset.bytes)}
                      </td>
                      <td className="whitespace-nowrap px-6 py-3 align-middle text-xs text-neutral-400">
                        {formatDate(asset.createdAt)}
                      </td>
                      <td className="px-6 py-3 align-middle">
                        <div className="flex justify-end">
                          <form action={deleteMediaAssetAction}>
                            <input
                              type="hidden"
                              name="publicId"
                              value={asset.publicId}
                            />
                            <input
                              type="hidden"
                              name="returnTo"
                              value={`/admin/media?page=${page}`}
                            />
                            <ConfirmSubmitButton
                              confirmMessage="Delete this image from Cloudinary? If it's used on a property or team member, that image will break there too."
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

            {totalPages > 1 && (
              <div className="flex items-center justify-between border-t border-black/10 px-6 py-4">
                <p className="text-xs text-neutral-500">
                  Page {page} of {totalPages}
                </p>
                <div className="flex gap-2">
                  <Link
                    href={`/admin/media?page=${page - 1}`}
                    className={`rounded-full border border-black/10 px-3 py-1.5 text-xs font-medium text-neutral-700 transition-colors ${
                      page <= 1
                        ? "pointer-events-none opacity-40"
                        : "hover:bg-neutral-100"
                    }`}
                  >
                    Previous
                  </Link>
                  <Link
                    href={`/admin/media?page=${page + 1}`}
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
