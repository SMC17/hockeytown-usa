import { NHL_ID, arena, league, season, team } from "./builders";
import { nodeId } from "../ids";
import type { League, Season, StandingRow, Team } from "../types";

export const NHL_CAP_CEILING_2026 = 95_500_000;

export const leagues: League[] = [
  league({
    slug: "nhl",
    name: "National Hockey League",
    abbreviation: "NHL",
    level: "pro",
    country: "US/CA",
    summary: "Flagship professional league. Hockey Graph's primary graph.",
  }),
  league({
    slug: "ahl",
    name: "American Hockey League",
    abbreviation: "AHL",
    level: "minor",
    country: "US/CA",
    summary: "NHL affiliates. Rights, recalls, and development live here.",
  }),
  league({
    slug: "ncaa",
    name: "NCAA Division I Men's Ice Hockey",
    abbreviation: "NCAA",
    level: "college",
    country: "US",
    summary: "College pipeline: commitments, transfers, draft rights.",
  }),
  league({
    slug: "pwhl",
    name: "Professional Women's Hockey League",
    abbreviation: "PWHL",
    level: "pro",
    country: "US/CA",
    summary: "Women's pro league — first-class graph objects, not a sidecar.",
  }),
  league({
    slug: "chl",
    name: "Canadian Hockey League",
    abbreviation: "CHL",
    level: "junior",
    country: "CA",
    summary: "OHL / WHL / QMJHL umbrella for junior prospects.",
  }),
];

export const seasons: Season[] = [
  season({
    slug: "nhl-2025-26",
    name: "NHL 2025-26",
    leagueId: NHL_ID,
    startYear: 2025,
    endYear: 2026,
    label: "2025-26",
    current: true,
    summary: "Seed snapshot used for Phase 0–1 deep stubs.",
  }),
  season({
    slug: "nhl-2026-27",
    name: "NHL 2026-27",
    leagueId: NHL_ID,
    startYear: 2026,
    endYear: 2027,
    label: "2026-27",
    summary: "Upcoming season shell — schedule/cap ingest lands later.",
  }),
  season({
    slug: "ncaa-2025-26",
    name: "NCAA 2025-26",
    leagueId: nodeId("league", "ncaa"),
    startYear: 2025,
    endYear: 2026,
    label: "2025-26",
  }),
  season({
    slug: "pwhl-2025-26",
    name: "PWHL 2025-26",
    leagueId: nodeId("league", "pwhl"),
    startYear: 2025,
    endYear: 2026,
    label: "2025-26",
  }),
];

type TeamSeed = {
  slug: string;
  abbreviation: string;
  name: string;
  city: string;
  conference: "Eastern" | "Western";
  division: "Atlantic" | "Metropolitan" | "Central" | "Pacific";
  primaryColor: string;
  secondaryColor: string;
  founded: number;
  arenaSlug: string;
  arenaName: string;
  arenaCity: string;
  arenaRegion: string;
  arenaCountry?: string;
  capacity?: number;
  opened?: number;
  focus?: boolean;
  hometown?: boolean;
};

