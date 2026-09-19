"use client";

import Link from "next/link";
import { useRef } from "react";
import { magneticMove, magneticReset } from "@/lib/motion/scroll";
import { ShelfBackdrop } from "@/components/museum/ShelfBackdrop";

function MagneticCard({
  href,
  title,
  subtitle,
  accent,
  side,
  meta,
}: {
  href: string;
  title: string;
  subtitle: string;
  accent: string;
  side: "left" | "right";
  meta: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  return (
    <Link
      ref={ref}
      href={href}
      onMouseMove={(e) => {
        if (ref.current) magneticMove(ref.current, e, 0.07);
      }}
      onMouseLeave={() => {
        if (ref.current) magneticReset(ref.current);
      }}
      data-reveal
      data-approach
      className={`magnetic-card group relative flex min-h-[240px] flex-1 flex-col justify-end overflow-hidden border border-[var(--paper)]/10 bg-[var(--charcoal)]/60 p-8 backdrop-blur-sm md:min-h-[440px] md:p-10 ${
        side === "left" ? "md:mr-3 wing-warm" : "md:ml-3 wing-cool"
      }`}
    >
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <ShelfBackdrop density={10} />
      </div>
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition duration-700 group-hover:opacity-100"
        style={{
          background: `radial-gradient(700px circle at 50% 85%, ${accent}28, transparent 55%)`,
        }}
      />
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full opacity-20 blur-2xl transition duration-700 group-hover:opacity-40"
        style={{ background: accent }}
      />
      <div
        className="pointer-events-none absolute inset-3 border opacity-30 transition duration-500 group-hover:opacity-60"
        style={{ borderColor: accent }}
      />
      <span
        className="relative mb-2 font-[family-name:var(--font-ibm)] text-[10px] uppercase tracking-[0.3em]"
        style={{ color: accent }}
      >
        {side === "left" ? "← Left wing" : "Right wing →"}
      </span>
      <span className="relative mb-3 font-[family-name:var(--font-ibm)] text-[9px] uppercase tracking-[0.25em] text-[var(--paper)]/40">
        {meta}
      </span>
      <h3 className="relative font-[family-name:var(--font-cormorant)] text-3xl text-[var(--ivory)] md:text-5xl">
        {title}
      </h3>
      <p className="relative mt-3 max-w-xs font-[family-name:var(--font-inter)] text-sm text-[var(--paper)]/60">
        {subtitle}
      </p>
    </Link>
  );
}

export function Lobby() {
  return (
    <section
      id="lobby"
      data-scroll-section
      className="relative z-10 flex min-h-[100svh] flex-col justify-center px-5 py-24 md:px-10"
    >
      <div className="mb-10 text-center md:mb-14">
        <p
          data-reveal
          className="font-[family-name:var(--font-ibm)] text-[10px] uppercase tracking-[0.4em] text-[var(--gold)]"
        >
          Grand Lobby
        </p>
        <h2
          data-reveal
          className="mt-3 font-[family-name:var(--font-cormorant)] text-3xl text-[var(--ivory)] md:text-5xl"
        >
          Choose a wing
        </h2>
        <p
          data-reveal
          className="mx-auto mt-4 max-w-md font-[family-name:var(--font-inter)] text-sm text-[var(--paper)]/55"
        >
          Spatial choice: left for the archipelago&apos;s warm light, right for
          cooler museum galleries of the world.
        </p>
      </div>
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 md:flex-row">
        <MagneticCard
          href="/filipino"
          title="Filipino Literature"
          subtitle="Ten authors from the archipelago and diaspora—labor, nation, verse, and conscience."
          accent="var(--filipino-green)"
          side="left"
          meta="10 gallery bays"
        />
        <MagneticCard
          href="/international"
          title="World Literature"
          subtitle="Ten authors across continents—epic, fable, fog, and the modern novel."
          accent="var(--gold)"
          side="right"
          meta="10 gallery bays"
        />
      </div>
    </section>
  );
}
