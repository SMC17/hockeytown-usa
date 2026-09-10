import { nhlTeams } from "./catalog";
import { FOCUS_AHL_AFFILIATES } from "../types";
import type { VaultExportEdge, VaultExportEntity, VaultExportEnvelope } from "../vault-import";

export const HELD_FRAMEWORKS = [
  { slug: "pipeline-calibration-window", title: "Pipeline Calibration Window", dek: "NCAA calendars and NHL rights are not the same clock." },
  { slug: "four-game-filter", title: "Four-Game Filter", dek: "Small samples are objects, not vibes." },
  { slug: "window-contract", title: "Window Contract", dek: "Term and availability are separate graph facts." },
  { slug: "hub-restore", title: "Hub Restore", dek: "A bench change is an edge, not a rebrand." },
  { slug: "interior-tax", title: "Interior Tax", dek: "Interior game has a price. Store it as objects." },
  { slug: "seat-auction", title: "Seat Auction", dek: "Roster seats clear against cap objects, not rumors." },
  { slug: "board-market-gap", title: "Board–Market Gap", dek: "What a board will pay and what a market asks are two nodes." },
] as const;

const AHL_META: Record<string, { name: string; abbreviation: string; city: string; region?: string }> = {
  "hamilton-hammers": { name: "Hamilton Hammers", abbreviation: "HAM", city: "Hamilton", region: "ON" },
  "toronto-marlies": { name: "Toronto Marlies", abbreviation: "TOR", city: "Toronto", region: "ON" },
  "wbs-penguins": { name: "Wilkes-Barre/Scranton Penguins", abbreviation: "WBS", city: "Wilkes-Barre", region: "PA" },
  "providence-bruins": { name: "Providence Bruins", abbreviation: "PRO", city: "Providence", region: "RI" },
  "springfield-thunderbirds": { name: "Springfield Thunderbirds", abbreviation: "SPR", city: "Springfield", region: "MA" },
  "syracuse-crunch": { name: "Syracuse Crunch", abbreviation: "SYR", city: "Syracuse", region: "NY" },
};

const NCAA_BEACHHEADS = [
  { slug: "boston-university-terriers", name: "Boston University Terriers", abbreviation: "BU", city: "Boston", region: "MA", division: "Hockey East" },
  { slug: "boston-college-eagles", name: "Boston College Eagles", abbreviation: "BC", city: "Chestnut Hill", region: "MA", division: "Hockey East" },
  { slug: "michigan-wolverines", name: "Michigan Wolverines", abbreviation: "MICH", city: "Ann Arbor", region: "MI", division: "Big Ten" },
  { slug: "minnesota-golden-gophers", name: "Minnesota Golden Gophers", abbreviation: "MINN", city: "Minneapolis", region: "MN", division: "Big Ten" },
  { slug: "north-dakota-fighting-hawks", name: "North Dakota Fighting Hawks", abbreviation: "UND", city: "Grand Forks", region: "ND", division: "NCHC" },
  { slug: "quinnipiac-bobcats", name: "Quinnipiac Bobcats", abbreviation: "QU", city: "Hamden", region: "CT", division: "ECAC" },
  { slug: "wisconsin-badgers", name: "Wisconsin Badgers", abbreviation: "WISC", city: "Madison", region: "WI", division: "Big Ten" },
];

const NCAA_WOMEN = [
  { slug: "wisconsin-badgers-women", name: "Wisconsin Badgers (W)", abbreviation: "WISC-W", city: "Madison", region: "WI", division: "WCHA" },
  { slug: "minnesota-golden-gophers-women", name: "Minnesota Golden Gophers (W)", abbreviation: "MINN-W", city: "Minneapolis", region: "MN", division: "WCHA" },
  { slug: "ohio-state-buckeyes-women", name: "Ohio State Buckeyes (W)", abbreviation: "OSU-W", city: "Columbus", region: "OH", division: "WCHA" },
];

