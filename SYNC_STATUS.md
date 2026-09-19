# Sync status (2026-09-19)

Full item 1–7 implementation lives on the agent box at `/workspace/the-infinite-library` and **builds cleanly** (`npm run build`).

## Pushed to GitHub `main` (via MCP)

- README status sections (portraits / research / motion / constellation)
- lib: types, loaders, gsap scroll magnetic helpers
- Home journey: Prologue, Entrance, Lobby, Closing, HomeJourney
- Shell: Nav, CustomCursor; layout + TransitionWipe + Magnetic
- Constellation page + ClosingSequence + MuseumCanvas (mobile DPR)
- Atmosphere polish; globals.css mobile editorial stack
- AuthorIndex magnetic rows

## Still local-only (need follow-up MCP push)

These are complete on disk but too large / numerous for remaining turn budget:

1. `content/authors/filipino.json` + `international.json` (enriched research + portrait credits)
2. `content/archive.json` (portraitCredits rollup)
3. `components/author/AuthorExhibition.tsx` (A–H rooms, next/prev, motifs)
4. `components/rooms/AuthorRoomMotif.tsx`
5. `components/constellation/ConstellationMap.tsx`
6. `app/archive/page.tsx` (credits UI)
7. `public/portraits/{slug}.svg` × 20 illustrative museum plates

## Portrait rights note

Wikimedia Commons returned HTTP 429 during download. All 20 plates are **original illustrative museum silhouettes** with honest credits + Commons/institutional `sourceUrl` — never claimed as photographs we lack rights to (esp. living authors e.g. Rowling).
