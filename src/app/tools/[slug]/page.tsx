import Link from "next/link";
import { notFound } from "next/navigation";
import { EmptyState, SiteChrome } from "@/components/chrome";
import { LinesTerminal, type LineRow } from "@/app/tools/lines-terminal";
import { TransactionsTerminal, type TxRow } from "@/app/tools/transactions-terminal";
import { canonicalToolSlug } from "@/graph/query";
import { getGraph } from "@/graph/query";
import type { Player, Transaction } from "@/graph/types";
import { TOOL_ALIAS_SLUGS, TOOL_SLUGS, type ToolSlug } from "@/graph/types";
import { teamHref } from "@/graph/ids";

export function generateStaticParams() {
  return [...TOOL_SLUGS, ...TOOL_ALIAS_SLUGS].map((slug) => ({ slug }));
}

const COPY: Record<ToolSlug, { name: string; dek: string; types: string }> = {
  transactions: {
    name: "Transactions Terminal",
    dek: "A feed of Transaction nodes. No live wire yet — the objects and team links are the product.",
    types: "Graph types: Transaction, Player, Team. Edges: played_for, contract_with.",
  },
  lines: {
    name: "Line Intelligence",
    dek: "PP1 / PK1 / even-strength units from LineAssignment records. Focus clubs are fully seeded.",
    types: "Graph types: LineAssignment, Player. Edges: member_of_line, linemate_with.",
  },
  "org-depth": {
    name: "Org Depth",
    dek: "Prospects plus AHL affiliates plus college rights. Walk the org instead of exporting a list.",
    types: "Graph types: Prospect, DraftPick, Commitment, Team. Edges: rights_owned_by, affiliate_of, committed_to.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const canonical = canonicalToolSlug(slug);
  return { title: canonical ? COPY[canonical].name : "Tool" };
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const canonical = canonicalToolSlug(slug);
  if (!canonical) notFound();
  const g = getGraph();
  const copy = COPY[canonical];
  const txs = g.ofType<Transaction>("transaction");
  const focus = g.focusTeams();

  return (
    <SiteChrome>
      <div className="kicker">Tools · {canonical === "org-depth" ? "stub" : "MVP shell"} · {canonical}</div>
      <h1>{copy.name}</h1>
      <p className="lede">{copy.dek}</p>
      <p className="muted">{copy.types}</p>
      <p className="muted">
        Filters read seed objects only — no live wire, no invented moves.{" "}
        <Link href="/docs/strategy">strategy</Link> · <Link href="/docs/held">HELD</Link>.
      </p>
      {canonical === "transactions" ? (
        txs.length === 0 ? (
          <EmptyState
            title="No Transaction nodes in this slice"
            body="When ingest lands, this terminal lists Transaction objects (trade, signing, waiver, recall)."
          />
        ) : (
          <TransactionsTerminal
            rows={txs.map((t): TxRow => {
              const teamId = t.toTeamId ?? t.fromTeamId;
              const team = teamId ? g.node(teamId) : undefined;
              return {
                id: t.id,
                slug: t.slug,
                name: t.name,
                kind: t.kind,
                date: t.date,
                notes: t.notes,
                teamSlug: team && team.type === "team" ? team.slug : undefined,
                teamName: team && team.type === "team" ? team.name : undefined,
              };
            })}
          />
        )
      ) : null}
      {canonical === "lines" ? (
        <LinesTerminal
          rows={g.raw.lines.map((line): LineRow => {
            const team = g.require(line.teamId);
            return {
              id: line.id,
              teamSlug: team.slug,
              teamName: team.name,
              teamAbbr: team.type === "team" ? team.abbreviation : team.slug,
              unit: line.unit,
              label: line.label,
              players: line.playerIds
                .map((id) => g.node(id))
                .filter((n): n is Player => n?.type === "player")
                .map((p) => ({ slug: p.slug, name: p.name })),
            };
          })}
        />
      ) : null}
      {canonical === "org-depth" ? (
        <div className="stack" style={{ marginTop: 24 }}>
          <div className="grid cols-2">
            <Link href="/prospects" className="card">
              <div className="kicker">type: prospect</div>
              <h3>Prospect index</h3>
              <p className="muted">{g.allProspects().length} Prospect objects</p>
            </Link>
            <Link href="/college" className="card">
              <div className="kicker">type: commitment / team</div>
              <h3>College hubs</h3>
              <p className="muted">{g.collegeHubs().length} flagship programs</p>
            </Link>
            <Link href="/ahl" className="card">
              <div className="kicker">type: team · affiliate_of</div>
              <h3>AHL affiliates</h3>
              <p className="muted">{g.ahlTeams().length} development clubs</p>
            </Link>
          </div>
          {focus.map((t) => {
            const affiliates = g.affiliatesFor(t.id);
            const prospects = g.prospectsFor(t.id);
            return (
              <div key={t.id} className="card">
                <div className="kicker">{t.abbreviation} · org</div>
                <h3>
                  <Link href={teamHref(t)}>{t.name}</Link>
                </h3>
                {affiliates.length === 0 ? (
                  <p className="muted">No AHL affiliate edge yet.</p>
                ) : (
                  affiliates.map((a) => (
                    <p key={a.id}>
                      AHL: <Link href={teamHref(a)}>{a.name}</Link>
                      <span className="muted"> · {a.city}</span>
                    </p>
                  ))
                )}
                <p className="muted">{prospects.length} Prospect objects · no invented AHL boxscores</p>
              </div>
            );
          })}
          <EmptyState
            title="Depth chart later"
            body="Org Depth walks Prospect, DraftPick, Commitment, rights_owned_by, and affiliate_of. Empty interactive is the honest Phase-1 state."
          />
        </div>
      ) : null}
    </SiteChrome>
  );
}