const NAMED_PLAYERS = [
  { slug: "gavin-mckenna", firstName: "Gavin", lastName: "McKenna", position: "LW", shootsCatches: "L", team: "penn-state-nittany-lions" },
  { slug: "sidney-crosby", firstName: "Sidney", lastName: "Crosby", position: "C", shootsCatches: "L", team: "pittsburgh-penguins" },
  { slug: "aleksander-barkov", firstName: "Aleksander", lastName: "Barkov", position: "C", shootsCatches: "L", team: "florida-panthers" },
  { slug: "brady-tkachuk", firstName: "Brady", lastName: "Tkachuk", position: "LW", shootsCatches: "L", team: "ottawa-senators" },
  { slug: "jacob-markstrom", firstName: "Jacob", lastName: "Markstrom", position: "G", shootsCatches: "L", team: "new-jersey-devils" },
  { slug: "cole-eiserman", firstName: "Cole", lastName: "Eiserman", position: "LW", shootsCatches: "L", team: "boston-university-terriers" },
  { slug: "chris-kreider", firstName: "Chris", lastName: "Kreider", position: "LW", shootsCatches: "L", team: "new-york-rangers" },
  { slug: "matthew-knies", firstName: "Matthew", lastName: "Knies", position: "LW", shootsCatches: "L", team: "toronto-maple-leafs" },
  { slug: "jeremy-swayman", firstName: "Jeremy", lastName: "Swayman", position: "G", shootsCatches: "L", team: "boston-bruins" },
  { slug: "jj-peterka", firstName: "JJ", lastName: "Peterka", position: "RW", shootsCatches: "L", team: "buffalo-sabres" },
  { slug: "sergei-bobrovsky", firstName: "Sergei", lastName: "Bobrovsky", position: "G", shootsCatches: "L", team: "florida-panthers" },
];

function entity(
  type: VaultExportEntity["type"],
  slug: string,
  name: string,
  props: Record<string, unknown> = {},
): VaultExportEntity {
  return { id: `${type}:${slug}`, type, slug, name, props };
}

