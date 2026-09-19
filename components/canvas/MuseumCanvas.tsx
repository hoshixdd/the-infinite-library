"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Atmosphere } from "./Atmosphere";

export function MuseumCanvas() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true }}
        style={{ width: "100%", height: "100%" }}
      >
        <Suspense fallback={null}>
          <Atmosphere />
        </Suspense>
      </Canvas>
    </div>
  );
}
