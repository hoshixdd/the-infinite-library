"use client";

import * as THREE from "three";

/** Atlas grid: 8 cols x 4 rows = 32 spine styles */
export const ATLAS_COLS = 8;
export const ATLAS_ROWS = 4;
export const ATLAS_COUNT = ATLAS_COLS * ATLAS_ROWS;

const SPINE_BASES = [
  "#E8DCC8",
  "#6B1C1C",
  "#1A2238",
  "#1B3022",
  "#A67C52",
  "#3B2A1F",
  "#5C4033",
  "#4A3728",
  "#2C3A4A",
  "#6B3A2A",
  "#8B6914",
  "#2F4A3C",
  "#7A5C3E",
  "#4E342E",
  "#C4A882",
  "#5A2A32",
];

function hash(n: number) {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  const n = parseInt(h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function mix(
  a: [number, number, number],
  b: [number, number, number],
  t: number
): [number, number, number] {
  return [
    Math.round(a[0] + (b[0] - a[0]) * t),
    Math.round(a[1] + (b[1] - a[1]) * t),
    Math.round(a[2] + (b[2] - a[2]) * t),
  ];
}

/** Procedural leather/cloth spine atlas */
export function createSpineAtlasTexture(): THREE.CanvasTexture {
  const cellW = 64;
  const cellH = 256;
  const canvas = document.createElement("canvas");
  canvas.width = ATLAS_COLS * cellW;
  canvas.height = ATLAS_ROWS * cellH;
  const ctx = canvas.getContext("2d")!;

  for (let i = 0; i < ATLAS_COUNT; i++) {
    const col = i % ATLAS_COLS;
    const row = Math.floor(i / ATLAS_COLS);
    const x0 = col * cellW;
    const y0 = row * cellH;
    const base = SPINE_BASES[Math.floor(hash(i + 1) * SPINE_BASES.length)];
    const [br, bg, bb] = hexToRgb(base);

    ctx.fillStyle = `rgb(${br},${bg},${bb})`;
    ctx.fillRect(x0, y0, cellW, cellH);

    const img = ctx.getImageData(x0, y0, cellW, cellH);
    const data = img.data;
    for (let py = 0; py < cellH; py++) {
      for (let px = 0; px < cellW; px++) {
        const idx = (py * cellW + px) * 4;
        const n =
          (hash(i * 97 + px * 13 + py * 7) - 0.5) * 28 +
          (hash(i * 31 + px * 3 + py * 17) - 0.5) * 12;
        const grain = (hash(i * 5 + px * 41) - 0.5) * 18;
        data[idx] = Math.max(0, Math.min(255, data[idx] + n + grain));
        data[idx + 1] = Math.max(0, Math.min(255, data[idx + 1] + n * 0.9 + grain * 0.7));
        data[idx + 2] = Math.max(0, Math.min(255, data[idx + 2] + n * 0.75 + grain * 0.5));
      }
    }
    ctx.putImageData(img, x0, y0);

    const edgeGrad = ctx.createLinearGradient(x0, y0, x0 + cellW, y0);
    edgeGrad.addColorStop(0, "rgba(0,0,0,0.35)");
    edgeGrad.addColorStop(0.12, "rgba(0,0,0,0)");
    edgeGrad.addColorStop(0.88, "rgba(0,0,0,0)");
    edgeGrad.addColorStop(1, "rgba(0,0,0,0.4)");
    ctx.fillStyle = edgeGrad;
    ctx.fillRect(x0, y0, cellW, cellH);

    const bandCount = 2 + Math.floor(hash(i + 40) * 3);
    for (let b = 0; b < bandCount; b++) {
      const by = y0 + 28 + b * ((cellH - 56) / Math.max(1, bandCount - 0.5));
      ctx.fillStyle = `rgba(0,0,0,${0.18 + hash(i + b) * 0.12})`;
      ctx.fillRect(x0 + 4, by - 3, cellW - 8, 6);
      if (hash(i + b + 90) > 0.35) {
        const gold = mix([168, 146, 90], [212, 185, 110], hash(i + b + 3));
        ctx.fillStyle = `rgba(${gold[0]},${gold[1]},${gold[2]},${0.55 + hash(i + b) * 0.35})`;
        ctx.fillRect(x0 + 6, by - 1.5, cellW - 12, 2.5);
      }
    }

    const titleY = y0 + cellH * (0.35 + hash(i + 55) * 0.2);
    const lineCount = 2 + Math.floor(hash(i + 66) * 3);
    const goldInk = hash(i + 70) > 0.4;
    for (let L = 0; L < lineCount; L++) {
      const lw = cellW * (0.35 + hash(i + L + 80) * 0.4);
      const lx = x0 + (cellW - lw) / 2;
      ctx.fillStyle = goldInk
        ? `rgba(200,170,90,${0.45 + hash(i + L) * 0.35})`
        : `rgba(240,230,210,${0.25 + hash(i + L) * 0.25})`;
      ctx.fillRect(lx, titleY + L * 7, lw, 2.2);
    }

    if (hash(i + 100) > 0.55) {
      const ly = y0 + cellH * 0.72;
      ctx.fillStyle = `rgba(232,220,190,${0.5 + hash(i) * 0.3})`;
      ctx.fillRect(x0 + 10, ly, cellW - 20, 18);
      ctx.strokeStyle = "rgba(120,90,40,0.5)";
      ctx.lineWidth = 1;
      ctx.strokeRect(x0 + 10, ly, cellW - 20, 18);
      ctx.fillStyle = "rgba(60,40,20,0.55)";
      ctx.fillRect(x0 + 14, ly + 6, cellW - 28, 2);
      ctx.fillRect(x0 + 18, ly + 11, cellW - 36, 1.5);
    }

    ctx.fillStyle = `rgba(${Math.min(255, br + 40)},${Math.min(255, bg + 30)},${Math.min(255, bb + 20)},0.7)`;
    ctx.fillRect(x0 + 2, y0 + 2, cellW - 4, 5);
    ctx.fillRect(x0 + 2, y0 + cellH - 7, cellW - 4, 5);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.magFilter = THREE.LinearFilter;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.generateMipmaps = true;
  tex.needsUpdate = true;
  return tex;
}

export function applyAtlasUVShader(
  material: THREE.MeshStandardMaterial,
  cols: number,
  rows: number
) {
  material.onBeforeCompile = (shader) => {
    shader.uniforms.uAtlasCols = { value: cols };
    shader.uniforms.uAtlasRows = { value: rows };
    shader.vertexShader = shader.vertexShader
      .replace(
        "#include <common>",
        `#include <common>\nattribute float aAtlasIndex;\nvarying float vAtlasIndex;\nvarying vec3 vLocalNormal;`
      )
      .replace(
        "#include <begin_vertex>",
        `#include <begin_vertex>\nvAtlasIndex = aAtlasIndex;\nvLocalNormal = normalize(normal);`
      );
    shader.fragmentShader = shader.fragmentShader
      .replace(
        "#include <common>",
        `#include <common>\nuniform float uAtlasCols;\nuniform float uAtlasRows;\nvarying float vAtlasIndex;\nvarying vec3 vLocalNormal;`
      )
      .replace(
        "#include <map_fragment>",
        `\n#ifdef USE_MAP\n  float idx = floor(vAtlasIndex + 0.1);\n  float col = mod(idx, uAtlasCols);\n  float row = floor(idx / uAtlasCols);\n  float spineFace = step(0.55, abs(vLocalNormal.x));\n  vec2 cell = vec2(1.0 / uAtlasCols, 1.0 / uAtlasRows);\n  vec2 local = vMapUv;\n  vec2 cellUV = vec2((col + fract(local.x)) * cell.x, (row + (1.0 - fract(local.y))) * cell.y);\n  vec2 boardUV = vec2((col + 0.5) * cell.x, (row + 0.92) * cell.y);\n  vec4 sampledMap = texture2D(map, mix(boardUV, cellUV, spineFace));\n  diffuseColor *= sampledMap;\n#endif\n`
      );
  };
  material.customProgramCacheKey = () => `spine-atlas-${cols}x${rows}`;
}
