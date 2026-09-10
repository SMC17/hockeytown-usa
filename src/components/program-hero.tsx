import Link from "next/link";
import type { CollegeSection, Team } from "@/graph/types";
import { COLLEGE_SECTIONS } from "@/graph/types";

const LABELS: Record<CollegeSection, string> = {
  latest: "Latest",
  roster: "Roster",
  commits: "Commits",
  pipeline: "Pipeline",
};

export function ProgramHero({
  team,
  section,
  leagueLabel,
}: {
  team: Team;
  section: string;
  leagueLabel: string;
}) {
  const base =
    team.leagueId === "league:ncaa"
      ? "/college"
      : team.leagueId === "league:pwhl"
        ? "/pwhl"
        : team.leagueId === "league:ahl"
          ? "/ahl"
          : "/nhl";
  const sections =
    team.leagueId === "league:ncaa"
      ? COLLEGE_SECTIONS
      : team.leagueId === "league:ahl"
        ? (["latest"] as const)
        : (["latest", "roster"] as const);

  return (
    <>
      <section className="team-hero" style={{ ["--team" as string]: team.primaryColor }}>
        <div className="kicker">
          {leagueLabel}
          {team.coverage === "deep" ? " · hub" : " · catalog"}
          {team.hometown ? " · Hockeytown hometown" : ""}
          {team.division ? ` · ${team.division}` : ""}
        </div>
        <div className="abbr">{team.abbreviation}</div>
        <h1>{team.name}</h1>
        <p className="lede">{team.summary}</p>
      </section>
      <nav className="team-subnav" aria-label={`${team.name} sections`}>
        {sections.map((s) => {
          const href = s === "latest" ? `${base}/${team.slug}` : `${base}/${team.slug}/${s}`;
          return (
            <Link key={s} href={href} className={section === s ? "active" : undefined}>
              {s in LABELS ? LABELS[s as CollegeSection] : s}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
