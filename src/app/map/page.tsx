import Link from "next/link";
import { SiteChrome } from "@/components/chrome";
import { getGraph } from "@/graph/query";

export const metadata = {
  title: "Hockey Map",
  description: "Geography as graph objects — hometown texture, not a broadcast.",
};

export default function MapPage() {
  const g = getGraph();
  const wings = g.teamBySlug("detroit-red-wings");
  const michigan = g.collegeTeams().filter((t) => t.hometown);

  return (
    <SiteChrome>
      <div className="kicker">Hockey Map · stub</div>
      <h1>Place is an object too.</h1>
      <p className="lede">
        Hockey Map is a geography layer on Hockey Graph — arenas, cities, hometown clubs — not a live look-in. There is no
        NHL rights footage here and there will not be until an official or licensed Video node says so.
      </p>
      <div className="map-board" style={{ marginTop: 24 }}>
        <Link href="/geography/detroit" className="map-hero card">
          <div className="kicker">Hometown hero</div>
          <h2>Detroit</h2>
          <p className="muted">
            Hockeytown USA texture: {wings?.name}, Little Caesars Arena, and the Michigan college triangle. Open the
            geography stub.
          </p>
        </Link>
        <div className="card">
          <h3>Michigan college triangle</h3>
          <div className="stack">
            {michigan.map((t) => (
              <Link key={t.id} href={`/college/${t.slug}`}>
                {t.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="card">
          <h3>National OS</h3>
          <p className="muted">
            The map does not make the product regional-only. Detroit is a front. The graph stays national — NHL, NCAA,
            PWHL.
          </p>
          <p>
            <Link href="/nhl">NHL clubs</Link> · <Link href="/pwhl">PWHL</Link> · <Link href="/college">College hubs</Link>
          </p>
        </div>
      </div>
    </SiteChrome>
  );
}
