"use client";

import type { Author } from "@/lib/authors/types";
import { LightShaft } from "@/components/museum/LightShaft";

/** Distinct CSS/SVG motif layer per author room — gallery bay chrome + author motifs */
export function AuthorRoomMotif({ author }: { author: Author }) {
  const key = author.transitionOut;
  const isFilipino = author.wing === "filipino";
  const wingAccent = isFilipino ? "var(--filipino-green)" : "var(--gold)";

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden opacity-40 mobile-hide-3d-heavy md:opacity-60"
      aria-hidden
      data-room={author.slug}
      data-transition={key}
    >
      <div
        className="absolute inset-0"
        style={{
          background: isFilipino
            ? `radial-gradient(ellipse at 28% 18%, color-mix(in srgb, var(--filipino-green) 22%, transparent), transparent 55%),
               radial-gradient(ellipse at 72% 78%, color-mix(in srgb, var(--filipino-brown) 16%, transparent), transparent 50%),
               radial-gradient(ellipse at 50% 0%, rgba(196,176,138,0.08), transparent 45%)`
            : `radial-gradient(ellipse at 30% 20%, color-mix(in srgb, var(--gold) 16%, transparent), transparent 55%),
               radial-gradient(ellipse at 70% 80%, rgba(120,140,160,0.08), transparent 50%),
               radial-gradient(ellipse at 50% 100%, rgba(232,224,212,0.04), transparent 40%)`,
        }}
      />

      <LightShaft warm={isFilipino} className="opacity-50" />

      <div className="absolute inset-x-0 bottom-0 h-[18%] bg-gradient-to-t from-[#12100E]/90 to-transparent" />
      <div className="absolute inset-y-[12%] left-[3%] hidden w-px bg-gradient-to-b from-transparent via-[var(--gold)]/25 to-transparent md:block" />
      <div className="absolute inset-y-[12%] right-[3%] hidden w-px bg-gradient-to-b from-transparent via-[var(--gold)]/25 to-transparent md:block" />
      <div className="absolute left-[6%] right-[6%] top-[10%] hidden h-px bg-[var(--gold)]/20 md:block" />

      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
        <path d="M120,720 Q480,40 840,720" fill="none" stroke={wingAccent} strokeWidth="1" opacity="0.12" />
        {(key === "map-line" || key === "map-zoom") && (
          <path d="M40,360 C160,240 280,420 420,270 C560,160 700,320 760,220" fill="none" stroke={wingAccent} strokeWidth="1.5" strokeDasharray="6 8" opacity="0.35" className="anim-dash" />
        )}
        {key === "bamboo-to-paper" &&
          [0, 1, 2, 3, 4, 5].map((i) => (
            <rect key={i} x={80 + i * 110} y={60} width={10} height={620} fill="var(--filipino-green)" opacity={0.15 + i * 0.03} />
          ))}
        {(key === "newspaper-fill" || key === "pages-to-archive") &&
          Array.from({ length: 18 }).map((_, i) => (
            <line key={i} x1="60" x2="900" y1={100 + i * 28} y2={100 + i * 28} stroke="var(--paper)" strokeWidth="0.8" opacity="0.08" />
          ))}
        {key === "windmill-wipe" && (
          <g opacity="0.22" transform="translate(620,280)">
            <line x1="0" y1="-140" x2="0" y2="140" stroke={wingAccent} strokeWidth="2" />
            <line x1="-140" y1="0" x2="140" y2="0" stroke={wingAccent} strokeWidth="2" />
            <line x1="-100" y1="-100" x2="100" y2="100" stroke={wingAccent} strokeWidth="2" />
            <line x1="100" y1="-100" x2="-100" y2="100" stroke={wingAccent} strokeWidth="2" />
          </g>
        )}
        {key === "fog-fill" &&
          [0, 1, 2, 3].map((i) => (
            <ellipse key={i} cx="480" cy={480 + i * 40} rx={320 + i * 40} ry={36} fill="var(--paper)" opacity={0.04 + i * 0.015} />
          ))}
        {key === "rise-to-sky" &&
          [0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <circle key={i} cx={120 + i * 90} cy={100 + (i % 3) * 50} r={1.5 + (i % 3)} fill="var(--ivory)" opacity="0.45" />
          ))}
        {key === "surveillance-intercept" && (
          <ellipse cx="720" cy="160" rx="70" ry="32" fill="none" stroke={wingAccent} strokeWidth="1.5" opacity="0.35" />
        )}
        {(key === "strip-to-horizon" || key === "horizon-expand" || key === "paper-to-dawn") && (
          <line x1="40" y1="520" x2="920" y2="520" stroke={wingAccent} strokeWidth="1.2" opacity="0.4" />
        )}
        {key === "bars-open" &&
          [0, 1, 2, 3, 4, 5, 6].map((i) => (
            <rect key={i} x={160 + i * 90} y={80} width={12} height={560} fill="var(--paper)" opacity="0.12" />
          ))}
        {key === "ink-spread" && <circle cx="480" cy="360" r="140" fill={wingAccent} opacity="0.08" />}
        {(key === "intramuros-portal" || key === "become-stage") && (
          <rect x="220" y="120" width="440" height="400" fill="none" stroke={wingAccent} strokeWidth="2" opacity="0.22" />
        )}
        {key === "ordinary-to-impossible" && <circle cx="640" cy="220" r="50" fill={wingAccent} opacity="0.12" />}
        {(key === "typewriter-door" || key === "poetry-to-type" || key === "timeline-to-manuscript") &&
          [0, 1, 2, 3, 4].map((i) => (
            <rect key={i} x={300 + i * 70} y={560} width={48} height={28} rx={3} fill="var(--paper)" opacity="0.15" />
          ))}
        <rect x="70" y="140" width="90" height="110" fill="none" stroke="var(--gold)" strokeWidth="1" opacity="0.12" />
        <rect x="800" y="200" width="70" height="90" fill="none" stroke="var(--gold)" strokeWidth="1" opacity="0.1" />
      </svg>
    </div>
  );
}
