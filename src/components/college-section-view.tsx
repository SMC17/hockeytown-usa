import Link from "next/link";
import { EmptyState } from "@/components/chrome";
import { EntityChip } from "@/components/entity-chip";
import { getGraph } from "@/graph/query";
import type { CollegeSection, Team } from "@/graph/types";
import { nodeHref } from "@/graph/ids";

export function CollegeSectionView({ team, section }: { team: Team; section: CollegeSection }) {
  const g = getGraph();
  const roster = g.rosterFor(team.id);
  const commits = g.commitmentsFor(team.id);
  const articles = g.publicArticlesMentioning(team.id);

  if (section === "latest") {
    return (
      <div className="grid cols-2">
        <div className="stack">
          <h2>Latest</h2>
          {articles.length === 0 ? (
            <EmptyState
              title="No public desk copy yet"
              body="Held pipeline pieces can mention this program without publishing. Public Latest stays empty until a published article tags the school."
            />
          ) : (
            articles.map((a) => (
              <Link key={a.id} href={`/articles/${a.slug}`} className="card">
                <div className="kicker">{a.heroKicker ?? "Newsroom"}</div>
                <h3>{a.name}</h3>
                <p className="muted">{a.dek}</p>
              </Link>
            ))
          )}
        </div>
        <div className="stack">
          <div className="card">
            <h3>Why this hub exists</h3>
            <p className="muted">
              NCAA programs are first-class Team nodes. Commits, transfers, and NHL rights hang on the same graph as the
              Islanders mini-OS.
            </p>
          </div>
          <div className="card">
            <h3>Roster snapshot</h3>
            <p className="muted">{roster.length} players seeded · {commits.length} commitments</p>
          </div>
        </div>
      </div>
    );
  }

  if (section === "roster") {
    const coaches = g.coachesFor(team.id);
    if (roster.length === 0) {
      return <EmptyState title="Roster shell" body="Catalog schools share this layout. Flagship hubs carry program-shell seats until ingest." />;
    }
    return (
      <>
        {coaches.length > 0 ? (
          <p className="row">
            {coaches.map((c) => (
              <EntityChip key={c.id} node={c} />
            ))}
          </p>
        ) : null}
        <div className="table-wrap card">
          <table>
            <thead>
              <tr>
                <th>Player</th>
                <th>Pos</th>
                <th>Nat</th>
              </tr>
            </thead>
            <tbody>
              {roster.map((p) => (
                <tr key={p.id}>
                  <td>
                    <Link href={`/players/${p.slug}`}>{p.name}</Link>
                  </td>
                  <td>{p.position}</td>
                  <td>{p.nationality ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  }

  if (section === "commits") {
    if (commits.length === 0) {
      return <EmptyState title="No commitment objects" body="Commitments are graph nodes with committed_to edges — not a spreadsheet tab." />;
    }
    return (
      <div className="stack">
        {commits.map((c) => {
          const player = g.node(c.playerId);
          return (
            <div key={c.id} className="card">
              <div className="kicker">{c.classYear ?? "class TBD"} · {c.announcedOn ?? "date stub"}</div>
              <h3>{c.name}</h3>
              {player ? <EntityChip node={player} /> : null}
            </div>
          );
        })}
      </div>
    );
  }

  const prospects = g.prospectsFor(team.id);
  const rights = roster
    .map((p) => ({ player: p, edges: g.edgesFrom(p.id, "rights_owned_by") }))
    .filter((row) => row.edges.length > 0);

  if (prospects.length === 0 && rights.length === 0) {
    return (
      <EmptyState
        title="Pipeline empty in-graph"
        body="NHL rights (rights_owned_by) and Prospect nodes show up here when a college player is already owned."
      />
    );
  }

  return (
    <div className="grid cols-2">
      <div className="stack">
        <h2>Prospect objects</h2>
        {prospects.length === 0 ? (
          <p className="muted">None hanging on this school Team id.</p>
        ) : (
          prospects.map((p) => (
            <Link key={p.id} href={`/prospects/${p.slug}`} className="card">
              <div className="kicker">{p.eta} · {p.leagueHint}</div>
              <h3>{p.name}</h3>
            </Link>
          ))
        )}
      </div>
      <div className="stack">
        <h2>NHL rights</h2>
        {rights.length === 0 ? (
          <p className="muted">No rights_owned_by edges on the current roster.</p>
        ) : (
          rights.map(({ player, edges }) => (
            <div key={player.id} className="card">
              <EntityChip node={player} />
              {edges.map((e) => {
                const club = g.node(e.to);
                return club ? (
                  <p key={e.id} className="muted">
                    rights owned by <Link href={nodeHref(club)}>{club.name}</Link>
                  </p>
                ) : null;
              })}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
