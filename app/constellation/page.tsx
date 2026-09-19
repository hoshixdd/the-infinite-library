import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Constellation",
};

export default function ConstellationPage() {
  return (
    <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="font-[family-name:var(--font-ibm)] text-[10px] uppercase tracking-[0.4em] text-[var(--gold)]">
        Stub
      </p>
      <h1 className="mt-4 font-[family-name:var(--font-cormorant)] text-4xl text-[var(--ivory)] md:text-6xl">
        Constellation
      </h1>
      <p className="mt-6 max-w-md font-[family-name:var(--font-inter)] text-sm text-[var(--paper)]/65">
        A future map of literary connections across wings—lines between labor and
        myth, island and empire, page and stage.
      </p>
      <Link
        href="/"
        className="mt-10 border border-[var(--gold)]/50 px-6 py-3 font-[family-name:var(--font-ibm)] text-[10px] uppercase tracking-[0.25em] text-[var(--gold)]"
      >
        Return home
      </Link>
    </section>
  );
}
