# Sync status (2026-09-19 Asia/Taipei ~12:50)

**URGENT unblock + interactive InstancedMesh library 3D**

## Pushed to GitHub `main`

| Area | Status |
|------|--------|
| Prologue (no closed clip) | pushed |
| scroll.ts (no blur / prologue readable) | pushed |
| layout (pointer-events + data-scroll-behavior) | pushed |
| MuseumCanvas (ErrorBoundary, dpr, wheel, home pointer-events) | pushed |
| Atmosphere InstancedMesh + Scene/Bookshelf | pushed |
| museum-chrome hit-through / cursor | pushed |

## Box mirror

`/workspace/the-infinite-library` — `npm run build` OK.

## Windows HMR

1. `git pull origin main` in `C:\Users\admin\the-infinite-library` **without killing** `npm run dev`
2. Or extract `ops/museum-overhaul-sync/interactive-3d-fix.tgz` then run `APPLY-INTERACTIVE-3D.ps1`
3. Soft-refresh browser

## How to interact with 3D

- Move mouse: aisle parallax
- Hover book spines (margins around title): highlight / scale
- Click a book: pulse
- Enter the Gallery CTA always clickable
- Empty areas hit canvas; text/buttons stay clickable
