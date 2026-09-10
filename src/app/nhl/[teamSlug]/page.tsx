import { notFound } from "next/navigation";
import { SiteChrome } from "@/components/chrome";
import { TeamHero } from "@/components/team-hero";
import { TeamSectionView } from "@/components/team-section-view";
import { getGraph } from "@/graph/query";

export function generateStaticParams() {
  return getGraph()
    .nhlTeams()
    .map((t) => ({ teamSlug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ teamSlug: string }> }) {
  const { teamSlug } = await params;
  const team = getGraph().teamBySlug(teamSlug);
  return { title: team?.name ?? "Team" };
}

export default async function TeamLatestPage({ params }: { params: Promise<{ teamSlug: string }> }) {
  const { teamSlug } = await params;
  const team = getGraph().teamBySlug(teamSlug);
  if (!team || team.leagueId !== "league:nhl") notFound();
  return (
    <SiteChrome>
      <TeamHero team={team} section="latest" />
      <TeamSectionView team={team} section="latest" />
    </SiteChrome>
  );
}
