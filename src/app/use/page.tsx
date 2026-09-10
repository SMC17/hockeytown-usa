import Link from "next/link";
import { SiteChrome } from "@/components/chrome";
import { getGraph } from "@/graph/query";

export const metadata = { title: "Use" };

export default function UsePage() {
  const g = getGraph();
  const stats = g.stats();
  const published = g.publishedArticles();
  const held = g.heldArticles();

  return (
    <SiteChrome mode="use">
      <div className="kicker">Flagship · Use</div>
      <h1>Newsroom CMS on the graph.</h1>
      <p className="lede">
        Articles are nodes. Mentions are edges. The body uses <code>[[player:matthew-schaefer]]</code> tokens that resolve
        into entity pages. Held copy is desk-only until status flips to published.
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
          <div className="kicker">Focus</div>
          <div className="stat">{stats.focusTeams}</div>
        </div>
        <div className="card">
          <div className="kicker">Held</div>
          <div className="stat">{stats.heldArticles}</div>
        </div>
      </div>
      <div className="card" style={{ marginTop: 16 }}>
        <h2>Held queue</h2>
        <p className="muted">Bodies render here. Public article URLs stay gated.</p>
        <div className="stack">
          {held.map((a) => (
            <div key={a.id} className="row" style={{ justifyContent: "space-between" }}>
              <Link href={`/use/held/${a.slug}`}>{a.name}</Link>
              <span className="muted">{a.mentions.length} mentions</span>
            </div>
          ))}
        </div>
      </div>
      <div className="card" style={{ marginTop: 16 }}>
        <h2>Published desk</h2>
        <div className="stack">
          {published.map((a) => (
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
            Published copy: <code>src/graph/seed/content.ts</code>. Held MDX: <code>content/held/</code>. Mentions become{" "}
            <code>mentioned_in</code> edges.
          </p>
        </div>
        <div className="card">
          <h3>Other front ends</h3>
          <p className="muted">
            JSON at <Link href="/api/graph">/api/graph</Link>. Held bodies are stripped from that payload. Vault drop:{" "}
            <Link href="/docs/vault-sync">/docs/vault-sync</Link>.
          </p>
        </div>
      </div>
    </SiteChrome>
  );
}
