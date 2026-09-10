import { SiteChrome } from "@/components/chrome";
import { DiscoverSearch } from "@/components/discover-search";
import { nodeHref } from "@/graph/ids";
import { getGraph } from "@/graph/query";

export const metadata = { title: "Discover" };

export default function DiscoverPage() {
  const g = getGraph();
  const nodes = g.publicNodes().map((n) => ({
    id: n.id,
    type: n.type,
    slug: n.slug,
    name: n.name,
    summary: n.summary,
    href: nodeHref(n),
  }));

  return (
    <SiteChrome mode="discover">
      <div className="kicker">Flagship · Discover</div>
      <h1>Walk the graph.</h1>
      <p className="lede">Every public node is addressable. Held articles stay off this surface.</p>
      <DiscoverSearch nodes={nodes} />
    </SiteChrome>
  );
}
