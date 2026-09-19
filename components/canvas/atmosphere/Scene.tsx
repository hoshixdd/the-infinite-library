"use client";

import { useMemo, useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { InstancedBookshelf } from "./Bookshelf";
import { WoodenArch, GalleryRail, RollingLadder } from "./HallArchitecture";

const WOOD = "#5C4033";
const WOOD_DARK = "#3B2A1F";
const GOLD = "#A8925A";
const FOG = "#1A120C";

function LightShaft({
  position, rotation, width = 1.4, height = 8,
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
        color="#C4A86A" transparent opacity={0.06} depthWrite={false}
        side={THREE.DoubleSide} blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

function BustPedestal() {
  const bookRef = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (bookRef.current) bookRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.35) * 0.12;
  });
  return (
    <group position={[0, -2.55, -1.5]}>
      <mesh position={[0, 0.45, 0]}>
        <cylinderGeometry args={[0.48, 0.62, 0.9, 16]} />
        <meshStandardMaterial color={WOOD_DARK} roughness={0.6} metalness={0.15} />
      </mesh>
      <mesh position={[0, 0.95, 0]}>
        <cylinderGeometry args={[0.65, 0.65, 0.1, 16]} />
        <meshStandardMaterial color={WOOD} roughness={0.5} metalness={0.2} />
      </mesh>
      <mesh position={[0, 0.98, 0]}>
        <torusGeometry args={[0.55, 0.03, 8, 24]} />
        <meshStandardMaterial color={GOLD} roughness={0.3} metalness={0.7} />
      </mesh>
      <mesh position={[0, 1.35, 0]}>
        <sphereGeometry args={[0.22, 16, 12]} />
        <meshStandardMaterial color="#E8E0D4" roughness={0.55} metalness={0.05} />
      </mesh>
      <mesh position={[0, 1.55, 0.02]}>
        <sphereGeometry args={[0.16, 14, 12]} />
        <meshStandardMaterial color="#F4EFE6" roughness={0.5} />
      </mesh>
      <Float speed={1.1} rotationIntensity={0.1} floatIntensity={0.25}>
        <group ref={bookRef} position={[0.55, 1.15, 0.3]} rotation={[-0.4, 0.3, 0.1]}>
          <mesh>
            <boxGeometry args={[0.35, 0.08, 0.45]} />
            <meshStandardMaterial color="#6B1C1C" roughness={0.7} metalness={0.1} />
          </mesh>
        </group>
      </Float>
      <pointLight position={[0, 2.0, 0.5]} intensity={0.65} color="#E8D4A8" distance={7} />
    </group>
  );
}

