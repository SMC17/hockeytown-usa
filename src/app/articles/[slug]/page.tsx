import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/article-body";
import { SiteChrome } from "@/components/chrome";
import { EntityChip } from "@/components/entity-chip";
import { getGraph, isPublicArticle } from "@/graph/query";
import { when } from "@/lib/format";
import type { Article } from "@/graph/types";

export function generateStaticParams() {
  return getGraph()
    .articles()
    .map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getGraph().byTypeSlug("article", slug) as Article | undefined;
  if (!article) return { title: "Article" };
  if (!isPublicArticle(article)) {
    return {
      title: article.name,
      robots: { index: false, follow: false },
    };
  }
  return { title: article.name, description: article.dek };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getGraph().byTypeSlug("article", slug) as Article | undefined;
  if (!article) notFound();
  const g = getGraph();
  const mentions = article.mentions.map((m) => g.node(m.entityId)).filter(Boolean);
  const corrections = g.edgesTo(article.id, "corrects");
  const held = article.status === "held";

  return (
    <SiteChrome>
      <div className="kicker">{article.heroKicker ?? "Newsroom"}</div>
      <h1>{article.name}</h1>
      <p className="lede">{article.dek}</p>
      <p className="muted">
        {article.author} · {when(article.publishedAt)} · {article.status}
      </p>
      {held ? (
        <div className="card">
          <div className="kicker">Public HELD policy</div>
          <h3>This article is held. The body is not public.</h3>
          <p className="muted">
            Held pieces live in the graph and on the CMS desk. They do not appear on Now, Discover, the newsroom index, or
            the sitemap. Direct URLs show title, dek, and mentions only. Policy: <Link href="/docs/held">/docs/held</Link>.
          </p>
        </div>
      ) : (
        <ArticleBody body={article.body} />
      )}
      <div className="card">
        <h3>Mentioned in graph</h3>
        <div className="row">
          {mentions.map((n) => (n ? <EntityChip key={n.id} node={n} /> : null))}
        </div>
      </div>
      {corrections.length > 0 ? (
        <div className="card">
          <h3>Corrections</h3>
          {corrections.map((e) => {
            const src = g.node(e.from);
            return src ? (
              <p key={e.id}>
                <Link href={`/articles/${src.slug}`}>{src.name}</Link>
              </p>
            ) : null;
          })}
        </div>
      ) : null}
    </SiteChrome>
  );
}
