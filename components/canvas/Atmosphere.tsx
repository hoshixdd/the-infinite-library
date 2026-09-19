"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function Atmosphere() {
  const points = useRef<THREE.Points>(null);
  const count = 800;

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 24;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 16;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 20 - 4;
    }
    geo.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    return geo;
  }, []);

  useFrame(({ clock }) => {
    if (!points.current) return;
    points.current.rotation.y = clock.elapsedTime * 0.02;
    points.current.rotation.x = Math.sin(clock.elapsedTime * 0.05) * 0.05;
  });

  return (
    <>
      <color attach="background" args={["#090909"]} />
      <fog attach="fog" args={["#090909", 8, 28]} />
      <ambientLight intensity={0.25} />
      <pointLight position={[4, 6, 2]} intensity={0.8} color="#A8925A" />
      <pointLight position={[-6, -2, -4]} intensity={0.35} color="#2F4A3C" />
      <points ref={points} geometry={geometry}>
        <pointsMaterial
          size={0.035}
          color="#E8E0D4"
          transparent
          opacity={0.55}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
      <mesh position={[0, -3.5, -6]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#1A1A1A" metalness={0.2} roughness={0.9} />
      </mesh>
    </>
  );
}
