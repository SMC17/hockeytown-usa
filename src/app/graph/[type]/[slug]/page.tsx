import { notFound } from "next/navigation";
import { EntityPage, isNodeType } from "@/components/entity-page";
import { getGraph } from "@/graph/query";
import { NODE_TYPES } from "@/graph/types";

export function generateStaticParams() {
  const g = getGraph();
  return NODE_TYPES.flatMap((type) => g.ofType(type).map((n) => ({ type, slug: n.slug })));
}

export default async function GraphEntityPage({
  params,
}: {
  params: Promise<{ type: string; slug: string }>;
}) {
  const { type, slug } = await params;
  if (!isNodeType(type)) notFound();
  return <EntityPage type={type} slug={slug} />;
}
