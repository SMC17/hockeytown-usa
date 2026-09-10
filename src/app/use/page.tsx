import Link from "next/link";
import { SiteChrome } from "@/components/chrome";
import { getGraph } from "@/graph/query";

export const metadata = { title: "Use" };

export default function UsePage() {
  const g = getGraph();
  const stats = g.stats();
  const articles = g.articles();

  return (
    <SiteChrome mode="use">
      <div className="kicker">Flagship · Use</div>
      <h1>Newsroom CMS on the graph.</h1>
      <p className="lede">
        Articles are nodes. Mentions are edges. The body uses <code>[[player:matthew-schaefer]]</code> tokens that resolve
        into entity pages. No pirated video player lives here.
      </p>
      <div className="grid cols-4" style={{ marginTop: 24 }}>
        <div className="card">
          <div className="kicker">Nodes</div>
          <div className="stat">{stats.nodes}</div>
        </div>
        <div className="card">
          <div className="kicker">Edges</div>
          <div className="stat">{stats.edges}</div>
        </div>
        <div className="card">
          <div className="kicker">NHL clubs</div>
          <div className="stat">{stats.nhlTeams}</div>
        </div>
        <div className="card">
          <div className="kicker">Focus</div>
          <div className="stat">{stats.focusTeams}</div>
        </div>
      </div>
      <div className="card" style={{ marginTop: 16 }}>
        <h2>Desk queue</h2>
        <div className="stack">
          {articles.map((a) => (
            <div key={a.id} className="row" style={{ justifyContent: "space-between" }}>
              <Link href={`/articles/${a.slug}`}>{a.name}</Link>
              <span className="muted">
                {a.status} · {a.mentions.length} mentions
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="grid cols-2" style={{ marginTop: 16 }}>
        <div className="card">
          <h3>File an article</h3>
          <p className="muted">
            Phase 1 CMS path is in-repo TypeScript under <code>src/graph/seed/content.ts</code>. Add an{" "}
            <code>article()</code> with mention IDs; the assembler writes <code>mentioned_in</code> edges.
          </p>
        </div>
        <div className="card">
          <h3>Other front ends</h3>
          <p className="muted">
            JSON at <Link href="/api/graph">/api/graph</Link>. Same objects, no second database.
          </p>
        </div>
      </div>
    </SiteChrome>
  );
}
