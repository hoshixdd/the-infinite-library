"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/** Warm spine palette — paper, leather, cloth, gold leaf accents */
const SPINE_COLORS = [
  "#3B2A1F",
  "#2F4A3C",
  "#5C4A32",
  "#8C2F2F",
  "#4A3F2E",
  "#A8925A",
  "#2A2420",
  "#6B5344",
  "#1F2E28",
  "#7A5C3E",
];

function BookSpine({
  position,
  size,
  color,
}: {
  position: [number, number, number];
  size: [number, number, number];
  color: string;
}) {
  return (
    <mesh position={position} castShadow={false} receiveShadow={false}>
      <boxGeometry args={size} />
      <meshStandardMaterial
        color={color}
        roughness={0.82}
        metalness={0.08}
        emissive={color}
        emissiveIntensity={0.04}
      />
    </mesh>
  );
}

function BookshelfWall({
  side,
  rows = 5,
  cols = 14,
}: {
  side: "left" | "right";
  rows?: number;
  cols?: number;
}) {
  const x = side === "left" ? -7.2 : 7.2;
  const books = useMemo(() => {
    const items: {
      pos: [number, number, number];
      size: [number, number, number];
      color: string;
    }[] = [];
    for (let r = 0; r < rows; r++) {
      let zCursor = -8;
      for (let c = 0; c < cols; c++) {
        const w = 0.22 + ((r * 7 + c) % 5) * 0.05;
        const h = 0.55 + ((r + c) % 4) * 0.12;
        const d = 0.35 + ((c * 3) % 3) * 0.08;
        const y = -2.2 + r * 1.15 + h / 2;
        const z = zCursor + d / 2;
        zCursor += d + 0.04;
        items.push({
          pos: [x + (side === "left" ? 0.15 : -0.15), y, z],
          size: [w, h, d],
          color: SPINE_COLORS[(r * cols + c) % SPINE_COLORS.length],
        });
      }
    }
    return items;
  }, [side, rows, cols, x]);

  return (
    <group>
      {/* Shelf back panel */}
      <mesh position={[x, 0.4, -1]}>
        <boxGeometry args={[0.35, 7.2, 18]} />
        <meshStandardMaterial color="#1A1A1A" roughness={0.92} metalness={0.05} />
      </mesh>
      {/* Horizontal shelves */}
      {Array.from({ length: rows + 1 }).map((_, i) => (
        <mesh key={`shelf-${i}`} position={[x, -2.25 + i * 1.15, -1]}>
          <boxGeometry args={[0.55, 0.08, 17.5]} />
          <meshStandardMaterial color="#2A2420" roughness={0.75} metalness={0.1} />
        </mesh>
      ))}
      {books.map((b, i) => (
        <BookSpine key={i} position={b.pos} size={b.size} color={b.color} />
      ))}
    </group>
  );
}

function GalleryColumn({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, -0.15, 0]}>
        <cylinderGeometry args={[0.42, 0.48, 0.35, 12]} />
        <meshStandardMaterial color="#2A2420" roughness={0.7} />
      </mesh>
      <mesh position={[0, 1.6, 0]}>
        <cylinderGeometry args={[0.28, 0.32, 3.4, 12]} />
        <meshStandardMaterial color="#3A342C" roughness={0.65} metalness={0.12} />
      </mesh>
      <mesh position={[0, 3.45, 0]}>
        <cylinderGeometry args={[0.4, 0.3, 0.28, 12]} />
        <meshStandardMaterial color="#A8925A" roughness={0.55} metalness={0.25} />
      </mesh>
    </group>
  );
}

