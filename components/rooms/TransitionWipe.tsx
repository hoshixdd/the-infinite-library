"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

/** Cinematic iris / pull wipe — sipped into the author's gallery bay */
export function TransitionWipe() {
  const pathname = usePathname();
  const [active, setActive] = useState(false);
  const [label, setLabel] = useState("");
  const [mode, setMode] = useState<"iris" | "wipe">("iris");

  useEffect(() => {
    const isAuthor =
      pathname.startsWith("/filipino/") || pathname.startsWith("/international/");
    if (!isAuthor) return;
    setMode(pathname.includes("/filipino/") ? "wipe" : "iris");
    setActive(true);
    setLabel(pathname.split("/").pop()?.replace(/-/g, " ") ?? "");
    const t = window.setTimeout(() => setActive(false), 1200);
    return () => window.clearTimeout(t);
  }, [pathname]);

  if (!active) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[90] flex items-center justify-center"
      aria-hidden
    >
      <div
        className={`absolute inset-0 bg-[var(--archive)] ${
          mode === "iris" ? "anim-iris" : "anim-wipe"
        }`}
      />
      {/* Soft gold rim during pull */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(168,146,90,0.12)_70%,rgba(9,9,9,0.85)_100%)] opacity-80" />
      <div className="relative z-10 flex flex-col items-center gap-3 px-6 text-center">
        <span className="font-[family-name:var(--font-ibm)] text-[9px] uppercase tracking-[0.45em] text-[var(--gold)]/80">
          Crossing the threshold
        </span>
        <span className="font-[family-name:var(--font-cormorant)] text-2xl tracking-wide text-[var(--ivory)] md:text-3xl">
          {label}
        </span>
        <span className="mt-1 h-px w-16 bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" />
      </div>
    </div>
  );
}
