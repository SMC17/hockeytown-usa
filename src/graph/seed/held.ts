import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { article, edge } from "./builders";
import type { Article, GraphEdge } from "../types";

export type HeldDoc = {
  slug: string;
  title: string;
  dek: string;
  publishedAt: string;
  author: string;
  section: string;
  heroKicker: string;
  mentions: string[];
  body: string;
};

function parseFrontmatter(raw: string): { data: Record<string, string>; body: string } {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { data: {}, body: raw.trim() };
  const data: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    data[key] = value;
  }
  return { data, body: match[2].trim() };
}

function heldDir(): string {
  return join(process.cwd(), "content", "held");
}

export function loadHeldDocs(): HeldDoc[] {
  const dir = heldDir();
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"))
    .sort()
    .map((file) => {
      const { data, body } = parseFrontmatter(readFileSync(join(dir, file), "utf8"));
      return {
        slug: data.slug ?? file.replace(/\.mdx?$/, ""),
        title: data.title ?? file,
        dek: data.dek ?? "",
        publishedAt: data.publishedAt ?? "2026-09-10T12:00:00Z",
        author: data.author ?? "Hockeytown USA desk",
        section: data.section ?? "use",
        heroKicker: data.heroKicker ?? "Held",
        mentions: (data.mentions ?? "")
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        body,
      };
    });
}

export function heldArticleNodes(): { articles: Article[]; edges: GraphEdge[] } {
  const articles: Article[] = [];
  const edges: GraphEdge[] = [];
  for (const doc of loadHeldDocs()) {
    const node = article({
      slug: doc.slug,
      name: doc.title,
      dek: doc.dek,
      body: doc.body,
      publishedAt: doc.publishedAt,
      author: doc.author,
      status: "held",
      section: doc.section,
      heroKicker: doc.heroKicker,
      sourceIds: ["source:hockeytown-desk"],
      mentions: doc.mentions.map((entityId) => ({ entityId })),
    });
    articles.push(node);
    for (const mentionedId of doc.mentions) {
      edges.push(edge("mentioned_in", mentionedId, node.id, { extraKey: doc.slug }));
    }
    edges.push(edge("sourced_from", node.id, "source:hockeytown-desk", { extraKey: doc.slug }));
    edges.push(edge("cites", node.id, "source:hockeytown-desk", { extraKey: `${doc.slug}:desk` }));
  }
  return { articles, edges };
}

export function getHeldDoc(slug: string): HeldDoc | undefined {
  return loadHeldDocs().find((doc) => doc.slug === slug);
}
