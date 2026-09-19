"use client";

import { Canvas } from "@react-three/fiber";
import { Component, Suspense, useEffect, useState, type ReactNode } from "react";
import { Atmosphere } from "./Atmosphere";

class CanvasErrorBoundary extends Component<
  { children: ReactNode; onError?: () => void },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    this.props.onError?.();
  }

  render() {
    if (this.state.failed) return null;
    return this.props.children;
  }
}

export function MuseumCanvas() {
  const [mobile, setMobile] = useState(false);
  const [enabled, setEnabled] = useState(true);
  const [home, setHome] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const syncRoute = () => setHome(window.location.pathname === "/");
    syncRoute();
    window.addEventListener("popstate", syncRoute);
    // Next.js client navigations
    const obs = new MutationObserver(syncRoute);
    obs.observe(document.body, { childList: true, subtree: true });
    const id = window.setInterval(syncRoute, 800);
    return () => {
      window.removeEventListener("popstate", syncRoute);
      obs.disconnect();
      window.clearInterval(id);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      className={`fixed inset-0 z-0 ${home ? "pointer-events-auto" : "pointer-events-none"}`}
      aria-hidden
    >
      <CanvasErrorBoundary onError={() => setEnabled(false)}>
        <Canvas
          camera={{
            position: [0, 0.4, mobile ? 11 : 9],
            fov: mobile ? 52 : 48,
            near: 0.1,
            far: 40,
          }}
          dpr={mobile ? [1, 1] : [1, 1.25]}
          gl={{
            antialias: !mobile,
            alpha: true,
            powerPreference: "high-performance",
            failIfMajorPerformanceCaveat: false,
          }}
          style={{
            width: "100%",
            height: "100%",
            opacity: mobile ? 0.55 : 0.95,
          }}
          frameloop="always"
          onCreated={({ gl }) => {
            gl.domElement.style.touchAction = "pan-y";
            gl.domElement.addEventListener("webglcontextlost", (e) => {
              e.preventDefault();
              setEnabled(false);
            });
            // Empty canvas hits would otherwise trap wheel — forward to page scroll
            gl.domElement.addEventListener(
              "wheel",
              (e) => {
                if (e.ctrlKey) return;
                window.scrollBy({ top: e.deltaY, left: e.deltaX, behavior: "auto" });
              },
              { passive: true }
            );
          }}
        >
          <Suspense fallback={null}>
            <Atmosphere mobile={mobile} />
          </Suspense>
        </Canvas>
      </CanvasErrorBoundary>
    </div>
  );
}
