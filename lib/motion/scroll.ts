"use client";

import { gsap, ScrollTrigger, registerGsapPlugins } from "./gsap";

const EASE = "power3.out";
const FILM = "expo.out";
const SCRUB = 0.65;

function ensureLightVeil(section: HTMLElement): HTMLElement {
  let veil = section.querySelector<HTMLElement>("[data-light-veil]");
  if (!veil) {
    const cs = getComputedStyle(section);
    if (cs.position === "static") {
      section.style.position = "relative";
    }
    veil = document.createElement("div");
    veil.setAttribute("data-light-veil", "");
    veil.setAttribute("aria-hidden", "true");
    section.prepend(veil);
  }
  return veil;
}

function refreshSoon() {
  requestAnimationFrame(() => {
    ScrollTrigger.refresh();
  });
  if (typeof document !== "undefined" && "fonts" in document) {
    void document.fonts.ready.then(() => ScrollTrigger.refresh());
  }
  window.setTimeout(() => ScrollTrigger.refresh(), 400);
}

/** Home journey: scroll-as-camera — approach, inhabit, pull through */
export function initScrollCamera(container: HTMLElement | null) {
  registerGsapPlugins();
  if (!container || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {};

  document.documentElement.style.scrollBehavior = "auto";

  const sections = container.querySelectorAll<HTMLElement>("[data-scroll-section]");
  const ctx = gsap.context(() => {
    sections.forEach((section, i) => {
      const reveals = section.querySelectorAll("[data-reveal]");
      const isPrologue = i === 0 || section.hasAttribute("data-prologue");

      if (isPrologue) {
        gsap.set(reveals, { opacity: 1, y: 0, scale: 1, clearProps: "filter,clipPath" });
      } else if (reveals.length) {
        gsap.fromTo(
          reveals,
          { opacity: 0.72, y: 56, scale: 0.94 },
          {
            opacity: 1, y: 0, scale: 1, ease: EASE, stagger: 0.08, overwrite: "auto",
            scrollTrigger: { trigger: section, start: "top 88%", toggleActions: "play none none reverse" },
          }
        );
      }

      if (!isPrologue) {
        const veil = ensureLightVeil(section);
        gsap.fromTo(
          veil,
          { autoAlpha: 0.32 },
          {
            autoAlpha: 0, ease: "none", overwrite: "auto",
            scrollTrigger: { trigger: section, start: "top bottom", end: "center center", scrub: SCRUB },
          }
        );
      }

      const depth = section.querySelectorAll("[data-depth]");
      if (depth.length) {
        gsap.fromTo(
          depth,
          { y: 52, scale: 1.06 },
          {
            y: -36, scale: 1, ease: "none", overwrite: "auto",
            scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: SCRUB },
          }
        );
      }

      const mask = section.querySelectorAll("[data-film-mask]");
      if (mask.length) {
        gsap.fromTo(
          mask,
          { scale: 1.1, opacity: 0.82, y: 28 },
          {
            scale: 1, opacity: 1, y: 0, ease: "none", overwrite: "auto",
            scrollTrigger: { trigger: section, start: "top 85%", end: "center center", scrub: SCRUB },
          }
        );
      }
    });
  }, container);

  refreshSoon();
  return () => { ctx.revert(); };
}

/** Author chapters: approach → reveal → inhabit */
export function initChapterScroll(container: HTMLElement | null) {
  registerGsapPlugins();
  if (!container || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {};

  document.documentElement.style.scrollBehavior = "auto";

  const chapters = container.querySelectorAll<HTMLElement>("[data-chapter]");
  const ctx = gsap.context(() => {
    chapters.forEach((chapter, idx) => {
      const reveal = chapter.querySelectorAll("[data-reveal]");

      if (reveal.length) {
        gsap.fromTo(
          reveal,
          { opacity: 0.7, y: 64, scale: 0.94 },
          {
            opacity: 1, y: 0, scale: 1, ease: EASE, stagger: 0.09, overwrite: "auto", immediateRender: false,
            scrollTrigger: { trigger: chapter, start: "top 82%", toggleActions: "play none none reverse" },
          }
        );
      }

      const approach = chapter.querySelectorAll("[data-approach]");
      if (approach.length) {
        gsap.fromTo(
          approach,
          { scale: 0.86, opacity: 0.65, y: 48 },
          {
            scale: 1, opacity: 1, y: 0, ease: EASE, overwrite: "auto", immediateRender: false,
            scrollTrigger: {
              trigger: chapter, start: "top 88%", toggleActions: "play none none reverse",
              onLeaveBack: () => { gsap.set(approach, { clearProps: "clipPath" }); },
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
            y: -40, ease: "none", overwrite: "auto",
            scrollTrigger: { trigger: chapter, start: "top bottom", end: "bottom top", scrub: SCRUB },
          }
        );
      }

      if (idx > 0) {
        const veil = ensureLightVeil(chapter);
        gsap.fromTo(
          veil,
          { autoAlpha: 0.28 },
          {
            autoAlpha: 0, ease: "none", overwrite: "auto",
            scrollTrigger: { trigger: chapter, start: "top bottom", end: "center center", scrub: SCRUB },
          }
        );
      }
    });
  }, container);

  refreshSoon();
  return () => { ctx.revert(); };
}

export function magneticMove(
  el: HTMLElement,
  e: { clientX: number; clientY: number },
  strength = 0.08
) {
  if (window.matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)").matches) return;
  const rect = el.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;
  gsap.to(el, { x: x * strength, y: y * strength, duration: 0.45, ease: FILM, overwrite: "auto" });
}

export function magneticReset(el: HTMLElement) {
  gsap.to(el, { x: 0, y: 0, duration: 0.65, ease: EASE, overwrite: "auto" });
}

void ScrollTrigger;
