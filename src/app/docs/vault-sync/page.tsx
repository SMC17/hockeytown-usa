import Link from "next/link";
import { SiteChrome } from "@/components/chrome";
import { VAULT_SEED_ENTITY_COUNT } from "@/graph/types";

export const metadata = { title: "Vault sync" };

export default function VaultSyncPage() {
  return (
    <SiteChrome>
      <div className="kicker">Docs · vault-sync</div>
      <h1>Import hockey-graph-seed ({VAULT_SEED_ENTITY_COUNT} entities).</h1>
      <p className="lede">
        Drop a vault export at <code>content/vault/hockey-graph-seed.json</code>. The loader stub validates the envelope
        and merges <em>new</em> IDs. It does not invent the {VAULT_SEED_ENTITY_COUNT} entities or live game stats.
      </p>
      <div className="card" style={{ marginTop: 24 }}>
        <h2>Drop path</h2>
        <p>
          Missing file = no-op. Example shape (3 objects, not the dump):{" "}
          <code>content/vault/hockey-graph-seed.example.json</code>. In-repo notes: <code>docs/VAULT_SYNC.md</code>.
        </p>
      </div>
      <div className="card">
        <h2>Envelope</h2>
        <pre>
          {`{
  "export": "hockey-graph-seed",
  "version": 1,
  "generatedAt": "2026-09-10T00:00:00.000Z",
  "entityCount": ${VAULT_SEED_ENTITY_COUNT},
  "entities": [{ "id": "player:…", "type": "player", "slug": "…", "name": "…", "props": {} }],
  "edges": [{ "type": "committed_to", "from": "player:…", "to": "team:…" }]
}`}
        </pre>
        <p className="muted">
          Production <code>entityCount</code> is {VAULT_SEED_ENTITY_COUNT}. The example fixture uses 3 so tests can parse
          the shape without a private dump.
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
          <li>Fake players to pad the count to {VAULT_SEED_ENTITY_COUNT}.</li>
          <li>Cap math or licensed video.</li>
        </ul>
      </div>
    </SiteChrome>
  );
}
