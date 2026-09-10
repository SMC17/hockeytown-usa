import { notFound } from "next/navigation";
import { SiteChrome } from "@/components/chrome";
import { CollegeSectionView } from "@/components/college-section-view";
import { ProgramHero } from "@/components/program-hero";
import { getGraph } from "@/graph/query";
import { COLLEGE_SECTIONS, type CollegeSection } from "@/graph/types";

function isCollegeSection(value: string): value is CollegeSection {
  return (COLLEGE_SECTIONS as readonly string[]).includes(value);
}

export function generateStaticParams() {
  return getGraph()
    .collegeTeams()
    .flatMap((t) =>
      COLLEGE_SECTIONS.filter((s) => s !== "latest").map((section) => ({ slug: t.slug, section })),
    );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; section: string }>;
}) {
  const { slug, section } = await params;
  const team = getGraph().teamBySlug(slug);
  return { title: team ? `${team.name} · ${section}` : "College" };
}

export default async function CollegeSectionPage({
  params,
}: {
  params: Promise<{ slug: string; section: string }>;
}) {
  const { slug, section } = await params;
  const team = getGraph().teamBySlug(slug);
  if (!team || team.leagueId !== "league:ncaa") notFound();
  if (!isCollegeSection(section) || section === "latest") notFound();
  return (
    <SiteChrome>
      <ProgramHero team={team} section={section} leagueLabel="NCAA" />
      <CollegeSectionView team={team} section={section} />
    </SiteChrome>
  );
}
