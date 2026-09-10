import Link from "next/link";
import { SiteChrome } from "@/components/chrome";
import { EmptyState } from "@/components/chrome";
import { getGraph } from "@/graph/query";
import type { Commitment, Transfer } from "@/graph/types";

export const metadata = { title: "College" };

export default function CollegePage() {
  const teams = getGraph()
    .teams()
    .filter((t) => t.leagueId === "league:ncaa");
  const commitments = getGraph().ofType<Commitment>("commitment");
  const transfers = getGraph().ofType<Transfer>("transfer");

  return (
    <SiteChrome>
      <div className="kicker">College · stub</div>
      <h1>The pipeline is part of the OS.</h1>
      <p className="lede">
        Hockeytown USA&apos;s Michigan clubs sit on the same graph as NHL rights. Commitments and the transfer portal are
        objects — not a separate product.
      </p>
      <div className="grid cols-3" style={{ marginTop: 24 }}>
        {teams.map((t) => (
          <Link key={t.id} href={`/graph/team/${t.slug}`} className="card">
            <div className="kicker">{t.abbreviation}{t.hometown ? " · hometown" : ""}</div>
            <h3>{t.name}</h3>
            <p className="muted">{t.city}</p>
          </Link>
        ))}
      </div>
      <div className="grid cols-2" style={{ marginTop: 16 }}>
        <div className="card">
          <h2>Commitments</h2>
          {commitments.map((c) => (
            <p key={c.id}>{c.name}</p>
          ))}
        </div>
        <div className="card">
          <h2>Portal</h2>
          {transfers.map((t) => (
            <p key={t.id}>{t.name}</p>
          ))}
          <EmptyState title="Full portal ingest later" body="This stub proves Transfer nodes exist without inventing real movement." />
        </div>
      </div>
    </SiteChrome>
  );
}
