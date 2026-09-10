import Link from "next/link";
import { getGraph } from "@/graph/query";
import { TEAM_SECTION_LABELS, teamSectionPath } from "@/lib/seo";
import type { Team } from "@/graph/types";

export function FocusCompleteness({ team }: { team: Team }) {
  if (!team.focus) return null;
  const rows = getGraph().focusCompleteness(team.id);
  const filled = rows.filter((r) => r.filled).length;
  return (
    <div className="card">
      <div className="kicker">Mini-OS · {filled}/{rows.length} sections seeded</div>
      <div className="row completeness">
        {rows.map((row) => (
          <Link
            key={row.section}
            href={teamSectionPath(team.slug, row.section)}
            className={row.filled ? "chip" : "chip missing"}
            title={row.filled ? "Seeded" : "Empty shell"}
          >
            {TEAM_SECTION_LABELS[row.section]}
          </Link>
        ))}
      </div>
    </div>
  );
}
