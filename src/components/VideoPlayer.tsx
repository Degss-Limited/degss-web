"use client";

import { useState } from "react";

function getYouTubeId(src: string): string | null {
  const patterns = [
    /youtube\.com\/watch\?v=([\w-]+)/,
    /youtu\.be\/([\w-]+)/,
    /youtube\.com\/embed\/([\w-]+)/,
  ];
  for (const pattern of patterns) {
    const match = src.match(pattern);
    if (match) return match[1];
  }
  return null;
}

export default function VideoPlayer({
  src,
  poster,
  className,
}: {
  src: string;
  poster?: string;
  className?: string;
}) {
  const youTubeId = getYouTubeId(src);
  const [playing, setPlaying] = useState(false);

  if (youTubeId) {
    if (playing) {
      return (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youTubeId}?autoplay=1&rel=0&modestbranding=1`}
          title="DEGSS Limited video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className={className}
        />
      );
    }

    return (
      <button
        type="button"
        onClick={() => setPlaying(true)}
        aria-label="Play video"
        className={`group cursor-pointer border-0 bg-neutral-900 p-0 ${className ?? ""}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- YouTube thumbnail, not a local/optimized asset */}
        <img
          src={poster || `https://img.youtube.com/vi/${youTubeId}/maxresdefault.jpg`}
          alt=""
          className="h-full w-full object-cover"
        />
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-neutral-950 transition-transform group-hover:scale-110">
            <svg viewBox="0 0 24 24" fill="currentColor" className="ml-1 h-6 w-6">
              <path d="M8 5v14l11-7L8 5Z" />
            </svg>
          </span>
        </span>
      </button>
    );
  }

  return (
    <video
      src={src}
      poster={poster}
      controls
      playsInline
      preload="metadata"
      className={className}
    >
      Your browser does not support the video tag.
    </video>
  );
}
