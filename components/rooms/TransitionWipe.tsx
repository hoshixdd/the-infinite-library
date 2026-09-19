"use client";
import { useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "@/lib/motion/gsap";
export function TransitionWipe() {
  const pathname = usePathname();
  const curtain = useRef<HTMLDivElement>(null);
  const previous = useRef(pathname);
  useLayoutEffect(() => {
    if (previous.current === pathname) return;
    previous.current = pathname;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(curtain.current, { scaleY: 1, autoAlpha: 1 }, { scaleY: 0, duration: 0.8, ease: "power4.inOut", delay: 0.05, onComplete: () => { gsap.set(curtain.current, { autoAlpha: 0 }); } });
    });
    return () => ctx.revert();
  }, [pathname]);
  return <div ref={curtain} className="editorial-curtain" aria-hidden="true"><span>THE INFINITE LIBRARY</span></div>;
}
