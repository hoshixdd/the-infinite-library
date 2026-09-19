import type { Author, Wing } from "./types";
import filipino from "@/content/authors/filipino.json";
import international from "@/content/authors/international.json";
import transitions from "@/content/transitions.json";
import archive from "@/content/archive.json";

const filipinoAuthors = filipino as Author[];
const internationalAuthors = international as Author[];

export function getAuthorsByWing(wing: Wing): Author[] {
  const list = wing === "filipino" ? filipinoAuthors : internationalAuthors;
  return [...list].sort((a, b) => a.order - b.order);
}

export function getAllAuthors(): Author[] {
  return [...getAuthorsByWing("filipino"), ...getAuthorsByWing("international")];
}

export function getAuthorBySlug(wing: Wing, slug: string): Author | undefined {
  return getAuthorsByWing(wing).find((a) => a.slug === slug);
}

export function getAuthorSlugs(wing: Wing): string[] {
  return getAuthorsByWing(wing).map((a) => a.slug);
}

export function getAdjacentAuthors(wing: Wing, slug: string) {
  const list = getAuthorsByWing(wing);
  const idx = list.findIndex((a) => a.slug === slug);
  if (idx < 0) return { prev: undefined, next: undefined };
  return {
    prev: idx > 0 ? list[idx - 1] : undefined,
    next: idx < list.length - 1 ? list[idx + 1] : undefined,
  };
}

export function getTransition(slug: string) {
  return (
    transitions as Record<
      string,
      { transitionOut: string; description: string; wing: string; name: string }
    >
  )[slug];
}

export function getArchive() {
  return archive as {
    title: string;
    description: string;
    sources: {
      label: string;
      url: string;
      authors: string[];
      wing: string;
    }[];
    portraitCredits?: {
      slug: string;
      name: string;
      src: string;
      credit: string;
      sourceUrl: string;
      treatment: string;
    }[];
    portraitTodos?: { slug: string; name: string; note: string }[];
  };
}

export const wingMeta = {
  filipino: {
    id: "filipino" as const,
    title: "Filipino Literature",
    subtitle: "Ten voices from the archipelago and diaspora",
    accent: "var(--filipino-green)",
  },
  international: {
    id: "international" as const,
    title: "World Literature",
    subtitle: "Ten voices across continents and centuries",
    accent: "var(--gold)",
  },
};
