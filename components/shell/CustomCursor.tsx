"use client";

import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);
  const pos = useRef({ x: -100, y: -100 });
  const smooth = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine) and (min-width: 768px)");
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const move = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      const t = e.target as HTMLElement | null;
      const interactive = !!t?.closest("a, button, [data-magnetic], .work-card, .portrait-frame");
      setHover(interactive);
    };

    let raf = 0;
    const tick = () => {
      smooth.current.x += (pos.current.x - smooth.current.x) * 0.18;
      smooth.current.y += (pos.current.y - smooth.current.y) * 0.18;
      if (ring.current) {
        ring.current.style.transform = `translate(${smooth.current.x}px, ${smooth.current.y}px) translate(-50%, -50%) scale(${hover ? 1.45 : 1})`;
      }
      if (dot.current) {
        dot.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener("mousemove", move);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
    };
  }, [enabled, hover]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={ring}
        className="pointer-events-none fixed left-0 top-0 z-[100] h-10 w-10 rounded-full border border-[var(--gold)]/45 mix-blend-screen transition-[width,height] duration-300"
        style={{
          boxShadow: "0 0 36px 10px rgba(168,146,90,0.12)",
          background:
            "radial-gradient(circle, rgba(168,146,90,0.16) 0%, transparent 70%)",
        }}
        aria-hidden
      />
      <div
        ref={dot}
        className="pointer-events-none fixed left-0 top-0 z-[101] h-1.5 w-1.5 rounded-full bg-[var(--gold)]"
        aria-hidden
      />
    </>
  );
}
