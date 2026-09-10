import Link from "next/link";
import { SiteChrome } from "@/components/chrome";
import { getGraph } from "@/graph/query";
import { teamHref } from "@/graph/ids";

export const metadata = { title: "Watch Guides" };

const WINDOWS = [
  {
    name: "National windows",
    dek: "ESPN, TNT, and Prime split the national map. This page names the fragmentation. It does not host the game.",
  },
  {
    name: "Regional + club",
    dek: "Club apps and regional rights still sit under official partners. Follow the Team object, then the official outlet.",
  },
  {
    name: "What this OS refuses",
    dek: "No ripped streams, no unofficial embeds, no “free links” lists. Video.rights is official, licensed, or none.",
  },
];

export default function WatchPage() {
  const focus = getGraph().focusTeams();

  return (
    <SiteChrome>
      <div className="kicker">Watch Guides · editorial</div>
      <h1>Find the window. Do not steal the feed.</h1>
      <p className="lede">
        Broadcast rights are fragmented across ESPN, TNT, Prime, regionals, and club properties. Hockey Graph stores the
        Team and the Game shell. It does not pirate the picture. Official or licensed only — <code>none</code> never
        renders a player.
      </p>
      <div className="grid cols-3" style={{ marginTop: 24 }}>
        {WINDOWS.map((w) => (
          <div key={w.name} className="card">
            <h3>{w.name}</h3>
            <p className="muted">{w.dek}</p>
          </div>
        ))}
      </div>
      <h2 style={{ marginTop: 28 }}>Focus clubs · schedule shells</h2>
      <p className="muted">These links are mini-OS schedule seats — not live scores, not streams.</p>
      <div className="grid cols-3">
        {focus.map((t) => (
          <Link key={t.id} href={`${teamHref(t)}/schedule`} className="card">
            <div className="kicker">{t.abbreviation}</div>
            <h3>{t.name}</h3>
            <p className="muted">Official window lives off-site. We keep the Game objects.</p>
          </Link>
        ))}
      </div>
      <p className="muted" style={{ marginTop: 16 }}>
        Rights policy: <Link href="/docs/credentials">/docs/credentials</Link> · <Link href="/docs/strategy">strategy</Link>
      </p>
    </SiteChrome>
  );
}
