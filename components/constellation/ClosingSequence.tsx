"use client";

import Link from "next/link";

export function ClosingSequence() {
  return (
    <section className="relative z-10 mx-auto max-w-3xl px-6 pb-32 pt-24 text-center">
      <p className="font-[family-name:var(--font-cormorant)] text-2xl leading-relaxed text-[var(--ivory)] md:text-3xl">
        Stories outlive their authors.
        <br />
        Voices travel farther than footsteps.
        <br />
        The library never closes.
      </p>
      <h2 className="mt-12 font-[family-name:var(--font-cormorant)] text-3xl tracking-[0.12em] text-[var(--gold)] md:text-5xl">
        THE INFINITE LIBRARY
      </h2>
      <Link
        href="/"
        className="mt-10 inline-block border border-[var(--gold)]/60 px-8 py-3 font-[family-name:var(--font-ibm)] text-[10px] uppercase tracking-[0.3em] text-[var(--gold)] hover:bg-[var(--gold)]/10"
      >
        Explore again
      </Link>
    </section>
  );
}