/** Portable seed envelope. No live scores. Held article bodies are empty in JSON (desk uses MDX). */
export function buildHockeyGraphSeedEnvelope(): VaultExportEnvelope {
  const entities: VaultExportEntity[] = [];
  const edges: VaultExportEdge[] = [];

  entities.push(
    entity("league", "nhl", "National Hockey League", { abbreviation: "NHL", level: "pro", country: "US/CA" }),
    entity("league", "ahl", "American Hockey League", { abbreviation: "AHL", level: "minor", country: "US/CA" }),
    entity("league", "ncaa", "NCAA Division I Ice Hockey", { abbreviation: "NCAA", level: "college", country: "US" }),
  );

  for (const t of nhlTeams) {
    entities.push(
      entity("team", t.slug, t.name, {
        abbreviation: t.abbreviation,
        city: t.city,
        leagueId: "league:nhl",
        conference: t.conference,
        division: t.division,
        primaryColor: t.primaryColor,
        secondaryColor: t.secondaryColor,
        coverage: t.coverage,
        focus: t.focus ?? false,
        hometown: t.hometown ?? false,
      }),
    );
  }

  for (const { ahl, nhl } of FOCUS_AHL_AFFILIATES) {
    const meta = AHL_META[ahl];
    if (!meta) continue;
    entities.push(
      entity("team", ahl, meta.name, {
        abbreviation: meta.abbreviation,
        city: meta.city,
        region: meta.region,
        leagueId: "league:ahl",
        primaryColor: "#111111",
        secondaryColor: "#eeeeee",
        coverage: "catalog",
        summary:
          ahl === "hamilton-hammers"
            ? "New York Islanders AHL affiliate (not Bridgeport). Catalog seat — no invented boxscores."
            : `${meta.name} AHL affiliate of ${nhl}. Catalog seat — no invented boxscores.`,
      }),
    );
    edges.push({ type: "affiliate_of", from: `team:${ahl}`, to: `team:${nhl}` });
  }

  for (const t of NCAA_BEACHHEADS) {
    entities.push(
      entity("team", t.slug, t.name, {
        abbreviation: t.abbreviation,
        city: t.city,
        region: t.region,
        leagueId: "league:ncaa",
        division: t.division,
        primaryColor: "#111111",
        secondaryColor: "#eeeeee",
        coverage: "deep",
      }),
    );
  }

  for (const t of NCAA_WOMEN) {
    entities.push(
      entity("team", t.slug, t.name, {
        abbreviation: t.abbreviation,
        city: t.city,
        region: t.region,
        leagueId: "league:ncaa",
        division: t.division,
        primaryColor: "#111111",
        secondaryColor: "#eeeeee",
        coverage: "catalog",
        summary: "Women's program seat on the same Team type. Catalog — no invented roster or scores.",
      }),
    );
  }

  for (const p of NAMED_PLAYERS) {
    entities.push(
      entity("player", p.slug, `${p.firstName} ${p.lastName}`, {
        firstName: p.firstName,
        lastName: p.lastName,
        position: p.position,
        shootsCatches: p.shootsCatches,
        summary: "Named vault player. No invented counting stats.",
      }),
    );
    edges.push({ type: "played_for", from: `player:${p.slug}`, to: `team:${p.team}`, extra: "vault-seed" });
  }

  edges.push({ type: "committed_to", from: "player:gavin-mckenna", to: "team:penn-state-nittany-lions", extra: "vault-seed" });
  edges.push({ type: "committed_to", from: "player:cole-eiserman", to: "team:boston-university-terriers", extra: "vault-seed" });
  edges.push({ type: "rights_owned_by", from: "player:cole-eiserman", to: "team:new-york-islanders", extra: "vault-seed" });
  edges.push({ type: "drafted_by", from: "player:cole-eiserman", to: "team:new-york-islanders", extra: "vault-seed" });

  entities.push(
    entity("team", "penn-state-nittany-lions", "Penn State Nittany Lions", {
      abbreviation: "PSU",
      city: "University Park",
      region: "PA",
      leagueId: "league:ncaa",
      division: "Big Ten",
      primaryColor: "#041E42",
      secondaryColor: "#FFFFFF",
      coverage: "catalog",
    }),
  );

  const mentionSets: Record<(typeof HELD_FRAMEWORKS)[number]["slug"], string[]> = {
    "pipeline-calibration-window": ["player:gavin-mckenna", "player:cole-eiserman", "team:penn-state-nittany-lions"],
    "four-game-filter": ["player:sidney-crosby", "team:pittsburgh-penguins"],
    "window-contract": ["player:aleksander-barkov", "team:florida-panthers"],
    "hub-restore": ["coach:marco-sturm", "team:boston-bruins"],
    "interior-tax": ["player:brady-tkachuk", "player:jacob-markstrom"],
    "seat-auction": ["player:sergei-bobrovsky", "player:aleksander-barkov", "team:florida-panthers"],
    "board-market-gap": ["player:chris-kreider", "player:matthew-knies", "team:new-york-rangers", "team:toronto-maple-leafs"],
  };

  for (const fw of HELD_FRAMEWORKS) {
    entities.push(
      entity("article", fw.slug, fw.title, {
        dek: fw.dek,
        body: "",
        publishedAt: "2026-09-10T15:00:00Z",
        author: "Hockeytown USA desk",
        status: "held",
        section: "use",
        heroKicker: "Held",
        mentions: mentionSets[fw.slug].map((entityId) => ({ entityId })),
      }),
    );
    for (const entityId of mentionSets[fw.slug]) {
      edges.push({ type: "mentioned_in", from: entityId, to: `article:${fw.slug}`, extra: fw.slug });
    }
  }

  return {
    export: "hockey-graph-seed",
    version: 1,
    generatedAt: "2026-09-10T22:00:00.000Z",
    entityCount: entities.length,
    entities,
    edges,
  };
}
