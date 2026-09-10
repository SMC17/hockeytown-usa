import Link from "next/link";
import { SiteChrome } from "@/components/chrome";
import { AlertsBoard } from "@/app/alerts/alerts-board";
import { getGraph } from "@/graph/query";
import { teamHref } from "@/graph/ids";
import type { FollowTarget } from "@/lib/follow-storage";

export const metadata = { title: "Alerts" };

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

export default function AlertsPage() {
  const g = getGraph();
  const targets: FollowTarget[] = [
    ...g.focusTeams().map((t) => toTarget(t, "nhl")),
    ...g.nhlTeams().filter((t) => t.hometown).map((t) => toTarget(t, "nhl")),
    ...g.collegeHubs().map((t) => toTarget(t, "college")),
    ...g.pwhlTeams().map((t) => toTarget(t, "pwhl")),
    ...g.ahlTeams().map((t) => toTarget(t, "ahl")),
  ];

  return (
    <SiteChrome>
      <div className="kicker">Alerts · stub</div>
      <h1>Follow first. Alerts hang on those IDs.</h1>
      <p className="lede">
        This surface reads the same My Hockey chips stored in this browser. When ingest lands, Injury and Transaction
        objects for followed teams appear here. No invented scores. No push spam yet.
      </p>
      <p className="muted">
        Manage chips on <Link href="/my-hockey">/my-hockey</Link>.
      </p>
      <AlertsBoard targets={targets} />
    </SiteChrome>
  );
}
