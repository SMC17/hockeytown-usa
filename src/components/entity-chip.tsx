import Link from "next/link";
import type { GraphNode } from "@/graph/types";
import { entityHref, nodeHref } from "@/graph/ids";

export function EntityChip({ node }: { node: GraphNode }) {
  return (
    <Link className="chip" href={nodeHref(node)}>
      {node.name}
    </Link>
  );
}

export function EntityLink({
  type,
  slug,
  children,
}: {
  type: GraphNode["type"];
  slug: string;
  children: React.ReactNode;
}) {
  return <Link href={entityHref(type, slug)}>{children}</Link>;
}
