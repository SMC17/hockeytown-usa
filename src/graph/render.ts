import { entityHref, nodeHref } from "./ids";
import { getGraph } from "./query";
import type { GraphNode, NodeType } from "./types";

const MENTION = /\[\[([a-z_]+):([a-z0-9-]+)(?:\|([^\]]+))?\]\]/g;

export type ArticleBlock =
  | { kind: "text"; text: string }
  | { kind: "mention"; type: NodeType; slug: string; href: string; label: string; missing?: boolean };

export function parseArticleBody(body: string): ArticleBlock[] {
  const graph = getGraph();
  const blocks: ArticleBlock[] = [];
  let last = 0;
  const re = new RegExp(MENTION.source, "g");
  let match: RegExpExecArray | null;
  while ((match = re.exec(body))) {
    if (match.index > last) {
      blocks.push({ kind: "text", text: body.slice(last, match.index) });
    }
    const type = match[1] as NodeType;
    const slug = match[2];
    const id = `${type}:${slug}`;
    const node = graph.node(id);
    const label = match[3] ?? node?.name ?? slug.replace(/-/g, " ");
    blocks.push({
      kind: "mention",
      type,
      slug,
      href: node ? nodeHref(node) : entityHref(type, slug),
      label,
      missing: !node,
    });
    last = match.index + match[0].length;
  }
  if (last < body.length) {
    blocks.push({ kind: "text", text: body.slice(last) });
  }
  return blocks;
}

export function nodeLabel(node: GraphNode): string {
  return node.name;
}
