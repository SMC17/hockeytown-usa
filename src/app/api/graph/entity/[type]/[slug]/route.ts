import { NextResponse } from "next/server";
import { getGraph } from "@/graph/query";
import { NODE_TYPES, type NodeType } from "@/graph/types";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ type: string; slug: string }> },
) {
  const { type, slug } = await params;
  if (!(NODE_TYPES as readonly string[]).includes(type)) {
    return NextResponse.json({ error: "unknown type" }, { status: 404 });
  }
  const g = getGraph();
  const node = g.byTypeSlug(type as NodeType, slug);
  if (!node) return NextResponse.json({ error: "not found" }, { status: 404 });
  return NextResponse.json({
    node,
    neighbors: g.neighbors(node.id),
  });
}
