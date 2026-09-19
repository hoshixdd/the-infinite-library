"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import type { Author } from "@/lib/authors/types";
import { initChapterScroll } from "@/lib/motion/scroll";
import { getTransition } from "@/lib/authors/loaders";

const CHAPTERS = ["A", "B", "C", "D", "E", "F", "G", "H"] as const;

export function AuthorExhibition({ author }: { author: Author }) {
  const ref = useRef<HTMLDivElement>(null);
  const transition = getTransition(author.slug);

  useEffect(() => {
    return initChapterScroll(ref.current);
  }, [author.slug]);

  return (
    <div ref={ref} className="relative z-10">
      {/* A — Arrival */}
      <section
        data-chapter="A"
        className="flex min-h-screen flex-col items-center justify-center px-6 pt-24 text-center"
      >
        <span
          data-reveal
          className="font-[family-name:var(--font-ibm)] text-[10px] uppercase tracking-[0.4em] text-[var(--gold)]"
        >
          Chapter A · Arrival
        </span>
        <h1
          data-reveal
          className="mt-6 font-[family-name:var(--font-cormorant)] text-5xl text-[var(--ivory)] md:text-7xl"
        >
          {author.name}
        </h1>
        <p
          data-reveal
          className="mt-3 font-[family-name:var(--font-inter)] text-sm text-[var(--paper)]/60"
        >
          {author.fullName}
        </p>
        <p
          data-reveal
          className="mt-6 font-[family-name:var(--font-ibm)] text-[10px] uppercase tracking-[0.25em] text-[var(--paper)]/45"
        >
          {author.birth}
          {author.death ? ` — ${author.death}` : " — Present"}
        </p>
      </section>

      {/* B — Portrait */}
      <section
        data-chapter="B"
        className="flex min-h-screen flex-col items-center justify-center gap-10 px-6 md:flex-row md:gap-16"
      >
        <div data-reveal className="relative aspect-[4/5] w-full max-w-xs overflow-hidden border border-[var(--gold)]/25">
          <Image
            src={author.portrait.src}
            alt={author.portrait.alt}
            fill
            className="object-cover"
            sizes="320px"
            priority
          />
        </div>
        <div className="max-w-md">
          <span
            data-reveal
            className="font-[family-name:var(--font-ibm)] text-[10px] uppercase tracking-[0.4em] text-[var(--gold)]"
          >
            Chapter B · Portrait
          </span>
          <p
            data-reveal
            className="mt-4 font-[family-name:var(--font-inter)] text-xs text-[var(--paper)]/40"
          >
            {author.portrait.credit}
          </p>
          <ul data-reveal className="mt-6 flex flex-wrap gap-2">
            {author.roles.map((role) => (
              <li
                key={role}
                className="border border-[var(--paper)]/15 px-3 py-1 font-[family-name:var(--font-ibm)] text-[10px] uppercase tracking-wider text-[var(--paper)]/70"
              >
                {role}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* C — Life */}
      <section
        data-chapter="C"
        className="flex min-h-screen flex-col justify-center px-6 py-24 md:px-16 lg:px-28"
      >
        <span
          data-reveal
          className="font-[family-name:var(--font-ibm)] text-[10px] uppercase tracking-[0.4em] text-[var(--gold)]"
        >
          Chapter C · Life
        </span>
        <p
          data-reveal
          className="mt-8 max-w-3xl font-[family-name:var(--font-cormorant)] text-2xl leading-relaxed text-[var(--ivory)] md:text-3xl"
        >
          {author.bio}
        </p>
      </section>

      {/* D — Works */}
      <section
        data-chapter="D"
        className="min-h-screen px-6 py-28 md:px-16"
      >
        <span
          data-reveal
          className="font-[family-name:var(--font-ibm)] text-[10px] uppercase tracking-[0.4em] text-[var(--gold)]"
        >
          Chapter D · Works
        </span>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {author.works.map((work) => (
            <article
              key={work.title}
              data-reveal
              className="border border-[var(--paper)]/10 bg-[var(--charcoal)]/50 p-6"
            >
              <h3 className="font-[family-name:var(--font-cormorant)] text-2xl text-[var(--ivory)]">
                {work.title}
              </h3>
              {work.year && (
                <p className="mt-1 font-[family-name:var(--font-ibm)] text-[10px] text-[var(--gold)]/80">
                  {work.year}
                </p>
              )}
              <p className="mt-4 font-[family-name:var(--font-inter)] text-sm leading-relaxed text-[var(--paper)]/65">
                {work.blurb}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* E — Quote */}
      <section
        data-chapter="E"
        className="flex min-h-screen flex-col items-center justify-center px-6 text-center"
      >
        <span
          data-reveal
          className="font-[family-name:var(--font-ibm)] text-[10px] uppercase tracking-[0.4em] text-[var(--gold)]"
        >
          Chapter E · Voice
        </span>
        <blockquote
          data-reveal
          className="mt-10 max-w-3xl font-[family-name:var(--font-cormorant)] text-3xl italic leading-snug text-[var(--ivory)] md:text-5xl"
        >
          &ldquo;{author.quote}&rdquo;
        </blockquote>
      </section>

      {/* F — Significance & Fact */}
      <section
        data-chapter="F"
        className="flex min-h-screen flex-col justify-center gap-12 px-6 py-24 md:flex-row md:px-16"
      >
        <div className="flex-1">
          <span
            data-reveal
            className="font-[family-name:var(--font-ibm)] text-[10px] uppercase tracking-[0.4em] text-[var(--gold)]"
          >
            Chapter F · Significance
          </span>
          <p
            data-reveal
            className="mt-6 font-[family-name:var(--font-inter)] text-base leading-relaxed text-[var(--paper)]/75 md:text-lg"
          >
            {author.significance}
          </p>
        </div>
        <div className="flex-1 border-l border-[var(--gold)]/20 pl-8">
          <span
            data-reveal
            className="font-[family-name:var(--font-ibm)] text-[10px] uppercase tracking-[0.4em] text-[var(--filipino-red)]"
          >
            Fact
          </span>
          <p
            data-reveal
            className="mt-6 font-[family-name:var(--font-cormorant)] text-xl text-[var(--ivory)] md:text-2xl"
          >
            {author.fact}
          </p>
        </div>
      </section>

      {/* G — Visual concept */}
      <section
        data-chapter="G"
        className="flex min-h-screen flex-col justify-center px-6 py-24 md:px-16"
      >
        <span
          data-reveal
          className="font-[family-name:var(--font-ibm)] text-[10px] uppercase tracking-[0.4em] text-[var(--gold)]"
        >
          Chapter G · Visual Concept
        </span>
        <h2
          data-reveal
          className="mt-6 max-w-2xl font-[family-name:var(--font-cormorant)] text-3xl text-[var(--ivory)] md:text-5xl"
        >
          {author.visualConcept}
        </h2>
        <ul data-reveal className="mt-10 flex flex-wrap gap-3">
          {author.motifs.map((m) => (
            <li
              key={m}
              className="rounded-full border border-[var(--paper)]/15 px-4 py-2 font-[family-name:var(--font-ibm)] text-[10px] uppercase tracking-wider text-[var(--paper)]/60"
            >
              {m}
            </li>
          ))}
        </ul>
      </section>

      {/* H — Transition out */}
      <section
        data-chapter="H"
        className="flex min-h-screen flex-col items-center justify-center px-6 pb-32 text-center"
      >
        <span
          data-reveal
          className="font-[family-name:var(--font-ibm)] text-[10px] uppercase tracking-[0.4em] text-[var(--gold)]"
        >
          Chapter H · Transition
        </span>
        <p
          data-reveal
          className="mt-4 font-[family-name:var(--font-ibm)] text-xs uppercase tracking-[0.3em] text-[var(--filipino-green)]"
        >
          {author.transitionOut}
        </p>
        <p
          data-reveal
          className="mt-8 max-w-xl font-[family-name:var(--font-inter)] text-sm leading-relaxed text-[var(--paper)]/65 md:text-base"
        >
          {transition?.description}
        </p>
        <div data-reveal className="mt-14 flex flex-wrap justify-center gap-4">
          <Link
            href={`/${author.wing}`}
            className="border border-[var(--paper)]/25 px-6 py-3 font-[family-name:var(--font-ibm)] text-[10px] uppercase tracking-[0.25em] text-[var(--paper)]/80 hover:border-[var(--gold)]/50"
          >
            Back to wing
          </Link>
          <Link
            href="/archive"
            className="border border-[var(--gold)]/50 px-6 py-3 font-[family-name:var(--font-ibm)] text-[10px] uppercase tracking-[0.25em] text-[var(--gold)] hover:bg-[var(--gold)]/10"
          >
            Archive sources
          </Link>
        </div>
        <p className="sr-only">Sections {CHAPTERS.join(", ")}</p>
      </section>
    </div>
  );
}
