"use client";

import { useRef, useState } from "react";
import { MediaPickerModal, PickFromLibraryButton } from "./MediaPicker";

const fileInputClass =
  "w-full rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm text-neutral-950 file:mr-4 file:rounded-full file:border-0 file:bg-neutral-950 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white file:transition-colors hover:file:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-950/20";

export function ImageUploadField({
  label,
  name,
  defaultValue,
  required,
  hint,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  required?: boolean;
  hint?: string;
}) {
  const [preview, setPreview] = useState<string | undefined>(defaultValue);
  const [currentUrl, setCurrentUrl] = useState(defaultValue ?? "");
  const [pickerOpen, setPickerOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handlePick(urls: string[]) {
    const url = urls[0];
    if (!url) return;
    if (fileInputRef.current) fileInputRef.current.value = "";
    setCurrentUrl(url);
    setPreview(url);
  }

  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-neutral-700">
        {label}
        {required && <span className="text-neutral-950"> *</span>}
      </label>
      {preview && (
        // eslint-disable-next-line @next/next/no-img-element -- ephemeral local/remote preview, not a page asset
        <img
          src={preview}
          alt=""
          className="mb-3 h-32 w-auto rounded-xl border border-black/10 object-cover"
        />
      )}
      <input type="hidden" name={`${name}Current`} value={currentUrl} />
      <div className="flex flex-wrap items-center gap-2">
        <input
          ref={fileInputRef}
          type="file"
          name={`${name}File`}
          accept="image/*"
          required={required && !currentUrl}
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) setPreview(URL.createObjectURL(file));
          }}
          className={`flex-1 ${fileInputClass}`}
        />
        <PickFromLibraryButton onClick={() => setPickerOpen(true)} />
      </div>
      {hint && <p className="mt-1 text-xs text-neutral-400">{hint}</p>}

      <MediaPickerModal
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        onSelect={handlePick}
      />
    </div>
  );
}

export function MultiImageUploadField({
  label,
  name,
  defaultValue,
  hint,
}: {
  label: string;
  name: string;
  defaultValue?: string[];
  hint?: string;
}) {
  const [existing, setExisting] = useState<string[]>(defaultValue ?? []);
  const [newPreviews, setNewPreviews] = useState<string[]>([]);
  const [pickerOpen, setPickerOpen] = useState(false);

  function handlePick(urls: string[]) {
    setExisting((prev) => [...prev, ...urls.filter((url) => !prev.includes(url))]);
  }

  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-neutral-700">{label}</label>

      {existing.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-2">
          {existing.map((url) => (
            <div key={url} className="group relative">
              {/* eslint-disable-next-line @next/next/no-img-element -- admin preview of an already-uploaded image */}
              <img
                src={url}
                alt=""
                className="h-20 w-20 rounded-lg border border-black/10 object-cover"
              />
              <button
                type="button"
                onClick={() => setExisting((prev) => prev.filter((u) => u !== url))}
                className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-neutral-950 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100"
                aria-label="Remove image"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      <input type="hidden" name={`${name}Current`} value={existing.join("\n")} />
      <div className="flex flex-wrap items-center gap-2">
        <input
          type="file"
          name={`${name}Files`}
          accept="image/*"
          multiple
          onChange={(event) => {
            const files = Array.from(event.target.files ?? []);
            setNewPreviews(files.map((file) => URL.createObjectURL(file)));
          }}
          className={`flex-1 ${fileInputClass}`}
        />
        <PickFromLibraryButton onClick={() => setPickerOpen(true)} />
      </div>

      {newPreviews.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {newPreviews.map((url) => (
            // eslint-disable-next-line @next/next/no-img-element -- local blob: preview of a pending upload
            <img
              key={url}
              src={url}
              alt=""
              className="h-20 w-20 rounded-lg border border-black/10 object-cover"
            />
          ))}
        </div>
      )}

      {hint && <p className="mt-1 text-xs text-neutral-400">{hint}</p>}

      <MediaPickerModal
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        onSelect={handlePick}
        multiple
      />
    </div>
  );
}
