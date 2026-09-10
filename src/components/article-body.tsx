import { parseArticleBody } from "@/graph/render";
import Link from "next/link";

export function ArticleBody({ body }: { body: string }) {
  const paragraphs = body.split(/\n\n+/);
  return (
    <div className="article-body">
      {paragraphs.map((p, i) => (
        <p key={i}>
          {parseArticleBody(p).map((block, j) =>
            block.kind === "text" ? (
              <span key={j}>{block.text}</span>
            ) : (
              <Link key={j} href={block.href} className={block.missing ? "mention chip missing" : "mention"}>
                {block.label}
              </Link>
            ),
          )}
        </p>
      ))}
    </div>
  );
}
