import Link from "next/link";
import type { Author, Wing } from "@/lib/authors/types";

export function AuthorIndex({
  authors,
  wing,
}: {
  authors: Author[];
  wing: Wing;
}) {
  return (
    <section className="relative z-10 mx-auto max-w-5xl px-6 pb-32 pt-8">
      <ol className="space-y-1">
        {authors.map((author) => (
          <li key={author.slug}>
            <Link
              href={`/${wing}/${author.slug}`}
              className="group flex items-baseline justify-between gap-4 border-b border-[var(--paper)]/10 py-5 transition hover:border-[var(--gold)]/40"
            >
              <span className="flex items-baseline gap-4 md:gap-8">
                <span className="font-[family-name:var(--font-ibm)] text-[10px] text-[var(--gold)]/70">
                  {String(author.order).padStart(2, "0")}
                </span>
                <span className="font-[family-name:var(--font-cormorant)] text-2xl text-[var(--ivory)] transition group-hover:text-[var(--gold)] md:text-3xl">
                  {author.name}
                </span>
              </span>
              <span className="hidden font-[family-name:var(--font-inter)] text-xs text-[var(--paper)]/40 sm:inline">
                {author.roles[0]}
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
