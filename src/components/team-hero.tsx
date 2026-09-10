import Link from "next/link";
import type { Team, TeamSection } from "@/graph/types";
import { TEAM_SECTIONS } from "@/graph/types";

const LABELS: Record<TeamSection, string> = {
  latest: "Latest",
  roster: "Roster",
  lines: "Lines",
  injuries: "Injuries",
  contracts: "Contracts",
  cap: "Cap",
  prospects: "Prospects",
  "draft-picks": "Draft picks",
  schedule: "Schedule",
  standings: "Standings",
  transactions: "Transactions",
};

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
        {TEAM_SECTIONS.map((s) => {
          const href = s === "latest" ? `/nhl/${team.slug}` : `/nhl/${team.slug}/${s}`;
          return (
            <Link key={s} href={href} className={section === s ? "active" : undefined}>
              {LABELS[s]}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
