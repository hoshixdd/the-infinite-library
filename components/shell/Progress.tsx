"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function Progress() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const isAuthorPage =
    /^\/(filipino|international)\/[^/]+$/.test(pathname || "");

  useEffect(() => {
    if (!isAuthorPage) {
      setProgress(0);
      return;
    }
    const onScroll = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setProgress(max > 0 ? (el.scrollTop / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isAuthorPage, pathname]);

  if (!isAuthorPage) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-[var(--charcoal)]"
      aria-hidden
    >
      <div
        className="h-full bg-[var(--gold)] transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
