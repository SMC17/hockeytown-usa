import Link from "next/link";
import { SiteChrome } from "@/components/chrome";
import { getGraph } from "@/graph/query";
import { record } from "@/lib/format";

export const metadata = { title: "Analyze" };

export default function AnalyzePage() {
  const g = getGraph();
  const divisions = ["Atlantic", "Metropolitan", "Central", "Pacific"] as const;

  return (
    <SiteChrome mode="analyze">
      <div className="kicker">Flagship · Analyze</div>
      <h1>2025-26 standings, as objects.</h1>
      <p className="lede">Snapshot seeded from public season tables. Live feeds replace this in a later ingest phase.</p>
      {divisions.map((div) => {
        const rows = g
          .nhlTeams()
          .filter((t) => t.division === div)
          .map((t) => ({ t, s: g.standingFor(t.id) }))
          .sort((a, b) => (b.s?.pts ?? 0) - (a.s?.pts ?? 0));
        return (
          <section key={div} className="conference">
            <h2>{div}</h2>
            <div className="table-wrap card">
              <table>
                <thead>
                  <tr>
                    <th>Team</th>
                    <th>GP</th>
                    <th>Record</th>
                    <th>PTS</th>
                    <th>GF</th>
                    <th>GA</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map(({ t, s }) => (
                    <tr key={t.id} className={t.focus ? "focus-row" : undefined}>
                      <td>
                        <Link href={`/nhl/${t.slug}`}>{t.name}</Link>
                      </td>
                      <td>{s?.gp ?? "—"}</td>
                      <td>{s ? record(s.w, s.l, s.otl) : "—"}</td>
                      <td>{s?.pts ?? "—"}</td>
                      <td>{s?.gf ?? "—"}</td>
                      <td>{s?.ga ?? "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        );
      })}
    </SiteChrome>
  );
}
