import { notFound } from "next/navigation";
import { SiteChrome } from "@/components/chrome";
import { CollegeSectionView } from "@/components/college-section-view";
import { ProgramHero } from "@/components/program-hero";
import { getGraph } from "@/graph/query";

export function generateStaticParams() {
  return getGraph()
    .collegeTeams()
    .map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const team = getGraph().teamBySlug(slug);
  return { title: team?.name ?? "College program" };
}

export default async function CollegeHubPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const team = getGraph().teamBySlug(slug);
  if (!team || team.leagueId !== "league:ncaa") notFound();
  return (
    <SiteChrome>
      <ProgramHero team={team} section="latest" leagueLabel="NCAA" />
      <CollegeSectionView team={team} section="latest" />
    </SiteChrome>
  );
}
