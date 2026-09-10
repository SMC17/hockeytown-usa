import Link from "next/link";
import { SiteChrome } from "@/components/chrome";
import { buildHockeyGraphSeedEnvelope } from "@/graph/seed/vault-payload";

export const metadata = { title: "Vault sync" };

export default function VaultSyncPage() {
  const count = buildHockeyGraphSeedEnvelope().entityCount;
  return (
    <SiteChrome>
      <div className="kicker">Docs · vault-sync</div>
      <h1>hockey-graph-seed.json is wired ({count} entities).</h1>
      <p className="lede">
        The committed file at <code>content/vault/hockey-graph-seed.json</code> is ingested when present. New IDs merge.
        Existing in-repo IDs win (focus-six rosters and lines stay in TypeScript). No invented live game stats.
      </p>
      <div className="card" style={{ marginTop: 24 }}>
        <h2>Drop path</h2>
        <p>
          Missing file = no-op. Rebuild with <code>npx tsx scripts/write-hockey-graph-seed.ts</code>. Example shape (3
          objects): <code>content/vault/hockey-graph-seed.example.json</code>. Notes: <code>docs/VAULT_SYNC.md</code>.
        </p>
      </div>
      <div className="card">
        <h2>Envelope</h2>
        <pre>
          {`{
  "export": "hockey-graph-seed",
  "version": 1,
  "generatedAt": "2026-09-10T00:00:00.000Z",
  "entityCount": ${count},
  "entities": [{ "id": "player:…", "type": "player", "slug": "…", "name": "…", "props": {} }],
  "edges": [{ "type": "committed_to", "from": "player:…", "to": "team:…" }]
}`}
        </pre>
        <p className="muted">
          This seed covers 32 NHL clubs, focus-six AHL (Hamilton Hammers for NYI — not Bridgeport), NCAA beachheads plus
          women&apos;s Wisc/Minn/OSU, named players, and seven held frameworks (empty bodies in JSON).
        </p>
      </div>
      <div className="card">
        <h2>Held vs this file</h2>
        <p>
          Vault JSON is entities and edges. Held newsroom copy is <code>status: held</code> in{" "}
          <code>content/held/</code> — see <Link href="/docs/held">/docs/held</Link>. Do not paste private vault prose
          into a published article.
        </p>
      </div>
      <div className="card">
        <h2>What will not be invented</h2>
        <ul>
          <li>Live boxscores. Imported games stay scheduled, scores stripped.</li>
          <li>Fake players to pad a historical 106 count.</li>
          <li>Cap math or licensed video.</li>
        </ul>
      </div>
    </SiteChrome>
  );
}
