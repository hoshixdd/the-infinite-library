"use client";

import { useMemo, useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { InstancedBookshelf } from "./Bookshelf";

function GalleryColumn({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, -0.15, 0]}><cylinderGeometry args={[0.42, 0.48, 0.35, 10]} /><meshStandardMaterial color="#2A2420" roughness={0.7} /></mesh>
      <mesh position={[0, 1.6, 0]}><cylinderGeometry args={[0.28, 0.32, 3.4, 10]} /><meshStandardMaterial color="#3A342C" roughness={0.65} metalness={0.12} /></mesh>
      <mesh position={[0, 3.45, 0]}><cylinderGeometry args={[0.4, 0.3, 0.28, 10]} /><meshStandardMaterial color="#A8925A" roughness={0.55} metalness={0.25} /></mesh>
    </group>
  );
}

function LightShaft({ position, rotation, width = 1.4, height = 8 }: {
  position: [number, number, number]; rotation?: [number, number, number]; width?: number; height?: number;
}) {
  return (
    <mesh position={position} rotation={rotation ?? [-0.35, 0, 0.08]}>
      <planeGeometry args={[width, height]} />
      <meshBasicMaterial color="#A8925A" transparent opacity={0.07} depthWrite={false} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} />
    </mesh>
  );
}

function OpenBookPedestal() {
  const bookRef = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (bookRef.current) bookRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.35) * 0.15;
  });
  return (
    <group position={[0, -2.55, 1.2]}>
      <mesh position={[0, 0.55, 0]}><cylinderGeometry args={[0.55, 0.7, 1.1, 16]} /><meshStandardMaterial color="#2A2420" roughness={0.65} metalness={0.15} /></mesh>
      <mesh position={[0, 1.15, 0]}><cylinderGeometry args={[0.72, 0.72, 0.1, 16]} /><meshStandardMaterial color="#3A342C" roughness={0.55} metalness={0.2} /></mesh>
      <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.35}>
        <group ref={bookRef} position={[0, 1.45, 0]} rotation={[-0.55, 0, 0]}>
          <mesh position={[-0.28, 0.02, 0]} rotation={[0, 0, 0.08]}><boxGeometry args={[0.55, 0.02, 0.7]} /><meshStandardMaterial color="#E8E0D4" roughness={0.9} /></mesh>
          <mesh position={[0.28, 0.02, 0]} rotation={[0, 0, -0.08]}><boxGeometry args={[0.55, 0.02, 0.7]} /><meshStandardMaterial color="#F4EFE6" roughness={0.88} /></mesh>
          <mesh position={[0, -0.02, 0]}><boxGeometry args={[0.12, 0.04, 0.72]} /><meshStandardMaterial color="#5C3A28" roughness={0.6} metalness={0.2} emissive="#A8925A" emissiveIntensity={0.15} /></mesh>
        </group>
      </Float>
      <pointLight position={[0, 2.2, 0.4]} intensity={0.55} color="#C4B08A" distance={6} />
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
  const rows = mobile ? 4 : 5;
  const cols = mobile ? 6 : 14;
  const leftCount = rows * cols;
  const dustCount = mobile ? 60 : 120;

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
  }, [dustCount]);

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
      dust.current.rotation.y = t * 0.012;
      dust.current.rotation.x = Math.sin(t * 0.08) * 0.02;
    }
    if (shafts.current) {
      shafts.current.children.forEach((child, i) => {
        const mat = (child as THREE.Mesh).material as THREE.MeshBasicMaterial;
        if (mat) mat.opacity = 0.05 + Math.sin(t * 0.4 + i) * 0.025;
      });
    }
    const targetX = pointer.current.x * 0.55 + Math.sin(t * 0.04) * 0.12;
    const targetY = 0.35 + pointer.current.y * 0.22 + Math.cos(t * 0.035) * 0.06;
    camera.position.x += (targetX - camera.position.x) * 0.04;
    camera.position.y += (targetY - camera.position.y) * 0.04;
    camera.lookAt(pointer.current.x * 0.4, 0.45 + pointer.current.y * 0.15, -2);
  });

  const onHover = (idx: number | null) => setHoverIndex(idx ?? -1);
  const onClick = (idx: number) => {
    setPulseIndex(idx);
    window.setTimeout(() => setPulseIndex(-1), 700);
  };

  return (
    <>
      <color attach="background" args={["#090909"]} />
      <fog attach="fog" args={["#0C0A08", 6, 24]} />
      <ambientLight intensity={0.2} color="#E8E0D4" />
      <spotLight position={[0, 6.5, 2]} angle={0.55} penumbra={0.7} intensity={1.45} color="#F4EFE6" castShadow={false} />
      <spotLight position={[-3, 5.5, -4]} angle={0.4} penumbra={0.8} intensity={0.75} color="#A8925A" />
      <spotLight position={[3.5, 5.5, -6]} angle={0.35} penumbra={0.85} intensity={0.6} color="#C4B08A" />
      <pointLight position={[0, 2, 4]} intensity={0.35} color="#A8925A" />
      <pointLight position={[-5, 1, -2]} intensity={0.22} color="#2F4A3C" />
      <mesh position={[0, -2.55, -2]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[22, 28]} />
        <meshStandardMaterial color="#1A1612" roughness={0.85} metalness={0.18} />
      </mesh>
      <mesh position={[0, -2.52, -2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.2, 26]} />
        <meshStandardMaterial color="#2A2420" roughness={0.65} metalness={0.25} />
      </mesh>
      <mesh position={[0, -2.51, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.4, 8]} />
        <meshStandardMaterial color="#3A342C" roughness={0.35} metalness={0.45} transparent opacity={0.55} />
      </mesh>
      <mesh position={[0, 0.8, -12]}><boxGeometry args={[16, 7, 0.4]} /><meshStandardMaterial color="#12100E" roughness={0.95} /></mesh>
      <mesh position={[0, 0.6, -11.7]}><boxGeometry args={[3.2, 4.2, 0.2]} /><meshStandardMaterial color="#0A0908" emissive="#A8925A" emissiveIntensity={0.1} roughness={1} /></mesh>
      <mesh position={[0, 4.2, -2]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 26]} />
        <meshStandardMaterial color="#12100E" roughness={0.95} side={THREE.DoubleSide} />
      </mesh>
      <InstancedBookshelf side="left" rows={rows} cols={cols} hoverIndex={hoverIndex} pulseIndex={pulseIndex} pulseT={pulseT} onHover={onHover} onClick={onClick} baseIndex={0} />
      <InstancedBookshelf side="right" rows={rows} cols={cols} hoverIndex={hoverIndex} pulseIndex={pulseIndex} pulseT={pulseT} onHover={onHover} onClick={onClick} baseIndex={leftCount} />
      <GalleryColumn position={[-4.2, -2.4, 1]} />
      <GalleryColumn position={[4.2, -2.4, 1]} />
      <GalleryColumn position={[-4.2, -2.4, -5]} />
      <GalleryColumn position={[4.2, -2.4, -5]} />
      {!mobile && <OpenBookPedestal />}
      <group ref={shafts}>
        <LightShaft position={[-1.2, 2.2, 0]} width={1.6} height={9} />
        <LightShaft position={[1.5, 2.4, -3]} rotation={[-0.4, 0.1, -0.06]} width={1.1} height={8} />
        <LightShaft position={[0.2, 2.0, -7]} rotation={[-0.3, -0.05, 0.04]} width={1.8} height={7} />
      </group>
      <points ref={dust} geometry={dustGeo}>
        <pointsMaterial size={0.045} color="#C4B08A" transparent opacity={0.38} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
      </points>
    </>
  );
}
