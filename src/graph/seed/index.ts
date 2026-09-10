import type { CapSnapshot, GraphEdge, GraphNode, HockeyGraph, LineAssignment } from "../types";
import { leagues, nhlArenas, nhlStandings, nhlTeams, seasons } from "./catalog";
import { contentEdges, contentNodes } from "./content";
import { flattenPack } from "./focus-pack";
import { bruinsPack } from "./focus-bruins";
import { islandersPack } from "./focus-islanders";
import { leafsPack } from "./focus-leafs";
import { lightningPack } from "./focus-lightning";
import { panthersPack } from "./focus-panthers";
import { penguinsPack } from "./focus-penguins";
import { satelliteEdges, satelliteNodes } from "./satellites";

const PACKS = [islandersPack, leafsPack, penguinsPack, bruinsPack, panthersPack, lightningPack];

function uniqueById<T extends { id: string }>(items: T[]): T[] {
  const seen = new Set<string>();
  const out: T[] = [];
  for (const item of items) {
    if (seen.has(item.id)) continue;
    seen.add(item.id);
    out.push(item);
  }
  return out;
}

export function buildSeedGraph(): HockeyGraph {
  const nodes: GraphNode[] = [...leagues, ...seasons, ...nhlArenas, ...nhlTeams, ...satelliteNodes, ...contentNodes];
  const edges: GraphEdge[] = [...satelliteEdges, ...contentEdges];
  const lines: LineAssignment[] = [];
  const cap: CapSnapshot[] = [];

  for (const pack of PACKS) {
    const flat = flattenPack(pack);
    nodes.push(...flat.nodes);
    edges.push(...flat.edges);
    lines.push(...pack.lines);
    cap.push(pack.cap);
  }

  return {
    generatedAt: new Date().toISOString(),
    seasonId: "season:nhl-2025-26",
    nodes: uniqueById(nodes),
    edges: uniqueById(edges),
    standings: nhlStandings,
    lines,
    cap,
  };
}

export const FOCUS_PACKS = PACKS;
