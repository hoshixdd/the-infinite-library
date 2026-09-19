"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Author } from "@/lib/authors/types";

export function ConstellationMap({ authors }: { authors: Author[] }) {
  const [active, setActive] = useState<string | null>(null);

  const nodes = useMemo(() => {
    const fil = authors.filter((a) => a.wing === "filipino");
    const intl = authors.filter((a) => a.wing === "international");
    const place = (list: Author[], cx: number, cy: number, r: number) =>
      list.map((a, i) => {
        const angle = (i / list.length) * Math.PI * 2 - Math.PI / 2;
        return {
          ...a,
          x: cx + Math.cos(angle) * r,
          y: cy + Math.sin(angle) * r,
        };
      });
    return [...place(fil, 28, 50, 22), ...place(intl, 72, 50, 22)];
  }, [authors]);

  const links = useMemo(() => {
    // thematic bridges (labor/nation/myth/stage)
    const bridges: [string, string][] = [
      ["jose-rizal", "miguel-de-cervantes"],
      ["carlos-bulosan", "george-orwell"],
      ["nick-joaquin", "william-shakespeare"],
      ["f-sionil-jose", "leo-tolstoy"],
      ["amado-v-hernandez", "charles-dickens"],
      ["nvm-gonzalez", "ernest-hemingway"],
      ["francisco-balagtas", "william-shakespeare"],
      ["gabriel-garcia-marquez", "nick-joaquin"],
      ["jrr-tolkien", "francisco-balagtas"],
      ["lualhati-bautista", "george-orwell"],
    ];
    return bridges
      .map(([a, b]) => {
        const na = nodes.find((n) => n.slug === a);
        const nb = nodes.find((n) => n.slug === b);
        if (!na || !nb) return null;
        return { a: na, b: nb };
      })
      .filter(Boolean) as { a: (typeof nodes)[0]; b: (typeof nodes)[0] }[];
  }, [nodes]);

  const selected = nodes.find((n) => n.slug === active);

  return (
    <div className="relative mx-auto w-full max-w-5xl">
      <svg
        viewBox="0 0 100 100"
        className="h-auto w-full overflow-visible"
        role="img"
        aria-label="Constellation of twenty author voices"
      >
        <defs>
          <radialGradient id="voidGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#A8925A" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#090909" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="40" fill="url(#voidGlow)" />
        {links.map((l, i) => (
          <line
            key={i}
            x1={l.a.x}
            y1={l.a.y}
            x2={l.b.x}
            y2={l.b.y}
            stroke="#A8925A"
            strokeWidth="0.15"
            opacity={
              active && (active === l.a.slug || active === l.b.slug) ? 0.85 : 0.25
            }
          />
        ))}
        {/* wing labels */}
        <text
          x="28"
          y="12"
          textAnchor="middle"
          fill="#2F4A3C"
          fontSize="2.4"
          fontFamily="monospace"
        >
          FILIPINO
        </text>
        <text
          x="72"
          y="12"
          textAnchor="middle"
          fill="#A8925A"
          fontSize="2.4"
          fontFamily="monospace"
        >
          WORLD
        </text>
        {nodes.map((n) => (
          <g
            key={n.slug}
            className="cursor-pointer"
            onMouseEnter={() => setActive(n.slug)}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive(n.slug)}
            onBlur={() => setActive(null)}
            tabIndex={0}
          >
            <circle
              cx={n.x}
              cy={n.y}
              r={active === n.slug ? 1.6 : 1.1}
              fill={n.wing === "filipino" ? "#2F4A3C" : "#A8925A"}
              stroke="#F4EFE6"
              strokeWidth="0.15"
            />
            <text
              x={n.x}
              y={n.y + 3.2}
              textAnchor="middle"
              fill="#E8E0D4"
              fontSize="1.6"
              opacity={active === n.slug ? 1 : 0.55}
              fontFamily="Georgia, serif"
            >
              {n.name.split(" ").slice(-1)[0]}
            </text>
          </g>
        ))}
      </svg>

      <div className="mt-8 min-h-[7rem] border border-[var(--paper)]/10 bg-[var(--charcoal)]/40 p-6 text-center backdrop-blur-sm">
        {selected ? (
          <>
            <p className="font-[family-name:var(--font-ibm)] text-[10px] uppercase tracking-[0.3em] text-[var(--gold)]">
              {selected.wing} · {String(selected.order).padStart(2, "0")}
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-cormorant)] text-2xl text-[var(--ivory)]">
              {selected.name}
            </h2>
            <p className="mt-2 font-[family-name:var(--font-inter)] text-sm text-[var(--paper)]/60">
              {selected.significance}
            </p>
            <Link
              href={`/${selected.wing}/${selected.slug}`}
              className="mt-4 inline-block font-[family-name:var(--font-ibm)] text-[10px] uppercase tracking-[0.25em] text-[var(--gold)] hover:underline"
            >
              Enter exhibition →
            </Link>
          </>
        ) : (
          <p className="font-[family-name:var(--font-inter)] text-sm text-[var(--paper)]/50">
            Hover or focus a star — twenty voices, one sky. Gold lines bridge
            labor, nation, myth, and stage across wings.
          </p>
        )}
      </div>
    </div>
  );
}
