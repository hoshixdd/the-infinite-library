"use client";

import { useMemo, useRef, useEffect, useLayoutEffect, type MutableRefObject } from "react";
import { useFrame, ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";
import {
  ATLAS_COLS,
  ATLAS_COUNT,
  ATLAS_ROWS,
  applyAtlasUVShader,
  createSpineAtlasTexture,
} from "./spineAtlas";

type BookInstance = {
  pos: THREE.Vector3;
  scale: THREE.Vector3;
  rotZ: number;
  atlasIndex: number;
  tint: THREE.Color;
};

function seeded(n: number) {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

function buildBooks(side: "left" | "right", rows: number, cols: number): BookInstance[] {
  const xBase = side === "left" ? -4.15 : 4.15;
  const items: BookInstance[] = [];
  let id = side === "left" ? 1 : 900;
  for (let r = 0; r < rows; r++) {
    let zCursor = -10.5;
    for (let c = 0; c < cols; c++) {
      id += 1;
      const w = 0.14 + seeded(id) * 0.12;
      const h = 0.55 + seeded(id + 3) * 0.5;
      const d = 0.22 + seeded(id + 7) * 0.18;
      const y = -2.15 + r * 1.05 + h / 2;
      const z = zCursor + d / 2;
      zCursor += d + 0.02 + seeded(id + 11) * 0.03;
      items.push({
        pos: new THREE.Vector3(xBase + (side === "left" ? 0.08 : -0.08), y, z),
        scale: new THREE.Vector3(w, h, d),
        rotZ: (seeded(id + 17) - 0.5) * 0.08,
        atlasIndex: Math.floor(seeded(id + 23) * ATLAS_COUNT),
        tint: new THREE.Color(1, 1, 1),
      });
    }
  }
  return items;
}

let sharedAtlas: THREE.CanvasTexture | null = null;
function getSharedAtlas() {
  if (typeof document === "undefined") return null;
  if (!sharedAtlas) sharedAtlas = createSpineAtlasTexture();
  return sharedAtlas;
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
  const highlight = useMemo(() => new THREE.Color("#F0E0B0"), []);
  const prevHover = useRef(-1);
  const prevPulse = useRef(-1);
  const atlas = useMemo(() => getSharedAtlas(), []);
  const material = useMemo(() => {
    const mat = new THREE.MeshStandardMaterial({
      color: "#ffffff", roughness: 0.82, metalness: 0.04,
      emissive: "#000000", emissiveIntensity: 0,
      transparent: false, opacity: 1, depthWrite: true, side: THREE.FrontSide,
    });
    if (atlas) { mat.map = atlas; applyAtlasUVShader(mat, ATLAS_COLS, ATLAS_ROWS); }
    return mat;
  }, [atlas]);

  useLayoutEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const offsets = new Float32Array(books.length);
    books.forEach((b, i) => {
      offsets[i] = b.atlasIndex;
      dummy.position.copy(b.pos);
      dummy.rotation.set(0, 0, b.rotZ);
      dummy.scale.copy(b.scale);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      mesh.setColorAt(i, b.tint);
    });
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    mesh.geometry.setAttribute("aAtlasIndex", new THREE.InstancedBufferAttribute(offsets, 1));
  }, [books, dummy, side]);

  useEffect(() => () => { material.dispose(); }, [material]);

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
      const boost = hovered ? 1.14 : pulsing ? 1 + Math.sin(pulseT.current * 10) * 0.1 : 1;
      dummy.position.copy(b.pos);
      if (hovered || pulsing) dummy.position.x += side === "left" ? 0.1 : -0.1;
      dummy.rotation.set(0, 0, b.rotZ + (hovered ? 0.05 : 0));
      dummy.scale.set(b.scale.x * boost, b.scale.y * boost, b.scale.z * boost);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      tmpColor.set(1, 1, 1);
      if (hovered) tmpColor.lerp(highlight, 0.45);
      else if (pulsing) tmpColor.lerp(highlight, 0.3);
      mesh.setColorAt(i, tmpColor);
    });
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  });

  const x = side === "left" ? -4.35 : 4.35;
  const woodDark = "#3B2A1F";
  const woodMid = "#5C4033";
  const gold = "#A8925A";
  return (
    <group>
      <mesh position={[x, 0.5, -1.5]}><boxGeometry args={[0.4, 7.4, 22]} /><meshStandardMaterial color={woodDark} roughness={0.88} metalness={0.05} /></mesh>
      {Array.from({ length: rows + 1 }).map((_, i) => (
        <mesh key={`shelf-${side}-${i}`} position={[x, -2.2 + i * 1.05, -1.5]}>
          <boxGeometry args={[0.62, 0.08, 21.5]} />
          <meshStandardMaterial color={woodMid} roughness={0.62} metalness={0.08} />
        </mesh>
      ))}
      {Array.from({ length: rows + 1 }).map((_, i) => (
        <mesh key={`lip-${side}-${i}`} position={[x + (side === "left" ? 0.28 : -0.28), -2.16 + i * 1.05, -1.5]}>
          <boxGeometry args={[0.04, 0.03, 21.5]} />
          <meshStandardMaterial color={gold} roughness={0.35} metalness={0.65} />
        </mesh>
      ))}
      {[-10.2, -6.5, -2.8, 0.9, 4.6, 8.2].map((z, i) => (
        <mesh key={`upright-${side}-${i}`} position={[x, 0.5, z]}>
          <boxGeometry args={[0.5, 7.3, 0.22]} />
          <meshStandardMaterial color={woodMid} roughness={0.7} metalness={0.1} />
        </mesh>
      ))}
      <instancedMesh ref={meshRef} args={[undefined, material, books.length]} castShadow={false} receiveShadow
        onPointerMove={(e: ThreeEvent<PointerEvent>) => { e.stopPropagation(); if (e.instanceId != null) onHover(baseIndex + e.instanceId); }}
        onPointerOut={() => onHover(null)}
        onClick={(e: ThreeEvent<MouseEvent>) => { e.stopPropagation(); if (e.instanceId != null) onClick(baseIndex + e.instanceId); }}>
        <boxGeometry args={[1, 1, 1]} />
      </instancedMesh>
    </group>
  );
}
