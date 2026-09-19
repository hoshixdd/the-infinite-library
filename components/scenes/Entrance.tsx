"use client";

export function Entrance() {
  return (
    <section
      id="entrance"
      data-scroll-section
      className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center px-6"
    >
      <div className="pointer-events-none absolute inset-x-0 top-1/2 h-px max-w-xl bg-gradient-to-r from-transparent via-[var(--gold)]/50 to-transparent" />
      <div className="max-w-2xl text-center">
        <p
          data-reveal
          className="mb-4 font-[family-name:var(--font-ibm)] text-[10px] uppercase tracking-[0.4em] text-[var(--filipino-green)]"
        >
          Vestibule
        </p>
        <h2
          data-reveal
          className="font-[family-name:var(--font-cormorant)] text-4xl text-[var(--ivory)] md:text-6xl"
        >
          Cross the threshold
        </h2>
        <p
          data-reveal
          className="mt-6 font-[family-name:var(--font-inter)] text-sm leading-relaxed text-[var(--paper)]/65 md:text-base"
        >
          The camera pulls inward. Shelves rise from the void. Ahead, two wings
          open—Filipino letters to the left, world literature to the right. Scroll
          is the only key.
        </p>
        <div
          data-reveal
          className="mx-auto mt-12 h-32 w-px bg-gradient-to-b from-[var(--gold)]/80 via-[var(--gold)]/30 to-transparent"
        />
        <p
          data-reveal
          className="mt-8 font-[family-name:var(--font-ibm)] text-[9px] uppercase tracking-[0.35em] text-[var(--paper)]/40"
        >
          Pulling into the museum…
        </p>
      </div>
    </section>
  );
}
