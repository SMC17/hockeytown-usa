import Link from "next/link";
import { SiteChrome } from "@/components/chrome";
import { getGraph } from "@/graph/query";
import type { Injury } from "@/graph/types";
import { record } from "@/lib/format";

export default function NowPage() {
  const g = getGraph();
  const articles = g.publishedArticles().slice(0, 6);
  const focus = g.focusTeams();
  const injuries = g.ofType<Injury>("injury").slice(0, 6);

  return (
    <SiteChrome mode="now">
      <div className="kicker">Flagship · Now</div>
      <h1>What the graph knows tonight.</h1>
      <p className="lede">
        Hockeytown USA is the company. Hockey Graph is the knowledge layer. This flagship is one front end —
        national OS first, hometown texture included.
      </p>
      <div className="grid cols-2" style={{ marginTop: 28 }}>
        <div className="stack">
          {articles.map((a) => (
            <Link key={a.id} href={`/articles/${a.slug}`} className="card">
              <div className="kicker">{a.heroKicker ?? a.section}</div>
              <h3>{a.name}</h3>
              <p className="muted">{a.dek}</p>
            </Link>
          ))}
        </div>
        <div className="stack">
          <div className="card">
            <h2>Focus clubs</h2>
            <div className="stack">
              {focus.map((t) => {
                const s = g.standingFor(t.id);
                return (
                  <div key={t.id} className="row" style={{ justifyContent: "space-between" }}>
                    <Link href={`/nhl/${t.slug}`}>{t.name}</Link>
                    <span className="muted">
                      {s ? `${record(s.w, s.l, s.otl)} · ${s.pts} pts` : "—"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="card">
            <h2>Open injuries</h2>
            {injuries.map((i) => (
              <p key={i.id}>
                <Link href={`/graph/injury/${i.slug}`}>{i.name}</Link>
                <span className="muted"> · {i.status}</span>
              </p>
            ))}
          </div>
        </div>
      </div>
    </SiteChrome>
  );
}
