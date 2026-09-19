"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import type { Author } from "@/lib/authors/types";
import { initChapterScroll, magneticMove, magneticReset } from "@/lib/motion/scroll";
import { getAdjacentAuthors, getTransition } from "@/lib/authors/loaders";
import { AuthorRoomMotif } from "@/components/rooms/AuthorRoomMotif";
import { GalleryFrame } from "@/components/museum/GalleryFrame";
import { ExhibitPlinth } from "@/components/museum/ExhibitPlinth";
import { FilmMask } from "@/components/museum/FilmMask";
import { LightShaft } from "@/components/museum/LightShaft";

const CHAPTERS = ["A", "B", "C", "D", "E", "F", "G", "H"] as const;

export function AuthorExhibition({ author }: { author: Author }) {
  const ref = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const transition = getTransition(author.slug);
  const { prev, next } = getAdjacentAuthors(author.wing, author.slug);
  const warm = author.wing === "filipino";

  useEffect(() => {
    return initChapterScroll(ref.current);
  }, [author.slug]);

  return (
    <div
      ref={ref}
      className={`pointer-events-auto relative z-20 ${warm ? "wing-warm" : "wing-cool"}`}
      data-author-room={author.slug}
    >
      <FilmMask intensity={0.4} />
      <AuthorRoomMotif author={author} />

      {/* A — Arrival */}
      <section
        data-chapter="A"
        className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 pt-24 text-center md:min-h-screen"
      >
        <LightShaft warm={warm} className="opacity-60" />
        <div
          data-reveal
          className="gallery-wall-label mb-6 text-left"
        >
          <span className="font-[family-name:var(--font-ibm)] text-[9px] uppercase tracking-[0.28em] text-[var(--gold)]">
            Gallery bay · {author.wing === "filipino" ? "Filipino wing" : "World wing"}
          </span>
        </div>
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
          {author.bornPlace ? ` · ${author.bornPlace}` : ""}
          {author.death
            ? ` — ${author.death}${author.diedPlace ? ` · ${author.diedPlace}` : ""}`
            : " — Present"}
        </p>
        {author.nationality && (
          <p
            data-reveal
            className="mt-3 font-[family-name:var(--font-ibm)] text-[10px] uppercase tracking-[0.2em] text-[var(--gold)]/70"
          >
            {author.nationality}
            {author.occupation ? ` · ${author.occupation}` : ""}
          </p>
        )}
      </section>

      {/* B — Portrait */}
      <section
        data-chapter="B"
        className="relative flex min-h-[100svh] flex-col items-center justify-center gap-10 px-6 md:min-h-screen md:flex-row md:gap-16"
      >
        <div
          ref={portraitRef}
          data-reveal
          data-depth
          data-approach
          className="w-full max-w-xs"
          onMouseMove={(e) => {
            if (portraitRef.current) magneticMove(portraitRef.current, e, 0.05);
          }}
          onMouseLeave={() => {
            if (portraitRef.current) magneticReset(portraitRef.current);
          }}
        >
          <GalleryFrame
            label="Wall label · Portrait plate"
            caption={author.portrait.credit}
          >
            <div className="portrait-frame relative aspect-[4/5] w-full">
              <Image
                src={author.portrait.src}
                alt={author.portrait.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 90vw, 320px"
                priority
              />
            </div>
          </GalleryFrame>
        </div>
        <div className="max-w-md mobile-stack">
          <span
            data-reveal
            className="font-[family-name:var(--font-ibm)] text-[10px] uppercase tracking-[0.4em] text-[var(--gold)]"
          >
            Chapter B · Portrait
          </span>
          {author.portrait.sourceUrl && (
            <a
              data-reveal
              href={author.portrait.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block font-[family-name:var(--font-ibm)] text-[10px] uppercase tracking-wider text-[var(--gold)]/80 underline-offset-4 hover:underline"
            >
              Credit source
            </a>
          )}
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
        className="relative flex min-h-[100svh] flex-col justify-center px-6 py-24 md:min-h-screen md:px-16 lg:px-28"
      >
        <div className="gallery-wall-label mb-4" data-reveal>
          <span className="font-[family-name:var(--font-ibm)] text-[9px] uppercase tracking-[0.28em] text-[var(--gold)]">
            Wall text · Biography
          </span>
        </div>
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
      <section data-chapter="D" className="relative min-h-[100svh] px-6 py-28 md:min-h-screen md:px-16">
        <span
          data-reveal
          className="font-[family-name:var(--font-ibm)] text-[10px] uppercase tracking-[0.4em] text-[var(--gold)]"
        >
          Chapter D · Works on plinth
        </span>
        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {author.works.map((work, i) => (
            <div
              key={work.title}
              onMouseMove={(e) => magneticMove(e.currentTarget, e, 0.04)}
              onMouseLeave={(e) => magneticReset(e.currentTarget)}
            >
              <ExhibitPlinth title={work.title} year={work.year} index={i}>
                {work.blurb}
              </ExhibitPlinth>
            </div>
          ))}
        </div>
      </section>

      {/* E — Quote */}
      <section
        data-chapter="E"
        className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 text-center md:min-h-screen"
      >
        <LightShaft warm={warm} className="opacity-40" />
        <span
          data-reveal
          className="font-[family-name:var(--font-ibm)] text-[10px] uppercase tracking-[0.4em] text-[var(--gold)]"
        >
          Chapter E · Voice
        </span>
        <blockquote
          data-reveal
          data-depth
          data-approach
          className="mt-10 max-w-3xl border border-[var(--gold)]/20 bg-[var(--charcoal)]/30 px-8 py-10 font-[family-name:var(--font-cormorant)] text-3xl italic leading-snug text-[var(--ivory)] backdrop-blur-[1px] md:px-14 md:text-5xl"
        >
          &ldquo;{author.quote}&rdquo;
        </blockquote>
      </section>

      {/* F — Significance & Fact */}
      <section
        data-chapter="F"
        className="relative flex min-h-[100svh] flex-col justify-center gap-12 px-6 py-24 md:min-h-screen md:flex-row md:px-16"
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
        <div className="flex-1 border-l-2 border-[var(--gold)]/25 bg-[var(--charcoal)]/25 pl-8 pr-4 py-6">
          <span
            data-reveal
            className="font-[family-name:var(--font-ibm)] text-[10px] uppercase tracking-[0.4em] text-[var(--filipino-red)]"
          >
            Archival fact
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
        className="relative flex min-h-[100svh] flex-col justify-center px-6 py-24 md:min-h-screen md:px-16"
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

      {/* H — Transition out + nav */}
      <section
        data-chapter="H"
        className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 pb-32 text-center md:min-h-screen"
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
        <div data-reveal className="touch-nav mt-14 flex flex-wrap justify-center gap-4">
          {prev && (
            <Link
              href={`/${author.wing}/${prev.slug}`}
              className="border border-[var(--paper)]/25 px-6 py-3 font-[family-name:var(--font-ibm)] text-[10px] uppercase tracking-[0.25em] text-[var(--paper)]/80 hover:border-[var(--gold)]/50"
            >
              ← {prev.name}
            </Link>
          )}
          <Link
            href={`/${author.wing}`}
            className="border border-[var(--paper)]/25 px-6 py-3 font-[family-name:var(--font-ibm)] text-[10px] uppercase tracking-[0.25em] text-[var(--paper)]/80 hover:border-[var(--gold)]/50"
          >
            Back to wing
          </Link>
          {next && (
            <Link
              href={`/${author.wing}/${next.slug}`}
              className="border border-[var(--gold)]/50 px-6 py-3 font-[family-name:var(--font-ibm)] text-[10px] uppercase tracking-[0.25em] text-[var(--gold)] hover:bg-[var(--gold)]/10"
            >
              {next.name} →
            </Link>
          )}
        </div>
        <div data-reveal className="mt-6 flex flex-wrap justify-center gap-4">
          <Link
            href="/archive"
            className="font-[family-name:var(--font-ibm)] text-[10px] uppercase tracking-[0.25em] text-[var(--paper)]/45 hover:text-[var(--gold)]"
          >
            Archive sources
          </Link>
          <Link
            href="/constellation"
            className="font-[family-name:var(--font-ibm)] text-[10px] uppercase tracking-[0.25em] text-[var(--paper)]/45 hover:text-[var(--gold)]"
          >
            Constellation
          </Link>
        </div>
        <p className="sr-only">Sections {CHAPTERS.join(", ")}</p>
      </section>
    </div>
  );
}
