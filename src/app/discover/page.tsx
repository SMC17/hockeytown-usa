import { SiteChrome } from "@/components/chrome";
import { DiscoverSearch } from "@/components/discover-search";
import { getGraph } from "@/graph/query";

export const metadata = { title: "Discover" };

export default function DiscoverPage() {
  const g = getGraph();
  const nodes = g.raw.nodes.map((n) => ({
    id: n.id,
    type: n.type,
    slug: n.slug,
    name: n.name,
    summary: n.summary,
  }));

  return (
    <SiteChrome mode="discover">
      <div className="kicker">Flagship · Discover</div>
      <h1>Walk the graph.</h1>
      <p className="lede">Every node is addressable. Search is a projection, not a CMS folder.</p>
      <DiscoverSearch nodes={nodes} />
    </SiteChrome>
  );
}
