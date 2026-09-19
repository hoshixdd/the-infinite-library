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
  return (
    <section className="relative z-10 mx-auto max-w-5xl px-6 pb-32 pt-8">
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
          <span className="relative hidden h-12 w-10 overflow-hidden border border-[var(--paper)]/10 sm:block">
            <Image
              src={author.portrait.src}
              alt=""
              fill
              className="object-cover opacity-80 transition group-hover:opacity-100"
              sizes="40px"
            />
          </span>
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
  );
}
