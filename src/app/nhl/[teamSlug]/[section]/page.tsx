import { notFound } from "next/navigation";
import { SiteChrome } from "@/components/chrome";
import { TeamHero } from "@/components/team-hero";
import { TeamSectionView } from "@/components/team-section-view";
import { getGraph, isTeamSection, TEAM_SECTIONS } from "@/graph/query";
import { sectionTitle, TEAM_SECTION_LABELS } from "@/lib/seo";

export function generateStaticParams() {
  const teams = getGraph().nhlTeams();
  return teams.flatMap((t) =>
    TEAM_SECTIONS.filter((s) => s !== "latest").map((section) => ({ teamSlug: t.slug, section })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ teamSlug: string; section: string }>;
}) {
  const { teamSlug, section } = await params;
  const team = getGraph().teamBySlug(teamSlug);
  if (!team || !isTeamSection(section) || section === "latest") {
    return { title: "Team" };
  }
  return {
    title: sectionTitle(team.name, section),
    description: `${TEAM_SECTION_LABELS[section]} for the ${team.name} — Hockey Graph mini-OS.`,
    alternates: { canonical: `/nhl/${team.slug}/${section}` },
  };
}

export default async function TeamSectionPage({
  params,
}: {
  params: Promise<{ teamSlug: string; section: string }>;
}) {
  const { teamSlug, section } = await params;
  const team = getGraph().teamBySlug(teamSlug);
  if (!team || team.leagueId !== "league:nhl") notFound();
  if (!isTeamSection(section) || section === "latest") notFound();
  return (
    <SiteChrome>
      <TeamHero team={team} section={section} />
      <TeamSectionView team={team} section={section} />
    </SiteChrome>
  );
}
