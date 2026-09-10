import Link from "next/link";
import { SiteChrome } from "@/components/chrome";
import { getGraph } from "@/graph/query";

export const metadata = { title: "PWHL" };

export default function PwhlPage() {
  const teams = getGraph()
    .teams()
    .filter((t) => t.leagueId === "league:pwhl");

  return (
    <SiteChrome>
      <div className="kicker">PWHL · stub</div>
      <h1>Women&apos;s pro is not a sidecar.</h1>
      <p className="lede">
        Eight 2025-26 clubs, including Seattle Torrent and Vancouver Goldeneyes. Same Team type, same mini-OS future.
      </p>
      <div className="grid cols-4" style={{ marginTop: 24 }}>
        {teams.map((t) => (
          <Link key={t.id} href={`/graph/team/${t.slug}`} className="card">
            <div className="kicker">{t.abbreviation}</div>
            <h3>{t.name}</h3>
            <p className="muted">{t.city}</p>
          </Link>
        ))}
      </div>
    </SiteChrome>
  );
}
