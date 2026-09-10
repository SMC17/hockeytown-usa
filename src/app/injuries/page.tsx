import { SiteChrome } from "@/components/chrome";
import { InjuriesBoard } from "@/components/league-indexes";

export const metadata = {
  title: "NHL injuries",
  description: "League-wide injury objects from Hockey Graph.",
  alternates: { canonical: "/injuries" },
};

export default function InjuriesPage() {
  return (
    <SiteChrome>
      <div className="kicker">SEO · Injuries</div>
      <h1>Injury board</h1>
      <p className="lede">Every Injury node currently in the graph. Team URLs remain /nhl/[team]/injuries.</p>
      <div style={{ marginTop: 24 }}>
        <InjuriesBoard />
      </div>
    </SiteChrome>
  );
}
