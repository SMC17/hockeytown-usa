import { SiteChrome } from "@/components/chrome";
import { RosterIndex } from "@/components/league-indexes";
import { getGraph } from "@/graph/query";

export const metadata = {
  title: "NHL rosters",
  description: "Roster index for all 32 NHL clubs on Hockey Graph.",
  alternates: { canonical: "/roster" },
};

export default function RosterPage() {
  return (
    <SiteChrome>
      <div className="kicker">SEO · Roster</div>
      <h1>Roster index</h1>
      <p className="lede">Focus clubs are fully seeded. Catalog clubs share the /nhl/[team]/roster URL with empty states.</p>
      <div style={{ marginTop: 24 }}>
        <RosterIndex teams={getGraph().nhlTeams()} />
      </div>
    </SiteChrome>
  );
}
