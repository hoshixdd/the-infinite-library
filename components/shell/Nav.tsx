"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/filipino", label: "Filipino" },
  { href: "/international", label: "International" },
  { href: "/archive", label: "Archive" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-4 md:px-8"
      style={{
        background:
          "linear-gradient(to bottom, rgba(9,9,9,0.85), rgba(9,9,9,0))",
      }}
    >
      <Link
        href="/"
        className="font-[family-name:var(--font-cormorant)] text-sm tracking-[0.25em] text-[var(--paper)] uppercase md:text-base"
      >
        The Infinite Library
      </Link>
      <ul className="flex items-center gap-4 md:gap-7">
        {links.map((link) => {
          const active =
            link.href === "/"
              ? pathname === "/"
              : pathname.startsWith(link.href);
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`font-[family-name:var(--font-ibm)] text-[10px] uppercase tracking-[0.2em] transition-colors md:text-xs ${
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
