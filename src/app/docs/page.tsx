import Link from "next/link";
import { SiteChrome } from "@/components/chrome";

export const metadata = { title: "Docs" };

export default function DocsPage() {
  return (
    <SiteChrome>
      <div className="kicker">Internal</div>
      <h1>Hockey Graph docs</h1>
      <p className="lede">
        Hockeytown USA is the company. Hockey Graph is the knowledge layer. National OS first; hometown texture is a front
        end, not a fork.
      </p>
      <div className="card" style={{ marginTop: 24 }}>
        <h2>Relationship</h2>
        <p>
          One newsroom, one data infra, one CMS, one identity, many front ends. Articles mention objects; objects keep
          edges. In-repo notes: <code>docs/HOCKEY_GRAPH.md</code>.
        </p>
      </div>
      <div className="card">
        <h2>Phases 0–14</h2>
        <p className="muted">
          0 map · 1 this foundation · 2 live ingest · 3 desk CMS · 4 identity · 5 college pipeline · 6 PWHL depth · 7 cap
          math · 8 rights-safe video · 9 analyze · 10 many front ends · 11 agents · 12 provenance · 13 Hockeytown regional
          skin · 14 operating company. Full table in <code>docs/PHASES.md</code>.
        </p>
      </div>
      <div className="card">
        <h2>Rights</h2>
        <p>
          No pirated highlights. Video nodes are official, licensed, or <code>none</code> — and <code>none</code> never
          gets a player. See <code>docs/RIGHTS.md</code>.
        </p>
      </div>
      <div className="card">
        <h2>Strategy + HELD</h2>
        <p>
          <Link href="/docs/strategy">/docs/strategy</Link> covers phases, rights, focus teams, and the public HELD
          policy. Held copy rules: <Link href="/docs/held">/docs/held</Link>.
        </p>
      </div>
      <div className="card">
        <h2>Focus teams</h2>
        <p>
          Deep stubs: <Link href="/nhl/new-york-islanders">Islanders</Link>,{" "}
          <Link href="/nhl/toronto-maple-leafs">Maple Leafs</Link>,{" "}
          <Link href="/nhl/pittsburgh-penguins">Penguins</Link>, <Link href="/nhl/boston-bruins">Bruins</Link>,{" "}
          <Link href="/nhl/florida-panthers">Panthers</Link>,{" "}
          <Link href="/nhl/tampa-bay-lightning">Lightning</Link>. Detroit is hometown catalog. Details in{" "}
          <code>docs/FOCUS_TEAMS.md</code>.
        </p>
      </div>
    </SiteChrome>
  );
}