const TEAM_SEEDS: TeamSeed[] = [
  { slug: "anaheim-ducks", abbreviation: "ANA", name: "Anaheim Ducks", city: "Anaheim", conference: "Western", division: "Pacific", primaryColor: "#F47A38", secondaryColor: "#B9975B", founded: 1993, arenaSlug: "honda-center", arenaName: "Honda Center", arenaCity: "Anaheim", arenaRegion: "CA", capacity: 17174, opened: 1993 },
  { slug: "boston-bruins", abbreviation: "BOS", name: "Boston Bruins", city: "Boston", conference: "Eastern", division: "Atlantic", primaryColor: "#FFB81C", secondaryColor: "#111111", founded: 1924, arenaSlug: "td-garden", arenaName: "TD Garden", arenaCity: "Boston", arenaRegion: "MA", capacity: 17850, opened: 1995, focus: true },
  { slug: "buffalo-sabres", abbreviation: "BUF", name: "Buffalo Sabres", city: "Buffalo", conference: "Eastern", division: "Atlantic", primaryColor: "#003087", secondaryColor: "#FFB81C", founded: 1970, arenaSlug: "keybank-center", arenaName: "KeyBank Center", arenaCity: "Buffalo", arenaRegion: "NY", capacity: 19070, opened: 1996 },
  { slug: "calgary-flames", abbreviation: "CGY", name: "Calgary Flames", city: "Calgary", conference: "Western", division: "Pacific", primaryColor: "#C8102E", secondaryColor: "#F1BE48", founded: 1972, arenaSlug: "scotiabank-saddledome", arenaName: "Scotiabank Saddledome", arenaCity: "Calgary", arenaRegion: "AB", arenaCountry: "CA", capacity: 19289, opened: 1983 },
  { slug: "carolina-hurricanes", abbreviation: "CAR", name: "Carolina Hurricanes", city: "Raleigh", conference: "Eastern", division: "Metropolitan", primaryColor: "#CC0000", secondaryColor: "#111111", founded: 1972, arenaSlug: "lenovo-center", arenaName: "Lenovo Center", arenaCity: "Raleigh", arenaRegion: "NC", capacity: 18680, opened: 1999 },
  { slug: "chicago-blackhawks", abbreviation: "CHI", name: "Chicago Blackhawks", city: "Chicago", conference: "Western", division: "Central", primaryColor: "#CF0A2C", secondaryColor: "#111111", founded: 1926, arenaSlug: "united-center", arenaName: "United Center", arenaCity: "Chicago", arenaRegion: "IL", capacity: 19717, opened: 1994 },
  { slug: "colorado-avalanche", abbreviation: "COL", name: "Colorado Avalanche", city: "Denver", conference: "Western", division: "Central", primaryColor: "#6F263D", secondaryColor: "#236192", founded: 1972, arenaSlug: "ball-arena", arenaName: "Ball Arena", arenaCity: "Denver", arenaRegion: "CO", capacity: 18007, opened: 1999 },
  { slug: "columbus-blue-jackets", abbreviation: "CBJ", name: "Columbus Blue Jackets", city: "Columbus", conference: "Eastern", division: "Metropolitan", primaryColor: "#002654", secondaryColor: "#CE1126", founded: 2000, arenaSlug: "nationwide-arena", arenaName: "Nationwide Arena", arenaCity: "Columbus", arenaRegion: "OH", capacity: 18500, opened: 2000 },
  { slug: "dallas-stars", abbreviation: "DAL", name: "Dallas Stars", city: "Dallas", conference: "Western", division: "Central", primaryColor: "#006847", secondaryColor: "#8F8F8C", founded: 1967, arenaSlug: "american-airlines-center", arenaName: "American Airlines Center", arenaCity: "Dallas", arenaRegion: "TX", capacity: 18532, opened: 2001 },
  { slug: "detroit-red-wings", abbreviation: "DET", name: "Detroit Red Wings", city: "Detroit", conference: "Eastern", division: "Atlantic", primaryColor: "#CE1126", secondaryColor: "#FFFFFF", founded: 1926, arenaSlug: "little-caesars-arena", arenaName: "Little Caesars Arena", arenaCity: "Detroit", arenaRegion: "MI", capacity: 19515, opened: 2017, hometown: true },
  { slug: "edmonton-oilers", abbreviation: "EDM", name: "Edmonton Oilers", city: "Edmonton", conference: "Western", division: "Pacific", primaryColor: "#041E42", secondaryColor: "#FF4C00", founded: 1972, arenaSlug: "rogers-place", arenaName: "Rogers Place", arenaCity: "Edmonton", arenaRegion: "AB", arenaCountry: "CA", capacity: 18347, opened: 2016 },
  { slug: "florida-panthers", abbreviation: "FLA", name: "Florida Panthers", city: "Sunrise", conference: "Eastern", division: "Atlantic", primaryColor: "#041E42", secondaryColor: "#C8102E", founded: 1993, arenaSlug: "amerant-bank-arena", arenaName: "Amerant Bank Arena", arenaCity: "Sunrise", arenaRegion: "FL", capacity: 19250, opened: 1998, focus: true },
  { slug: "los-angeles-kings", abbreviation: "LAK", name: "Los Angeles Kings", city: "Los Angeles", conference: "Western", division: "Pacific", primaryColor: "#111111", secondaryColor: "#A2AAAD", founded: 1967, arenaSlug: "crypto-com-arena", arenaName: "Crypto.com Arena", arenaCity: "Los Angeles", arenaRegion: "CA", capacity: 18230, opened: 1999 },
  { slug: "minnesota-wild", abbreviation: "MIN", name: "Minnesota Wild", city: "Saint Paul", conference: "Western", division: "Central", primaryColor: "#154734", secondaryColor: "#A6192E", founded: 2000, arenaSlug: "xcel-energy-center", arenaName: "Xcel Energy Center", arenaCity: "Saint Paul", arenaRegion: "MN", capacity: 17954, opened: 2000 },
  { slug: "montreal-canadiens", abbreviation: "MTL", name: "Montreal Canadiens", city: "Montreal", conference: "Eastern", division: "Atlantic", primaryColor: "#AF1E2D", secondaryColor: "#192168", founded: 1909, arenaSlug: "bell-centre", arenaName: "Bell Centre", arenaCity: "Montreal", arenaRegion: "QC", arenaCountry: "CA", capacity: 21105, opened: 1996 },
  { slug: "nashville-predators", abbreviation: "NSH", name: "Nashville Predators", city: "Nashville", conference: "Western", division: "Central", primaryColor: "#FFB81C", secondaryColor: "#041E42", founded: 1998, arenaSlug: "bridgestone-arena", arenaName: "Bridgestone Arena", arenaCity: "Nashville", arenaRegion: "TN", capacity: 17159, opened: 1996 },
  { slug: "new-jersey-devils", abbreviation: "NJD", name: "New Jersey Devils", city: "Newark", conference: "Eastern", division: "Metropolitan", primaryColor: "#CE1126", secondaryColor: "#111111", founded: 1974, arenaSlug: "prudential-center", arenaName: "Prudential Center", arenaCity: "Newark", arenaRegion: "NJ", capacity: 16514, opened: 2007 },
  { slug: "new-york-islanders", abbreviation: "NYI", name: "New York Islanders", city: "Elmont", conference: "Eastern", division: "Metropolitan", primaryColor: "#00539B", secondaryColor: "#F47D30", founded: 1972, arenaSlug: "ubs-arena", arenaName: "UBS Arena", arenaCity: "Elmont", arenaRegion: "NY", capacity: 17255, opened: 2021, focus: true },
  { slug: "new-york-rangers", abbreviation: "NYR", name: "New York Rangers", city: "New York", conference: "Eastern", division: "Metropolitan", primaryColor: "#0038A8", secondaryColor: "#CE1126", founded: 1926, arenaSlug: "madison-square-garden", arenaName: "Madison Square Garden", arenaCity: "New York", arenaRegion: "NY", capacity: 18006, opened: 1968 },
  { slug: "ottawa-senators", abbreviation: "OTT", name: "Ottawa Senators", city: "Ottawa", conference: "Eastern", division: "Atlantic", primaryColor: "#C52032", secondaryColor: "#B79257", founded: 1992, arenaSlug: "canadian-tire-centre", arenaName: "Canadian Tire Centre", arenaCity: "Ottawa", arenaRegion: "ON", arenaCountry: "CA", capacity: 18652, opened: 1996 },
  { slug: "philadelphia-flyers", abbreviation: "PHI", name: "Philadelphia Flyers", city: "Philadelphia", conference: "Eastern", division: "Metropolitan", primaryColor: "#F74902", secondaryColor: "#111111", founded: 1967, arenaSlug: "xfinity-mobile-arena", arenaName: "Xfinity Mobile Arena", arenaCity: "Philadelphia", arenaRegion: "PA", capacity: 19179, opened: 1996 },
  { slug: "pittsburgh-penguins", abbreviation: "PIT", name: "Pittsburgh Penguins", city: "Pittsburgh", conference: "Eastern", division: "Metropolitan", primaryColor: "#111111", secondaryColor: "#FCB514", founded: 1967, arenaSlug: "ppg-paints-arena", arenaName: "PPG Paints Arena", arenaCity: "Pittsburgh", arenaRegion: "PA", capacity: 18387, opened: 2010, focus: true },
  { slug: "san-jose-sharks", abbreviation: "SJS", name: "San Jose Sharks", city: "San Jose", conference: "Western", division: "Pacific", primaryColor: "#006D75", secondaryColor: "#EA7200", founded: 1991, arenaSlug: "sap-center", arenaName: "SAP Center", arenaCity: "San Jose", arenaRegion: "CA", capacity: 17562, opened: 1993 },
  { slug: "seattle-kraken", abbreviation: "SEA", name: "Seattle Kraken", city: "Seattle", conference: "Western", division: "Pacific", primaryColor: "#001628", secondaryColor: "#99D9D9", founded: 2021, arenaSlug: "climate-pledge-arena", arenaName: "Climate Pledge Arena", arenaCity: "Seattle", arenaRegion: "WA", capacity: 17151, opened: 2021 },
  { slug: "st-louis-blues", abbreviation: "STL", name: "St. Louis Blues", city: "St. Louis", conference: "Western", division: "Central", primaryColor: "#002F87", secondaryColor: "#FCB514", founded: 1967, arenaSlug: "enterprise-center", arenaName: "Enterprise Center", arenaCity: "St. Louis", arenaRegion: "MO", capacity: 18096, opened: 1994 },
  { slug: "tampa-bay-lightning", abbreviation: "TBL", name: "Tampa Bay Lightning", city: "Tampa", conference: "Eastern", division: "Atlantic", primaryColor: "#002868", secondaryColor: "#FFFFFF", founded: 1992, arenaSlug: "benchmark-international-arena", arenaName: "Benchmark International Arena", arenaCity: "Tampa", arenaRegion: "FL", capacity: 19092, opened: 1996, focus: true },
  { slug: "toronto-maple-leafs", abbreviation: "TOR", name: "Toronto Maple Leafs", city: "Toronto", conference: "Eastern", division: "Atlantic", primaryColor: "#00205B", secondaryColor: "#FFFFFF", founded: 1917, arenaSlug: "scotiabank-arena", arenaName: "Scotiabank Arena", arenaCity: "Toronto", arenaRegion: "ON", arenaCountry: "CA", capacity: 18819, opened: 1999, focus: true },
  { slug: "utah-mammoth", abbreviation: "UTA", name: "Utah Mammoth", city: "Salt Lake City", conference: "Western", division: "Central", primaryColor: "#69B3E7", secondaryColor: "#0B1C2C", founded: 2024, arenaSlug: "delta-center", arenaName: "Delta Center", arenaCity: "Salt Lake City", arenaRegion: "UT", capacity: 16340, opened: 1991 },
  { slug: "vancouver-canucks", abbreviation: "VAN", name: "Vancouver Canucks", city: "Vancouver", conference: "Western", division: "Pacific", primaryColor: "#00205B", secondaryColor: "#00843D", founded: 1970, arenaSlug: "rogers-arena", arenaName: "Rogers Arena", arenaCity: "Vancouver", arenaRegion: "BC", arenaCountry: "CA", capacity: 18910, opened: 1995 },
  { slug: "vegas-golden-knights", abbreviation: "VGK", name: "Vegas Golden Knights", city: "Las Vegas", conference: "Western", division: "Pacific", primaryColor: "#B4975A", secondaryColor: "#333F42", founded: 2017, arenaSlug: "t-mobile-arena", arenaName: "T-Mobile Arena", arenaCity: "Las Vegas", arenaRegion: "NV", capacity: 17500, opened: 2016 },
  { slug: "washington-capitals", abbreviation: "WSH", name: "Washington Capitals", city: "Washington", conference: "Eastern", division: "Metropolitan", primaryColor: "#041E42", secondaryColor: "#C8102E", founded: 1974, arenaSlug: "capital-one-arena", arenaName: "Capital One Arena", arenaCity: "Washington", arenaRegion: "DC", capacity: 18573, opened: 1997 },
  { slug: "winnipeg-jets", abbreviation: "WPG", name: "Winnipeg Jets", city: "Winnipeg", conference: "Western", division: "Central", primaryColor: "#041E42", secondaryColor: "#004C97", founded: 2011, arenaSlug: "canada-life-centre", arenaName: "Canada Life Centre", arenaCity: "Winnipeg", arenaRegion: "MB", arenaCountry: "CA", capacity: 15321, opened: 2004 },
];

