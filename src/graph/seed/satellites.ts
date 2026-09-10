import { nodeId } from "../ids";
import { arena, coach, commitment, edge, player, team, transfer } from "./builders";
import type { GraphEdge, GraphNode } from "../types";

const NCAA = nodeId("league", "ncaa");
const PWHL = nodeId("league", "pwhl");
const AHL = nodeId("league", "ahl");

const collegeTeams = [
  team({
    slug: "michigan-wolverines",
    name: "Michigan Wolverines",
    abbreviation: "MICH",
    city: "Ann Arbor",
    region: "MI",
    leagueId: NCAA,
    primaryColor: "#00274C",
    secondaryColor: "#FFCB05",
    coverage: "deep",
    hometown: true,
    division: "Big Ten",
    arenaId: nodeId("arena", "yost-ice-arena"),
    summary: "College flagship hub and Hockeytown hometown pillar. Commits, roster, pipeline.",
  }),
  team({
    slug: "michigan-state-spartans",
    name: "Michigan State Spartans",
    abbreviation: "MSU",
    city: "East Lansing",
    region: "MI",
    leagueId: NCAA,
    primaryColor: "#18453B",
    secondaryColor: "#FFFFFF",
    coverage: "catalog",
    hometown: true,
    division: "Big Ten",
    summary: "Hockeytown USA college pillar. Big Ten.",
  }),
  team({
    slug: "western-michigan-broncos",
    name: "Western Michigan Broncos",
    abbreviation: "WMU",
    city: "Kalamazoo",
    region: "MI",
    leagueId: NCAA,
    primaryColor: "#6C4023",
    secondaryColor: "#B5A167",
    coverage: "catalog",
    hometown: true,
    division: "NCHC",
  }),
  team({
    slug: "boston-college-eagles",
    name: "Boston College Eagles",
    abbreviation: "BC",
    city: "Chestnut Hill",
    region: "MA",
    leagueId: NCAA,
    primaryColor: "#8C1515",
    secondaryColor: "#B29D6C",
    coverage: "catalog",
    division: "Hockey East",
  }),
  team({
    slug: "boston-university-terriers",
    name: "Boston University Terriers",
    abbreviation: "BU",
    city: "Boston",
    region: "MA",
    leagueId: NCAA,
    primaryColor: "#CC0000",
    secondaryColor: "#FFFFFF",
    coverage: "deep",
    division: "Hockey East",
    summary: "College flagship hub. Cole Eiserman's NCAA clock lives here; Islanders still own the rights.",
  }),
  team({
    slug: "minnesota-golden-gophers",
    name: "Minnesota Golden Gophers",
    abbreviation: "MINN",
    city: "Minneapolis",
    region: "MN",
    leagueId: NCAA,
    primaryColor: "#7A0019",
    secondaryColor: "#FFCC33",
    coverage: "deep",
    division: "Big Ten",
    summary: "College flagship hub. Roster, commits, and NHL pipeline shells.",
  }),
  team({
    slug: "denver-pioneers",
    name: "Denver Pioneers",
    abbreviation: "DEN",
    city: "Denver",
    region: "CO",
    leagueId: NCAA,
    primaryColor: "#8B2332",
    secondaryColor: "#C4B581",
    coverage: "deep",
    division: "NCHC",
    summary: "College flagship hub. National-program pipeline on the same graph as NHL rights.",
  }),
  team({
    slug: "quinnipiac-bobcats",
    name: "Quinnipiac Bobcats",
    abbreviation: "QU",
    city: "Hamden",
    region: "CT",
    leagueId: NCAA,
    primaryColor: "#0A2240",
    secondaryColor: "#C4A35A",
    coverage: "deep",
    division: "ECAC",
    summary: "College flagship hub. ECAC program on the national OS.",
  }),
  team({
    slug: "penn-state-nittany-lions",
    name: "Penn State Nittany Lions",
    abbreviation: "PSU",
    city: "University Park",
    region: "PA",
    leagueId: NCAA,
    primaryColor: "#041E42",
    secondaryColor: "#FFFFFF",
    coverage: "catalog",
    division: "Big Ten",
    summary: "Catalog school. Gavin McKenna commitment lives here; not a Phase-1 flagship hub.",
  }),
];

const pwhlTeams = [
  team({ slug: "boston-fleet", name: "Boston Fleet", abbreviation: "BOS", city: "Boston", leagueId: PWHL, primaryColor: "#2F5A3B", secondaryColor: "#F3C14B", coverage: "catalog" }),
  team({ slug: "minnesota-frost", name: "Minnesota Frost", abbreviation: "MIN", city: "Saint Paul", leagueId: PWHL, primaryColor: "#6BB4E8", secondaryColor: "#0B1C2C", coverage: "catalog" }),
  team({ slug: "montreal-victoire", name: "Montreal Victoire", abbreviation: "MTL", city: "Montreal", leagueId: PWHL, primaryColor: "#C8102E", secondaryColor: "#041E42", coverage: "catalog", summary: "2026 Walter Cup champions." }),
  team({ slug: "new-york-sirens", name: "New York Sirens", abbreviation: "NY", city: "New York", leagueId: PWHL, primaryColor: "#5B2C6F", secondaryColor: "#F4D03F", coverage: "catalog" }),
  team({ slug: "ottawa-charge", name: "Ottawa Charge", abbreviation: "OTT", city: "Ottawa", leagueId: PWHL, primaryColor: "#E10600", secondaryColor: "#111111", coverage: "catalog" }),
  team({ slug: "toronto-sceptres", name: "Toronto Sceptres", abbreviation: "TOR", city: "Toronto", leagueId: PWHL, primaryColor: "#0B1C2C", secondaryColor: "#C5A572", coverage: "catalog" }),
  team({ slug: "vancouver-goldeneyes", name: "Vancouver Goldeneyes", abbreviation: "VAN", city: "Vancouver", leagueId: PWHL, primaryColor: "#1F4E3D", secondaryColor: "#D4A017", coverage: "catalog" }),
  team({ slug: "seattle-torrent", name: "Seattle Torrent", abbreviation: "SEA", city: "Seattle", leagueId: PWHL, primaryColor: "#143C5D", secondaryColor: "#7FDBDA", coverage: "catalog" }),
];

