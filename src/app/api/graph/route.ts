import { NextResponse } from "next/server";
import { getGraph, isPublicArticle } from "@/graph/query";
import type { Article, GraphNode } from "@/graph/types";

export const dynamic = "force-static";

function publicNode(node: GraphNode): GraphNode {
  if (node.type !== "article") return node;
  const article = node as Article;
  if (isPublicArticle(article)) return article;
  return { ...article, body: "" };
}

export function GET() {
  const g = getGraph();
  return NextResponse.json({
    generatedAt: g.raw.generatedAt,
    seasonId: g.raw.seasonId,
    stats: g.stats(),
    nodes: g.raw.nodes.map(publicNode),
    edges: g.raw.edges,
    standings: g.raw.standings,
    lines: g.raw.lines,
    cap: g.raw.cap,
  });
}
