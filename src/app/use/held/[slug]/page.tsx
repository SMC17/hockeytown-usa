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
    .heldArticles()
    .map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return {
    title: `Held · ${slug}`,
    robots: { index: false, follow: false },
  };
}

export default async function HeldDeskPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getGraph().byTypeSlug("article", slug) as Article | undefined;
  if (!article || article.status !== "held") notFound();
  const g = getGraph();
  const mentions = article.mentions.map((m) => g.node(m.entityId)).filter(Boolean);

  return (
    <SiteChrome mode="use">
      <div className="kicker">CMS desk · held</div>
      <h1>{article.name}</h1>
      <p className="lede">{article.dek}</p>
      <p className="muted">
        {article.author} · {when(article.publishedAt)} · status {article.status}
      </p>
      <p className="muted">
        Public gate (no body): <Link href={`/articles/${article.slug}`}>/articles/{article.slug}</Link>
      </p>
      <ArticleBody body={article.body} />
      <div className="card">
        <h3>Linked entity IDs</h3>
        <div className="row">
          {mentions.map((n) => (n ? <EntityChip key={n.id} node={n} /> : null))}
        </div>
      </div>
    </SiteChrome>
  );
}
