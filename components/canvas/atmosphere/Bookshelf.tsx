"use client";

import { useMemo, useRef, useEffect, type MutableRefObject } from "react";
import { useFrame, ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";

const SPINE_COLORS = [
  "#3B2A1F","#2F4A3C","#5C4A32","#8C2F2F","#4A3F2E","#A8925A","#2A2420",
  "#6B5344","#1F2E28","#7A5C3E","#4E342E","#3E4A3A","#6B3A2A","#2C3A4A","#5A4A28",
];

type BookInstance = {
  pos: THREE.Vector3; scale: THREE.Vector3; rotZ: number; color: THREE.Color; foil: boolean;
};

function seeded(n: number) {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

function buildBooks(side: "left" | "right", rows: number, cols: number): BookInstance[] {
  const xBase = side === "left" ? -7.05 : 7.05;
  const items: BookInstance[] = [];
  let id = side === "left" ? 1 : 900;
  for (let r = 0; r < rows; r++) {
    let zCursor = -8.2;
    for (let c = 0; c < cols; c++) {
      id += 1;
      const w = 0.18 + seeded(id) * 0.14;
      const h = 0.5 + seeded(id + 3) * 0.45;
      const d = 0.28 + seeded(id + 7) * 0.22;
      const y = -2.2 + r * 1.15 + h / 2;
      const z = zCursor + d / 2;
      zCursor += d + 0.03 + seeded(id + 11) * 0.04;
      const colorHex = SPINE_COLORS[Math.floor(seeded(id + 23) * SPINE_COLORS.length)];
      items.push({
        pos: new THREE.Vector3(xBase + (side === "left" ? 0.12 : -0.12), y, z),
        scale: new THREE.Vector3(w, h, d),
        rotZ: (seeded(id + 17) - 0.5) * 0.12,
        color: new THREE.Color(colorHex),
        foil: seeded(id + 29) > 0.72,
      });
    }
  }
  return items;
}

export function InstancedBookshelf({
  side, rows, cols, hoverIndex, pulseIndex, pulseT, onHover, onClick, baseIndex,
}: {
  side: "left" | "right"; rows: number; cols: number; hoverIndex: number; pulseIndex: number;
  pulseT: MutableRefObject<number>; onHover: (i: number | null) => void; onClick: (i: number) => void; baseIndex: number;
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const books = useMemo(() => buildBooks(side, rows, cols), [side, rows, cols]);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const tmpColor = useMemo(() => new THREE.Color(), []);
  const highlight = useMemo(() => new THREE.Color("#E8D9A8"), []);
  const foilGold = useMemo(() => new THREE.Color("#C4A86A"), []);
  const prevHover = useRef(-1);
  const prevPulse = useRef(-1);

  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    books.forEach((b, i) => {
      dummy.position.copy(b.pos);
      dummy.rotation.set(0, 0, b.rotZ);
      dummy.scale.copy(b.scale);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      const c = b.color.clone();
      if (b.foil) c.lerp(foilGold, 0.35);
      mesh.setColorAt(i, c);
    });
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [books, dummy, foilGold]);

  useFrame(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const active = hoverIndex >= 0 || pulseIndex >= 0;
    const changed = hoverIndex !== prevHover.current || pulseIndex !== prevPulse.current;
    if (!active && !changed && prevPulse.current < 0) return;
    prevHover.current = hoverIndex;
    prevPulse.current = pulseIndex;
    books.forEach((b, i) => {
      const global = baseIndex + i;
      const hovered = hoverIndex === global;
      const pulsing = pulseIndex === global;
      const boost = hovered ? 1.12 : pulsing ? 1 + Math.sin(pulseT.current * 10) * 0.08 : 1;
      dummy.position.copy(b.pos);
      if (hovered || pulsing) dummy.position.x += side === "left" ? 0.08 : -0.08;
      dummy.rotation.set(0, 0, b.rotZ + (hovered ? 0.04 : 0));
      dummy.scale.set(b.scale.x * boost, b.scale.y * boost, b.scale.z * boost);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      tmpColor.copy(b.color);
      if (b.foil) tmpColor.lerp(foilGold, 0.35);
      if (hovered) tmpColor.lerp(highlight, 0.55);
      else if (pulsing) tmpColor.lerp(highlight, 0.35);
      mesh.setColorAt(i, tmpColor);
    });
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  });

  const x = side === "left" ? -7.2 : 7.2;
  return (
    <group>
      <mesh position={[x, 0.4, -1]}>
        <boxGeometry args={[0.35, 7.2, 18]} />
        <meshStandardMaterial color="#1A1A1A" roughness={0.92} metalness={0.05} />
      </mesh>
      {Array.from({ length: rows + 1 }).map((_, i) => (
        <mesh key={`shelf-${side}-${i}`} position={[x, -2.25 + i * 1.15, -1]}>
          <boxGeometry args={[0.55, 0.09, 17.5]} />
          <meshStandardMaterial color="#3A2E24" roughness={0.7} metalness={0.12} />
        </mesh>
      ))}
      <mesh position={[x, 0.4, -9.5]}><boxGeometry args={[0.5, 7.2, 0.25]} /><meshStandardMaterial color="#2A2420" roughness={0.75} /></mesh>
      <mesh position={[x, 0.4, 7.5]}><boxGeometry args={[0.5, 7.2, 0.25]} /><meshStandardMaterial color="#2A2420" roughness={0.75} /></mesh>
      <instancedMesh
        ref={meshRef}
        args={[undefined, undefined, books.length]}
        onPointerMove={(e: ThreeEvent<PointerEvent>) => { e.stopPropagation(); if (e.instanceId != null) onHover(baseIndex + e.instanceId); }}
        onPointerOut={() => onHover(null)}
        onClick={(e: ThreeEvent<MouseEvent>) => { e.stopPropagation(); if (e.instanceId != null) onClick(baseIndex + e.instanceId); }}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial roughness={0.78} metalness={0.12} emissive="#A8925A" emissiveIntensity={0.06} />
      </instancedMesh>
    </group>
  );
}
