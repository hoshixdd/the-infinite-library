import type { Metadata } from "next";
import { getArchive } from "@/lib/authors/loaders";

export const metadata: Metadata = {
  title: "Archive",
};

export default function ArchivePage() {
  const archive = getArchive();
  const credits = archive.portraitCredits ?? [];

  return (
    <section className="relative z-10 mx-auto max-w-3xl px-6 pb-32 pt-28">
      <p className="font-[family-name:var(--font-ibm)] text-[10px] uppercase tracking-[0.4em] text-[var(--gold)]">
        Research
      </p>
      <h1 className="mt-4 font-[family-name:var(--font-cormorant)] text-4xl text-[var(--ivory)] md:text-6xl">
        {archive.title}
      </h1>
      <p className="mt-6 font-[family-name:var(--font-inter)] text-sm leading-relaxed text-[var(--paper)]/65">
        {archive.description}
      </p>

      <ul className="mt-14 space-y-4">
        {archive.sources.map((source) => (
          <li
            key={`${source.url}-${source.label}`}
            className="border-b border-[var(--paper)]/10 pb-4"
          >
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-[family-name:var(--font-cormorant)] text-xl text-[var(--ivory)] hover:text-[var(--gold)]"
            >
              {source.label}
            </a>
            <p className="mt-1 font-[family-name:var(--font-ibm)] text-[10px] text-[var(--paper)]/40">
              {source.authors.join(", ")}
            </p>
          </li>
        ))}
      </ul>

      <h2 className="mt-20 font-[family-name:var(--font-cormorant)] text-2xl text-[var(--ivory)]">
        Portrait credits
      </h2>
      <p className="mt-3 font-[family-name:var(--font-inter)] text-sm text-[var(--paper)]/55">
        All portraits currently ship as original illustrative museum plates.
        Credits link to Wikimedia Commons categories or institutional pages —
        never claiming photographic rights we do not hold.
      </p>
      <ul className="mt-6 space-y-4">
        {credits.map((c) => (
          <li
            key={c.slug}
            className="border-b border-[var(--paper)]/10 pb-4 font-[family-name:var(--font-inter)] text-sm text-[var(--paper)]/65"
          >
            <span className="text-[var(--gold)]">{c.name}</span>
            <span className="mt-1 block text-xs text-[var(--paper)]/45">{c.credit}</span>
            {c.sourceUrl && (
              <a
                href={c.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-block font-[family-name:var(--font-ibm)] text-[10px] uppercase tracking-wider text-[var(--gold)]/80 hover:underline"
              >
                Source
              </a>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
