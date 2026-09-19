"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import type { Author, Wing } from "@/lib/authors/types";
import { magneticMove, magneticReset } from "@/lib/motion/scroll";

export function AuthorIndex({
  authors,
  wing,
}: {
  authors: Author[];
  wing: Wing;
}) {
  const warm = wing === "filipino";

  return (
    <section
      className={`relative z-10 mx-auto max-w-5xl px-6 pb-32 pt-8 ${
        warm ? "wing-warm" : "wing-cool"
      }`}
    >
      <p className="mb-8 font-[family-name:var(--font-ibm)] text-[9px] uppercase tracking-[0.35em] text-[var(--gold)]/70">
        Gallery directory · {authors.length} bays
      </p>
      <ol className="space-y-1">
        {authors.map((author) => (
          <AuthorRow key={author.slug} author={author} wing={wing} />
        ))}
      </ol>
    </section>
  );
}

function AuthorRow({ author, wing }: { author: Author; wing: Wing }) {
  const ref = useRef<HTMLAnchorElement>(null);

  return (
    <li>
      <Link
        ref={ref}
        href={`/${wing}/${author.slug}`}
        onMouseMove={(e) => {
          if (ref.current) magneticMove(ref.current, e, 0.03);
        }}
        onMouseLeave={() => {
          if (ref.current) magneticReset(ref.current);
        }}
        className="group flex items-center justify-between gap-4 border-b border-[var(--paper)]/10 py-5 transition hover:border-[var(--gold)]/40"
      >
        <span className="flex items-center gap-4 md:gap-8">
          <span className="gallery-frame__mat relative hidden h-14 w-11 overflow-hidden p-[3px] sm:block">
            <span className="relative block h-full w-full overflow-hidden">
              <Image
                src={author.portrait.src}
                alt=""
                fill
                className="object-cover opacity-80 transition group-hover:opacity-100 group-hover:scale-105"
                sizes="44px"
              />
            </span>
          </span>
          <span className="font-[family-name:var(--font-ibm)] text-[10px] text-[var(--gold)]/70">
            Bay {String(author.order).padStart(2, "0")}
          </span>
          <span className="font-[family-name:var(--font-cormorant)] text-2xl text-[var(--ivory)] transition group-hover:text-[var(--gold)] md:text-3xl">
            {author.name}
          </span>
        </span>
        <span className="hidden items-center gap-3 sm:flex">
          <span className="font-[family-name:var(--font-inter)] text-xs text-[var(--paper)]/40">
            {author.roles[0]}
          </span>
          <span className="font-[family-name:var(--font-ibm)] text-[9px] uppercase tracking-wider text-[var(--gold)]/50 opacity-0 transition group-hover:opacity-100">
            Enter →
          </span>
        </span>
      </Link>
    </li>
  );
}
