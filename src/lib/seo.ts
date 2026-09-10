import type { TeamSection } from "@/graph/types";
import { TEAM_SECTIONS } from "@/graph/types";

export const TEAM_SECTION_LABELS: Record<TeamSection, string> = {
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

export function teamSectionPath(slug: string, section: TeamSection): string {
  return section === "latest" ? `/nhl/${slug}` : `/nhl/${slug}/${section}`;
}

export function sectionTitle(teamName: string, section: TeamSection): string {
  return `${teamName} ${TEAM_SECTION_LABELS[section]}`;
}

export { TEAM_SECTIONS };
