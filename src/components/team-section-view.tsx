import Link from "next/link";
import { EmptyState } from "@/components/chrome";
import { EntityChip } from "@/components/entity-chip";
import { FocusCompleteness } from "@/components/focus-completeness";
import { getGraph } from "@/graph/query";
import type { Team, TeamSection } from "@/graph/types";
import { usd, when, record } from "@/lib/format";
import { entityHref } from "@/graph/ids";

export function TeamSectionView({ team, section }: { team: Team; section: TeamSection }) {
  const g = getGraph();
  const roster = g.rosterFor(team.id);
  const deep = team.coverage === "deep";

  if (section === "latest") {
    const articles = g.publicArticlesMentioning(team.id);
    const injuries = g.injuriesFor(team.id);
    const txs = g.transactionsFor(team.id);
    const standing = g.standingFor(team.id);
    return (
      <div className="grid cols-2">
        <div className="stack">
          <h2>Latest</h2>
          {articles.length === 0 ? (
            <EmptyState title="No desk copy tagged yet" body="The mini-OS is live. Mentions land as soon as the newsroom files against this club." />
          ) : (
            articles.map((a) => (
              <Link key={a.id} href={`/articles/${a.slug}`} className="card">
                <div className="kicker">{a.heroKicker ?? "Newsroom"}</div>
                <h3>{a.name}</h3>
                <p className="muted">{a.dek}</p>
              </Link>
            ))
          )}
          {team.focus ? <FocusCompleteness team={team} /> : null}
        </div>
        <div className="stack">
          <div className="card">
            <div className="kicker">2025-26 snapshot</div>
            {standing ? (
              <>
                <div className="stat">{standing.pts} pts</div>
                <p className="muted">
                  {record(standing.w, standing.l, standing.otl)} · {standing.gf} GF / {standing.ga} GA
                  {standing.playoff ? " · playoffs" : " · out"}
                </p>
              </>
            ) : (
              <p className="muted">Standings ingest pending.</p>
            )}
          </div>
          <div className="card">
            <h3>Injuries</h3>
            {injuries.length === 0 ? (
              <p className="muted">{deep ? "No open injury objects." : "Empty — deep injury graph is a focus-club feature in Phase 1."}</p>
            ) : (
              <ul>
                {injuries.map((i) => (
                  <li key={i.id}>
                    <Link href={entityHref("injury", i.slug)}>{i.name}</Link> · {i.status}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="card">
            <h3>Transactions</h3>
            {txs.length === 0 ? (
              <p className="muted">No seeded moves for this club yet.</p>
            ) : (
              txs.map((t) => (
                <p key={t.id}>
                  <Link href={entityHref("transaction", t.slug)}>{t.name}</Link>
                  <span className="muted"> · {t.date}</span>
                </p>
              ))
            )}
          </div>
        </div>
      </div>
    );
  }

  if (section === "roster") {
    const coaches = g.coachesFor(team.id);
    if (roster.length === 0) {
      return <EmptyState title="Roster not seeded" body="Catalog clubs share this layout. Deep roster objects ship with focus coverage." />;
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
                <th>#</th>
                <th>Player</th>
                <th>Pos</th>
                <th>Shot</th>
                <th>Nat</th>
              </tr>
            </thead>
            <tbody>
              {roster.map((p) => (
                <tr key={p.id}>
                  <td>{p.sweaterNumber ?? "—"}</td>
                  <td>
                    <Link href={`/players/${p.slug}`}>{p.name}</Link>
                    {p.captaincy ? ` (${p.captaincy})` : ""}
                  </td>
                  <td>{p.position}</td>
                  <td>{p.shootsCatches ?? "—"}</td>
                  <td>{p.nationality ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  }

  if (section === "lines") {
    const lines = g.linesFor(team.id);
    if (lines.length === 0) {
      return <EmptyState title="No line combinations yet" body="Lines are first-class graph assignments (member_of_line / linemate_with). Empty for catalog clubs." />;
    }
    return (
      <div className="line-board">
        {lines.map((unit) => (
          <div key={unit.id} className="line-unit">
            <div className="unit">{unit.label ?? unit.unit}</div>
            <div className="stack">
              {unit.playerIds.map((id) => {
                const n = g.node(id);
                return n ? <EntityChip key={id} node={n} /> : <span key={id}>{id}</span>;
              })}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (section === "injuries") {
    const injuries = g.injuriesFor(team.id);
    if (injuries.length === 0) {
      return <EmptyState title="Injury board clear (or unseeded)" body="Injury objects attach to Player + Team. Catalog clubs wait on ingest." />;
    }
    return (
      <div className="stack">
        {injuries.map((i) => {
          const player = g.node(i.playerId);
          return (
            <div key={i.id} className="card">
              <div className="kicker">{i.status} · {i.bodyPart ?? "undisclosed"}</div>
              <h3>
                <Link href={entityHref("injury", i.slug)}>{i.name}</Link>
              </h3>
              {player ? <EntityChip node={player} /> : null}
              <p className="muted">{i.notes}</p>
            </div>
          );
        })}
      </div>
    );
  }

  if (section === "contracts") {
    const contracts = g.contractsFor(team.id);
    if (contracts.length === 0) {
      return <EmptyState title="No contract objects" body="AAVs in Phase 1 are illustrative stubs, labeled as such." />;
    }
    return (
      <div className="table-wrap card">
        <table>
          <thead>
            <tr>
              <th>Player</th>
              <th>Term</th>
              <th>AAV</th>
              <th>Expiry</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {contracts.map((c) => {
              const player = g.node(c.playerId);
              return (
                <tr key={c.id}>
                  <td>{player ? <Link href={`/players/${player.slug}`}>{player.name}</Link> : c.playerId}</td>
                  <td>
                    {c.seasonStart}–{c.seasonEnd}
                  </td>
                  <td>{usd(c.aavUsd)}</td>
                  <td>{c.expiry ?? "—"}</td>
                  <td>{c.illustrative ? "stub" : ""}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }

  if (section === "cap") {
    const cap = g.capFor(team.id);
    if (!cap) {
      return <EmptyState title="Cap snapshot not seeded" body="Focus clubs carry an illustrative ceiling / committed / space rollup." />;
    }
    return (
      <div className="grid cols-3">
        <div className="card">
          <div className="kicker">Ceiling</div>
          <div className="stat">{usd(cap.ceilingUsd)}</div>
        </div>
        <div className="card">
          <div className="kicker">Committed</div>
          <div className="stat">{usd(cap.committedUsd)}</div>
        </div>
        <div className="card">
          <div className="kicker">Space</div>
          <div className="stat">{usd(cap.spaceUsd)}</div>
        </div>
        {cap.notes ? <p className="muted">{cap.notes}</p> : null}
      </div>
    );
  }

  if (section === "prospects") {
    const prospects = g.prospectsFor(team.id);
    if (prospects.length === 0) {
      return <EmptyState title="Prospect pool empty in-graph" body="Prospect nodes hang off Player + rights_owned_by." />;
    }
    return (
      <div className="grid cols-3">
        {prospects.map((p) => (
          <Link key={p.id} href={`/prospects/${p.slug}`} className="card">
            <div className="kicker">#{p.rank ?? "—"} · {p.eta}</div>
            <h3>{p.name}</h3>
            <p className="muted">{p.leagueHint}</p>
          </Link>
        ))}
      </div>
    );
  }

  if (section === "draft-picks") {
    const picks = g.picksFor(team.id);
    if (picks.length === 0) {
      return <EmptyState title="No draft pick objects" body="Owned and historical picks are first-class. Catalog clubs are empty on purpose." />;
    }
    return (
      <div className="stack">
        {picks.map((p) => (
          <div key={p.id} className="card">
            <div className="kicker">
              {p.year} · round {p.round}
              {p.overall ? ` · ${p.overall} overall` : ""}
            </div>
            <h3>{p.name}</h3>
          </div>
        ))}
      </div>
    );
  }

  if (section === "schedule") {
    const games = g.gamesFor(team.id);
    if (games.length === 0) {
      return <EmptyState title="Schedule shell" body="Games are graph objects. Full 82-game ingest is a later phase; a few stubs exist for focus clubs." />;
    }
    return (
      <div className="stack">
        {games.map((game) => (
          <Link key={game.id} href={`/games/${game.slug}`} className="card">
            <div className="kicker">
              {game.status} · {when(game.startsAt)}
            </div>
            <h3>{game.name}</h3>
          </Link>
        ))}
      </div>
    );
  }

  if (section === "standings") {
    const row = g.standingFor(team.id);
    const peers = g
      .nhlTeams()
      .filter((t) => t.division === team.division)
      .map((t) => ({ team: t, row: g.standingFor(t.id) }))
      .sort((a, b) => (b.row?.pts ?? 0) - (a.row?.pts ?? 0));
    return (
      <div className="table-wrap card">
        <table>
          <thead>
            <tr>
              <th>Team</th>
              <th>GP</th>
              <th>W</th>
              <th>L</th>
              <th>OTL</th>
              <th>PTS</th>
            </tr>
          </thead>
          <tbody>
            {peers.map(({ team: t, row: r }) => (
              <tr key={t.id} className={t.id === team.id ? "focus-row" : undefined}>
                <td>
                  <Link href={`/nhl/${t.slug}`}>{t.name}</Link>
                </td>
                <td>{r?.gp ?? "—"}</td>
                <td>{r?.w ?? "—"}</td>
                <td>{r?.l ?? "—"}</td>
                <td>{r?.otl ?? "—"}</td>
                <td>{r?.pts ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {!row ? <p className="muted">This club is still waiting on a standing row.</p> : null}
      </div>
    );
  }

  const txs = g.transactionsFor(team.id);
  if (txs.length === 0) {
    return <EmptyState title="No transactions seeded" body="Trades, signings, recalls are Transaction nodes with player + club edges." />;
  }
  return (
    <div className="stack">
      {txs.map((t) => (
        <div key={t.id} className="card">
          <div className="kicker">{t.kind} · {t.date}</div>
          <h3>
            <Link href={entityHref("transaction", t.slug)}>{t.name}</Link>
          </h3>
          <p className="muted">{t.notes}</p>
        </div>
      ))}
    </div>
  );
}