function WoodPlankFloor() {
  return (
    <group>
      <mesh position={[0, -2.55, -2]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[14, 30]} />
        <meshStandardMaterial color="#4A3428" roughness={0.78} metalness={0.06} />
      </mesh>
      {Array.from({ length: 9 }).map((_, i) => (
        <mesh key={`plank-${i}`} position={[-3.2 + i * 0.8, -2.545, -2]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.04, 28]} />
          <meshStandardMaterial color="#2A1C14" roughness={0.9} metalness={0.02} />
        </mesh>
      ))}
      <mesh position={[0, -2.54, -2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.8, 28]} />
        <meshStandardMaterial color="#5C4033" roughness={0.55} metalness={0.12} />
      </mesh>
      <mesh position={[0, -2.535, -2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.08, 28]} />
        <meshStandardMaterial color={GOLD} roughness={0.4} metalness={0.5} transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

export function Atmosphere({ mobile = false }: { mobile?: boolean }) {
  const dust = useRef<THREE.Points>(null);
  const shafts = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const [hoverIndex, setHoverIndex] = useState(-1);
  const [pulseIndex, setPulseIndex] = useState(-1);
  const pulseT = useRef(0);

  const rows = mobile ? 4 : 6;
  const cols = mobile ? 9 : 16;
  const leftCount = rows * cols;
  const dustCount = mobile ? 50 : 100;

  const dustGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const arr = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      // Deterministic distribution keeps particles stable across renders.
      arr[i * 3] = (((i * 0.61803398875) % 1) - 0.5) * 10;
      arr[i * 3 + 1] = ((i * 0.41421356237) % 1) * 5 - 1.2;
      arr[i * 3 + 2] = (((i * 0.73205080757) % 1) - 0.5) * 18 - 2;
    }
    geo.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    return geo;
  }, [dustCount]);

  const archZs = useMemo(
    () => (mobile ? [2, -2, -6, -10] : [3.5, 0.5, -2.5, -5.5, -8.5, -11.5]),
    [mobile]
  );

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame(({ clock, camera }) => {
    const t = clock.elapsedTime;
    pulseT.current = t;
    if (dust.current) {
      dust.current.rotation.y = t * 0.01;
      dust.current.rotation.x = Math.sin(t * 0.07) * 0.015;
    }
    if (shafts.current) {
      shafts.current.children.forEach((child, i) => {
        const mat = (child as THREE.Mesh).material as THREE.MeshBasicMaterial;
        if (mat) mat.opacity = 0.04 + Math.sin(t * 0.35 + i) * 0.02;
      });
    }
    const targetX = pointer.current.x * 0.65 + Math.sin(t * 0.04) * 0.1;
    const targetY = 0.55 + pointer.current.y * 0.28 + Math.cos(t * 0.035) * 0.05;
    const targetZ = (mobile ? 10 : 8.2) + pointer.current.y * 0.35;
    camera.position.x += (targetX - camera.position.x) * 0.045;
    camera.position.y += (targetY - camera.position.y) * 0.045;
    camera.position.z += (targetZ - camera.position.z) * 0.03;
    camera.lookAt(pointer.current.x * 0.35, 0.6 + pointer.current.y * 0.12, -4);
  });

  const onHover = (idx: number | null) => setHoverIndex(idx ?? -1);
  const onClick = (idx: number) => {
    setPulseIndex(idx);
    window.setTimeout(() => setPulseIndex(-1), 700);
  };

  return (
    <>
      <color attach="background" args={[FOG]} />
      <fog attach="fog" args={[FOG, 5, 22]} />
      <ambientLight intensity={0.28} color="#F0E6D2" />
      <spotLight position={[0, 5.8, 6]} angle={0.65} penumbra={0.75} intensity={1.55} color="#FFF4E0" castShadow={false} />
      <spotLight position={[0, 6, -8]} angle={0.5} penumbra={0.8} intensity={1.1} color="#E8D4A8" />
      <spotLight position={[-2.5, 5, -3]} angle={0.4} penumbra={0.85} intensity={0.7} color="#C4A86A" />
      <spotLight position={[2.8, 5, -5]} angle={0.38} penumbra={0.85} intensity={0.55} color="#D4B88A" />
      <pointLight position={[0, 2.5, 3]} intensity={0.4} color="#E8D4A8" />
      <pointLight position={[0, 3, -10]} intensity={0.5} color="#A8925A" distance={14} />

      <WoodPlankFloor />

      <mesh position={[0, 4.35, -2]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[14, 28]} />
        <meshStandardMaterial color="#2A2018" roughness={0.92} side={THREE.DoubleSide} />
      </mesh>
      {!mobile && [-4, -1, 2].map((z, i) => (
        <mesh key={`ceil-${i}`} position={[0, 4.2, z]} rotation={[Math.PI / 2, 0, 0]}>
          <planeGeometry args={[5, 2.5]} />
          <meshBasicMaterial color="#C4A86A" transparent opacity={0.04} depthWrite={false} />
        </mesh>
      ))}

      <mesh position={[0, 0.6, -13.2]}>
        <boxGeometry args={[8.5, 6.5, 0.35]} />
        <meshStandardMaterial color={WOOD_DARK} roughness={0.85} />
      </mesh>
      <mesh position={[0, 0.6, -13.0]}>
        <boxGeometry args={[7.8, 5.8, 0.15]} />
        <meshStandardMaterial color="#4A3020" roughness={0.75} metalness={0.05} />
      </mesh>

      {archZs.map((z, i) => (
        <WoodenArch key={`arch-${i}`} z={z} scale={1 - i * 0.01} />
      ))}

      <InstancedBookshelf side="left" rows={rows} cols={cols} hoverIndex={hoverIndex} pulseIndex={pulseIndex} pulseT={pulseT} onHover={onHover} onClick={onClick} baseIndex={0} />
      <InstancedBookshelf side="right" rows={rows} cols={cols} hoverIndex={hoverIndex} pulseIndex={pulseIndex} pulseT={pulseT} onHover={onHover} onClick={onClick} baseIndex={leftCount} />

      {!mobile && (
        <>
          <GalleryRail side="left" />
          <GalleryRail side="right" />
          <RollingLadder side="left" />
          <BustPedestal />
        </>
      )}

      <group ref={shafts}>
        <LightShaft position={[-0.8, 2.4, 1]} width={1.5} height={9} />
        <LightShaft position={[1.2, 2.5, -3]} rotation={[-0.4, 0.08, -0.05]} width={1.2} height={8} />
        <LightShaft position={[0.1, 2.2, -7]} rotation={[-0.3, -0.04, 0.03]} width={1.6} height={7} />
      </group>

      <points ref={dust} geometry={dustGeo}>
        <pointsMaterial size={0.04} color="#D4C09A" transparent opacity={0.32} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
      </points>
    </>
  );
}
