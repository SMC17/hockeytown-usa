import { nodeId } from "../ids";
import { arena, coach, commitment, edge, player, playedFor, roster } from "./builders";
import type { GraphEdge, GraphNode } from "../types";

const NCAA_SEASON = nodeId("season", "ncaa-2025-26");

type Program = {
  slug: string;
  short: string;
  school: string;
  arenaSlug: string;
  arenaName: string;
  arenaCity: string;
  arenaRegion: string;
  capacity?: number;
  opened?: number;
};

const PROGRAMS: Program[] = [
  { slug: "michigan-wolverines", short: "michigan", school: "Michigan", arenaSlug: "yost-ice-arena", arenaName: "Yost Ice Arena", arenaCity: "Ann Arbor", arenaRegion: "MI", capacity: 5800, opened: 1923 },
  { slug: "minnesota-golden-gophers", short: "minnesota", school: "Minnesota", arenaSlug: "3m-arena", arenaName: "3M Arena at Mariucci", arenaCity: "Minneapolis", arenaRegion: "MN", capacity: 10200, opened: 1993 },
  { slug: "boston-university-terriers", short: "bu", school: "Boston University", arenaSlug: "agganis-arena", arenaName: "Agganis Arena", arenaCity: "Boston", arenaRegion: "MA", capacity: 7200, opened: 2005 },
  { slug: "boston-college-eagles", short: "bc", school: "Boston College", arenaSlug: "conte-forum", arenaName: "Conte Forum", arenaCity: "Chestnut Hill", arenaRegion: "MA", capacity: 8606, opened: 1988 },
  { slug: "north-dakota-fighting-hawks", short: "und", school: "North Dakota", arenaSlug: "ralph-engelstad-arena", arenaName: "Ralph Engelstad Arena", arenaCity: "Grand Forks", arenaRegion: "ND", capacity: 11640, opened: 2001 },
  { slug: "quinnipiac-bobcats", short: "quinnipiac", school: "Quinnipiac", arenaSlug: "mt-bank-arena", arenaName: "M&T Bank Arena", arenaCity: "Hamden", arenaRegion: "CT", capacity: 3500, opened: 2007 },
  { slug: "wisconsin-badgers", short: "wisconsin", school: "Wisconsin", arenaSlug: "la-bahn-arena", arenaName: "LaBahn Arena", arenaCity: "Madison", arenaRegion: "WI", capacity: 2288, opened: 2012 },
  { slug: "denver-pioneers", short: "denver", school: "Denver", arenaSlug: "magness-arena", arenaName: "Magness Arena", arenaCity: "Denver", arenaRegion: "CO", capacity: 6076, opened: 1999 },
];

function shell(slug: string, firstName: string, lastName: string, position: "C" | "LW" | "RW" | "D" | "G", school: string) {
  return player({
    slug,
    firstName,
    lastName,
    position,
    summary: `${school} program-hub roster shell. Placeholder seat so the college mini-OS is not a hole — replace on ingest. Not a published identification.`,
  });
}

function seatsFor(program: Program) {
  const s = program.short;
  const school = program.school;
  return [
    shell(`${s}-center-shell`, school, "Center", "C", school),
    shell(`${s}-wing-shell`, school, "Wing", "LW", school),
    shell(`${s}-right-wing-shell`, school, "Right Wing", "RW", school),
    shell(`${s}-defense-shell`, school, "Defense", "D", school),
    shell(`${s}-goalie-shell`, school, "Goalie", "G", school),
  ];
}

const byProgram = PROGRAMS.map((program) => {
  const teamId = nodeId("team", program.slug);
  const players = seatsFor(program);
  const commitPlayer = player({
    slug: `${program.short}-commit-shell`,
    firstName: program.school,
    lastName: "Commit",
    position: "F",
    summary: `${program.school} commitment shell (class of 2027). Not a real recruit — ingest replaces this seat.`,
  });
  return {
    program,
    teamId,
    players,
    commitPlayer,
    commit: commitment({
      slug: `${program.short}-2027-commit`,
      name: `${program.school} 2027 commit (shell)`,
      playerId: commitPlayer.id,
      schoolTeamId: teamId,
      classYear: 2027,
      announcedOn: "2026-04-15",
    }),
    coach: coach({
      name: `${program.school} bench (shell)`,
      slug: `${program.short}-bench-shell`,
      role: "head",
      teamId,
      seasonId: NCAA_SEASON,
      summary: `${program.school} program-hub coach shell.`,
    }),
    roster: roster({
      slug: `${program.short}-ncaa-2025-26`,
      name: `${program.school} 2025-26 roster`,
      teamId,
      seasonId: NCAA_SEASON,
      kind: "ncaa",
    }),
    arena: arena({
      slug: program.arenaSlug,
      name: program.arenaName,
      city: program.arenaCity,
      region: program.arenaRegion,
      country: "US",
      capacity: program.capacity,
      opened: program.opened,
    }),
  };
});

export function collegeHubNodes(): GraphNode[] {
  return byProgram.flatMap((row) => [
    ...row.players,
    row.commitPlayer,
    row.commit,
    row.coach,
    row.roster,
    row.arena,
  ]);
}

export function collegeHubEdges(): GraphEdge[] {
  return byProgram.flatMap((row) => [
    ...row.players.map((pl) => playedFor(pl.id, row.teamId, { seasonId: NCAA_SEASON, extraKey: NCAA_SEASON })),
    playedFor(row.commitPlayer.id, row.teamId, { seasonId: NCAA_SEASON, extraKey: `${NCAA_SEASON}-commit` }),
    edge("committed_to", row.commitPlayer.id, row.teamId, { extraKey: "2027" }),
    edge("coached_by", row.teamId, row.coach.id, { extraKey: NCAA_SEASON }),
  ]);
}
