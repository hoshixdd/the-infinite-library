"use client";

export function Prologue() {
  const scrollToEntrance = () => {
    document
      .getElementById("entrance")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="prologue"
      data-scroll-section
      className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center"
    >
      <p
        data-reveal
        className="mb-8 font-[family-name:var(--font-ibm)] text-[10px] uppercase tracking-[0.45em] text-[var(--gold)] md:text-xs"
      >
        20 Authors / 20 Voices / One Literary Journey
      </p>
      <h1
        data-reveal
        className="font-[family-name:var(--font-cormorant)] text-5xl font-light leading-[0.95] tracking-wide text-[var(--ivory)] md:text-7xl lg:text-8xl"
      >
        THE INFINITE
        <br />
        LIBRARY
      </h1>
      <p
        data-reveal
        className="mt-8 max-w-md font-[family-name:var(--font-inter)] text-sm leading-relaxed text-[var(--paper)]/70 md:text-base"
      >
        A cinematic museum of letters—Filipino and world literature in scroll,
        light, and atmosphere.
      </p>
      <button
        data-reveal
        type="button"
        onClick={scrollToEntrance}
        className="mt-12 border border-[var(--gold)]/60 px-8 py-3 font-[family-name:var(--font-ibm)] text-[10px] uppercase tracking-[0.35em] text-[var(--gold)] transition hover:bg-[var(--gold)]/10"
      >
        Enter the Gallery
      </button>
    </section>
  );
}
