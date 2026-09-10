import { SiteChrome } from "@/components/chrome";
import { FollowBoard } from "@/components/follow-board";
import { getGraph } from "@/graph/query";

export const metadata = { title: "Follow" };

export default function FollowPage() {
  const teams = getGraph()
    .nhlTeams()
    .map((t) => ({ slug: t.slug, name: t.name, abbreviation: t.abbreviation, focus: t.focus }));

  return (
    <SiteChrome mode="follow">
      <div className="kicker">Flagship · Follow</div>
      <h1>One identity, many clubs.</h1>
      <p className="lede">
        Phase 1 stores follows in this browser. The contract is already national: follow an Islanders node and a Michigan
        node with the same identity service later.
      </p>
      <FollowBoard teams={teams} />
    </SiteChrome>
  );
}
