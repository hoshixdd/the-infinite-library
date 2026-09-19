"use client";

import type { ReactNode } from "react";

/** Museum picture-frame chrome around portraits / exhibits */
export function GalleryFrame({
  children,
  label,
  caption,
  className = "",
}: {
  children: ReactNode;
  label?: string;
  caption?: string;
  className?: string;
}) {
  return (
    <figure className={`gallery-frame group relative ${className}`}>
      <div className="gallery-frame__mat">
        <div className="gallery-frame__inner">{children}</div>
      </div>
      {(label || caption) && (
        <figcaption className="gallery-wall-label mt-4 max-w-sm text-left">
          {label && (
            <span className="block font-[family-name:var(--font-ibm)] text-[9px] uppercase tracking-[0.28em] text-[var(--gold)]">
              {label}
            </span>
          )}
          {caption && (
            <span className="mt-1 block font-[family-name:var(--font-inter)] text-[11px] leading-relaxed text-[var(--paper)]/55">
              {caption}
            </span>
          )}
        </figcaption>
      )}
      <div className="gallery-spotlight" aria-hidden />
    </figure>
  );
}
