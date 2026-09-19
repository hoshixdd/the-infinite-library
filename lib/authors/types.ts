export type Wing = "filipino" | "international";

export interface Work {
  title: string;
  year?: string;
  blurb: string;
}

export interface Portrait {
  src: string;
  alt: string;
  credit: string;
  sourceUrl: string;
}

export interface AuthorSource {
  label: string;
  url: string;
}

export interface Author {
  slug: string;
  order: number;
  wing: Wing;
  name: string;
  fullName: string;
  birth: string;
  death: string | null;
  roles: string[];
  bio: string;
  works: Work[];
  significance: string;
  fact: string;
  quote: string;
  visualConcept: string;
  motifs: string[];
  transitionOut: string;
  portrait: Portrait;
  sources: AuthorSource[];
  notes?: string[];
}

export interface WingMeta {
  id: Wing;
  title: string;
  subtitle: string;
  accent: string;
}