const ahlTeams = [
  team({ slug: "bridgeport-islanders", name: "Bridgeport Islanders", abbreviation: "BRI", city: "Bridgeport", leagueId: AHL, primaryColor: "#00539B", secondaryColor: "#F47D30", coverage: "catalog" }),
  team({ slug: "toronto-marlies", name: "Toronto Marlies", abbreviation: "TOR", city: "Toronto", leagueId: AHL, primaryColor: "#00205B", secondaryColor: "#6F8AB7", coverage: "catalog" }),
  team({ slug: "wbs-penguins", name: "Wilkes-Barre/Scranton Penguins", abbreviation: "WBS", city: "Wilkes-Barre", leagueId: AHL, primaryColor: "#111111", secondaryColor: "#FCB514", coverage: "catalog" }),
  team({ slug: "providence-bruins", name: "Providence Bruins", abbreviation: "PRO", city: "Providence", leagueId: AHL, primaryColor: "#FFB81C", secondaryColor: "#111111", coverage: "catalog" }),
  team({ slug: "springfield-thunderbirds", name: "Springfield Thunderbirds", abbreviation: "SPR", city: "Springfield", leagueId: AHL, primaryColor: "#041E42", secondaryColor: "#C8102E", coverage: "catalog" }),
  team({ slug: "syracuse-crunch", name: "Syracuse Crunch", abbreviation: "SYR", city: "Syracuse", leagueId: AHL, primaryColor: "#002868", secondaryColor: "#F47920", coverage: "catalog" }),
];

const poulin = player({
  firstName: "Marie-Philip",
  lastName: "Poulin",
  position: "C",
  shootsCatches: "L",
  nationality: "CA",
  sweaterNumber: 29,
  summary: "PWHL Montreal captain-class star; Walter Cup 2026.",
});

const hagensNCAA = commitment({
  slug: "hagens-bc",
  name: "James Hagens → Boston College",
  playerId: nodeId("player", "james-hagens"),
  schoolTeamId: nodeId("team", "boston-college-eagles"),
  classYear: 2024,
  announcedOn: "2023-11-01",
});

const transferStub = transfer({
  slug: "portal-stub-wmu",
  name: "NCAA portal stub (Western Michigan)",
  playerId: nodeId("player", "portal-forward-stub"),
  fromTeamId: nodeId("team", "western-michigan-broncos"),
  portalDate: "2026-03-20",
  notes: "Empty-state example of a Transfer object. No invented player movement.",
});

const portalPlayer = player({
  firstName: "Portal",
  lastName: "Forward",
  slug: "portal-forward-stub",
  position: "F",
  summary: "Synthetic NCAA portal example so the Transfer node has a real Player to hang on. Not a real athlete.",
});

const pwhlCoach = coach({
  name: "Kori Cheverie",
  slug: "kori-cheverie",
  role: "head",
  teamId: nodeId("team", "montreal-victoire"),
  summary: "Stub coach node for PWHL Montreal. Verify before publishing a newsroom piece.",
});

export const satelliteNodes: GraphNode[] = [
  ...collegeTeams,
  ...pwhlTeams,
  ...ahlTeams,
  poulin,
  portalPlayer,
  hagensNCAA,
  transferStub,
  pwhlCoach,
  arena({
    slug: "yost-ice-arena",
    name: "Yost Ice Arena",
    city: "Ann Arbor",
    region: "MI",
    country: "US",
    capacity: 5800,
    opened: 1923,
  }),
];

export const satelliteEdges: GraphEdge[] = [
  edge("played_for", poulin.id, nodeId("team", "montreal-victoire"), { extraKey: "pwhl-2026" }),
  edge("committed_to", nodeId("player", "james-hagens"), nodeId("team", "boston-college-eagles")),
  edge("transferred_from", portalPlayer.id, nodeId("team", "western-michigan-broncos")),
  edge("affiliate_of", nodeId("team", "bridgeport-islanders"), nodeId("team", "new-york-islanders")),
  edge("affiliate_of", nodeId("team", "toronto-marlies"), nodeId("team", "toronto-maple-leafs")),
  edge("affiliate_of", nodeId("team", "wbs-penguins"), nodeId("team", "pittsburgh-penguins")),
  edge("affiliate_of", nodeId("team", "providence-bruins"), nodeId("team", "boston-bruins")),
  edge("affiliate_of", nodeId("team", "springfield-thunderbirds"), nodeId("team", "florida-panthers")),
  edge("affiliate_of", nodeId("team", "syracuse-crunch"), nodeId("team", "tampa-bay-lightning")),
  edge("coached_by", nodeId("team", "montreal-victoire"), pwhlCoach.id),
];
