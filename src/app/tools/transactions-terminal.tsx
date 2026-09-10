"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

export type TxRow = {
  id: string;
  slug: string;
  name: string;
  kind: string;
  date: string;
  notes?: string;
  teamSlug?: string;
  teamName?: string;
};

export function TransactionsTerminal({ rows }: { rows: TxRow[] }) {
  const [kind, setKind] = useState("all");
  const [team, setTeam] = useState("all");

  const kinds = useMemo(() => [...new Set(rows.map((r) => r.kind))].sort(), [rows]);
  const teams = useMemo(() => {
    const map = new Map<string, string>();
    for (const r of rows) {
      if (r.teamSlug && r.teamName) map.set(r.teamSlug, r.teamName);
    }
    return [...map.entries()].sort((a, b) => a[1].localeCompare(b[1]));
  }, [rows]);

  const filtered = rows.filter((r) => {
    if (kind !== "all" && r.kind !== kind) return false;
    if (team !== "all" && r.teamSlug !== team) return false;
    return true;
  });

  return (
    <div className="stack" style={{ marginTop: 24 }}>
      <div className="filter-bar">
        <label>
          Kind
          <select value={kind} onChange={(e) => setKind(e.target.value)} aria-label="Filter by transaction kind">
            <option value="all">All kinds</option>
            {kinds.map((k) => (
              <option key={k} value={k}>
                {k}
              </option>
            ))}
          </select>
        </label>
        <label>
          Team
          <select value={team} onChange={(e) => setTeam(e.target.value)} aria-label="Filter by team">
            <option value="all">All seeded clubs</option>
            {teams.map(([slug, name]) => (
              <option key={slug} value={slug}>
                {name}
              </option>
            ))}
          </select>
        </label>
        <span className="muted">
          {filtered.length} of {rows.length} seed Transaction objects
        </span>
      </div>
      {filtered.length === 0 ? (
        <div className="empty">
          <strong>No seed rows match</strong>
          Filters only see Transaction nodes already in the graph. No live wire.
        </div>
      ) : (
        filtered.map((t) => (
          <div key={t.id} className="card">
            <div className="kicker">
              {t.kind} · {t.date}
              {t.teamName ? ` · ${t.teamName}` : ""}
            </div>
            <h3>
              <Link href={`/graph/transaction/${t.slug}`}>{t.name}</Link>
            </h3>
            <p className="muted">{t.notes ?? "Transaction node from seed. No invented live moves."}</p>
          </div>
        ))
      )}
    </div>
  );
}
