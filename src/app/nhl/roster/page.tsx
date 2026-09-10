import { SiteChrome } from "@/components/chrome";
import { RosterIndex } from "@/components/league-indexes";
import { getGraph } from "@/graph/query";

export const metadata = {
  title: "NHL roster index",
  description: "All 32 NHL roster hubs.",
  alternates: { canonical: "/nhl/roster" },
};

export default function NhlRosterPage() {
  return (
    <SiteChrome>
      <div className="kicker">NHL · Roster</div>
      <h1>League roster index</h1>
      <p className="lede">Per-club boards: /nhl/[team]/roster.</p>
      <div style={{ marginTop: 24 }}>
        <RosterIndex teams={getGraph().nhlTeams()} />
      </div>
    </SiteChrome>
  );
}
