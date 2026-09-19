import type { Metadata } from "next";
import { getAllAuthors } from "@/lib/authors/loaders";
import { ConstellationMap } from "@/components/constellation/ConstellationMap";
import { ClosingSequence } from "@/components/constellation/ClosingSequence";

export const metadata: Metadata = {
  title: "Constellation",
  description: "Twenty voices mapped across Filipino and world literature.",
};

export default function ConstellationPage() {
  const authors = getAllAuthors();

  return (
    <div className="constellation-page relative z-10 pt-28">
      <header className="mx-auto max-w-3xl px-6 text-center">
        <p className="font-[family-name:var(--font-ibm)] text-[10px] uppercase tracking-[0.4em] text-[var(--gold)]">
          20 voices
        </p>
        <h1 className="mt-4 font-[family-name:var(--font-cormorant)] text-4xl text-[var(--ivory)] md:text-6xl">
          Constellation
        </h1>
        <p className="mt-6 font-[family-name:var(--font-inter)] text-sm leading-relaxed text-[var(--paper)]/65 md:text-base">
          No story exists alone. Trace the shared themes that connect these twenty voices—across islands, continents, and imagined worlds.
        </p>
      </header>
      <div className="mt-12 px-4 md:px-8">
        <ConstellationMap authors={authors} />
      </div>
      <ClosingSequence />
    </div>
  );
}
