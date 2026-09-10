import Link from "next/link";
import { SiteChrome } from "@/components/chrome";
import { getGraph } from "@/graph/query";
import { teamHref } from "@/graph/ids";

export const metadata = { title: "PWHL" };

export default function PwhlPage() {
  const teams = getGraph().pwhlTeams();

  return (
    <SiteChrome>
      <div className="kicker">PWHL · first class</div>
      <h1>Women&apos;s pro is not a sidecar.</h1>
      <p className="lede">
        Eight 2025-26 clubs, including Seattle Torrent and Vancouver Goldeneyes. Same Team type as the NHL — first-class
        in the nav, not a blog tag. Club hubs live at <code>/pwhl/[slug]</code>. No live game video on this stub.
      </p>
      <div className="grid cols-4" style={{ marginTop: 24 }}>
        {teams.map((t) => (
          <Link key={t.id} href={teamHref(t)} className="card">
            <div className="kicker">{t.abbreviation}</div>
            <h3>{t.name}</h3>
            <p className="muted">{t.city}</p>
          </Link>
        ))}
      </div>
    </SiteChrome>
  );
}
