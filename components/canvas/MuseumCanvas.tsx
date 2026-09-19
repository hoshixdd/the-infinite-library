"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import { Atmosphere } from "./Atmosphere";

export function MuseumCanvas() {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
      <Canvas
        camera={{
          position: [0, 0.4, mobile ? 11 : 9],
          fov: mobile ? 52 : 48,
          near: 0.1,
          far: 40,
        }}
        dpr={mobile ? [1, 1.2] : [1, 1.6]}
        gl={{ antialias: !mobile, alpha: true, powerPreference: "high-performance" }}
        style={{ width: "100%", height: "100%", opacity: mobile ? 0.5 : 0.95 }}
      >
        <Suspense fallback={null}>
          <Atmosphere />
        </Suspense>
      </Canvas>
    </div>
  );
}
