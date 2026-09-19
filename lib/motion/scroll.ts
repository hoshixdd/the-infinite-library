"use client";

import { gsap, ScrollTrigger, registerGsapPlugins } from "./gsap";

export function initScrollCamera(container: HTMLElement | null) {
  registerGsapPlugins();
  if (!container) return () => {};

  const sections = container.querySelectorAll<HTMLElement>("[data-scroll-section]");
  const ctx = gsap.context(() => {
    sections.forEach((section) => {
      gsap.fromTo(
        section.querySelectorAll("[data-reveal]"),
        { opacity: 0, y: 48 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            end: "top 20%",
            scrub: 0.6,
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
        { opacity: 0, y: 64, filter: "blur(6px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.4,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: chapter,
            start: "top 70%",
            end: "center center",
            scrub: 0.8,
          },
        }
      );
    });
  }, container);

  return () => {
    ctx.revert();
    ScrollTrigger.getAll().forEach((t) => t.kill());
  };
}
