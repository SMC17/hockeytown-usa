import Link from "next/link";
import { getGraph } from "@/graph/query";

export function HeldFrameworksList() {
  const held = getGraph().heldArticles();

  return (
    <div className="stack" style={{ marginTop: 24 }}>
      {held.map((a) => (
        <div key={a.id} className="card">
          <div className="row" style={{ justifyContent: "space-between" }}>
            <div className="kicker">{a.heroKicker ?? "Framework"}</div>
            <span className="chip missing">held</span>
          </div>
          <h3>{a.name}</h3>
          <p className="muted">{a.dek}</p>
          <p className="row">
            <Link href={`/articles/${a.slug}`}>Public gate</Link>
            <Link href={`/use/held/${a.slug}`}>Desk body</Link>
            <span className="muted">{a.mentions.length} mentions</span>
          </p>
        </div>
      ))}
    </div>
  );
}
