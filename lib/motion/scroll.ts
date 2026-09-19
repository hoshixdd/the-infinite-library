"use client";

import { gsap, ScrollTrigger, registerGsapPlugins } from "./gsap";

const EASE = "power3.out";
const FILM = "expo.out";

/** Home journey: scroll-as-camera — approach, inhabit, pull through */
export function initScrollCamera(container: HTMLElement | null) {
  registerGsapPlugins();
  if (!container) return () => {};

  const sections = container.querySelectorAll<HTMLElement>("[data-scroll-section]");
  const ctx = gsap.context(() => {
    sections.forEach((section, i) => {
      const reveals = section.querySelectorAll("[data-reveal]");

      gsap.fromTo(
        reveals,
        {
          opacity: 0.15,
          y: 80,
          scale: 0.94,
          filter: "blur(6px)",
          rotateX: 8,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          rotateX: 0,
          ease: "none",
          stagger: 0.08,
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            end: "top 30%",
            scrub: 1.05,
          },
        }
      );

      gsap.fromTo(
        section,
        { filter: i === 0 ? "brightness(1)" : "brightness(0.55) saturate(0.85)" },
        {
          filter: "brightness(1) saturate(1)",
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "center center",
            scrub: 1.2,
          },
        }
      );

      const depth = section.querySelectorAll("[data-depth]");
      if (depth.length) {
        gsap.fromTo(
          depth,
          { y: 50, scale: 1.04 },
          {
            y: -30,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.35,
            },
          }
        );
      }

      const mask = section.querySelectorAll("[data-film-mask]");
      if (mask.length) {
        gsap.fromTo(
          mask,
          { clipPath: "inset(12% 18% 12% 18%)", scale: 1.08 },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              end: "center center",
              scrub: 1.1,
            },
          }
        );
      }
    });
  }, container);

  return () => ctx.revert();
}

/** Author chapters: approach → reveal → inhabit (cinematic, not slides) */
export function initChapterScroll(container: HTMLElement | null) {
  registerGsapPlugins();
  if (!container) return () => {};

  const chapters = container.querySelectorAll<HTMLElement>("[data-chapter]");
  const ctx = gsap.context(() => {
    chapters.forEach((chapter, idx) => {
      const reveal = chapter.querySelectorAll("[data-reveal]");

      gsap.fromTo(
        reveal,
        {
          opacity: 0,
          y: 90,
          scale: 0.92,
          filter: "blur(10px)",
          transformOrigin: "50% 60%",
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          ease: "none",
          stagger: 0.09,
          scrollTrigger: {
            trigger: chapter,
            start: "top 78%",
            end: "center 42%",
            scrub: 1.05,
          },
        }
      );

      const approach = chapter.querySelectorAll("[data-approach]");
      if (approach.length) {
        gsap.fromTo(
          approach,
          {
            scale: 0.78,
            opacity: 0.35,
            filter: "brightness(0.55)",
            clipPath: "inset(8% 10% 8% 10%)",
          },
          {
            scale: 1,
            opacity: 1,
            filter: "brightness(1)",
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "none",
            scrollTrigger: {
              trigger: chapter,
              start: "top 90%",
              end: "center center",
              scrub: 1.25,
            },
          }
        );
      }

      const depth = chapter.querySelectorAll("[data-depth]");
      if (depth.length) {
        gsap.fromTo(
          depth,
          { y: 48 },
          {
            y: -36,
            ease: "none",
            scrollTrigger: {
              trigger: chapter,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.3,
            },
          }
        );
      }

      gsap.fromTo(
        chapter,
        { filter: idx === 0 ? "brightness(1)" : "brightness(0.72)" },
        {
          filter: "brightness(1)",
          ease: "none",
          scrollTrigger: {
            trigger: chapter,
            start: "top bottom",
            end: "center center",
            scrub: true,
          },
        }
      );
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
    ease: FILM,
  });
}

export function magneticReset(el: HTMLElement) {
  gsap.to(el, { x: 0, y: 0, duration: 0.65, ease: EASE });
}
