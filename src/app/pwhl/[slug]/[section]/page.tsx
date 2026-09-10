import { notFound } from "next/navigation";
import Link from "next/link";
import { EmptyState, SiteChrome } from "@/components/chrome";
import { EntityChip } from "@/components/entity-chip";
import { ProgramHero } from "@/components/program-hero";
import { getGraph } from "@/graph/query";

export function generateStaticParams() {
  return getGraph()
    .pwhlTeams()
    .map((t) => ({ slug: t.slug, section: "roster" }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; section: string }>;
}) {
  const { slug, section } = await params;
  const team = getGraph().teamBySlug(slug);
  return { title: team ? `${team.name} · ${section}` : "PWHL" };
}

export default async function PwhlSectionPage({
  params,
}: {
  params: Promise<{ slug: string; section: string }>;
}) {
  const { slug, section } = await params;
  const g = getGraph();
  const team = g.teamBySlug(slug);
  if (!team || team.leagueId !== "league:pwhl") notFound();
  if (section !== "roster") notFound();
  const roster = g.rosterFor(team.id);
  const coaches = g.coachesFor(team.id);

  return (
    <SiteChrome>
      <ProgramHero team={team} section="roster" leagueLabel="PWHL" />
      {coaches.length > 0 ? (
        <p className="row">
          {coaches.map((c) => (
            <EntityChip key={c.id} node={c} />
          ))}
        </p>
      ) : null}
      {roster.length === 0 ? (
        <EmptyState title="Roster not seeded" body="Same Team type as the NHL. Depth fills in without a new product." />
      ) : (
        <div className="stack">
          {roster.map((p) => (
            <Link key={p.id} href={`/players/${p.slug}`} className="card">
              <h3>{p.name}</h3>
              <p className="muted">{p.position}</p>
            </Link>
          ))}
        </div>
      )}
    </SiteChrome>
  );
}
