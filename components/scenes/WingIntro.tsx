"use client";
import Link from "next/link";
import type { Wing } from "@/lib/authors/types";
export function WingIntro({ wing }: { wing: Wing }) {
  const warm = wing === "filipino";
  return <section className={`wing-intro ${warm ? 'wing-intro-warm' : 'wing-intro-cool'}`}>
    <div className="section-kicker"><Link href="/">The library / Collections</Link><span>Collection {warm ? 'I' : 'II'} · 10 voices</span></div>
    <div className="wing-intro-copy"><p className="eyebrow">{warm ? 'Voices of the archipelago' : 'Stories without borders'}</p><h1>{warm ? 'Philippine roots.' : 'A world of words.'}<br /><em>Infinite resonance.</em></h1><p>{warm ? 'From revolution to remembrance. Meet the writers who gave a nation its voice—and carried it beyond the islands.' : 'Across continents, centuries, and imagined worlds. Meet the minds that changed what a story could be.'}</p></div>
    <a className="wing-directory-link" href="#wing-directory">Discover the authors ↓</a>
  </section>;
}
