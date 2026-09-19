"use client";

import { LightShaft } from "@/components/museum/LightShaft";

export function Entrance() {
  return (
    <section
      id="entrance"
      data-scroll-section
      className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center px-6"
    >
      <div
        data-depth
        className="pointer-events-none absolute inset-0 -z-10 opacity-50 md:opacity-70"
      >
        <LightShaft warm />
        <div className="shelf-silhouette absolute inset-y-0 left-0 w-[18%] md:w-[22%]" />
        <div className="shelf-silhouette absolute inset-y-0 right-0 w-[18%] scale-x-[-1] md:w-[22%]" />
        <svg
          className="absolute inset-0 h-full w-full opacity-30"
          preserveAspectRatio="none"
          aria-hidden
        >
          <line x1="50%" y1="15%" x2="18%" y2="100%" stroke="var(--gold)" strokeWidth="0.5" opacity="0.35" />
          <line x1="50%" y1="15%" x2="82%" y2="100%" stroke="var(--gold)" strokeWidth="0.5" opacity="0.35" />
          <rect x="38%" y="18%" width="24%" height="42%" fill="none" stroke="var(--gold)" strokeWidth="0.6" opacity="0.25" />
        </svg>
      </div>

      <div data-film-mask className="film-approach max-w-2xl text-center">
        <p data-reveal className="mb-4 font-[family-name:var(--font-ibm)] text-[10px] uppercase tracking-[0.4em] text-[var(--filipino-green)]">
          Vestibule
        </p>
        <h2 data-reveal className="font-[family-name:var(--font-cormorant)] text-4xl text-[var(--ivory)] md:text-6xl">
          Cross the threshold
        </h2>
        <p data-reveal className="mt-6 font-[family-name:var(--font-inter)] text-sm leading-relaxed text-[var(--paper)]/65 md:text-base">
          The camera pulls inward along the aisle. Warm shafts cut through dust.
          Ahead, two wings open—Filipino letters to the left, world literature to
          the right. Scroll is the only key.
        </p>
        <div data-reveal className="mx-auto mt-12 h-32 w-px bg-gradient-to-b from-[var(--gold)]/80 via-[var(--gold)]/30 to-transparent" />
        <p data-reveal className="mt-8 font-[family-name:var(--font-ibm)] text-[9px] uppercase tracking-[0.35em] text-[var(--paper)]/40">
          Pulling into the museum…
        </p>
      </div>
    </section>
  );
}
