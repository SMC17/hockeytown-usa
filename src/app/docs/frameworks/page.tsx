import Link from "next/link";
import { HeldFrameworksList } from "@/components/held-frameworks";
import { SiteChrome } from "@/components/chrome";

export const metadata = {
  title: "Held frameworks",
  robots: { index: false, follow: false },
};

export default function FrameworksPage() {
  return (
    <SiteChrome mode="use">
      <div className="kicker">Internal · newsroom</div>
      <h1>Held frameworks stay on the desk.</h1>
      <p className="lede">
        Public consumers see a gate — title, dek, mentions. Bodies live at <code>/use/held/[slug]</code>. Status is{" "}
        <code>held</code> until the desk publishes. These are original conceptual shells, not a private vault dump.
      </p>
      <p className="muted">
        Policy: <Link href="/docs/held">/docs/held</Link>. Alias: <Link href="/newsroom">/newsroom</Link>.
      </p>
      <HeldFrameworksList />
    </SiteChrome>
  );
}
