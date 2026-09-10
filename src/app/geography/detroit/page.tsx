import Link from "next/link";
import { SiteChrome } from "@/components/chrome";
import { getGraph } from "@/graph/query";

export const metadata = {
  title: "Detroit · Hockey Map",
  description: "Hockeytown hometown geography stub. No live game video.",
};

export default function DetroitGeographyPage() {
  const g = getGraph();
  const wings = g.teamBySlug("detroit-red-wings");
  const arena = wings?.arenaId ? g.node(wings.arenaId) : undefined;
  const schools = g.collegeTeams().filter((t) => t.hometown);

  return (
    <SiteChrome>
      <div className="kicker">Hockey Map · Detroit</div>
      <h1>Hockeytown is a place object.</h1>
      <p className="lede">
        This is the hometown hero stub — geography, not a recap, and not a stream. Official club sites remain the rights
        holders for game footage.
      </p>
      <div className="grid cols-2" style={{ marginTop: 24 }}>
        <div className="card">
          <div className="kicker">NHL · hometown catalog</div>
          <h2>{wings?.name ?? "Detroit Red Wings"}</h2>
          <p className="muted">
            Coverage is catalog on purpose. National OS first; a regional skin comes later on the same graph.
          </p>
          {wings ? <p><Link href={`/nhl/${wings.slug}`}>Open the Wings mini-OS</Link></p> : null}
          {arena ? (
            <p className="muted">
              Arena: <Link href={`/arenas/${arena.slug}`}>{arena.name}</Link>
            </p>
          ) : null}
        </div>
        <div className="card">
          <div className="kicker">NCAA · hometown</div>
          <h2>Michigan triangle</h2>
          <div className="stack">
            {schools.map((t) => (
              <Link key={t.id} href={`/college/${t.slug}`}>
                {t.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <p className="muted" style={{ marginTop: 16 }}>
        Back to the <Link href="/map">Hockey Map</Link>. Video nodes with rights: none never render a player.
      </p>
    </SiteChrome>
  );
}
