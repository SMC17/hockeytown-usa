import Link from "next/link";
import type { ReactNode } from "react";
import type { FlagshipMode } from "@/graph/types";

const MODES: { id: FlagshipMode; href: string; label: string; hint: string }[] = [
  { id: "now", href: "/", label: "Now", hint: "Latest objects" },
  { id: "understand", href: "/understand", label: "Understand", hint: "Context" },
  { id: "analyze", href: "/analyze", label: "Analyze", hint: "Numbers" },
  { id: "discover", href: "/discover", label: "Discover", hint: "Search the graph" },
  { id: "follow", href: "/follow", label: "Follow", hint: "Identity" },
  { id: "use", href: "/use", label: "Use", hint: "CMS + API" },
];

export function SiteChrome({
  children,
  mode,
}: {
  children: ReactNode;
  mode?: FlagshipMode;
}) {
  return (
    <div className="shell">
      <header className="masthead">
        <Link href="/" className="brand">
          <div className="wordmark">
            Hockeytown <span>USA</span>
          </div>
          <div className="tagline">Hockey Graph · the operating system for following hockey</div>
        </Link>
        <nav className="mast-nav" aria-label="Primary">
          <Link href="/nhl">NHL</Link>
          <Link href="/college">College</Link>
          <Link href="/pwhl">PWHL</Link>
          <Link href="/articles">Newsroom</Link>
        </nav>
      </header>
      <nav className="mode-nav" aria-label="Flagship modes">
        {MODES.map((m) => (
          <Link key={m.id} href={m.href} className={mode === m.id ? "active" : undefined}>
            <strong>{m.label}</strong>
            <span>{m.hint}</span>
          </Link>
        ))}
      </nav>
      {children}
      <footer className="footer">
        <div>© {new Date().getFullYear()} Hockeytown USA · Hockey Graph phase 0–1</div>
        <div className="row">
          <Link href="/docs">Docs</Link>
          <Link href="/api/graph">Graph API</Link>
        </div>
      </footer>
    </div>
  );
}

export function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="empty">
      <strong>{title}</strong>
      {body}
    </div>
  );
}
