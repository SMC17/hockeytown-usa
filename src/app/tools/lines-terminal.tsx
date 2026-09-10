"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

export type LineRow = {
  id: string;
  teamSlug: string;
  teamName: string;
  teamAbbr: string;
  unit: string;
  label?: string;
  players: { slug: string; name: string }[];
};

export function LinesTerminal({ rows }: { rows: LineRow[] }) {
  const [team, setTeam] = useState("all");
  const [unit, setUnit] = useState("all");

  const teams = useMemo(() => {
    const map = new Map<string, string>();
    for (const r of rows) map.set(r.teamSlug, r.teamName);
    return [...map.entries()].sort((a, b) => a[1].localeCompare(b[1]));
  }, [rows]);
  const units = useMemo(() => [...new Set(rows.map((r) => r.unit))], [rows]);

  const filtered = rows.filter((r) => {
    if (team !== "all" && r.teamSlug !== team) return false;
    if (unit !== "all" && r.unit !== unit) return false;
    return true;
  });

  return (
    <div className="stack" style={{ marginTop: 24 }}>
      <div className="filter-bar">
        <label>
          Club
          <select value={team} onChange={(e) => setTeam(e.target.value)} aria-label="Filter lines by team">
            <option value="all">All focus clubs</option>
            {teams.map(([slug, name]) => (
              <option key={slug} value={slug}>
                {name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Unit
          <select value={unit} onChange={(e) => setUnit(e.target.value)} aria-label="Filter by line unit">
            <option value="all">All units</option>
            {units.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>
        </label>
        <span className="muted">
          {filtered.length} of {rows.length} LineAssignment records
        </span>
      </div>
      <div className="line-board">
        {filtered.map((row) => (
          <div key={row.id} className="line-unit">
            <div className="unit">
              {row.teamAbbr} · {row.unit}
              {row.label ? ` · ${row.label}` : ""}
            </div>
            <p>
              <Link href={`/nhl/${row.teamSlug}/lines`}>{row.teamName}</Link>
            </p>
            {row.players.map((p) => (
              <p key={p.slug}>
                <Link href={`/players/${p.slug}`}>{p.name}</Link>
              </p>
            ))}
          </div>
        ))}
      </div>
      {filtered.length === 0 ? (
        <div className="empty">
          <strong>No seed units match</strong>
          Filters read LineAssignment rows already seeded on the focus six. No broadcast scrape.
        </div>
      ) : null}
    </div>
  );
}
