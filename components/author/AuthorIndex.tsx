"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Author, Wing } from "@/lib/authors/types";
export function AuthorIndex({ authors, wing }: { authors: Author[]; wing: Wing }) {
  const [query, setQuery] = useState("");
  const filtered = authors.filter(a => `${a.name} ${a.works.map(w => w.title).join(' ')}`.toLocaleLowerCase().includes(query.toLocaleLowerCase()));
  return <section className="wing-directory" id="wing-directory">
    <div className="directory-toolbar"><span role="status">{filtered.length} voices in the collection</span><label className="author-search"><span>Search this collection</span><div><input type="search" placeholder="Author or work title" value={query} onChange={e => setQuery(e.target.value)} /></div></label></div>
    <div className="voices-grid">{filtered.map(author => <Link key={author.slug} className="voice-card" href={`/${wing}/${author.slug}`}><div className="voice-image"><Image src={author.portrait.src} alt={author.portrait.alt} fill sizes="(max-width: 700px) 45vw, 22vw" /><span className="voice-number">{String(author.order).padStart(2,'0')}</span><span className="voice-enter" aria-hidden="true">↗</span></div><div className="voice-caption"><h3>{author.name}</h3><span>{author.roles.slice(0,2).join(' / ')}</span></div></Link>)}</div>
    {!filtered.length && <div className="empty-voices"><p>No authors found. Try another name or title.</p><button onClick={() => setQuery('')}>Clear search ↗</button></div>}
    <Link className="round-link" href={wing === 'filipino' ? '/international' : '/filipino'}><span>Explore the {wing === 'filipino' ? 'world' : 'Filipino'} collection</span><b aria-hidden="true">↗</b></Link>
  </section>;
}
