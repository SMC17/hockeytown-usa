import Link from "next/link";
import { SiteChrome } from "@/components/chrome";
import { getGraph, isCollegeHub } from "@/graph/query";
import { teamHref } from "@/graph/ids";
import type { Commitment, Transfer } from "@/graph/types";

export const metadata = { title: "College hockey" };

export default function CollegePage() {
  const g = getGraph();
  const hubs = g.collegeHubs();
  const rest = g.collegeTeams().filter((t) => !isCollegeHub(t.slug) && !t.slug.endsWith("-women"));
  const women = g.collegeTeams().filter((t) => t.slug.endsWith("-women"));
  const commitments = g.ofType<Commitment>("commitment");
  const transfers = g.ofType<Transfer>("transfer");

  return (
    <SiteChrome>
      <div className="kicker">College · flagship stub</div>
      <h1>The pipeline is part of the OS.</h1>
      <p className="lede">
        Seven program hubs — Michigan, Minnesota, Boston University, Boston College, North Dakota, Quinnipiac, Wisconsin —
        share a mini-OS with Latest, Roster, Commits, and Pipeline. Denver stays deep. Hometown Michigan clubs stay on the
        same graph. Penn State is catalog because McKenna&apos;s commitment needs a seat, not an eighth flagship.
      </p>
      <h2 style={{ marginTop: 28 }}>Program hubs</h2>
      <div className="grid cols-3">
        {hubs.map((t) => (
          <Link key={t.id} href={teamHref(t)} className="card">
            <div className="kicker">
              {t.abbreviation} · hub{t.hometown ? " · hometown" : ""}
            </div>
            <h3>{t.name}</h3>
            <p className="muted">{t.division} · {t.city}</p>
          </Link>
        ))}
      </div>
      <h2 style={{ marginTop: 28 }}>Catalog schools</h2>
      <div className="grid cols-3">
        {rest.map((t) => (
          <Link key={t.id} href={teamHref(t)} className="card">
            <div className="kicker">
              {t.abbreviation}
              {t.hometown ? " · hometown" : ""}
            </div>
            <h3>{t.name}</h3>
            <p className="muted">{t.city}</p>
          </Link>
        ))}
      </div>
      {women.length > 0 ? (
        <>
          <h2 style={{ marginTop: 28 }}>Women&apos;s programs</h2>
          <p className="muted">Same Team type. Catalog seats — Wisconsin, Minnesota, Ohio State. No invented rosters.</p>
          <div className="grid cols-3">
            {women.map((t) => (
              <Link key={t.id} href={teamHref(t)} className="card">
                <div className="kicker">{t.abbreviation} · W</div>
                <h3>{t.name}</h3>
                <p className="muted">{t.division} · {t.city}</p>
              </Link>
            ))}
          </div>
        </>
      ) : null}
      <div className="grid cols-2" style={{ marginTop: 16 }}>
        <div className="card">
          <h2>Commitments</h2>
          {commitments.map((c) => (
            <p key={c.id}>{c.name}</p>
          ))}
        </div>
        <div className="card">
          <h2>Portal</h2>
          {transfers.map((t) => (
            <p key={t.id}>{t.name}</p>
          ))}
          <p className="muted">Full portal ingest is a later phase. Transfer nodes exist without inventing movement.</p>
        </div>
      </div>
    </SiteChrome>
  );
}
