import Link from "next/link";
import { notFound } from "next/navigation";
import { EmptyState, SiteChrome } from "@/components/chrome";
import { EntityChip } from "@/components/entity-chip";
import { ProgramHero } from "@/components/program-hero";
import { getGraph } from "@/graph/query";

export function generateStaticParams() {
  return getGraph()
    .pwhlTeams()
    .map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const team = getGraph().teamBySlug(slug);
  return { title: team?.name ?? "PWHL" };
}

export default async function PwhlClubPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const g = getGraph();
  const team = g.teamBySlug(slug);
  if (!team || team.leagueId !== "league:pwhl") notFound();
  const roster = g.rosterFor(team.id);
  const coaches = g.coachesFor(team.id);
  const articles = g.publicArticlesMentioning(team.id);

  return (
    <SiteChrome>
      <ProgramHero team={team} section="latest" leagueLabel="PWHL" />
      <div className="grid cols-2">
        <div className="stack">
          <h2>Latest</h2>
          {articles.length === 0 ? (
            <EmptyState title="Desk has not filed here yet" body="The club is a first-class Team. Mentions will land without a redesign." />
          ) : (
            articles.map((a) => (
              <Link key={a.id} href={`/articles/${a.slug}`} className="card">
                <h3>{a.name}</h3>
                <p className="muted">{a.dek}</p>
              </Link>
            ))
          )}
        </div>
        <div className="stack">
          <div className="card">
            <h3>Roster shell</h3>
            {coaches.map((c) => (
              <EntityChip key={c.id} node={c} />
            ))}
            {roster.length === 0 ? (
              <p className="muted">Empty interactive is OK. Montreal carries a Poulin seed; other clubs wait on ingest.</p>
            ) : (
              roster.map((p) => (
                <p key={p.id}>
                  <Link href={`/players/${p.slug}`}>{p.name}</Link>
                </p>
              ))
            )}
          </div>
        </div>
      </div>
    </SiteChrome>
  );
}
