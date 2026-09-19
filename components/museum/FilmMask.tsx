"use client";

/** Soft film vignette + letterbox bars for cinematic framing */
export function FilmMask({ intensity = 0.55 }: { intensity?: number }) {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[5]"
      aria-hidden
      style={{ opacity: intensity }}
    >
      <div className="film-vignette absolute inset-0" />
      <div className="film-letterbox film-letterbox--top" />
      <div className="film-letterbox film-letterbox--bottom" />
    </div>
  );
}
