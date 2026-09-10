import Link from "next/link";
import { SiteChrome } from "@/components/chrome";
import { getGraph } from "@/graph/query";
import { record } from "@/lib/format";

export const metadata = { title: "NHL" };

export default function NhlIndexPage() {
  const g = getGraph();
  const conferences = ["Eastern", "Western"] as const;

  return (
    <SiteChrome>
      <div className="kicker">NHL</div>
      <h1>Thirty-two clubs. One mini-OS each.</h1>
      <p className="lede">
        Focus coverage is Islanders, Maple Leafs, Penguins, Bruins, Panthers, Lightning. Every other club already has the
        same hub pattern — depth fills in without a redesign.
      </p>
      {conferences.map((conf) => (
        <section key={conf} className="conference">
          <h2>{conf}</h2>
          <div className="grid cols-3">
            {g
              .nhlTeams()
              .filter((t) => t.conference === conf)
              .map((t) => {
                const s = g.standingFor(t.id);
                return (
                  <Link key={t.id} href={`/nhl/${t.slug}`} className="card">
                    <div className="kicker">
                      {t.abbreviation} · {t.division}
                      {t.focus ? " · focus" : ""}
                    </div>
                    <h3>{t.name}</h3>
                    <p className="muted">{s ? `${record(s.w, s.l, s.otl)} · ${s.pts} pts` : "Catalog"}</p>
                  </Link>
                );
              })}
          </div>
        </section>
      ))}
    </SiteChrome>
  );
}
