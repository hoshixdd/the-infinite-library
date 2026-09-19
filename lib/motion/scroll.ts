"use client";

import { gsap, ScrollTrigger, registerGsapPlugins } from "./gsap";

const EASE = "power3.out";

export function initScrollCamera(container: HTMLElement | null) {
  registerGsapPlugins();
  if (!container) return () => {};

  const sections = container.querySelectorAll<HTMLElement>("[data-scroll-section]");
  const ctx = gsap.context(() => {
    sections.forEach((section, i) => {
      const reveals = section.querySelectorAll("[data-reveal]");
      gsap.fromTo(
        reveals,
        { opacity: 0, y: 56, rotateX: 6 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1.35,
          stagger: 0.14,
          ease: EASE,
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
            end: "top 28%",
            scrub: 0.85,
          },
        }
      );

      gsap.fromTo(
        section,
        { filter: i === 0 ? "brightness(1)" : "brightness(0.72)" },
        {
          filter: "brightness(1)",
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "center center",
            scrub: 1.1,
          },
        }
      );
    });
  }, container);

  return () => ctx.revert();
}

export function initChapterScroll(container: HTMLElement | null) {
  registerGsapPlugins();
  if (!container) return () => {};

  const chapters = container.querySelectorAll<HTMLElement>("[data-chapter]");
  const ctx = gsap.context(() => {
    chapters.forEach((chapter) => {
      const reveal = chapter.querySelectorAll("[data-reveal]");
      gsap.fromTo(
        reveal,
        { opacity: 0, y: 72, filter: "blur(8px)", scale: 0.985 },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          scale: 1,
          duration: 1.55,
          stagger: 0.11,
          ease: EASE,
          scrollTrigger: {
            trigger: chapter,
            start: "top 72%",
            end: "center center",
            scrub: 0.95,
          },
        }
      );

      const depth = chapter.querySelectorAll("[data-depth]");
      if (depth.length) {
        gsap.fromTo(
          depth,
          { y: 40 },
          {
            y: -24,
            ease: "none",
            scrollTrigger: {
              trigger: chapter,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          }
        );
      }
    });
  }, container);

  return () => {
    ctx.revert();
  };
}

export function magneticMove(
  el: HTMLElement,
  e: { clientX: number; clientY: number },
  strength = 0.08
) {
  if (window.matchMedia("(pointer: coarse)").matches) return;
  const rect = el.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;
  gsap.to(el, {
    x: x * strength,
    y: y * strength,
    duration: 0.45,
    ease: "power3.out",
  });
}

export function magneticReset(el: HTMLElement) {
  gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "power3.out" });
}
