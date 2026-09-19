# Sync status (2026-09-19 Asia/Taipei ~13:15)

**Grand arched 3D hall + scroll stability**

## On GitHub `main`
- `components/canvas/atmosphere/Scene.tsx` — arches, warm fog, bust, floor, galleries
- `HallArchitecture.tsx` — WoodenArch / GalleryRail / RollingLadder
- `Bookshelf.tsx` + `spineAtlas.ts` — 32-cell procedural spine atlas, opaque InstancedMesh
- `lib/motion/scroll.ts` + `gsap.ts` — light-veil (no filter), no clipPath scrub, scrub 0.65
- `MuseumCanvas.tsx`, `Atmosphere.tsx` re-export, layout

## Still sync via tarball if missing on remote CDN
- `app/globals.css` (scroll-behavior: auto + `[data-light-veil]`)
- `app/museum-chrome.css`
- `public/refs/*` mood references

## Windows HMR (keep `npm run dev` running)
```powershell
cd C:\Users\admin\the-infinite-library
git pull origin main
# OR extract ops\museum-overhaul-sync\grand-hall-fix.tgz then soft-refresh browser
```

## Book counts
Desktop 6×16×2 = 192 · Mobile 4×9×2 = 72
