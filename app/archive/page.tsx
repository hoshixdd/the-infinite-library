import type { Metadata } from "next";
import { getArchive } from "@/lib/authors/loaders";

export const metadata: Metadata = {
  title: "Archive",
};

export default function ArchivePage() {
  const archive = getArchive();

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
        Portrait TODOs
      </h2>
      <ul className="mt-6 space-y-2">
        {archive.portraitTodos.map((todo) => (
          <li
            key={todo.slug}
            className="font-[family-name:var(--font-inter)] text-sm text-[var(--paper)]/55"
          >
            <span className="text-[var(--gold)]">{todo.name}</span> — {todo.note}
          </li>
        ))}
      </ul>
    </section>
  );
}
