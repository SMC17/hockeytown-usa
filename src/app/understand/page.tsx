import { SiteChrome } from "@/components/chrome";
import Link from "next/link";

export const metadata = { title: "Understand" };

export default function UnderstandPage() {
  return (
    <SiteChrome mode="understand">
      <div className="kicker">Flagship · Understand</div>
      <h1>Context is a graph, not a recap.</h1>
      <p className="lede">
        The atomic unit is a structured hockey object. Articles mention objects. Objects keep edges when the news cycle moves on.
      </p>
      <div className="grid cols-3" style={{ marginTop: 28 }}>
        <div className="card">
          <h3>One newsroom</h3>
          <p className="muted">Copy files against the same Player, Team, Injury, and Contract nodes every front end reads.</p>
        </div>
        <div className="card">
          <h3>One identity</h3>
          <p className="muted">Follow a club once. Later phases share that identity across web, newsletter, and apps.</p>
        </div>
        <div className="card">
          <h3>Many front ends</h3>
          <p className="muted">This NHL flagship, a future Hockeytown regional, college, PWHL — all projections of the graph.</p>
        </div>
      </div>
      <div className="card" style={{ marginTop: 16 }}>
        <h2>Start here</h2>
        <p>
          Read <Link href="/articles/how-hockey-graph-thinks">How Hockey Graph thinks about a roster</Link>, then open a
          focus mini-OS such as the <Link href="/nhl/new-york-islanders">Islanders</Link>.
        </p>
      </div>
    </SiteChrome>
  );
}
