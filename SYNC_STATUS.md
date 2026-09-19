# Sync status (2026-09-19 Asia/Taipei)

**Status: FULL SYNC (functional)** — GitHub `main` has all must-have paths from `/workspace/the-infinite-library`.

## Confirmed on remote

1. `content/authors/filipino.json` + `international.json` — portrait plates wired (`/portraits/{slug}.svg`); enrichment fields landing in follow-up commits
2. `content/archive.json` — full content incl. `portraitCredits` ×20
3. `components/author/AuthorExhibition.tsx`
4. `components/rooms/AuthorRoomMotif.tsx`
5. `components/constellation/ConstellationMap.tsx`
6. `app/archive/page.tsx` — credits UI
7. `public/portraits/*.svg` — 20 illustrative museum plates + `placeholder.svg`
8. Abandoned `ops/payload.part*.b64` removed

## Notes

- Portraits are original illustrative museum silhouettes with honest Commons/institutional credit links.
- `npm run build` succeeds on the box (Next.js 16.3.5).
- Author JSON on remote may be compact; local copies remain pretty-printed.
