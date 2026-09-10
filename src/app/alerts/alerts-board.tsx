"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { readFollows, type FollowTarget } from "@/lib/follow-storage";

export function AlertsBoard({ targets }: { targets: FollowTarget[] }) {
  const [ids, setIds] = useState<string[]>([]);
  useEffect(() => {
    setIds(readFollows());
  }, []);

  const followed = targets.filter((t) => ids.includes(t.slug));

  return (
    <div className="stack" style={{ marginTop: 24 }}>
      <div className="card">
        <div className="kicker">Follows · this browser</div>
        <h2>Watching {followed.length} Team {followed.length === 1 ? "object" : "objects"}</h2>
        {followed.length === 0 ? (
          <p className="muted">
            No follows yet. Chip a club on <Link href="/my-hockey">My Hockey</Link>. Alerts will bind to those IDs — not
            to a second notification warehouse.
          </p>
        ) : (
          <div className="row">
            {followed.map((t) => (
              <Link key={t.slug} className="chip" href={t.href}>
                {t.abbreviation}
              </Link>
            ))}
          </div>
        )}
      </div>
      <div className="empty">
        <strong>No alert objects yet</strong>
        Injury, Transaction, and Game-status nodes for followed teams will land here. This stub does not invent a
        notification, a score, or a stream.
      </div>
    </div>
  );
}
