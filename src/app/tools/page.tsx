import Link from "next/link";
import { SiteChrome } from "@/components/chrome";
import { TOOL_SLUGS } from "@/graph/types";

export const metadata = { title: "Tools" };

const TOOLS: Record<(typeof TOOL_SLUGS)[number], { name: string; dek: string; types: string }> = {
  transactions: {
    name: "Transactions Terminal",
    dek: "Trades, signings, waivers as Transaction objects. Empty interactive is OK — the graph type already exists.",
    types: "Transaction · Player · Team",
  },
  lines: {
    name: "Line Intelligence",
    dek: "Line assignments are first-class graph units (f1–f4, d1–d3, g, pp1, pk1). This surface will query them.",
    types: "LineAssignment · Player · member_of_line / linemate_with",
  },
  "org-depth": {
    name: "Org Depth",
    dek: "Prospects, AHL affiliates, college rights. Depth chart as a graph walk, not a PDF.",
    types: "Prospect · DraftPick · Commitment · rights_owned_by",
  },
};

export default function ToolsPage() {
  return (
    <SiteChrome>
      <div className="kicker">Tools · stubs</div>
      <h1>Operator surfaces on the same graph.</h1>
      <p className="lede">
        Empty interactives with stable URLs. They point at graph types, not at a second warehouse. No live NHL footage.
        Strategy: <Link href="/docs/strategy">/docs/strategy</Link>.
      </p>
      <div className="grid cols-3" style={{ marginTop: 24 }}>
        {TOOL_SLUGS.map((slug) => (
          <Link key={slug} href={`/tools/${slug}`} className="card">
            <div className="kicker">{TOOLS[slug].types}</div>
            <h3>{TOOLS[slug].name}</h3>
            <p className="muted">{TOOLS[slug].dek}</p>
          </Link>
        ))}
      </div>
    </SiteChrome>
  );
}
