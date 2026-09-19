"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
const links = [{ href: "/filipino", label: "Filipino" }, { href: "/international", label: "World" }, { href: "/constellation", label: "Constellation" }, { href: "/archive", label: "Archive" }];
export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return <header className="library-header" onKeyDown={e => { if (e.key === "Escape") { setOpen(false); e.currentTarget.querySelector<HTMLButtonElement>(".menu-toggle")?.focus(); } }}>
    <Link href="/" className="library-brand" onClick={() => setOpen(false)}><span className="brand-symbol" aria-hidden="true">il.</span><span>The Infinite<br />Library</span></Link>
    <button className="menu-toggle" aria-expanded={open} aria-controls="primary-navigation" onClick={() => setOpen(!open)}>{open ? "Close −" : "Menu +"}</button>
    <nav aria-label="Main navigation" id="primary-navigation" className={open ? "library-navigation is-open" : "library-navigation"}>{links.map(link => <Link key={link.href} href={link.href} aria-current={pathname.startsWith(link.href) ? "page" : undefined} onClick={() => setOpen(false)}>{link.label}</Link>)}<Link href="/#collection" className="nav-explore" onClick={() => setOpen(false)}>Enter the library <span aria-hidden="true">↗</span></Link></nav>
  </header>;
}
