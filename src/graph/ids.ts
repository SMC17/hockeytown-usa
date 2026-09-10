import type { EdgeType, NodeType } from "./types";

export function nodeId(type: NodeType, slug: string): string {
  return `${type}:${slug}`;
}

export function edgeId(type: EdgeType, from: string, to: string, extra = ""): string {
  return extra ? `edge:${type}:${from}->${to}:${extra}` : `edge:${type}:${from}->${to}`;
}

export function slugify(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function entityHref(type: NodeType, slug: string): string {
  switch (type) {
    case "team":
      return `/nhl/${slug}`;
    case "player":
      return `/players/${slug}`;
    case "coach":
      return `/coaches/${slug}`;
    case "article":
      return `/articles/${slug}`;
    case "prospect":
      return `/prospects/${slug}`;
    case "game":
      return `/games/${slug}`;
    case "arena":
      return `/arenas/${slug}`;
    case "league":
      return `/leagues/${slug}`;
    case "agent":
      return `/agents/${slug}`;
    default:
      return `/graph/${type}/${slug}`;
  }
}
