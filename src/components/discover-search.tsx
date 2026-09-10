"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { GraphNode } from "@/graph/types";

export function DiscoverSearch({
  nodes,
}: {
  nodes: { id: string; type: GraphNode["type"]; slug: string; name: string; summary?: string; href: string }[];
}) {
  const [q, setQ] = useState("");
  const hits = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return nodes.slice(0, 18);
    return nodes
      .filter((n) => `${n.name} ${n.slug} ${n.summary ?? ""} ${n.type}`.toLowerCase().includes(needle))
      .slice(0, 30);
  }, [nodes, q]);

  return (
    <div className="stack">
      <input
        className="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search players, teams, articles, coaches…"
        aria-label="Search the Hockey Graph"
      />
      <div className="grid cols-3">
        {hits.map((n) => (
          <Link key={n.id} href={n.href} className="card">
            <div className="kicker">{n.type}</div>
            <h3>{n.name}</h3>
            {n.summary ? <p className="muted">{n.summary}</p> : null}
          </Link>
        ))}
      </div>
    </div>
  );
}
