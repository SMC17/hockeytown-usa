"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { readFollows, writeFollows, type FollowTarget } from "@/lib/follow-storage";

export function FollowChips({ groups }: { groups: { label: string; items: FollowTarget[] }[] }) {
  const [ids, setIds] = useState<string[]>([]);
  useEffect(() => {
    setIds(readFollows());
  }, []);

  function toggle(slug: string) {
    setIds((prev) => {
      const next = prev.includes(slug) ? prev.filter((x) => x !== slug) : [...prev, slug];
      writeFollows(next);
      return next;
    });
  }

  const all = groups.flatMap((g) => g.items);
  const followed = all.filter((t) => ids.includes(t.slug));

  return (
    <div className="stack">
      <div className="card">
        <h2>Following</h2>
        {followed.length === 0 ? (
          <p className="muted">
            No chips yet. Phase 1 stores follows in this browser (localStorage). One identity service later reads the same
            Player / Team IDs.
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
      {groups.map((group) => (
        <div key={group.label} className="stack">
          <h2>{group.label}</h2>
          <div className="row">
            {group.items.map((t) => {
              const on = ids.includes(t.slug);
              return (
                <button
                  key={t.slug}
                  type="button"
                  className={on ? "chip" : "chip missing"}
                  onClick={() => toggle(t.slug)}
                  aria-pressed={on}
                >
                  {t.abbreviation}
                  <span className="muted">{on ? " · following" : " · follow"}</span>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
