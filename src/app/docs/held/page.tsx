import Link from "next/link";
import { SiteChrome } from "@/components/chrome";

export const metadata = { title: "HELD policy" };

export default function HeldPolicyPage() {
  return (
    <SiteChrome>
      <div className="kicker">Docs · HELD</div>
      <h1>Held is a status, not a folder.</h1>
      <p className="lede">
        Five vault-aligned articles exist in the graph with <code>status: held</code>. They are linked to entity IDs.
        They are not on the public newsroom.
      </p>
      <div className="card" style={{ marginTop: 24 }}>
        <h2>Public</h2>
        <ul>
          <li>Omitted from /articles, Now, Discover, team Latest, sitemap.</li>
          <li>
            Direct <code>/articles/[slug]</code>: title, dek, mentions, gate. No body. noindex.
          </li>
          <li>/api/graph strips held bodies.</li>
        </ul>
      </div>
      <div className="card">
        <h2>Desk</h2>
        <p>
          Queue on <Link href="/use">/use</Link>. Bodies at <code>/use/held/[slug]</code>.
        </p>
      </div>
      <div className="card">
        <h2>Titles in this seed</h2>
        <ol>
          <li>Pipeline Calibration Window</li>
          <li>Four-Game Filter</li>
          <li>Window Contract</li>
          <li>Hub Restore</li>
          <li>Interior Tax</li>
        </ol>
        <p className="muted">
          Original conceptual shells aligned to McKenna, Crosby, Barkov, Brady Tkachuk, Markstrom, Eiserman, Sturm. Entity
          JSON is a different path: <Link href="/docs/vault-sync">/docs/vault-sync</Link>.
        </p>
      </div>
    </SiteChrome>
  );
}
