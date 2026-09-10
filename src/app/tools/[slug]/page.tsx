import Link from "next/link";
import { notFound } from "next/navigation";
import { EmptyState, SiteChrome } from "@/components/chrome";
import { getGraph, isToolSlug } from "@/graph/query";
import type { Transaction } from "@/graph/types";
import { TOOL_SLUGS } from "@/graph/types";
import { teamHref } from "@/graph/ids";

export function generateStaticParams() {
  return TOOL_SLUGS.map((slug) => ({ slug }));
}

const COPY: Record<string, { name: string; dek: string }> = {
  "transactions-terminal": {
    name: "Transactions Terminal",
    dek: "A feed of Transaction nodes. No live wire yet — the objects and team links are the product.",
  },
  "line-intelligence": {
    name: "Line Intelligence",
    dek: "PP1 / PK1 / even-strength units from the graph. Focus clubs are fully seeded.",
  },
  "org-depth": {
    name: "Org Depth",
    dek: "Prospects plus AHL affiliates plus college rights. Walk the org instead of exporting a list.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return { title: COPY[slug]?.name ?? "Tool" };
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!isToolSlug(slug)) notFound();
  const g = getGraph();
  const copy = COPY[slug];
  const txs = g.ofType<Transaction>("transaction");
  const focus = g.focusTeams();

  return (
    <SiteChrome>
      <div className="kicker">Tools · stub</div>
      <h1>{copy.name}</h1>
      <p className="lede">{copy.dek}</p>
      <p className="muted">
        Read <Link href="/docs/strategy">strategy</Link>, <Link href="/docs/held">HELD policy</Link>, and{" "}
        <Link href="/docs">docs</Link> before treating this as a live operator console.
      </p>
      {slug === "transactions-terminal" ? (
        <div className="stack" style={{ marginTop: 24 }}>
          {txs.length === 0 ? (
            <EmptyState title="No transactions" body="Seed focus clubs carry a few stubs." />
          ) : (
            txs.map((t) => (
              <div key={t.id} className="card">
                <div className="kicker">{t.kind} · {t.date}</div>
                <h3>{t.name}</h3>
              </div>
            ))
          )}
        </div>
      ) : null}
      {slug === "line-intelligence" ? (
        <div className="stack" style={{ marginTop: 24 }}>
          {focus.map((t) => (
            <Link key={t.id} href={`${teamHref(t)}/lines`} className="card">
              <div className="kicker">{t.abbreviation} · {g.linesFor(t.id).length} units</div>
              <h3>{t.name} lines</h3>
            </Link>
          ))}
        </div>
      ) : null}
      {slug === "org-depth" ? (
        <div className="grid cols-2" style={{ marginTop: 24 }}>
          <Link href="/prospects" className="card">
            <h3>Prospect index</h3>
            <p className="muted">{g.allProspects().length} prospect objects</p>
          </Link>
          <Link href="/college" className="card">
            <h3>College hubs</h3>
            <p className="muted">{g.collegeHubs().length} flagship programs</p>
          </Link>
        </div>
      ) : null}
      <EmptyState
        title="Interactive controls later"
        body="Empty interactive is intentional. This route exists so operators have a URL. Queries will bind to the same graph IDs."
      />
    </SiteChrome>
  );
}
