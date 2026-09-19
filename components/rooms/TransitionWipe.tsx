"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap, registerGsapPlugins } from "@/lib/motion/gsap";

type MorphKind = "vortex" | "tunnel" | "iris";

function classifyRoute(path: string): {
  kind: MorphKind;
  label: string;
  sub: string;
  warm: boolean;
} {
  const isAuthor =
    /^\/(filipino|international)\/[^/]+$/.test(path);
  const isFilipino = path.startsWith("/filipino");
  const isIntl = path.startsWith("/international");
  const slug = path.split("/").filter(Boolean).pop() ?? "";

  if (isAuthor) {
    return {
      kind: isFilipino ? "tunnel" : "vortex",
      label: slug.replace(/-/g, " "),
      sub: isFilipino ? "Filipino wing · Gallery bay" : "World wing · Gallery bay",
      warm: isFilipino,
    };
  }
  if (path === "/filipino") {
    return {
      kind: "tunnel",
      label: "Filipino Literature",
      sub: "Crossing into the warm wing",
      warm: true,
    };
  }
  if (path === "/international") {
    return {
      kind: "iris",
      label: "World Literature",
      sub: "Crossing into the cool wing",
      warm: false,
    };
  }
  if (path === "/constellation") {
    return {
      kind: "vortex",
      label: "Constellation",
      sub: "Map of voices",
      warm: false,
    };
  }
  if (path === "/archive") {
    return {
      kind: "iris",
      label: "Archive",
      sub: "Sources & credits",
      warm: true,
    };
  }
  return {
    kind: "iris",
    label: "The Infinite Library",
    sub: "Returning to the lobby",
    warm: true,
  };
}

/**
 * Cinematic vortex / iris / tunnel morph on route change.
 * pointer-events-none for the whole duration so clicks never stick;
 * [data-author-room] remains clickable after the wipe ends.
 */
