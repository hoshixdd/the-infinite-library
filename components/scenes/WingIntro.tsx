"use client";

import type { Wing } from "@/lib/authors/types";
import { wingMeta } from "@/lib/authors/loaders";
import { LightShaft } from "@/components/museum/LightShaft";
import { ShelfBackdrop } from "@/components/museum/ShelfBackdrop";

export function WingIntro({ wing }: { wing: Wing }) {
  const meta = wingMeta[wing];
  const warm = wing === "filipino";

  return (
    <section
      data-scroll-section
      className={`relative z-10 flex min-h-[70vh] flex-col items-center justify-center px-6 pt-24 text-center ${
        warm ? "wing-warm" : "wing-cool"
      }`}
    >
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-50">
        <ShelfBackdrop density={14} />
        <LightShaft warm={warm} />
      </div>
      <p
        data-reveal
        className="font-[family-name:var(--font-ibm)] text-[10px] uppercase tracking-[0.4em]"
        style={{ color: meta.accent }}
      >
        Exhibition Wing · Gallery corridor
      </p>
      <h1
        data-reveal
        data-approach
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
      <div
        data-reveal
        className="mt-10 h-px w-24 bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent"
      />
    </section>
  );
}
