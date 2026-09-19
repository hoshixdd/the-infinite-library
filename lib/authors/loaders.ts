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

export function getTransition(slug: string) {
  return (transitions as Record<string, { transitionOut: string; description: string; wing: string; name: string }>)[slug];
}

export function getArchive() {
  return archive;
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
