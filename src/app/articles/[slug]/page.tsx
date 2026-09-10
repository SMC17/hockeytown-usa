import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/article-body";
import { SiteChrome } from "@/components/chrome";
import { EntityChip } from "@/components/entity-chip";
import { getGraph } from "@/graph/query";
import { when } from "@/lib/format";
import type { Article } from "@/graph/types";

export function generateStaticParams() {
  return getGraph()
    .articles()
    .map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getGraph().byTypeSlug("article", slug);
  return { title: article?.name ?? "Article" };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getGraph().byTypeSlug("article", slug) as Article | undefined;
  if (!article) notFound();
  const g = getGraph();
  const mentions = article.mentions
    .map((m) => g.node(m.entityId))
    .filter(Boolean);
  const corrections = g.edgesTo(article.id, "corrects");

  return (
    <SiteChrome>
      <div className="kicker">{article.heroKicker ?? "Newsroom"}</div>
      <h1>{article.name}</h1>
      <p className="lede">{article.dek}</p>
      <p className="muted">
        {article.author} · {when(article.publishedAt)} · {article.status}
      </p>
      <ArticleBody body={article.body} />
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
