"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function PropertyGallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    if (lightboxIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightboxIndex(null);
      if (event.key === "ArrowRight") {
        setLightboxIndex((i) => (i === null ? i : (i + 1) % images.length));
      }
      if (event.key === "ArrowLeft") {
        setLightboxIndex((i) =>
          i === null ? i : (i - 1 + images.length) % images.length
        );
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxIndex, images.length]);

  const [main, secondary, ...thumbnails] = images;

  return (
    <div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <button
          type="button"
          onClick={() => setLightboxIndex(0)}
          className="group relative aspect-4/3 overflow-hidden rounded-3xl bg-neutral-200 sm:col-span-2"
        >
          <Image
            src={main}
            alt={alt}
            fill
            priority
            sizes="(min-width: 640px) 66vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {images.length > 1 && (
            <span className="absolute bottom-4 right-4 rounded-full bg-white px-4 py-2 text-xs font-medium text-neutral-950 shadow-sm">
              View all {images.length} photos
            </span>
          )}
        </button>

        {secondary && (
          <button
            type="button"
            onClick={() => setLightboxIndex(1)}
            className="group relative aspect-4/3 overflow-hidden rounded-3xl bg-neutral-200 sm:aspect-auto"
          >
            <Image
              src={secondary}
              alt=""
              fill
              sizes="(min-width: 640px) 33vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </button>
        )}
      </div>

      {thumbnails.length > 0 && (
        <div className="mt-3 flex gap-3 overflow-x-auto pb-1">
          {thumbnails.map((src, i) => (
            <button
              key={`${src}-${i}`}
              type="button"
              onClick={() => setLightboxIndex(i + 2)}
              className="relative h-20 w-28 shrink-0 overflow-hidden rounded-xl bg-neutral-200"
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="112px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {lightboxIndex !== null &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex flex-col bg-black/95 p-4 sm:p-8"
          >
            <div className="flex items-center justify-between text-white">
              <span className="text-sm text-white/70">
                {lightboxIndex + 1} / {images.length}
              </span>
              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                aria-label="Close gallery"
                className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-white/10"
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="relative mt-4 flex-1">
              <Image
                src={images[lightboxIndex]}
                alt={alt}
                fill
                sizes="100vw"
                className="object-contain"
              />

              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setLightboxIndex((index) =>
                        index === null
                          ? index
                          : (index - 1 + images.length) % images.length
                      )
                    }
                    aria-label="Previous photo"
                    className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-4"
                  >
                    <ArrowIcon className="h-5 w-5" direction="left" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setLightboxIndex((index) =>
                        index === null ? index : (index + 1) % images.length
                      )
                    }
                    aria-label="Next photo"
                    className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-4"
                  >
                    <ArrowIcon className="h-5 w-5" direction="right" />
                  </button>
                </>
              )}
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M6 6L18 18M18 6L6 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ArrowIcon({
  className,
  direction,
}: {
  className?: string;
  direction: "left" | "right";
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      style={{ transform: direction === "right" ? "scaleX(-1)" : undefined }}
    >
      <path
        d="M19 12H5M5 12L11 6M5 12L11 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
