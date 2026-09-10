import { SiteChrome } from "@/components/chrome";
import Link from "next/link";

export default function NotFound() {
  return (
    <SiteChrome>
      <div className="kicker">404</div>
      <h1>That object is not in the graph yet.</h1>
      <p className="lede">
        Catalog clubs, empty boards, and future entities share this miss — not a crash. Try the{" "}
        <Link href="/discover">Discover</Link> index or the <Link href="/nhl">NHL map</Link>.
      </p>
    </SiteChrome>
  );
}
