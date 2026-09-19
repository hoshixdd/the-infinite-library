# THE INFINITE LIBRARY

A cinematic Next.js literary museum — **20 authors / 20 voices / one literary journey** — spanning Filipino and world literature. Scroll acts as the camera; a persistent WebGL atmosphere sits behind editorial galleries.

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
- **GSAP** + ScrollTrigger (scroll-as-camera; no `prefers-reduced-motion` gate)
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
| `/` | Prologue → Entrance → Lobby |
| `/filipino` | Wing intro + author index |
| `/filipino/[slug]` | Author exhibition (chapters A–H) |
| `/international` | Wing intro + author index |
| `/international/[slug]` | Author exhibition (chapters A–H) |
| `/constellation` | Stub connection map |
| `/archive` | Rolled-up research sources + portrait TODOs |

## Content model

Authors live in:

- `content/authors/filipino.json`
- `content/authors/international.json`

Each author includes: slug, order, names, dates, roles, bio, works (title/year/blurb), significance, fact, quote, visualConcept, motifs, transitionOut, portrait, sources.

Supporting files:

- `content/transitions.json` — slug → wipe concept + description
- `content/archive.json` — unique sources + portrait TODO list

Loaders: `lib/authors/loaders.ts` + `lib/authors/types.ts`.

## Portrait TODOs

All authors currently use `/public/portraits/placeholder.svg` (museum silhouette). Before public launch, replace each portrait with a **credited historical image** and update:

- `portrait.src`
- `portrait.credit`
- `portrait.sourceUrl`

See the Archive page for the full TODO rollup.

## Motion / canvas notes

- MAX cinematic intent (Alche-class philosophy, original visuals).
- **No** `prefers-reduced-motion` media query by design.
- GSAP ScrollTrigger drives section reveals; R3F canvas is `pointer-events-none` and fixed behind content.
- Custom spotlight cursor on fine pointers / desktop only; mobile uses editorial stacking and system cursor.
- Tolkien / Rowling / Saint-Exupéry: avoid film, Hogwarts/movie, and copyrighted Little Prince art.

## Deploy (Vercel Hobby)

1. Push this repo to GitHub.
2. Import the project in [Vercel](https://vercel.com) (Hobby tier is fine).
3. Framework preset: **Next.js**. Build command `npm run build`, output default.
4. No required env vars for the scaffold.
5. After first deploy, swap portrait assets and re-deploy.

## Git

`.gitignore` excludes `node_modules`, `.next`, and local env files. Initialize and commit from the project root when ready; do not commit `node_modules`.
