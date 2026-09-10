import Link from "next/link";
import { SiteChrome } from "@/components/chrome";

export const metadata = { title: "Strategy" };

export default function StrategyPage() {
  return (
    <SiteChrome>
      <div className="kicker">Docs · Strategy</div>
      <h1>National OS, one graph, many fronts.</h1>
      <p className="lede">
        Hockeytown USA is the company. Hockey Graph is the knowledge layer. This page is the public strategy stub: phases,
        rights, focus teams, and the HELD policy.
      </p>
      <div className="card" style={{ marginTop: 24 }}>
        <h2>Phases</h2>
        <p>
          0 map · 1 this foundation · 2 live ingest · 3 desk CMS · 4 identity · 5 college pipeline · 6 PWHL depth · 7 cap
          math · 8 rights-safe video · 9 analyze · 10 many front ends · 11 agents · 12 provenance · 13 Hockeytown regional
          skin · 14 operating company.
        </p>
        <p className="muted">
          Full table in <code>docs/PHASES.md</code>. Phase 1 does not wait on ingest to ship URL shape.
        </p>
      </div>
      <div className="card">
        <h2>Rights</h2>
        <p>
          No pirated highlights. Video nodes are official, licensed, or <code>none</code> — and <code>none</code> never
          gets a player. Seed AAVs are labeled illustrative.
        </p>
        <p className="muted">
          See <code>docs/RIGHTS.md</code>.
        </p>
      </div>
      <div className="card">
        <h2>Focus teams</h2>
        <p>
          NHL deep hubs: <Link href="/nhl/new-york-islanders">Islanders</Link>,{" "}
          <Link href="/nhl/toronto-maple-leafs">Maple Leafs</Link>, <Link href="/nhl/pittsburgh-penguins">Penguins</Link>,{" "}
          <Link href="/nhl/boston-bruins">Bruins</Link>, <Link href="/nhl/florida-panthers">Panthers</Link>,{" "}
          <Link href="/nhl/tampa-bay-lightning">Lightning</Link>. Every mini-OS section is seeded, including PP1/PK1.
        </p>
        <p>
          College hubs: <Link href="/college/michigan-wolverines">Michigan</Link>,{" "}
          <Link href="/college/minnesota-golden-gophers">Minnesota</Link>,{" "}
          <Link href="/college/boston-university-terriers">BU</Link>,{" "}
          <Link href="/college/boston-college-eagles">BC</Link>,{" "}
          <Link href="/college/north-dakota-fighting-hawks">North Dakota</Link>,{" "}
          <Link href="/college/quinnipiac-bobcats">Quinnipiac</Link>,{" "}
          <Link href="/college/wisconsin-badgers">Wisconsin</Link>.
        </p>
        <p className="muted">Detroit is hometown catalog, not a coverage hole.</p>
      </div>
      <div className="card">
        <h2>Public HELD policy</h2>
        <p>
          Held articles are graph objects. They are not published. Public indexes omit them. Direct URLs show a gate, not
          the body. Desk body lives at <code>/use/held/[slug]</code>.
        </p>
        <p>
          <Link href="/docs/held">Read the HELD policy</Link>. Vault JSON import:{" "}
          <Link href="/docs/vault-sync">/docs/vault-sync</Link>.
        </p>
      </div>
    </SiteChrome>
  );
}
