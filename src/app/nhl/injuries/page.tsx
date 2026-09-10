import { SiteChrome } from "@/components/chrome";
import { InjuriesBoard } from "@/components/league-indexes";

export const metadata = {
  title: "NHL injuries",
  description: "League-wide NHL injury board.",
  alternates: { canonical: "/nhl/injuries" },
};

export default function NhlInjuriesPage() {
  return (
    <SiteChrome>
      <div className="kicker">NHL · Injuries</div>
      <h1>League injury board</h1>
      <p className="lede">Same objects as /injuries. Team boards: /nhl/[team]/injuries.</p>
      <div style={{ marginTop: 24 }}>
        <InjuriesBoard />
      </div>
    </SiteChrome>
  );
}
