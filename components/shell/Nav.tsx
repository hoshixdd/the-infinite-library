"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/filipino", label: "Filipino" },
  { href: "/international", label: "World" },
  { href: "/constellation", label: "Constellation" },
  { href: "/archive", label: "Archive" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <nav
      className="touch-nav fixed top-0 left-0 right-0 z-50 flex items-center justify-between gap-3 px-4 py-4 md:px-8"
      style={{
        background:
          "linear-gradient(to bottom, rgba(9,9,9,0.9), rgba(9,9,9,0))",
      }}
    >
      <Link
        href="/"
        className="shrink-0 font-[family-name:var(--font-cormorant)] text-sm tracking-[0.2em] text-[var(--paper)] uppercase md:text-base md:tracking-[0.25em]"
      >
        The Infinite Library
      </Link>
      <ul className="flex max-w-[60%] flex-wrap items-center justify-end gap-x-3 gap-y-2 md:max-w-none md:gap-7">
        {links.map((link) => {
          const active =
            link.href === "/"
              ? pathname === "/"
              : pathname.startsWith(link.href);
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`font-[family-name:var(--font-ibm)] text-[9px] uppercase tracking-[0.18em] transition-colors md:text-xs md:tracking-[0.2em] ${
                  active
                    ? "text-[var(--gold)]"
                    : "text-[var(--paper)]/60 hover:text-[var(--paper)]"
                }`}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
