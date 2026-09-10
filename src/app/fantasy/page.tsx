import Link from "next/link";
import { SiteChrome } from "@/components/chrome";
import { getGraph } from "@/graph/query";

export const metadata = { title: "Fantasy process" };

export default function FantasyPage() {
  const gap = getGraph().byTypeSlug("article", "board-market-gap");
  const gapTitle = gap?.type === "article" ? gap.name : "Board–Market Gap";
  const gapDek =
    gap?.type === "article"
      ? gap.dek
      : "What a board will pay and what a market asks are two nodes.";

  return (
    <SiteChrome>
      <div className="kicker">Fantasy · process hub</div>
      <h1>Process first. No must-draft.</h1>
      <p className="lede">
        This is a literacy desk, not a gambling product. No picks, no “lock him,” no implied edges. Two modules: how a
        board number differs from a market number, and how strength of schedule is a schedule object — not a tip.
      </p>
      <div className="grid cols-2" style={{ marginTop: 24 }}>
        <div className="card">
          <div className="kicker">Module · Board–Market Gap</div>
          <h2>{gapTitle}</h2>
          <p className="muted">
            {gapDek}{" "}
            Status is held. Public consumers get the gate, not a ranking list.
          </p>
          <p className="row">
            <Link href="/articles/board-market-gap">Public gate</Link>
            <Link href="/docs/frameworks">Frameworks desk</Link>
          </p>
        </div>
        <div className="card">
          <div className="kicker">Module · SoS literacy</div>
          <h2>Strength of schedule is a Game list.</h2>
          <p className="muted">
            SoS is remaining <code>Game</code> shells plus snapshot standings — not a betting line and not a reason to
            “stream X tonight.” Read the objects. Do not invent future scores.
          </p>
          <p className="row">
            <Link href="/analyze">Analyze · standings objects</Link>
            <Link href="/nhl/tampa-bay-lightning/schedule">Example schedule shell</Link>
          </p>
        </div>
      </div>
      <div className="card" style={{ marginTop: 16 }}>
        <h3>What this page will not do</h3>
        <ul>
          <li>No must-draft lists, ADP, or “fade him” copy.</li>
          <li>No betting tips, parlays, or implied probabilities.</li>
          <li>No live boxscores. Schedule seats stay scheduled until ingest.</li>
        </ul>
        <p className="muted">
          When Transaction and LineAssignment objects move, <Link href="/tools/transactions">Transactions</Link> and{" "}
          <Link href="/tools/lines">Lines</Link> are the operator surfaces — same IDs, still not advice.
        </p>
      </div>
    </SiteChrome>
  );
}
