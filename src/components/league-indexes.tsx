import Link from "next/link";
import { EmptyState } from "@/components/chrome";
import { EntityChip } from "@/components/entity-chip";
import { getGraph } from "@/graph/query";
import { teamHref } from "@/graph/ids";
import type { Injury, Prospect, Team } from "@/graph/types";

export function InjuriesBoard({ teams }: { teams?: Team[] }) {
  const g = getGraph();
  const scope = teams ?? g.nhlTeams();
  const ids = new Set(scope.map((t) => t.id));
  const injuries = g.allInjuries().filter((i) => ids.has(i.teamId));
  if (injuries.length === 0) {
    return <EmptyState title="Injury board empty" body="Injury objects attach to Player + Team. Catalog clubs wait on ingest." />;
  }
  return (
    <div className="stack">
      {injuries.map((i) => (
        <InjuryCard key={i.id} injury={i} />
      ))}
    </div>
  );
}

function InjuryCard({ injury }: { injury: Injury }) {
  const g = getGraph();
  const team = g.node(injury.teamId);
  const player = g.node(injury.playerId);
  return (
    <div className="card">
      <div className="kicker">
        {injury.status} · {injury.bodyPart ?? "undisclosed"}
        {team && team.type === "team" ? ` · ${team.abbreviation}` : ""}
      </div>
      <h3>
        <Link href={`/graph/injury/${injury.slug}`}>{injury.name}</Link>
      </h3>
      <div className="row">
        {player ? <EntityChip node={player} /> : null}
        {team ? <EntityChip node={team} /> : null}
      </div>
      {injury.notes ? <p className="muted">{injury.notes}</p> : null}
    </div>
  );
}

export function RosterIndex({ teams }: { teams: Team[] }) {
  const g = getGraph();
  return (
    <div className="grid cols-3">
      {teams.map((t) => {
        const n = g.rosterFor(t.id).length;
        return (
          <Link key={t.id} href={`${teamHref(t)}/roster`} className="card">
            <div className="kicker">{t.abbreviation}{t.focus ? " · focus" : ""}</div>
            <h3>{t.name}</h3>
            <p className="muted">{n > 0 ? `${n} players seeded` : "Catalog shell"}</p>
          </Link>
        );
      })}
    </div>
  );
}

export function ProspectsBoard({ teams }: { teams?: Team[] }) {
  const g = getGraph();
  const scope = teams ?? g.nhlTeams();
  const ids = new Set(scope.map((t) => t.id));
  const prospects = g.allProspects().filter((p) => ids.has(p.teamId));
  if (prospects.length === 0) {
    return <EmptyState title="Prospect pool empty" body="Prospect nodes hang off Player + rights_owned_by." />;
  }
  return (
    <div className="grid cols-3">
      {prospects.map((p) => (
        <ProspectCard key={p.id} prospect={p} />
      ))}
    </div>
  );
}

function ProspectCard({ prospect }: { prospect: Prospect }) {
  const g = getGraph();
  const team = g.node(prospect.teamId);
  return (
    <Link href={`/prospects/${prospect.slug}`} className="card">
      <div className="kicker">
        #{prospect.rank ?? "—"} · {prospect.eta}
        {team && team.type === "team" ? ` · ${team.abbreviation}` : ""}
      </div>
      <h3>{prospect.name}</h3>
      <p className="muted">{prospect.leagueHint}</p>
    </Link>
  );
}
