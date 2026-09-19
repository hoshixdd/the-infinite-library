"use client";

export function Entrance() {
  return (
    <section
      id="entrance"
      data-scroll-section
      className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6"
    >
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
          Scroll as camera. Each wing holds ten exhibitions. Portraits await
          credited historical images; the architecture of voice is already here.
        </p>
        <div
          data-reveal
          className="mx-auto mt-12 h-24 w-px bg-gradient-to-b from-[var(--gold)]/80 to-transparent"
        />
      </div>
    </section>
  );
}
