"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { Author } from "@/lib/authors/types";
import { gsap, ScrollTrigger, registerGsapPlugins } from "@/lib/motion/gsap";

const editions = [
  { title: "Noli Me Tángere", author: "José Rizal", color: "#9c442e", mark: "R", slug: "/filipino/jose-rizal" },
  { title: "One Hundred Years of Solitude", author: "Gabriel García Márquez", color: "#656b45", mark: "M", slug: "/international/gabriel-garcia-marquez" },
  { title: "The Fellowship of the Ring", author: "J. R. R. Tolkien", color: "#c2ad7a", mark: "T", slug: "/international/jrr-tolkien" },
];

export function HomeJourney({ authors }: { authors: Author[] }) {
  const root = useRef<HTMLDivElement>(null);
  const [wing, setWing] = useState("all");
  const [query, setQuery] = useState("");
  const [edition, setEdition] = useState(0);
  const selected = editions[edition];
  const filtered = authors.filter(a => (wing === "all" || a.wing === wing) && `${a.name} ${a.works.map(w => w.title).join(" ")}`.toLocaleLowerCase().includes(query.toLocaleLowerCase()));

  useEffect(() => {
    const frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(frame);
  }, [filtered.length]);

  useEffect(() => {
    registerGsapPlugins();
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.from(".hero-line > span", { yPercent: 110, rotate: 3, duration: 1.3, stagger: 0.13, ease: "power4.out" });
        gsap.from(".hero-meta, .hero-description, .hero-bottom", { opacity: 0, y: 20, duration: 1, delay: 0.6, stagger: 0.12 });
        gsap.from(".book-stage", { opacity: 0, y: 70, rotate: -8, duration: 1.6, ease: "power3.out" });
        gsap.to(".book-orbit", { y: -80, rotate: 7, ease: "none", scrollTrigger: { trigger: ".library-hero", start: "top top", end: "bottom top", scrub: 1.2 } });
        gsap.utils.toArray<HTMLElement>("[data-editorial-reveal]").forEach(el => {
          gsap.from(el, { y: 45, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 92%", once: true } });
        });
      }, root);
      return () => ctx.revert();
    });
    return () => media.revert();
  }, []);

  return (
    <div ref={root} className="library-home">
      <section className="library-hero" aria-labelledby="hero-title">
        <div className="hero-meta"><span><i /> An independent literary museum</span><span>Est. in curiosity · Vol. 001</span></div>
        <div className="hero-copy">
          <p className="eyebrow">Twenty voices. Infinite worlds.</p>
          <h1 id="hero-title"><span className="hero-line"><span>A life beyond</span></span><span className="hero-line"><span>the <em>last page.</em></span></span></h1>
          <div className="hero-description"><p>Enter the minds that moved the world.<br />A living collection of literature, imagination,<br className="desktop-break" /> and the people behind the words.</p><a className="round-link" href="#collection"><span>Explore the collection</span><b aria-hidden="true">↗</b></a></div>
        </div>
        <div className="book-stage">
          <div className="orbit-ring orbit-ring-one" /><div className="orbit-ring orbit-ring-two" />
          <span className="stage-coordinate">THE READING ROOM / 001—020</span>
          <div className="book-orbit"><div className="book-shadow" />
            <Link href={selected.slug} className="sculpture-book" key={edition} style={{ "--cover": selected.color } as CSSProperties} aria-label={`Explore ${selected.author}`}>
              <div className="book-pages" /><div className="book-cover"><span className="book-publisher">The Infinite Library<br />Selected voices / {String(edition + 1).padStart(2, "0")}</span><span className="book-title">{selected.title}</span><span className="book-emblem" aria-hidden="true">{selected.mark}</span><span className="book-author">{selected.author}</span><span className="book-edition">LITERARY HERITAGE COLLECTION</span></div>
            </Link>
          </div>
          <div className="edition-selector"><span>On the reading table</span><div>{editions.map((item, i) => <button key={item.mark} onClick={() => setEdition(i)} aria-label={`Show ${item.title}`} aria-pressed={edition === i}>{String(i + 1).padStart(2, "0")}</button>)}</div></div>
        </div>
        <div className="hero-bottom"><a href="#introduction">Scroll to discover <span aria-hidden="true">↓</span></a><span>Philippine roots. A world of stories.</span><span>01 / 04</span></div>
      </section>
      <section className="library-introduction" id="introduction">
        <div className="section-kicker"><span>01 / The idea</span><span>A place for the endlessly curious</span></div>
        <div className="intro-grid"><span className="asterisk" aria-hidden="true">✳</span><div><h2 data-editorial-reveal>Some lives end.<br /><em>Their words don’t.</em></h2><div className="intro-foot" data-editorial-reveal><p>Literature is how we meet people we could never have known. Cross centuries and continents through twenty extraordinary lives—each a doorway into another way of seeing.</p><div className="collection-stats"><span><b>20</b>Remarkable voices</span><span><b>02</b>Connected worlds</span></div></div></div></div>
      </section>
      <section className="collection-section" id="collection">
        <div className="section-kicker"><span>02 / The collection</span><span>Choose a world to get lost in</span></div>
        <div className="collection-heading" data-editorial-reveal><h2>Different roots.<br /><em>Shared humanity.</em></h2><p>From the islands of the Philippines<br />to the far reaches of imagination.</p></div>
        <div className="wing-grid">
          <Link className="wing-panel wing-panel-warm" href="/filipino" data-editorial-reveal><div className="wing-panel-top"><span>Collection I</span><span>10 authors ↗</span></div><div className="wing-art" aria-hidden="true"><span>Mga</span><em>tinig.</em><div className="sun-seal">✳</div></div><div className="wing-panel-bottom"><div><span>Voices of the archipelago</span><h3>Filipino literature</h3></div><b aria-hidden="true">↗</b></div></Link>
          <Link className="wing-panel wing-panel-cool" href="/international" data-editorial-reveal><div className="wing-panel-top"><span>Collection II</span><span>10 authors ↗</span></div><div className="wing-art globe-art" aria-hidden="true"><div className="literary-globe"><i /><i /><i /><i /></div><em>Beyond<br />borders.</em></div><div className="wing-panel-bottom"><div><span>Stories without borders</span><h3>World literature</h3></div><b aria-hidden="true">↗</b></div></Link>
        </div>
      </section>
      <section className="voices-section" id="voices">
        <div className="section-kicker"><span>03 / Meet the minds</span><Link href="/constellation">See how their worlds connect ↗</Link></div>
        <div className="voices-heading"><h2>A name.<br /><em>A whole universe.</em></h2><label className="author-search"><span>Find your next discovery</span><div><input type="search" placeholder="Search authors or works" value={query} onChange={e => setQuery(e.target.value)} /><span aria-hidden="true">↗</span></div></label></div>
        <div className="directory-toolbar"><div className="wing-filters" role="group" aria-label="Filter authors">{[["all", "All voices"], ["filipino", "Filipino"], ["international", "World"]].map(([value, label]) => <button key={value} aria-pressed={wing === value} onClick={() => setWing(value)}>{label}</button>)}</div><span role="status">{String(filtered.length).padStart(2, "0")} voices</span></div>
        <div className="voices-grid">{filtered.map((author, i) => <Link className="voice-card" href={`/${author.wing}/${author.slug}`} key={author.slug}><div className="voice-image"><Image src={author.portrait.src} alt={author.portrait.alt} fill sizes="(max-width: 600px) 45vw, (max-width: 1000px) 30vw, 22vw" /><span className="voice-number">{String(i + 1).padStart(2, "0")}</span><span className="voice-enter" aria-hidden="true">↗</span></div><div className="voice-caption"><h3>{author.name}</h3><span>{author.wing === "filipino" ? "Philippine literature" : "World literature"}</span></div></Link>)}</div>
        {!filtered.length && <div className="empty-voices"><p>No voices found for “{query}”. Try another author or book title.</p><button onClick={() => { setQuery(""); setWing("all"); }}>Reset collection ↗</button></div>}
      </section>
      <section className="library-finale"><div className="section-kicker"><span>04 / The next chapter</span><span>Every ending is an invitation</span></div><div data-editorial-reveal><p>The best stories never really end.</p><h2>Stay <em>curious.</em></h2><Link className="round-link" href="/constellation"><span>Find the connections</span><b aria-hidden="true">↗</b></Link></div><footer><Link href="/">The Infinite Library</Link><span>An independent exploration of literary heritage.</span><Link href="/archive">Sources & credits ↗</Link><a href="#hero-title">Back to top ↑</a></footer></section>
    </div>
  );
}
