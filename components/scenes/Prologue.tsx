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
    const ctx = gsap.context(() => {
      gsap.fromTo(
        stageRef.current,
        { clipPath: "inset(48% 42% 48% 42%)", filter: "brightness(0.15)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          filter: "brightness(1)",
          duration: 2.6,
          ease: "power3.inOut",
        }
      );
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, letterSpacing: "0.45em", y: 40, scale: 0.96 },
        {
          opacity: 1,
          letterSpacing: "0.08em",
          y: 0,
          scale: 1,
          duration: 2.4,
          delay: 0.55,
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
      className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center px-6 text-center"
    >
      <div ref={stageRef} className="absolute inset-0 -z-10 overflow-hidden">
        <ShelfBackdrop density={16} className="opacity-40 md:opacity-60" />
        <LightShaft warm />
        <div className="library-arch-paper absolute inset-0" />
        <div className="pointer-events-none absolute inset-x-[8%] top-[12%] bottom-[18%] border border-[var(--gold)]/15 md:inset-x-[18%]" />
        <div className="pointer-events-none absolute inset-x-[10%] top-[14%] bottom-[20%] border border-[var(--paper)]/5 md:inset-x-[20%]" />
      </div>

      <p
        data-reveal
        className="mb-8 font-[family-name:var(--font-ibm)] text-[10px] uppercase tracking-[0.45em] text-[var(--gold)] md:text-xs"
      >
        20 Authors / 20 Voices / One Literary Journey
      </p>
      <h1
        ref={titleRef}
        data-reveal
        className="anim-title font-[family-name:var(--font-cormorant)] text-5xl font-light leading-[0.95] text-[var(--ivory)] md:text-7xl lg:text-8xl"
      >
        THE INFINITE
        <br />
        LIBRARY
      </h1>
      <p
        data-reveal
        className="mt-8 max-w-md font-[family-name:var(--font-inter)] text-sm leading-relaxed text-[var(--paper)]/70 md:text-base"
      >
        A dark archive opens into the stacks—Filipino and world literature in
        scroll, light, and museum air.
      </p>
      <button
        data-reveal
        type="button"
        onClick={scrollToEntrance}
        className="mt-12 border border-[var(--gold)]/60 px-8 py-3 font-[family-name:var(--font-ibm)] text-[10px] uppercase tracking-[0.35em] text-[var(--gold)] transition duration-500 hover:bg-[var(--gold)]/10"
      >
        Enter the Gallery
      </button>
      <div
        data-reveal
        className="anim-float mt-16 font-[family-name:var(--font-ibm)] text-[9px] uppercase tracking-[0.4em] text-[var(--paper)]/35"
      >
        Scroll into the stacks
      </div>
    </section>
  );
}
