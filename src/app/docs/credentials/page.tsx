import Link from "next/link";
import { SiteChrome } from "@/components/chrome";

export const metadata = { title: "Media credentials" };

export default function CredentialsPage() {
  return (
    <SiteChrome>
      <div className="kicker">Docs · credentials</div>
      <h1>Access is requested. Footage is not stolen.</h1>
      <p className="lede">
        Hockeytown USA / Hockey Graph seeks official media credentials through league and club channels. This page is a
        posture stub — not a claim of access, and not a workaround for rights.
      </p>
      <div className="card" style={{ marginTop: 24 }}>
        <h2>What we ask for</h2>
        <ul>
          <li>Season or event credentials via NHL, AHL, NCAA, and PWHL official processes.</li>
          <li>Still photography and official stills where the credential allows.</li>
          <li>Quote collection as desk objects with <code>sourced_from</code> edges.</li>
        </ul>
      </div>
      <div className="card">
        <h2>What we will not do</h2>
        <ul>
          <li>Pirate or embed unofficial game streams (ESPN / TNT / Prime fragmentation is editorial context only).</li>
          <li>Render a <code>Video</code> node with <code>rights: none</code>.</li>
          <li>Imply live NHL rights footage on Map, Watch Guides, or My Hockey.</li>
          <li>Publish held framework bodies to public consumers.</li>
        </ul>
      </div>
      <p className="muted">
        See <Link href="/watch">Watch Guides</Link>, <Link href="/docs/held">HELD</Link>, and{" "}
        <code>docs/RIGHTS.md</code>.
      </p>
    </SiteChrome>
  );
}
