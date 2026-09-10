import { SiteChrome } from "@/components/chrome";
import { ProspectsBoard } from "@/components/league-indexes";

export const metadata = {
  title: "NHL prospects",
  description: "Prospect objects across Hockey Graph.",
  alternates: { canonical: "/prospects" },
};

export default function ProspectsIndexPage() {
  return (
    <SiteChrome>
      <div className="kicker">SEO · Prospects</div>
      <h1>Prospect pool</h1>
      <p className="lede">Prospect nodes hang off Player + Team. Entity pages live at /prospects/[slug].</p>
      <div style={{ marginTop: 24 }}>
        <ProspectsBoard />
      </div>
    </SiteChrome>
  );
}