export const nhlArenas = TEAM_SEEDS.map((t) =>
  arena({
    slug: t.arenaSlug,
    name: t.arenaName,
    city: t.arenaCity,
    region: t.arenaRegion,
    country: t.arenaCountry ?? "US",
    capacity: t.capacity,
    opened: t.opened,
  }),
);

export const nhlTeams: Team[] = TEAM_SEEDS.map((t) =>
  team({
    slug: t.slug,
    name: t.name,
    abbreviation: t.abbreviation,
    city: t.city,
    leagueId: NHL_ID,
    conference: t.conference,
    division: t.division,
    primaryColor: t.primaryColor,
    secondaryColor: t.secondaryColor,
    founded: t.founded,
    arenaId: nodeId("arena", t.arenaSlug),
    coverage: t.focus ? "deep" : "catalog",
    focus: t.focus,
    hometown: t.hometown,
    summary: t.focus
      ? `${t.name} is a Phase-1 focus club: roster, lines, cap, and newsroom stubs are seeded.`
      : t.hometown
        ? `${t.name} is the Hockeytown USA hometown club. National OS coverage; regional front comes later.`
        : `${t.name} catalog node. Team mini-OS layout is live; deep objects land as coverage expands.`,
  }),
);

/** 2025-26 regular-season snapshot (Hockey-Reference). */
export const nhlStandings: StandingRow[] = [
  s("buffalo-sabres", 82, 50, 23, 9, 109, 288, 241, true),
  s("tampa-bay-lightning", 82, 50, 26, 6, 106, 290, 231, true),
  s("montreal-canadiens", 82, 48, 24, 10, 106, 283, 256, true),
  s("boston-bruins", 82, 45, 27, 10, 100, 272, 250, true),
  s("ottawa-senators", 82, 44, 27, 11, 99, 278, 246, true),
  s("detroit-red-wings", 82, 41, 31, 10, 92, 241, 258, false),
  s("florida-panthers", 82, 40, 38, 4, 84, 251, 276, false),
  s("toronto-maple-leafs", 82, 32, 36, 14, 78, 253, 299, false),
  s("carolina-hurricanes", 82, 53, 22, 7, 113, 296, 240, true),
  s("pittsburgh-penguins", 82, 41, 25, 16, 98, 293, 268, true),
  s("philadelphia-flyers", 82, 43, 27, 12, 98, 250, 243, true),
  s("washington-capitals", 82, 43, 30, 9, 95, 263, 244, false),
  s("columbus-blue-jackets", 82, 40, 30, 12, 92, 253, 253, false),
  s("new-york-islanders", 82, 43, 34, 5, 91, 233, 241, false),
  s("new-jersey-devils", 82, 42, 37, 3, 87, 230, 254, false),
  s("new-york-rangers", 82, 34, 39, 9, 77, 238, 250, false),
  s("colorado-avalanche", 82, 55, 16, 11, 121, 302, 203, true),
  s("dallas-stars", 82, 50, 20, 12, 112, 279, 226, true),
  s("minnesota-wild", 82, 46, 24, 12, 104, 272, 240, true),
  s("utah-mammoth", 82, 43, 33, 6, 92, 268, 240, true),
  s("st-louis-blues", 82, 37, 33, 12, 86, 231, 258, false),
  s("nashville-predators", 82, 38, 34, 10, 86, 247, 269, false),
  s("winnipeg-jets", 82, 35, 35, 12, 82, 231, 260, false),
  s("chicago-blackhawks", 82, 29, 39, 14, 72, 213, 275, false),
  s("vegas-golden-knights", 82, 39, 26, 17, 95, 265, 250, true),
  s("edmonton-oilers", 82, 41, 30, 11, 93, 282, 269, true),
  s("anaheim-ducks", 82, 43, 33, 6, 92, 273, 288, true),
  s("los-angeles-kings", 82, 35, 27, 20, 90, 225, 247, true),
  s("san-jose-sharks", 82, 39, 35, 8, 86, 251, 292, false),
  s("seattle-kraken", 82, 34, 37, 11, 79, 226, 263, false),
  s("calgary-flames", 82, 34, 39, 9, 77, 212, 259, false),
  s("vancouver-canucks", 82, 25, 49, 8, 58, 216, 316, false),
];

function s(
  slug: string,
  gp: number,
  w: number,
  l: number,
  otl: number,
  pts: number,
  gf: number,
  ga: number,
  playoff: boolean,
): StandingRow {
  return {
    teamId: nodeId("team", slug),
    seasonId: nodeId("season", "nhl-2025-26"),
    gp,
    w,
    l,
    otl,
    pts,
    gf,
    ga,
    playoff,
  };
}
