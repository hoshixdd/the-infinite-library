"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";

const subscribe = (callback: () => void) => {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
};
const getReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const MuseumCanvas = dynamic(
  () => import("./MuseumCanvas").then((m) => m.MuseumCanvas),
  { ssr: false, loading: () => null }
);

export function MuseumCanvasMount() {
  const pathname = usePathname();
  const reducedMotion = useSyncExternalStore(subscribe, getReducedMotion, () => true);
  if (pathname !== "/constellation" || reducedMotion) return null;
  return <MuseumCanvas />;
}
