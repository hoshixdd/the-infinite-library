"use client";

import Link from "next/link";
import { useRef } from "react";

function MagneticCard({
  href,
  title,
  subtitle,
  accent,
  side,
}: {
  href: string;
  title: string;
  subtitle: string;
  accent: string;
  side: "left" | "right";
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el || window.matchMedia("(pointer: coarse)").matches) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.06}px, ${y * 0.06}px)`;
  };

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "translate(0, 0)";
  };

  return (
    <Link
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      data-reveal
      className={`group relative flex min-h-[280px] flex-1 flex-col justify-end overflow-hidden border border-[var(--paper)]/10 bg-[var(--charcoal)]/60 p-8 backdrop-blur-sm transition duration-300 hover:border-[var(--gold)]/40 md:min-h-[420px] md:p-10 ${
        side === "left" ? "md:mr-3" : "md:ml-3"
      }`}
      style={{ transition: "transform 0.25s ease-out, border-color 0.3s" }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at 50% 80%, ${accent}22, transparent 60%)`,
        }}
      />
      <span
        className="mb-3 font-[family-name:var(--font-ibm)] text-[10px] uppercase tracking-[0.3em]"
        style={{ color: accent }}
      >
        Wing
      </span>
      <h3 className="font-[family-name:var(--font-cormorant)] text-3xl text-[var(--ivory)] md:text-5xl">
        {title}
      </h3>
      <p className="mt-3 max-w-xs font-[family-name:var(--font-inter)] text-sm text-[var(--paper)]/60">
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
      className="relative z-10 flex min-h-screen flex-col justify-center px-5 py-24 md:px-10"
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
      </div>
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 md:flex-row">
        <MagneticCard
          href="/filipino"
          title="Filipino Literature"
          subtitle="Ten authors from the archipelago and diaspora—labor, nation, verse, and conscience."
          accent="var(--filipino-green)"
          side="left"
        />
        <MagneticCard
          href="/international"
          title="World Literature"
          subtitle="Ten authors across continents—epic, fable, fog, and the modern novel."
          accent="var(--gold)"
          side="right"
        />
      </div>
    </section>
  );
}
