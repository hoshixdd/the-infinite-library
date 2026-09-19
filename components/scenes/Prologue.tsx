"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsapPlugins } from "@/lib/motion/gsap";

export function Prologue() {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    registerGsapPlugins();
    if (!titleRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, letterSpacing: "0.4em", y: 30 },
        { opacity: 1, letterSpacing: "0.08em", y: 0, duration: 2.2, ease: "power3.out" }
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
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(168,146,90,0.12),transparent_60%)]" />
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
        A cinematic museum of letters—Filipino and world literature in scroll,
        light, and atmosphere.
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
        Scroll to descend
      </div>
    </section>
  );
}
