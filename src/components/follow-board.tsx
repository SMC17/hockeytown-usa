"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const KEY = "hockey-graph-follow";

export function FollowBoard({
  teams,
}: {
  teams: { slug: string; name: string; abbreviation: string; focus?: boolean }[];
}) {
  const [ids, setIds] = useState<string[]>([]);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setIds(JSON.parse(raw) as string[]);
    } catch {
      /* ignore */
    }
  }, []);
  function toggle(slug: string) {
    setIds((prev) => {
      const next = prev.includes(slug) ? prev.filter((x) => x !== slug) : [...prev, slug];
      localStorage.setItem(KEY, JSON.stringify(next));
      return next;
    });
  }
  const followed = teams.filter((t) => ids.includes(t.slug));
  return (
    <div className="stack">
      <div className="card">
        <h2>Following</h2>
        {followed.length === 0 ? (
          <p className="muted">No clubs yet. Identity is local to this browser in Phase 1 — one identity service comes later.</p>
        ) : (
          <div className="row">
            {followed.map((t) => (
              <Link key={t.slug} className="chip" href={`/nhl/${t.slug}`}>
                {t.abbreviation}
              </Link>
            ))}
          </div>
        )}
      </div>
      <div className="grid cols-4">
        {teams.map((t) => (
          <button
            key={t.slug}
            type="button"
            className="card"
            onClick={() => toggle(t.slug)}
            style={{ textAlign: "left", cursor: "pointer", color: "inherit" }}
          >
            <div className="kicker">{t.focus ? "Focus" : "NHL"}</div>
            <h3>{t.name}</h3>
            <div className="muted">{ids.includes(t.slug) ? "Following" : "Follow"}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
