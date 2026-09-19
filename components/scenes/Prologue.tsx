"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsapPlugins } from "@/lib/motion/gsap";
import { LightShaft } from "@/components/museum/LightShaft";
import { ShelfBackdrop } from "@/components/museum/ShelfBackdrop";

export function Prologue() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsapPlugins();
    if (!titleRef.current || !stageRef.current) return;
    // Enhancement-only: content starts fully visible. Never trap in a closed clip.
    const ctx = gsap.context(() => {
      gsap.fromTo(
        stageRef.current,
        { filter: "brightness(0.92)" },
        {
          filter: "brightness(1)",
          duration: 1.6,
          ease: "power2.out",
        }
      );
      gsap.fromTo(
        titleRef.current,
        { letterSpacing: "0.18em", y: 12 },
        {
          letterSpacing: "0.08em",
          y: 0,
          duration: 1.8,
          ease: "power3.out",
        }
      );
    });
    return () => ctx.revert();
  }, []);

  const scrollToEntrance = () => {
    document
      .getElementById("entrance")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="prologue"
      data-scroll-section
      data-prologue
      className="pointer-events-none relative z-10 flex min-h-[100svh] flex-col items-center justify-center px-6 text-center"
    >
      <div
        ref={stageRef}
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        aria-hidden
      >
        <ShelfBackdrop density={16} className="opacity-40 md:opacity-60" />
        <LightShaft warm />
        <div className="library-arch-paper absolute inset-0" />
        <div className="absolute inset-x-[8%] top-[12%] bottom-[18%] border border-[var(--gold)]/15 md:inset-x-[18%]" />
        <div className="absolute inset-x-[10%] top-[14%] bottom-[20%] border border-[var(--paper)]/5 md:inset-x-[20%]" />
      </div>

      <p
        data-reveal
        className="pointer-events-auto mb-8 font-[family-name:var(--font-ibm)] text-[10px] uppercase tracking-[0.45em] text-[var(--gold)] md:text-xs"
      >
        20 Authors / 20 Voices / One Literary Journey
      </p>
      <h1
        ref={titleRef}
        data-reveal
        className="anim-title pointer-events-auto font-[family-name:var(--font-cormorant)] text-5xl font-light leading-[0.95] text-[var(--ivory)] md:text-7xl lg:text-8xl"
      >
        THE INFINITE
        <br />
        LIBRARY
      </h1>
      <p
        data-reveal
        className="pointer-events-auto mt-8 max-w-md font-[family-name:var(--font-inter)] text-sm leading-relaxed text-[var(--paper)]/70 md:text-base"
      >
        A dark archive opens into the stacks—Filipino and world literature in
        scroll, light, and museum air. Hover the shelves behind this page.
      </p>
      <button
        data-reveal
        type="button"
        onClick={scrollToEntrance}
        className="relative z-20 mt-12 cursor-pointer border border-[var(--gold)]/60 px-8 py-3 font-[family-name:var(--font-ibm)] text-[10px] uppercase tracking-[0.35em] text-[var(--gold)] transition duration-500 hover:bg-[var(--gold)]/10"
        style={{ pointerEvents: "auto" }}
      >
        Enter the Gallery
      </button>
      <div
        data-reveal
        className="anim-float pointer-events-none mt-16 font-[family-name:var(--font-ibm)] text-[9px] uppercase tracking-[0.4em] text-[var(--paper)]/35"
      >
        Scroll into the stacks · move mouse to explore shelves
      </div>
    </section>
  );
}
