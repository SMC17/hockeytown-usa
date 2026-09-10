import Link from "next/link";
import { notFound } from "next/navigation";
import { EmptyState, SiteChrome } from "@/components/chrome";
import { ProgramHero } from "@/components/program-hero";
import { teamHref } from "@/graph/ids";
import { getGraph } from "@/graph/query";

export function generateStaticParams() {
  return getGraph()
    .ahlTeams()
    .map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const team = getGraph().teamBySlug(slug);
  return { title: team?.name ?? "AHL" };
}

export default async function AhlClubPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const g = getGraph();
  const team = g.teamBySlug(slug);
  if (!team || team.leagueId !== "league:ahl") notFound();
  const parent = g.nhlParentFor(team.id);
  const roster = g.rosterFor(team.id);
  const games = g.gamesFor(team.id);

  return (
    <SiteChrome>
      <ProgramHero team={team} section="latest" leagueLabel="AHL" />
      <div className="grid cols-2">
        <div className="stack">
          <div className="card">
            <div className="kicker">affiliate_of</div>
            <h2>NHL parent</h2>
            {parent ? (
              <>
                <p>
                  <Link href={teamHref(parent)}>{parent.name}</Link>
                </p>
                <p className="row">
                  <Link href={`${teamHref(parent)}/prospects`}>Prospects</Link>
                  <Link href="/tools/org-depth">Org Depth</Link>
                </p>
              </>
            ) : (
              <p className="muted">No parent edge yet.</p>
            )}
          </div>
          <div className="card">
            <h3>Roster</h3>
            {roster.length === 0 ? (
              <p className="muted">Empty on purpose. Recalls and assignments will hang on Player IDs — no invented AHL stats.</p>
            ) : (
              roster.map((p) => (
                <p key={p.id}>
                  <Link href={`/players/${p.slug}`}>{p.name}</Link>
                </p>
              ))
            )}
          </div>
        </div>
        <div className="stack">
          <div className="card">
            <h3>Schedule</h3>
            {games.length === 0 ? (
              <EmptyState
                title="No AHL boxscores"
                body="Game nodes can exist as scheduled shells. This page will not invent live scores."
              />
            ) : (
              games.map((game) => (
                <p key={game.id}>
                  <Link href={`/games/${game.slug}`}>{game.name}</Link>
                  <span className="muted"> · {game.status}</span>
                </p>
              ))
            )}
          </div>
          <p className="muted">
            Graph node: <Link href={`/graph/team/${team.slug}`}>{team.id}</Link>
          </p>
        </div>
      </div>
    </SiteChrome>
  );
}
