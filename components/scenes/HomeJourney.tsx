"use client";

import { useEffect, useRef } from "react";
import { Prologue } from "./Prologue";
import { Entrance } from "./Entrance";
import { Lobby } from "./Lobby";
import { initScrollCamera } from "@/lib/motion/scroll";

export function HomeJourney() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return initScrollCamera(ref.current);
  }, []);

  return (
    <div ref={ref} className="relative z-10">
      <Prologue />
      <Entrance />
      <Lobby />
    </div>
  );
}
