import Link from "next/link";
import { SiteChrome } from "@/components/chrome";
import { TOOL_SLUGS } from "@/graph/types";

export const metadata = { title: "Tools" };

const TOOLS: Record<(typeof TOOL_SLUGS)[number], { name: string; dek: string }> = {
  "transactions-terminal": {
    name: "Transactions Terminal",
    dek: "Trades, signings, waivers as Transaction objects. Interactive board is a stub; the graph already has the nodes.",
  },
  "line-intelligence": {
    name: "Line Intelligence",
    dek: "Line assignments are first-class. This surface will query them — empty interactive is OK in Phase 1.",
  },
  "org-depth": {
    name: "Org Depth",
    dek: "Prospects, AHL affiliates, college rights. Depth chart as a graph walk, not a PDF.",
  },
};

export default function ToolsPage() {
  return (
    <SiteChrome>
      <div className="kicker">Tools · stubs</div>
      <h1>Operator surfaces on the same graph.</h1>
      <p className="lede">
        These are not a second product. They are empty interactives that already know where the objects live. Strategy and
        rights live in <Link href="/docs/strategy">/docs/strategy</Link>.
      </p>
      <div className="grid cols-3" style={{ marginTop: 24 }}>
        {TOOL_SLUGS.map((slug) => (
          <Link key={slug} href={`/tools/${slug}`} className="card">
            <div className="kicker">{slug}</div>
            <h3>{TOOLS[slug].name}</h3>
            <p className="muted">{TOOLS[slug].dek}</p>
          </Link>
        ))}
      </div>
    </SiteChrome>
  );
}
