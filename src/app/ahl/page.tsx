import Link from "next/link";
import { SiteChrome } from "@/components/chrome";
import { getGraph } from "@/graph/query";
import { teamHref } from "@/graph/ids";

export const metadata = { title: "AHL affiliates" };

export default function AhlIndexPage() {
  const g = getGraph();
  const teams = g.ahlTeams();

  return (
    <SiteChrome>
      <div className="kicker">AHL · focus-six affiliates</div>
      <h1>Development clubs are Team objects.</h1>
      <p className="lede">
        Six AHL affiliates hang on the focus clubs via <code>affiliate_of</code>. These pages are seats — empty roster and
        no invented boxscores. Walk them from <Link href="/tools/org-depth">Org Depth</Link> or a parent mini-OS.
      </p>
      <div className="grid cols-3" style={{ marginTop: 24 }}>
        {teams.map((t) => {
          const parent = g.nhlParentFor(t.id);
          return (
            <Link key={t.id} href={teamHref(t)} className="card">
              <div className="kicker">
                {t.abbreviation} · AHL
                {parent ? ` · ${parent.abbreviation}` : ""}
              </div>
              <h3>{t.name}</h3>
              <p className="muted">
                {t.city}
                {parent ? ` · affiliate of ${parent.name}` : ""}
              </p>
            </Link>
          );
        })}
      </div>
    </SiteChrome>
  );
}
