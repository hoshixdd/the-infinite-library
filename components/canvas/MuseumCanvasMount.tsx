"use client";

import dynamic from "next/dynamic";

const MuseumCanvas = dynamic(
  () => import("./MuseumCanvas").then((m) => m.MuseumCanvas),
  { ssr: false, loading: () => null }
);

export function MuseumCanvasMount() {
  return <MuseumCanvas />;
}
