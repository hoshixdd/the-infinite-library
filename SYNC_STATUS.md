# Sync status (2026-09-19 Asia/Taipei ~13:05)

**Grand arched 3D hall + scroll stability**

## Changes
- Procedural CanvasTexture spine atlas (32 styles) on InstancedMesh books
- Receding wooden arches, gallery rails, ladder, bust pedestal
- Warm museum fog/lights; opaque book materials (no glass spines)
- Scroll: no `filter:brightness` / unstable `clipPath`; light-veil + scale/opacity/y; scrub 0.65; ST refresh
- Refs mood plane: `public/refs/hall-arches.png` (credit: reference mood)

## Book counts
- Desktop: 6×16×2 = 192
- Mobile: 4×9×2 = 72

## Sync Windows
```powershell
cd C:\Users\admin\the-infinite-library
git pull origin main
# keep npm run dev running; soft-refresh browser
```
Or extract `ops/museum-overhaul-sync/grand-hall-fix.tgz`

## GitHub
Pushed to `ken2025mendoza11/the-infinite-library` main.
