import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/article-body";
import { SiteChrome } from "@/components/chrome";
import { EntityChip } from "@/components/entity-chip";
import { entityHref } from "@/graph/ids";
import { getGraph } from "@/graph/query";
import type { Article, GraphNode, NodeType } from "@/graph/types";
import { NODE_TYPES } from "@/graph/types";

export function EntityPage({ type, slug }: { type: NodeType; slug: string }) {
  const g = getGraph();
  const node = g.byTypeSlug(type, slug);
  if (!node) notFound();
  const neighbors = g.neighbors(node.id);
  const articles = g.articlesMentioning(node.id);

  return (
    <SiteChrome>
      <div className="kicker">{node.type}</div>
      <h1>{node.name}</h1>
      {node.summary ? <p className="lede">{node.summary}</p> : null}
      {node.type === "article" ? <ArticleBody body={(node as Article).body} /> : null}
      <div className="grid cols-2" style={{ marginTop: 24 }}>
        <div className="card">
          <h2>Edges</h2>
          {neighbors.length === 0 ? (
            <p className="muted">No edges yet — the node still exists.</p>
          ) : (
            <div className="stack">
              {neighbors.slice(0, 40).map(({ edge, node: n, direction }) => (
                <div key={edge.id + n.id} className="row" style={{ justifyContent: "space-between" }}>
                  <span className="muted">
                    {edge.type} {direction === "out" ? "→" : "←"}
                  </span>
                  <EntityChip node={n} />
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="card">
          <h2>Mentioned in</h2>
          {articles.length === 0 ? (
            <p className="muted">No newsroom mentions yet.</p>
          ) : (
            articles.map((a) => (
              <p key={a.id}>
                <Link href={`/articles/${a.slug}`}>{a.name}</Link>
              </p>
            ))
          )}
          {node.type === "team" && node.leagueId === "league:nhl" ? (
            <p>
              <Link href={entityHref("team", node.slug)}>Open team mini-OS</Link>
            </p>
          ) : null}
        </div>
      </div>
    </SiteChrome>
  );
}

export function isNodeType(value: string): value is NodeType {
  return (NODE_TYPES as readonly string[]).includes(value);
}

export function prettyEntityParams(type: NodeType) {
  return getGraph()
    .ofType<GraphNode>(type)
    .map((n) => ({ slug: n.slug }));
}
