"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function Atmosphere() {
  const points = useRef<THREE.Points>(null);
  const dust = useRef<THREE.Points>(null);
  const count = 1100;
  const dustCount = 200;

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 28;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 18;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 22 - 4;
    }
    geo.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    return geo;
  }, []);

  const dustGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const arr = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 16;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    geo.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    return geo;
  }, []);

  useFrame(({ clock, camera }) => {
    const t = clock.elapsedTime;
    if (points.current) {
      points.current.rotation.y = t * 0.018;
      points.current.rotation.x = Math.sin(t * 0.04) * 0.06;
    }
    if (dust.current) {
      dust.current.rotation.y = -t * 0.01;
      dust.current.position.y = Math.sin(t * 0.2) * 0.15;
    }
    camera.position.x = Math.sin(t * 0.05) * 0.35;
    camera.position.y = Math.cos(t * 0.04) * 0.2;
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <color attach="background" args={["#090909"]} />
      <fog attach="fog" args={["#090909", 7, 30]} />
      <ambientLight intensity={0.22} />
      <pointLight position={[4, 6, 2]} intensity={0.95} color="#A8925A" />
      <pointLight position={[-6, -2, -4]} intensity={0.4} color="#2F4A3C" />
      <pointLight position={[0, 2, 5]} intensity={0.25} color="#8C2F2F" />
      <points ref={points} geometry={geometry}>
        <pointsMaterial
          size={0.032}
          color="#E8E0D4"
          transparent
          opacity={0.55}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
      <points ref={dust} geometry={dustGeo}>
        <pointsMaterial
          size={0.06}
          color="#A8925A"
          transparent
          opacity={0.25}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
      <mesh position={[0, -3.5, -6]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#1A1A1A" metalness={0.25} roughness={0.88} />
      </mesh>
    </>
  );
}
