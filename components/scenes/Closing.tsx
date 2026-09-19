"use client";

import Link from "next/link";
import { LightShaft } from "@/components/museum/LightShaft";

export function Closing() {
  return (
    <section
      id="closing"
      data-scroll-section
      className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center px-6 py-32 text-center"
    >
      <LightShaft warm className="opacity-40" />
      <p
        data-reveal
        className="max-w-2xl font-[family-name:var(--font-cormorant)] text-2xl leading-relaxed text-[var(--ivory)] md:text-4xl"
      >
        Stories outlive their authors.
        <br />
        Voices travel farther than footsteps.
        <br />
        The library never closes.
      </p>
      <h2
        data-reveal
        className="mt-14 font-[family-name:var(--font-cormorant)] text-4xl tracking-[0.15em] text-[var(--gold)] md:text-6xl"
      >
        THE INFINITE LIBRARY
      </h2>
      <div data-reveal className="mt-12 flex flex-wrap justify-center gap-4">
        <Link
          href="/constellation"
          className="border border-[var(--gold)]/60 px-8 py-3 font-[family-name:var(--font-ibm)] text-[10px] uppercase tracking-[0.3em] text-[var(--gold)] hover:bg-[var(--gold)]/10"
        >
          View constellation
        </Link>
        <Link
          href="#prologue"
          className="border border-[var(--paper)]/25 px-8 py-3 font-[family-name:var(--font-ibm)] text-[10px] uppercase tracking-[0.3em] text-[var(--paper)]/80 hover:border-[var(--gold)]/40"
        >
          Explore again
        </Link>
      </div>
    </section>
  );
}