function LightShaft({
  position,
  rotation,
  width = 1.4,
  height = 8,
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  width?: number;
  height?: number;
}) {
  return (
    <mesh position={position} rotation={rotation ?? [-0.35, 0, 0.08]}>
      <planeGeometry args={[width, height]} />
      <meshBasicMaterial
        color="#A8925A"
        transparent
        opacity={0.07}
        depthWrite={false}
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

export function Atmosphere() {
  const dust = useRef<THREE.Points>(null);
  const shafts = useRef<THREE.Group>(null);
  const dustCount = 280;

  const dustGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const arr = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 1] = Math.random() * 5 - 1.5;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 16 - 1;
    }
    geo.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    return geo;
  }, []);

  useFrame(({ clock, camera }) => {
    const t = clock.elapsedTime;
    if (dust.current) {
      dust.current.rotation.y = t * 0.012;
      const pos = dust.current.geometry.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < dustCount; i++) {
        const y = pos.getY(i) + Math.sin(t * 0.35 + i) * 0.0008;
        pos.setY(i, y > 4 ? -1.5 : y);
      }
      pos.needsUpdate = true;
    }
    if (shafts.current) {
      shafts.current.children.forEach((child, i) => {
        const mat = (child as THREE.Mesh).material as THREE.MeshBasicMaterial;
        if (mat) mat.opacity = 0.05 + Math.sin(t * 0.4 + i) * 0.025;
      });
    }
    // Slow museum drift — camera floats down the aisle
    camera.position.x = Math.sin(t * 0.04) * 0.28;
    camera.position.y = 0.35 + Math.cos(t * 0.035) * 0.12;
    camera.lookAt(0, 0.5, -2);
  });

  return (
    <>
      <color attach="background" args={["#090909"]} />
      <fog attach="fog" args={["#0C0A08", 6, 24]} />
      <ambientLight intensity={0.18} color="#E8E0D4" />
      {/* Museum ceiling spots */}
      <spotLight
        position={[0, 6.5, 2]}
        angle={0.55}
        penumbra={0.7}
        intensity={1.4}
        color="#F4EFE6"
        castShadow={false}
      />
      <spotLight
        position={[-3, 5.5, -4]}
        angle={0.4}
        penumbra={0.8}
        intensity={0.7}
        color="#A8925A"
      />
      <spotLight
        position={[3.5, 5.5, -6]}
        angle={0.35}
        penumbra={0.85}
        intensity={0.55}
        color="#C4B08A"
      />
      <pointLight position={[0, 2, 4]} intensity={0.35} color="#A8925A" />
      <pointLight position={[-5, 1, -2]} intensity={0.22} color="#2F4A3C" />

      {/* Gallery floor */}
      <mesh position={[0, -2.55, -2]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[22, 28]} />
        <meshStandardMaterial color="#1A1612" roughness={0.88} metalness={0.15} />
      </mesh>
      {/* Floor center runner */}
      <mesh position={[0, -2.52, -2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.2, 26]} />
        <meshStandardMaterial color="#2A2420" roughness={0.7} metalness={0.2} />
      </mesh>

      {/* Far end wall / archive portal */}
      <mesh position={[0, 0.8, -12]}>
        <boxGeometry args={[16, 7, 0.4]} />
        <meshStandardMaterial color="#12100E" roughness={0.95} />
      </mesh>
      {/* Arch opening suggestion */}
      <mesh position={[0, 0.6, -11.7]}>
        <boxGeometry args={[3.2, 4.2, 0.2]} />
        <meshStandardMaterial
          color="#0A0908"
          emissive="#A8925A"
          emissiveIntensity={0.08}
          roughness={1}
        />
      </mesh>

      {/* Ceiling plane */}
      <mesh position={[0, 4.2, -2]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 26]} />
        <meshStandardMaterial color="#12100E" roughness={0.95} side={THREE.DoubleSide} />
      </mesh>

      <BookshelfWall side="left" />
      <BookshelfWall side="right" />

      <GalleryColumn position={[-4.2, -2.4, 1]} />
      <GalleryColumn position={[4.2, -2.4, 1]} />
      <GalleryColumn position={[-4.2, -2.4, -5]} />
      <GalleryColumn position={[4.2, -2.4, -5]} />

      <group ref={shafts}>
        <LightShaft position={[-1.2, 2.2, 0]} width={1.6} height={9} />
        <LightShaft position={[1.5, 2.4, -3]} rotation={[-0.4, 0.1, -0.06]} width={1.1} height={8} />
        <LightShaft position={[0.2, 2.0, -7]} rotation={[-0.3, -0.05, 0.04]} width={1.8} height={7} />
      </group>

      {/* Dust motes in light — warm gold, not starfield */}
      <points ref={dust} geometry={dustGeo}>
        <pointsMaterial
          size={0.045}
          color="#C4B08A"
          transparent
          opacity={0.38}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </>
  );
}
