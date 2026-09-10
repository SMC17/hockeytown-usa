import Link from "next/link";
import { SiteChrome } from "@/components/chrome";
import { getGraph } from "@/graph/query";
import { when } from "@/lib/format";

export const metadata = { title: "Newsroom" };

export default function ArticlesPage() {
  const articles = getGraph().articles();
  return (
    <SiteChrome>
      <div className="kicker">Newsroom</div>
      <h1>The desk files against the graph.</h1>
      <div className="stack" style={{ marginTop: 24 }}>
        {articles.map((a) => (
          <Link key={a.id} href={`/articles/${a.slug}`} className="card">
            <div className="kicker">
              {a.status} · {when(a.publishedAt)} · {a.mentions.length} mentions
            </div>
            <h3>{a.name}</h3>
            <p className="muted">{a.dek}</p>
          </Link>
        ))}
      </div>
    </SiteChrome>
  );
}
