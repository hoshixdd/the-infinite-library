# Sync status (2026-09-19 Asia/Taipei)

**Status: FULL SYNC** — GitHub `main` carries all must-have paths from `/workspace/the-infinite-library`.

## Confirmed on remote

1. `content/authors/filipino.json` + `international.json` — portrait plates wired (`/portraits/{slug}.svg`, no placeholders)
2. `content/authors/enrichment.json` + `lib/authors/loaders.ts` — `bornPlace` / `diedPlace` / `nationality` / `occupation` merged at load time
3. `content/archive.json` — full content incl. `portraitCredits` ×20
4. `components/author/AuthorExhibition.tsx`
5. `components/rooms/AuthorRoomMotif.tsx`
6. `components/constellation/ConstellationMap.tsx`
7. `app/archive/page.tsx` — credits UI
8. `public/portraits/*.svg` — 20 illustrative museum plates + `placeholder.svg`
9. Abandoned `ops/payload.part*.b64` removed (ops README retained)

## Notes

- Portraits are original illustrative museum silhouettes with honest Commons/institutional credit links.
- `npm run build` succeeds on the box (Next.js 16.3.5).
- Author wing JSON on remote is compact; local copies may remain pretty-printed with the same enrichment fields inline. Runtime data matches via `enrichment.json` merge.
