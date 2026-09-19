"use client";

import type { ReactNode } from "react";

/** Book-shaped exhibit card on a museum plinth */
export function ExhibitPlinth({
  children,
  title,
  year,
  index,
  className = "",
}: {
  children: ReactNode;
  title: string;
  year?: string;
  index?: number;
  className?: string;
}) {
  return (
    <article
      data-reveal
      className={`exhibit-plinth work-card relative flex flex-col ${className}`}
    >
      <div className="exhibit-plinth__shelf" aria-hidden />
      <div className="exhibit-plinth__book relative flex flex-1 flex-col border border-[var(--paper)]/12 bg-[var(--charcoal)]/70 p-6 backdrop-blur-[2px]">
        <div className="exhibit-plinth__spine" aria-hidden />
        {typeof index === "number" && (
          <span className="mb-3 font-[family-name:var(--font-ibm)] text-[9px] uppercase tracking-[0.3em] text-[var(--gold)]/70">
            Exhibit {String(index + 1).padStart(2, "0")}
          </span>
        )}
        <h3 className="font-[family-name:var(--font-cormorant)] text-2xl text-[var(--ivory)]">
          {title}
        </h3>
        {year && (
          <p className="mt-1 font-[family-name:var(--font-ibm)] text-[10px] text-[var(--gold)]/80">
            {year}
          </p>
        )}
        <div className="mt-4 flex-1 font-[family-name:var(--font-inter)] text-sm leading-relaxed text-[var(--paper)]/65">
          {children}
        </div>
        <div className="exhibit-caption-rail mt-5 pt-3" />
      </div>
    </article>
  );
}
