import { NextResponse } from "next/server";
import { getGraph } from "@/graph/query";

export const dynamic = "force-static";

export function GET() {
  const g = getGraph();
  return NextResponse.json({
    generatedAt: g.raw.generatedAt,
    seasonId: g.raw.seasonId,
    stats: g.stats(),
    nodes: g.raw.nodes,
    edges: g.raw.edges,
    standings: g.raw.standings,
    lines: g.raw.lines,
    cap: g.raw.cap,
  });
}
