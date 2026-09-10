import { SiteChrome } from "@/components/chrome";
import { FollowChips } from "@/components/follow-chips";
import { getGraph } from "@/graph/query";
import { teamHref } from "@/graph/ids";
import type { FollowTarget } from "@/lib/follow-storage";

export const metadata = { title: "My Hockey" };

function toTarget(
  team: { slug: string; name: string; abbreviation: string; leagueId: string },
  group: FollowTarget["group"],
): FollowTarget {
  return {
    slug: team.slug,
    name: team.name,
    abbreviation: team.abbreviation,
    href: teamHref(team),
    group,
  };
}

export default function MyHockeyPage() {
  const g = getGraph();
  const nhl = [
    ...g.focusTeams().map((t) => toTarget(t, "nhl")),
    ...g.nhlTeams().filter((t) => t.hometown).map((t) => toTarget(t, "nhl")),
  ];
  const college = g.collegeHubs().map((t) => toTarget(t, "college"));
  const pwhl = g.pwhlTeams().map((t) => toTarget(t, "pwhl"));

  return (
    <SiteChrome mode="follow">
      <div className="kicker">My Hockey · identity shell</div>
      <h1>Follow objects, not channels.</h1>
      <p className="lede">
        Click a chip to follow a Team node. This is a personalization shell — local to this browser — on the same graph as
        the Islanders mini-OS and the PWHL clubs. No live game video lives here.
      </p>
      <FollowChips
        groups={[
          { label: "NHL focus + Hockeytown", items: nhl },
          { label: "College hubs", items: college },
          { label: "PWHL", items: pwhl },
        ]}
      />
    </SiteChrome>
  );
}
