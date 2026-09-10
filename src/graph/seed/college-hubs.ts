import { nodeId } from "../ids";
import { coach, edge, player, playedFor, roster } from "./builders";
import type { GraphEdge, GraphNode } from "../types";

const NCAA_SEASON = nodeId("season", "ncaa-2025-26");

function shell(
  slug: string,
  firstName: string,
  lastName: string,
  position: "C" | "LW" | "RW" | "D" | "G" | "F",
  school: string,
) {
  return player({
    slug,
    firstName,
    lastName,
    position,
    summary: `${school} program-hub roster shell. Placeholder seat so the college mini-OS is not a hole — replace on ingest. Not a published identification.`,
  });
}

const michigan = nodeId("team", "michigan-wolverines");
const minnesota = nodeId("team", "minnesota-golden-gophers");
const denver = nodeId("team", "denver-pioneers");
const bu = nodeId("team", "boston-university-terriers");
const qu = nodeId("team", "quinnipiac-bobcats");

const michPlayers = [
  shell("michigan-center-shell", "Michigan", "Center", "C", "Michigan"),
  shell("michigan-defense-shell", "Michigan", "Defense", "D", "Michigan"),
  shell("michigan-goalie-shell", "Michigan", "Goalie", "G", "Michigan"),
];
const minnPlayers = [
  shell("minnesota-center-shell", "Minnesota", "Center", "C", "Minnesota"),
  shell("minnesota-defense-shell", "Minnesota", "Defense", "D", "Minnesota"),
  shell("minnesota-goalie-shell", "Minnesota", "Goalie", "G", "Minnesota"),
];
const denPlayers = [
  shell("denver-center-shell", "Denver", "Center", "C", "Denver"),
  shell("denver-defense-shell", "Denver", "Defense", "D", "Denver"),
  shell("denver-goalie-shell", "Denver", "Goalie", "G", "Denver"),
];
const buPlayers = [
  shell("bu-center-shell", "BU", "Center", "C", "Boston University"),
  shell("bu-defense-shell", "BU", "Defense", "D", "Boston University"),
  shell("bu-goalie-shell", "BU", "Goalie", "G", "Boston University"),
];
const quPlayers = [
  shell("quinnipiac-center-shell", "Quinnipiac", "Center", "C", "Quinnipiac"),
  shell("quinnipiac-defense-shell", "Quinnipiac", "Defense", "D", "Quinnipiac"),
  shell("quinnipiac-goalie-shell", "Quinnipiac", "Goalie", "G", "Quinnipiac"),
];

const coaches = [
  coach({ name: "Michigan bench (shell)", slug: "michigan-bench-shell", role: "head", teamId: michigan, seasonId: NCAA_SEASON, summary: "Program-hub coach shell." }),
  coach({ name: "Minnesota bench (shell)", slug: "minnesota-bench-shell", role: "head", teamId: minnesota, seasonId: NCAA_SEASON, summary: "Program-hub coach shell." }),
  coach({ name: "Denver bench (shell)", slug: "denver-bench-shell", role: "head", teamId: denver, seasonId: NCAA_SEASON, summary: "Program-hub coach shell." }),
  coach({ name: "BU bench (shell)", slug: "bu-bench-shell", role: "head", teamId: bu, seasonId: NCAA_SEASON, summary: "Program-hub coach shell." }),
  coach({ name: "Quinnipiac bench (shell)", slug: "quinnipiac-bench-shell", role: "head", teamId: qu, seasonId: NCAA_SEASON, summary: "Program-hub coach shell." }),
];

const rosters = [
  roster({ slug: "mich-2025-26", name: "Michigan 2025-26 roster", teamId: michigan, seasonId: NCAA_SEASON, kind: "ncaa" }),
  roster({ slug: "minn-ncaa-2025-26", name: "Minnesota 2025-26 roster", teamId: minnesota, seasonId: NCAA_SEASON, kind: "ncaa" }),
  roster({ slug: "den-2025-26", name: "Denver 2025-26 roster", teamId: denver, seasonId: NCAA_SEASON, kind: "ncaa" }),
  roster({ slug: "bu-2025-26", name: "BU 2025-26 roster", teamId: bu, seasonId: NCAA_SEASON, kind: "ncaa" }),
  roster({ slug: "qu-2025-26", name: "Quinnipiac 2025-26 roster", teamId: qu, seasonId: NCAA_SEASON, kind: "ncaa" }),
];

export function collegeHubNodes(): GraphNode[] {
  return [...michPlayers, ...minnPlayers, ...denPlayers, ...buPlayers, ...quPlayers, ...coaches, ...rosters];
}

export function collegeHubEdges(): GraphEdge[] {
  const seats: [ReturnType<typeof player>[], string][] = [
    [michPlayers, michigan],
    [minnPlayers, minnesota],
    [denPlayers, denver],
    [buPlayers, bu],
    [quPlayers, qu],
  ];
  const played = seats.flatMap(([group, teamId]) => group.map((pl) => playedFor(pl.id, teamId, { seasonId: NCAA_SEASON, extraKey: NCAA_SEASON })));
  const coached = [
    edge("coached_by", michigan, coaches[0].id, { extraKey: NCAA_SEASON }),
    edge("coached_by", minnesota, coaches[1].id, { extraKey: NCAA_SEASON }),
    edge("coached_by", denver, coaches[2].id, { extraKey: NCAA_SEASON }),
    edge("coached_by", bu, coaches[3].id, { extraKey: NCAA_SEASON }),
    edge("coached_by", qu, coaches[4].id, { extraKey: NCAA_SEASON }),
  ];
  return [...played, ...coached];
}
