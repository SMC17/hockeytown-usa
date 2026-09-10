import Link from "next/link";
import { SiteChrome } from "@/components/chrome";
import { getGraph } from "@/graph/query";
import { teamHref } from "@/graph/ids";

export const metadata = {
  title: "NHL lines",
  description: "Focus-club line combinations from Hockey Graph.",
  alternates: { canonical: "/nhl/lines" },
};

export default function NhlLinesPage() {
  const g = getGraph();
  const focus = g.focusTeams();
  return (
    <SiteChrome>
      <div className="kicker">NHL · Lines</div>
      <h1>Line board</h1>
      <p className="lede">
        PP1, PK1, and even-strength units are seeded on the six focus clubs. Per-club URLs: /nhl/[team]/lines.
      </p>
      <div className="grid cols-3" style={{ marginTop: 24 }}>
        {focus.map((t) => (
          <Link key={t.id} href={`${teamHref(t)}/lines`} className="card">
            <div className="kicker">{t.abbreviation} · {g.linesFor(t.id).length} units</div>
            <h3>{t.name}</h3>
          </Link>
        ))}
      </div>
    </SiteChrome>
  );
}
