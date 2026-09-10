import Link from "next/link";
import { SiteChrome } from "@/components/chrome";
import { getGraph, isCollegeHub } from "@/graph/query";
import { teamHref } from "@/graph/ids";
import { COLLEGE_HUB_SLUGS } from "@/graph/types";
import type { Commitment, Team, Transfer } from "@/graph/types";

export const metadata = { title: "College hockey" };

export default function CollegePage() {
  const g = getGraph();
  const hubs = COLLEGE_HUB_SLUGS.map((slug) => g.teamBySlug(slug)).filter((t): t is Team => Boolean(t));
  const rest = g.collegeTeams().filter((t) => !isCollegeHub(t.slug) && !t.slug.endsWith("-women"));
  const women = g.collegeTeams().filter((t) => t.slug.endsWith("-women"));
  const commitments = g.ofType<Commitment>("commitment");
  const transfers = g.ofType<Transfer>("transfer");

  return (
    <SiteChrome>
      <div className="kicker">College · seven beachheads</div>
      <h1>The pipeline is part of the OS.</h1>
      <p className="lede">
        Seven beachheads share Latest, Roster, Commits, and Pipeline. Denver stays deep but is not a flagship slug.
        Hometown Michigan clubs stay on the same graph. Penn State is catalog because McKenna&apos;s commitment needs a
        seat.
      </p>
      <h2 style={{ marginTop: 28 }}>Seven beachheads</h2>
      <ol className="stack" style={{ paddingLeft: 0, listStyle: "none" }}>
        {hubs.map((t, i) => (
          <li key={t.id} className="card">
            <div className="beachhead-num">
              {String(i + 1).padStart(2, "0")} · {t.abbreviation}
              {t.hometown ? " · hometown" : ""}
            </div>
            <h3>
              <Link href={teamHref(t)}>{t.name}</Link>
            </h3>
            <p className="muted">
              {t.division} · {t.city}
            </p>
            <p className="row">
              <Link href={teamHref(t)}>Latest</Link>
              <Link href={`${teamHref(t)}/roster`}>Roster</Link>
              <Link href={`${teamHref(t)}/commits`}>Commits</Link>
              <Link href={`${teamHref(t)}/pipeline`}>Pipeline</Link>
            </p>
          </li>
        ))}
      </ol>
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
