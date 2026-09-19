"use client";

import type { Wing } from "@/lib/authors/types";
import { wingMeta } from "@/lib/authors/loaders";

export function WingIntro({ wing }: { wing: Wing }) {
  const meta = wingMeta[wing];
  return (
    <section
      data-scroll-section
      className="relative z-10 flex min-h-[70vh] flex-col items-center justify-center px-6 pt-24 text-center"
    >
      <p
        data-reveal
        className="font-[family-name:var(--font-ibm)] text-[10px] uppercase tracking-[0.4em]"
        style={{ color: meta.accent }}
      >
        Exhibition Wing
      </p>
      <h1
        data-reveal
        className="mt-4 font-[family-name:var(--font-cormorant)] text-4xl text-[var(--ivory)] md:text-6xl lg:text-7xl"
      >
        {meta.title}
      </h1>
      <p
        data-reveal
        className="mt-5 max-w-lg font-[family-name:var(--font-inter)] text-sm text-[var(--paper)]/65 md:text-base"
      >
        {meta.subtitle}
      </p>
    </section>
  );
}
