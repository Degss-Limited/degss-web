"use client";

import { useEffect, useState } from "react";

type MediaAsset = {
  publicId: string;
  url: string;
  thumbnailUrl: string;
  width: number;
  height: number;
};

export function MediaPickerModal({
  open,
  onClose,
  onSelect,
  multiple = false,
}: {
  open: boolean;
  onClose: () => void;
  onSelect: (urls: string[]) => void;
  multiple?: boolean;
}) {
  const [assets, setAssets] = useState<MediaAsset[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    if (!open) return;
    setAssets(null);
    setError(null);
    setQuery("");
    setSelected([]);

    fetch("/api/admin/media")
      .then((res) => {
        if (!res.ok) throw new Error("Could not load the media library.");
        return res.json();
      })
      .then((data) => setAssets(data.assets ?? []))
      .catch((err) => setError(err instanceof Error ? err.message : "Something went wrong."));
  }, [open]);

  if (!open) return null;

  const filtered = (assets ?? []).filter((asset) =>
    asset.publicId.toLowerCase().includes(query.toLowerCase())
  );

  function handlePick(url: string) {
    if (!multiple) {
      onSelect([url]);
      onClose();
      return;
    }
    setSelected((prev) =>
      prev.includes(url) ? prev.filter((u) => u !== url) : [...prev, url]
    );
  }

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        className="flex max-h-[80vh] w-full max-w-3xl flex-col rounded-2xl bg-white shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-black/10 px-5 py-4">
          <h3 className="text-sm font-semibold text-neutral-950">
            Choose from media library
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-7 w-7 items-center justify-center rounded-full text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-950"
          >
            ×
          </button>
        </div>

        <div className="border-b border-black/10 px-5 py-3">
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by filename..."
            className="w-full rounded-lg border border-black/10 px-3 py-2 text-sm text-neutral-950 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-950/10"
          />
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {error && <p className="text-sm text-red-600">{error}</p>}
          {!error && assets === null && (
            <p className="text-sm text-neutral-500">Loading…</p>
          )}
          {!error && assets !== null && filtered.length === 0 && (
            <p className="text-sm text-neutral-500">
              {assets.length === 0
                ? "No images have been uploaded yet."
                : "No images match your search."}
            </p>
          )}
          {filtered.length > 0 && (
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5">
              {filtered.map((asset) => {
                const isSelected = selected.includes(asset.url);
                return (
                  <button
                    key={asset.publicId}
                    type="button"
                    onClick={() => handlePick(asset.url)}
                    title={asset.publicId.split("/").pop()}
                    className={`relative aspect-square overflow-hidden rounded-lg border-2 transition-colors ${
                      isSelected
                        ? "border-neutral-950"
                        : "border-transparent hover:border-black/20"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element -- Cloudinary-hosted thumbnail inside a picker grid */}
                    <img
                      src={asset.thumbnailUrl}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                    {isSelected && (
                      <span className="absolute inset-0 flex items-center justify-center bg-neutral-950/40 text-base font-semibold text-white">
                        ✓
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {multiple && (
          <div className="flex items-center justify-between border-t border-black/10 px-5 py-4">
            <p className="text-xs text-neutral-500">
              {selected.length} selected
            </p>
            <button
              type="button"
              disabled={selected.length === 0}
              onClick={() => {
                onSelect(selected);
                onClose();
              }}
              className="rounded-full bg-neutral-950 px-5 py-2 text-xs font-medium text-white transition-colors hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Add selected
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export function PickFromLibraryButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="shrink-0 rounded-full border border-black/10 px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100"
    >
      Choose from library
    </button>
  );
}
