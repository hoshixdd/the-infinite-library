# THE INFINITE LIBRARY

A cinematic Next.js literary museum — **20 authors / 20 voices / one literary journey** — spanning Filipino and world literature. Editorial storytelling, interactive book editions, and searchable portrait galleries connect the collection.

## Run locally

```bash
cd the-infinite-library
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm start       # serve production build
```

## Stack

- **Next.js** (App Router) + TypeScript + Tailwind CSS
- **GSAP** + ScrollTrigger (editorial reveals and reduced-motion support)
- **React Three Fiber** + Drei + Three.js (persistent museum atmosphere)
- Content as JSON under `content/`

## Design tokens

| Token | Value | Role |
|-------|-------|------|
| `--void` | `#090909` | Deep background |
| `--charcoal` | `#1A1A1A` | Panels / surfaces |
| `--paper` | `#E8E0D4` | Body text |
| `--ivory` | `#F4EFE6` | Headings / highlights |
| `--gold` | `#A8925A` | Accents / CTAs |
| `--filipino-brown` | `#3B2A1F` | Filipino wing warmth |
| `--filipino-green` | `#2F4A3C` | Filipino wing accent |
| `--filipino-red` | `#8C2F2F` | Emphasis / fact |

**Fonts (next/font/google):** Cormorant Garamond, Inter, IBM Plex Mono.

## Routes

| Path | Purpose |
|------|---------|
| `/` | Reading table → Introduction → Collections → Searchable voices → Closing |
| `/filipino` | Wing intro + author index |
| `/filipino/[slug]` | Author exhibition: portrait, life, expandable works, voice, legacy, and sources |
| `/international` | Wing intro + author index |
| `/international/[slug]` | Author exhibition: portrait, life, expandable works, voice, legacy, and sources |
| `/constellation` | 20-voice constellation map + closing sequence |
| `/archive` | Research sources + portrait credits |

## Content model

Authors live in:

- `content/authors/filipino.json`
- `content/authors/international.json`

Each author includes: slug, order, names, birth/death (+ bornPlace/diedPlace), nationality, occupation, roles, bio, works (title/year/blurb), significance, fact, quote, visualConcept, motifs, transitionOut, portrait `{src,alt,credit,sourceUrl}`, sources.

Supporting files:

- `content/transitions.json` — slug → wipe concept + description
- `content/archive.json` — unique sources + **portraitCredits**

Loaders: `lib/authors/loaders.ts` + `lib/authors/types.ts`.

## Portrait status

**Shipped:** 20 original illustrative museum-plate SVGs in `public/portraits/{slug}.svg`.

- Each plate is clearly labeled **illustrative / not a photographic likeness**.
- `portrait.credit` + `portrait.sourceUrl` point to Wikimedia Commons categories or institutional pages.
- Wikimedia raster downloads returned HTTP 429 during this build; plates never invent photo credits.
- Living / rights-unclear authors (e.g. Rowling, recent Filipino figures) use silhouette plates only.

See Archive → Portrait credits.

## Research status

- Split birth/death **places** (`bornPlace` / `diedPlace`) for all 20.
- `nationality` + `occupation` clarity added.
- Work blurbs present for every listed work.
- Expanded real `sources[{label,url}]` (Britannica, Nobel, NCCA, NHCP, Folger, Orwell Foundation, etc.).

## Motion / rooms / mobile

- MAX cinematic intent (Alche-class philosophy, original visuals).
- Reduced-motion preferences disable homepage choreography, route curtains, chapter scroll motion, and the WebGL atmosphere.
- GSAP ScrollTrigger: weighted scrub, depth parallax (`data-depth`), magnetic hover on portraits/works/lobby cards.
- Portrait-led author exhibitions with active chapter navigation, expandable works, direct research sources, and a next-author handoff.
- R3F atmosphere is loaded only for the constellation, and skipped under reduced motion.
- Native cursor, visible keyboard focus, skip link, and collapsible mobile navigation.
- Mobile: stacked editorial composition, touch-friendly nav, no custom cursor conflict.
- Tolkien / Rowling / Saint-Exupéry: avoid film, Hogwarts/movie, and copyrighted Little Prince art.

## Constellation + closing

- `/constellation` — interactive 20-star map with affinity bridges.
- Closing statement on home end **and** constellation: *Stories outlive their authors… / THE INFINITE LIBRARY / Explore again*.

## Deploy (Vercel Hobby)

1. Push this repo to GitHub.
2. Import the project in [Vercel](https://vercel.com) (Hobby tier is fine).
3. Framework preset: **Next.js**. Build command `npm run build`, output default.
4. No required env vars.
5. Optional later: replace museum plates with credited PD rasters when Commons allows download.

## Git

`.gitignore` excludes `node_modules`, `.next`, and local env files. Do not commit `node_modules`.