export function TransitionWipe() {
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const veilRef = useRef<HTMLDivElement>(null);
  const rimRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const tunnelRef = useRef<HTMLDivElement>(null);
  const prevPath = useRef<string | null>(null);
  const busy = useRef(false);

  useEffect(() => {
    registerGsapPlugins();
    const el = overlayRef.current;
    const veil = veilRef.current;
    const rim = rimRef.current;
    const labelEl = labelRef.current;
    const tunnel = tunnelRef.current;
    if (!el || !veil || !rim || !labelEl || !tunnel) return;

    // Skip first mount — no wipe on initial paint
    if (prevPath.current === null) {
      prevPath.current = pathname;
      gsap.set(el, { autoAlpha: 0 });
      return;
    }
    if (prevPath.current === pathname) return;
    prevPath.current = pathname;

    if (busy.current) {
      gsap.killTweensOf([el, veil, rim, labelEl, tunnel]);
    }
    busy.current = true;

    const meta = classifyRoute(pathname);
    const nameNode = labelEl.querySelector("[data-morph-name]");
    const subNode = labelEl.querySelector("[data-morph-sub]");
    if (nameNode) nameNode.textContent = meta.label;
    if (subNode) subNode.textContent = meta.sub;

    const duration = meta.kind === "vortex" ? 1.35 : meta.kind === "tunnel" ? 1.2 : 1.05;
    const easeIn = "power3.inOut";
    const easeOut = "power2.in";

    // Atmosphere tint by wing
    const base =
      meta.warm
        ? "radial-gradient(ellipse at 50% 45%, rgba(59,42,31,0.55) 0%, rgba(12,10,8,0.97) 55%, #090909 100%)"
        : "radial-gradient(ellipse at 50% 45%, rgba(47,74,60,0.15) 0%, rgba(14,18,22,0.96) 50%, #090909 100%)";

    gsap.set(el, { autoAlpha: 1, pointerEvents: "none" });
    gsap.set(veil, {
      background: base,
      clipPath:
        meta.kind === "iris"
          ? "circle(0% at 50% 48%)"
          : meta.kind === "tunnel"
            ? "inset(50% 42% 50% 42% round 40%)"
            : "circle(8% at 50% 50%)",
      scale: meta.kind === "vortex" ? 1.08 : 1.02,
      opacity: 1,
      rotate: 0,
    });
    gsap.set(rim, { opacity: 0, scale: 1.4 });
    gsap.set(labelEl, { opacity: 0, y: 18, scale: 0.94 });
    gsap.set(tunnel, {
      opacity: 0,
      scale: 1.6,
      clipPath: "circle(0% at 50% 50%)",
    });

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(el, { autoAlpha: 0 });
        busy.current = false;
      },
    });

    // Phase 1 — suck / expand veil to cover
    if (meta.kind === "vortex") {
      tl.to(
        veil,
        {
          clipPath: "circle(150% at 50% 48%)",
          scale: 1,
          rotate: -8,
          duration: duration * 0.38,
          ease: easeIn,
        },
        0
      );
      tl.to(
        tunnel,
        {
          opacity: 0.85,
          scale: 1,
          clipPath: "circle(70% at 50% 50%)",
          duration: duration * 0.4,
          ease: "power2.out",
        },
        0.05
      );
    } else if (meta.kind === "tunnel") {
      tl.to(
        veil,
        {
          clipPath: "inset(0% 0% 0% 0% round 0%)",
          scale: 1,
          duration: duration * 0.36,
          ease: easeIn,
        },
        0
      );
      tl.to(
        tunnel,
        {
          opacity: 0.9,
          scale: 1.05,
          clipPath: "circle(55% at 50% 48%)",
          duration: duration * 0.42,
          ease: "power2.out",
        },
        0.04
      );
    } else {
      tl.to(
        veil,
        {
          clipPath: "circle(160% at 50% 48%)",
          scale: 1,
          duration: duration * 0.34,
          ease: easeIn,
        },
        0
      );
    }

    // Gold rim pulse
    tl.to(
      rim,
      { opacity: 0.95, scale: 1, duration: duration * 0.28, ease: "power2.out" },
      0.08
    );

    // Label beat
    tl.to(
      labelEl,
      { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: "power2.out" },
      duration * 0.28
    );

    // Hold briefly with name readable
    tl.to({}, { duration: duration * 0.18 });

    // Phase 2 — suck into center / reveal page
    tl.to(
      labelEl,
      { opacity: 0, y: -12, scale: 1.06, duration: 0.28, ease: easeOut },
      ">-0.05"
    );
    tl.to(
      rim,
      { opacity: 0, scale: 0.55, duration: duration * 0.32, ease: easeOut },
      "<"
    );

    if (meta.kind === "vortex") {
      tl.to(
        tunnel,
        {
          scale: 2.4,
          opacity: 0,
          clipPath: "circle(0% at 50% 48%)",
          duration: duration * 0.38,
          ease: "power3.in",
        },
        "<"
      );
      tl.to(
        veil,
        {
          clipPath: "circle(0% at 50% 48%)",
          scale: 1.15,
          rotate: 12,
          opacity: 0.4,
          duration: duration * 0.4,
          ease: "power3.in",
        },
        "<0.02"
      );
    } else if (meta.kind === "tunnel") {
      tl.to(
        tunnel,
        {
          scale: 2.8,
          opacity: 0,
          clipPath: "circle(0% at 50% 48%)",
          duration: duration * 0.36,
          ease: "power3.in",
        },
        "<"
      );
      tl.to(
        veil,
        {
          clipPath: "inset(48% 48% 48% 48% round 50%)",
          scale: 1.2,
          opacity: 0.35,
          duration: duration * 0.38,
          ease: "power3.in",
        },
        "<0.02"
      );
    } else {
      tl.to(
        veil,
        {
          clipPath: "circle(0% at 50% 48%)",
          scale: 1.12,
          opacity: 0.3,
          duration: duration * 0.36,
          ease: "power3.in",
        },
        "<"
      );
    }

    return () => {
      tl.kill();
    };
  }, [pathname]);

  return (
    <div
      ref={overlayRef}
      className="pointer-events-none fixed inset-0 z-[90] flex items-center justify-center"
      aria-hidden
      style={{ visibility: "hidden" }}
    >
      {/* Archive veil */}
      <div
        ref={veilRef}
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 45%, rgba(26,22,18,0.9) 0%, #0c0a08 55%, #090909 100%)",
        }}
      />

      {/* Arch / vortex rings */}
      <div
        ref={tunnelRef}
        className="absolute inset-0 flex items-center justify-center"
        style={{ opacity: 0 }}
      >
        <div
          className="absolute h-[min(90vw,90vh)] w-[min(90vw,90vh)] rounded-full"
          style={{
            boxShadow:
              "inset 0 0 0 1px rgba(168,146,90,0.35), inset 0 0 80px rgba(9,9,9,0.85), 0 0 60px rgba(168,146,90,0.12)",
            background:
              "radial-gradient(circle at 50% 50%, transparent 42%, rgba(12,10,8,0.55) 68%, rgba(9,9,9,0.92) 100%)",
          }}
        />
        <div
          className="absolute h-[min(62vw,62vh)] w-[min(62vw,62vh)] rounded-full"
          style={{
            boxShadow: "inset 0 0 0 1px rgba(196,176,138,0.22)",
            background:
              "radial-gradient(circle at 50% 42%, rgba(244,239,230,0.04), transparent 55%)",
          }}
        />
        <div
          className="absolute h-[min(34vw,34vh)] w-[min(34vw,34vh)] rounded-full"
          style={{
            boxShadow: "inset 0 0 0 1px rgba(168,146,90,0.4)",
          }}
        />
      </div>

      {/* Gold iris rim */}
      <div
        ref={rimRef}
        className="absolute inset-0"
        style={{
          opacity: 0,
          background:
            "radial-gradient(ellipse at center, transparent 28%, rgba(168,146,90,0.18) 55%, rgba(9,9,9,0.75) 78%, #090909 100%)",
        }}
      />

      {/* Author / destination label */}
      <div
        ref={labelRef}
        className="relative z-10 flex flex-col items-center gap-3 px-6 text-center"
        style={{ opacity: 0 }}
      >
        <span
          data-morph-sub
          className="font-[family-name:var(--font-ibm)] text-[9px] uppercase tracking-[0.45em] text-[var(--gold)]/85"
        >
          Crossing the threshold
        </span>
        <span
          data-morph-name
          className="font-[family-name:var(--font-cormorant)] text-2xl tracking-wide text-[var(--ivory)] md:text-4xl"
        />
        <span className="mt-1 h-px w-20 bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" />
      </div>
    </div>
  );
}
