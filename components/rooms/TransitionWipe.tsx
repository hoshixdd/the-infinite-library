"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

/** Simplified object-inspired wipe between author navigations */
export function TransitionWipe() {
  const pathname = usePathname();
  const [active, setActive] = useState(false);
  const [label, setLabel] = useState("");

  useEffect(() => {
    const isAuthor =
      pathname.startsWith("/filipino/") || pathname.startsWith("/international/");
    if (!isAuthor) return;
    setActive(true);
    setLabel(pathname.split("/").pop()?.replace(/-/g, " ") ?? "");
    const t = window.setTimeout(() => setActive(false), 900);
    return () => window.clearTimeout(t);
  }, [pathname]);

  if (!active) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[90] flex items-center justify-center"
      aria-hidden
    >
      <div className="anim-wipe absolute inset-0 bg-[var(--void)]" />
      <div className="relative z-10 font-[family-name:var(--font-ibm)] text-[10px] uppercase tracking-[0.4em] text-[var(--gold)]">
        Entering · {label}
      </div>
    </div>
  );
}
