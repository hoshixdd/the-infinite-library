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
      const isPrologue = i === 0 || section.hasAttribute("data-prologue");

      // Prologue stays readable immediately — never scrub-hide entry CTAs
      if (isPrologue) {
        gsap.set(reveals, { opacity: 1, y: 0, scale: 1, clearProps: "filter" });
      } else if (reveals.length) {
        // Motion without blur filters (blur is expensive / can strand UI unreadable)
        gsap.fromTo(
          reveals,
          {
            opacity: 0.85,
            y: 36,
            scale: 0.98,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            ease: EASE,
            stagger: 0.06,
            scrollTrigger: {
              trigger: section,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Soft brightness only on later sections (skip prologue)
      if (!isPrologue) {
        gsap.fromTo(
          section,
          { filter: "brightness(0.88) saturate(0.95)" },
          {
            filter: "brightness(1) saturate(1)",
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "center center",
              scrub: 1.1,
            },
          }
        );
      }

      const depth = section.querySelectorAll("[data-depth]");
      if (depth.length) {
        gsap.fromTo(
          depth,
          { y: 36, scale: 1.02 },
          {
            y: -20,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          }
        );
      }

      const mask = section.querySelectorAll("[data-film-mask]");
      if (mask.length) {
        gsap.fromTo(
          mask,
          { clipPath: "inset(6% 10% 6% 10%)", scale: 1.04 },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              end: "center center",
              scrub: 1.05,
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

      if (reveal.length) {
        gsap.fromTo(
          reveal,
          {
            opacity: 0.88,
            y: 40,
            scale: 0.98,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            ease: EASE,
            stagger: 0.07,
            scrollTrigger: {
              trigger: chapter,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      const approach = chapter.querySelectorAll("[data-approach]");
      if (approach.length) {
        gsap.fromTo(
          approach,
          {
            scale: 0.9,
            opacity: 0.75,
            clipPath: "inset(4% 6% 4% 6%)",
          },
          {
            scale: 1,
            opacity: 1,
            clipPath: "inset(0% 0% 0% 0%)",
            ease: EASE,
            scrollTrigger: {
              trigger: chapter,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      const depth = chapter.querySelectorAll("[data-depth]");
      if (depth.length) {
        gsap.fromTo(
          depth,
          { y: 32 },
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

      gsap.fromTo(
        chapter,
        { filter: idx === 0 ? "brightness(1)" : "brightness(0.9)" },
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

// Keep ScrollTrigger import used (tree / plugin side-effect awareness)
void ScrollTrigger;
