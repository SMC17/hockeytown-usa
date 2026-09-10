import { SiteChrome } from "@/components/chrome";
import { ProspectsBoard } from "@/components/league-indexes";

export const metadata = {
  title: "NHL prospects",
  description: "League-wide NHL prospect objects.",
  alternates: { canonical: "/nhl/prospects" },
};

export default function NhlProspectsPage() {
  return (
    <SiteChrome>
      <div className="kicker">NHL · Prospects</div>
      <h1>League prospect pool</h1>
      <p className="lede">Per-club boards: /nhl/[team]/prospects.</p>
      <div style={{ marginTop: 24 }}>
        <ProspectsBoard />
      </div>
    </SiteChrome>
  );
}
