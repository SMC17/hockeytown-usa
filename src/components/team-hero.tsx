import Link from "next/link";
import type { Team, TeamSection } from "@/graph/types";
import { TEAM_SECTIONS } from "@/graph/types";
import { TEAM_SECTION_LABELS, teamSectionPath } from "@/lib/seo";

export function TeamHero({ team, section }: { team: Team; section: TeamSection }) {
  return (
    <>
      <section className="team-hero" style={{ ["--team" as string]: team.primaryColor }}>
        <div className="kicker">
          {team.conference} · {team.division}
          {team.focus ? " · focus club" : ""}
          {team.hometown ? " · Hockeytown hometown" : ""}
        </div>
        <div className="abbr">{team.abbreviation}</div>
        <h1>{team.name}</h1>
        <p className="lede">{team.summary}</p>
      </section>
      <nav className="team-subnav" aria-label={`${team.name} mini-OS`}>
        {TEAM_SECTIONS.map((s) => (
          <Link key={s} href={teamSectionPath(team.slug, s)} className={section === s ? "active" : undefined}>
            {TEAM_SECTION_LABELS[s]}
          </Link>
        ))}
      </nav>
    </>
  );
}
