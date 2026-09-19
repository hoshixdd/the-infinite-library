"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Author } from "@/lib/authors/types";
import { getAdjacentAuthors } from "@/lib/authors/loaders";
import { gsap, ScrollTrigger, registerGsapPlugins } from "@/lib/motion/gsap";

const chapters = [ ['arrival', 'The author'], ['life', 'Life'], ['works', 'Works'], ['voice', 'Voice'], ['legacy', 'Legacy'] ];

export function AuthorExhibition({ author }: { author: Author }) {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState('arrival');
  const { prev, next } = getAdjacentAuthors(author.wing, author.slug);
  const successor = next ?? prev;
  const warm = author.wing === 'filipino';

  useEffect(() => {
    registerGsapPlugins();
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        gsap.from('.exhibition-title > span', { yPercent: 105, duration: 1.1, ease: 'power4.out' });
        gsap.from('.exhibition-portrait', { clipPath: 'inset(0 0 100% 0)', duration: 1.25, ease: 'power4.inOut' });
        gsap.utils.toArray<HTMLElement>('[data-exhibit-reveal]').forEach(el => {
          gsap.from(el, { y: 35, opacity: 0, duration: .9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
        });
      }, root);
      return () => ctx.revert();
    });
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id); });
    }, { rootMargin: '-20% 0px -55% 0px', threshold: 0 });
    root.current?.querySelectorAll('[data-exhibition-section]').forEach(el => observer.observe(el));
    return () => { media.revert(); observer.disconnect(); };
  }, [author.slug]);

  return <article ref={root} onToggle={() => ScrollTrigger.refresh()} className={`author-exhibition ${warm ? 'exhibition-warm' : 'exhibition-cool'}`}>
    <nav className="chapter-navigation" aria-label="Exhibition chapters"><Link href={`/${author.wing}`} className="chapter-back">← Collection</Link><div>{chapters.map(([id, name]) => <a key={id} href={`#${id}`} aria-current={active === id ? 'location' : undefined}>{name}</a>)}</div><span>{String(author.order).padStart(2,'0')} / 10</span></nav>
    <section id="arrival" data-exhibition-section className="exhibition-arrival">
      <div className="exhibition-identity"><p className="eyebrow">{warm ? 'Philippine literature' : 'World literature'} / Selected voice {String(author.order).padStart(2,'0')}</p><h1 className="exhibition-title"><span>{author.name}</span></h1><p className="exhibition-fullname">{author.fullName}</p><div className="exhibition-roles">{author.roles.map(role => <span key={role}>{role}</span>)}</div><div className="exhibition-dates"><div><span>Born</span><p>{author.birth}</p><small>{author.bornPlace}</small></div><div><span>{author.death ? 'Died' : 'Legacy'}</span><p>{author.death ?? 'Still being written'}</p><small>{author.diedPlace ?? author.nationality}</small></div></div><a href="#life" className="round-link"><span>Discover the life behind the words</span><b aria-hidden="true">↓</b></a></div>
      <figure className="exhibition-portrait"><div><Image src={author.portrait.src} alt={author.portrait.alt} fill priority sizes="(max-width: 700px) 88vw, 42vw" /><span className="portrait-catalogue">IL / {warm ? 'PH' : 'WORLD'} / {String(author.order).padStart(2,'0')}</span></div><figcaption>{author.portrait.credit}{author.portrait.sourceUrl && <a href={author.portrait.sourceUrl} target="_blank" rel="noopener noreferrer">Portrait source ↗</a>}</figcaption></figure>
    </section>
    <section id="life" data-exhibition-section className="exhibition-life"><div className="section-kicker"><span>01 / A life in words</span><span>{author.nationality}</span></div><div className="exhibition-text-grid"><h2 data-exhibit-reveal>Behind<br /><em>the pages.</em></h2><div data-exhibit-reveal><p className="biography-text">{author.bio}</p><span className="exhibition-small-label">{author.occupation ?? author.roles.join(' · ')}</span></div></div></section>
    <section id="works" data-exhibition-section className="exhibition-works"><div className="section-kicker"><span>02 / Selected works</span><span>{author.works.length} ways into a world</span></div><div className="exhibition-section-heading" data-exhibit-reveal><h2>Words that<br /><em>found their way.</em></h2><p>A reading list to begin with.<br />Explore a title to learn more.</p></div><div className="works-shelf">{author.works.map((work, i) => <details key={work.title} className="edition-work" name={`works-${author.slug}`}><summary><span className="work-topline">Selected work / {String(i + 1).padStart(2,'0')} <span>+</span></span><span className="work-cover-title">{work.title}</span><span className="work-cover-year">{work.year ?? 'Selected work'}</span><span className="work-cover-author">{author.name}</span></summary><div className="work-description"><p>{work.blurb}</p></div></details>)}</div></section>
    <section id="voice" data-exhibition-section className="exhibition-voice"><div className="section-kicker"><span>03 / In their words</span><span>A voice that remains</span></div><div data-exhibit-reveal><span className="quote-mark" aria-hidden="true">“</span><blockquote>{author.quote}</blockquote><p>— {author.name}</p></div></section>
    <section id="legacy" data-exhibition-section className="exhibition-legacy"><div className="section-kicker"><span>04 / The enduring influence</span><span>Beyond a lifetime</span></div><div className="exhibition-text-grid"><h2 data-exhibit-reveal>What<br /><em>remains.</em></h2><div data-exhibit-reveal><p className="legacy-text">{author.significance}</p><aside className="exhibition-fact"><span className="eyebrow">A closer look</span><p>{author.fact}</p></aside></div></div><details className="exhibition-sources"><summary>Research & sources <span>{author.sources.length} references +</span></summary><ul>{author.sources.map(source => <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.label}<span aria-hidden="true">↗</span></a></li>)}</ul><Link href="/archive">View the full research archive ↗</Link></details></section>
    <footer className="exhibition-next"><span className="eyebrow">The story continues</span>{successor ? <Link href={`/${author.wing}/${successor.slug}`}><span>{next ? 'Next voice' : 'Revisit the previous voice'}</span><h2>{successor.name} <span aria-hidden="true">↗</span></h2></Link> : <Link href={`/${author.wing}`}>Return to the collection ↗</Link>}<div className="exhibition-footer-links"><Link href={`/${author.wing}`}>← All voices in this collection</Link><Link href="/constellation">Find the connections ↗</Link><a href="#arrival">Back to the beginning ↑</a></div></footer>
  </article>;
}
