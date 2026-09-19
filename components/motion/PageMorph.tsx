"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Optional View Transitions API progressive enhancement.
 * Does not replace TransitionWipe — only softens browser-level morph when supported.
 */
export function PageMorph() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof document === "undefined") return;
    const doc = document as Document & {
      startViewTransition?: (cb: () => void) => { finished: Promise<void> };
    };
    if (!doc.startViewTransition) return;

    document.documentElement.dataset.pageMorph = pathname;
    return () => {
      delete document.documentElement.dataset.pageMorph;
    };
  }, [pathname]);

  return null;
}
