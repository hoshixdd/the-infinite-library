"use client";

import * as THREE from "three";

const WOOD = "#5C4033";
const WOOD_DARK = "#3B2A1F";
const GOLD = "#A8925A";

export function WoodenArch({ z, scale = 1 }: { z: number; scale?: number }) {
  return (
    <group position={[0, 0, z]} scale={[scale, scale, 1]}>
      <mesh position={[-3.55, 0.35, 0]}>
        <boxGeometry args={[0.55, 5.8, 0.48]} />
        <meshStandardMaterial color={WOOD} roughness={0.68} metalness={0.08} />
      </mesh>
      <mesh position={[-3.55, 0.35, 0]}>
        <boxGeometry args={[0.62, 5.9, 0.12]} />
        <meshStandardMaterial color={WOOD_DARK} roughness={0.75} metalness={0.05} />
      </mesh>
      <mesh position={[3.55, 0.35, 0]}>
        <boxGeometry args={[0.55, 5.8, 0.48]} />
        <meshStandardMaterial color={WOOD} roughness={0.68} metalness={0.08} />
      </mesh>
      <mesh position={[3.55, 0.35, 0]}>
        <boxGeometry args={[0.62, 5.9, 0.12]} />
        <meshStandardMaterial color={WOOD_DARK} roughness={0.75} metalness={0.05} />
      </mesh>
      <mesh position={[0, 3.15, 0]} rotation={[0, 0, Math.PI]}>
        <torusGeometry args={[3.55, 0.28, 10, 32, Math.PI]} />
        <meshStandardMaterial color={WOOD} roughness={0.62} metalness={0.1} />
      </mesh>
      <mesh position={[0, 3.15, 0.02]} rotation={[0, 0, Math.PI]}>
        <torusGeometry args={[3.35, 0.06, 8, 28, Math.PI]} />
        <meshStandardMaterial color={GOLD} roughness={0.32} metalness={0.7} />
      </mesh>
      <mesh position={[0, 3.55, 0]}>
        <boxGeometry args={[0.45, 0.55, 0.55]} />
        <meshStandardMaterial color={WOOD_DARK} roughness={0.55} metalness={0.15} />
      </mesh>
      <mesh position={[0, 3.72, 0]}>
        <boxGeometry args={[0.35, 0.12, 0.58]} />
        <meshStandardMaterial color={GOLD} roughness={0.3} metalness={0.75} />
      </mesh>
      <mesh position={[-3.55, 3.2, 0]}>
        <boxGeometry args={[0.72, 0.22, 0.6]} />
        <meshStandardMaterial color={GOLD} roughness={0.4} metalness={0.55} />
      </mesh>
      <mesh position={[3.55, 3.2, 0]}>
        <boxGeometry args={[0.72, 0.22, 0.6]} />
        <meshStandardMaterial color={GOLD} roughness={0.4} metalness={0.55} />
      </mesh>
    </group>
  );
}

export function GalleryRail({ side }: { side: "left" | "right" }) {
  const x = side === "left" ? -3.2 : 3.2;
  return (
    <group>
      <mesh position={[x, 2.05, -1.5]}>
        <boxGeometry args={[0.12, 0.08, 20]} />
        <meshStandardMaterial color={WOOD} roughness={0.55} metalness={0.15} />
      </mesh>
      <mesh position={[x, 2.12, -1.5]}>
        <boxGeometry args={[0.06, 0.04, 20]} />
        <meshStandardMaterial color={GOLD} roughness={0.3} metalness={0.7} />
      </mesh>
      {Array.from({ length: 14 }).map((_, i) => (
        <mesh key={`bal-${side}-${i}`} position={[x, 1.55, -9.5 + i * 1.45]}>
          <cylinderGeometry args={[0.035, 0.04, 1.0, 6]} />
          <meshStandardMaterial color={WOOD_DARK} roughness={0.6} metalness={0.2} />
        </mesh>
      ))}
      <mesh position={[x + (side === "left" ? -0.35 : 0.35), 1.05, -1.5]}>
        <boxGeometry args={[0.9, 0.1, 20]} />
        <meshStandardMaterial color={WOOD} roughness={0.7} metalness={0.08} />
      </mesh>
    </group>
  );
}

export function RollingLadder({ side }: { side: "left" | "right" }) {
  const x = side === "left" ? -3.5 : 3.5;
  const lean = side === "left" ? 0.18 : -0.18;
  return (
    <group position={[x, -0.4, 2.2]} rotation={[0, 0, lean]}>
      <mesh position={[-0.22, 1.2, 0]}>
        <boxGeometry args={[0.06, 3.6, 0.06]} />
        <meshStandardMaterial color={WOOD} roughness={0.65} />
      </mesh>
      <mesh position={[0.22, 1.2, 0]}>
        <boxGeometry args={[0.06, 3.6, 0.06]} />
        <meshStandardMaterial color={WOOD} roughness={0.65} />
      </mesh>
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={`rung-${i}`} position={[0, 0.15 + i * 0.4, 0]}>
          <boxGeometry args={[0.48, 0.05, 0.05]} />
          <meshStandardMaterial color={WOOD_DARK} roughness={0.7} />
        </mesh>
      ))}
    </group>
  );
}
