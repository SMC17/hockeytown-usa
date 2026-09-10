/**
 * Hockey Graph canonical schema.
 * Atomic unit: a structured hockey object (node) plus typed edges —
 * not the article alone.
 */

export const NODE_TYPES = [
  "player",
  "team",
  "league",
  "season",
  "game",
  "roster",
  "contract",
  "transaction",
  "injury",
  "draft",
  "draft_pick",
  "prospect",
  "commitment",
  "transfer",
  "coach",
  "agent",
  "arena",
  "article",
  "video",
  "quote",
  "source",
] as const;

export type NodeType = (typeof NODE_TYPES)[number];

export const EDGE_TYPES = [
  "played_for",
  "drafted_by",
  "rights_owned_by",
  "committed_to",
  "transferred_from",
  "represented_by",
  "linemate_with",
  "coached_by",
  "contract_with",
  "mentioned_in",
  "sourced_from",
  "cites",
  "affiliate_of",
  "member_of_line",
  "corrects",
] as const;

export type EdgeType = (typeof EDGE_TYPES)[number];

export type ShootsCatches = "L" | "R";
export type SkaterPosition = "C" | "LW" | "RW" | "D" | "G" | "F";
export type Conference = "Eastern" | "Western";
export type NhlDivision = "Atlantic" | "Metropolitan" | "Central" | "Pacific";
export type ContractType = "standard" | "elc" | "two-way" | "spc" | "35-plus";
export type TransactionKind =
  | "trade"
  | "signing"
  | "waiver"
  | "recall"
  | "assignment"
  | "claim"
  | "retirement"
  | "buyout";
export type InjuryStatus = "out" | "day-to-day" | "ir" | "ltir" | "returned";
export type ShotOrVideoRights = "official" | "licensed" | "none";
export type ArticleStatus = "draft" | "published" | "corrected";
export type LineUnit =
  | "f1"
  | "f2"
  | "f3"
  | "f4"
  | "d1"
  | "d2"
  | "d3"
  | "g"
  | "pp1"
  | "pp2"
  | "pk1"
  | "pk2";

export interface NodeBase {
  id: string;
  type: NodeType;
  slug: string;
  name: string;
  /** ISO date the object was last verified in-graph. */
  updatedAt: string;
  summary?: string;
}

export interface Player extends NodeBase {
  type: "player";
  firstName: string;
  lastName: string;
  sweaterNumber?: number;
  position: SkaterPosition;
  shootsCatches?: ShootsCatches;
  nationality?: string;
  birthDate?: string;
  birthplace?: string;
  heightIn?: number;
  weightLb?: number;
  captaincy?: "C" | "A";
  handedFocus?: boolean;
}

export interface Team extends NodeBase {
  type: "team";
  abbreviation: string;
  city: string;
  region?: string;
  leagueId: string;
  conference?: Conference;
  division?: NhlDivision | string;
  primaryColor: string;
  secondaryColor: string;
  tertiaryColor?: string;
  founded?: number;
  arenaId?: string;
  /** Coverage depth: catalog vs Phase-1 deep stub. */
  coverage: "catalog" | "deep";
  focus?: boolean;
  hometown?: boolean;
}

export interface League extends NodeBase {
  type: "league";
  abbreviation: string;
  level: "pro" | "minor" | "college" | "junior" | "intl";
  country?: string;
}

export interface Season extends NodeBase {
  type: "season";
  leagueId: string;
  startYear: number;
  endYear: number;
  label: string;
  current?: boolean;
}

export interface Game extends NodeBase {
  type: "game";
  seasonId: string;
  leagueId: string;
  homeTeamId: string;
  awayTeamId: string;
  startsAt: string;
  venueId?: string;
  status: "scheduled" | "live" | "final";
  homeScore?: number;
  awayScore?: number;
  overtime?: boolean;
  shootout?: boolean;
}

export interface Roster extends NodeBase {
  type: "roster";
  teamId: string;
  seasonId: string;
  kind: "nhl" | "ahl" | "prospect" | "training-camp";
}

export interface Contract extends NodeBase {
  type: "contract";
  playerId: string;
  teamId: string;
  seasonStart: number;
  seasonEnd: number;
  aavUsd?: number;
  totalValueUsd?: number;
  years?: number;
  expiry?: "UFA" | "RFA";
  clause?: string;
  contractType: ContractType;
  illustrative?: boolean;
}

export interface Transaction extends NodeBase {
  type: "transaction";
  kind: TransactionKind;
  date: string;
  fromTeamId?: string;
  toTeamId?: string;
  playerIds: string[];
  notes?: string;
}

export interface Injury extends NodeBase {
  type: "injury";
  playerId: string;
  teamId: string;
  status: InjuryStatus;
  bodyPart?: string;
  injuredOn?: string;
  expectedReturn?: string;
  notes?: string;
}

export interface Draft extends NodeBase {
  type: "draft";
  leagueId: string;
  year: number;
  location?: string;
}

export interface DraftPick extends NodeBase {
  type: "draft_pick";
  draftId: string;
  round: number;
  overall?: number;
  originalTeamId: string;
  currentTeamId: string;
  year: number;
  playerId?: string;
  notes?: string;
}

export interface Prospect extends NodeBase {
  type: "prospect";
  playerId: string;
  teamId: string;
  rank?: number;
  eta?: string;
  leagueHint?: string;
}

export interface Commitment extends NodeBase {
  type: "commitment";
  playerId: string;
  schoolTeamId: string;
  classYear?: number;
  announcedOn?: string;
}

export interface Transfer extends NodeBase {
  type: "transfer";
  playerId: string;
  fromTeamId: string;
  toTeamId?: string;
  portalDate?: string;
  notes?: string;
}

export interface Coach extends NodeBase {
  type: "coach";
  role: "head" | "assistant" | "goalie";
  teamId: string;
  seasonId?: string;
}

export interface Agent extends NodeBase {
  type: "agent";
  agency?: string;
}

export interface Arena extends NodeBase {
  type: "arena";
  city: string;
  region?: string;
  country?: string;
  capacity?: number;
  opened?: number;
}

export interface ArticleMention {
  entityId: string;
  label?: string;
  start?: number;
  end?: number;
}

export interface Article extends NodeBase {
  type: "article";
  dek?: string;
  body: string;
  publishedAt: string;
  author: string;
  status: ArticleStatus;
  section?: string;
  heroKicker?: string;
  mentions: ArticleMention[];
  sourceIds?: string[];
}

export interface Video extends NodeBase {
  type: "video";
  rights: ShotOrVideoRights;
  provider?: string;
  canonicalUrl?: string;
  durationSec?: number;
  relatedEntityIds: string[];
}

export interface Quote extends NodeBase {
  type: "quote";
  text: string;
  speakerId?: string;
  speakerName: string;
  utteredOn?: string;
  context?: string;
}

export interface Source extends NodeBase {
  type: "source";
  url?: string;
  publisher: string;
  reliability: "official" | "beat" | "wire" | "internal";
}

export type GraphNode =
  | Player
  | Team
  | League
  | Season
  | Game
  | Roster
  | Contract
  | Transaction
  | Injury
  | Draft
  | DraftPick
  | Prospect
  | Commitment
  | Transfer
  | Coach
  | Agent
  | Arena
  | Article
  | Video
  | Quote
  | Source;

export interface GraphEdge {
  id: string;
  type: EdgeType;
  from: string;
  to: string;
  since?: string;
  until?: string;
  seasonId?: string;
  weight?: number;
  properties?: Record<string, string | number | boolean | null>;
}

export interface StandingRow {
  teamId: string;
  seasonId: string;
  gp: number;
  w: number;
  l: number;
  otl: number;
  pts: number;
  gf: number;
  ga: number;
  playoff?: boolean;
}

export interface LineAssignment {
  id: string;
  teamId: string;
  seasonId: string;
  unit: LineUnit;
  playerIds: string[];
  label?: string;
}

export interface CapSnapshot {
  teamId: string;
  seasonId: string;
  ceilingUsd: number;
  committedUsd: number;
  spaceUsd: number;
  ltirUsedUsd?: number;
  notes?: string;
}

export interface HockeyGraph {
  generatedAt: string;
  seasonId: string;
  nodes: GraphNode[];
  edges: GraphEdge[];
  standings: StandingRow[];
  lines: LineAssignment[];
  cap: CapSnapshot[];
}

export const FLAGSHIP_MODES = [
  "now",
  "understand",
  "analyze",
  "discover",
  "follow",
  "use",
] as const;

export type FlagshipMode = (typeof FLAGSHIP_MODES)[number];

export const TEAM_SECTIONS = [
  "latest",
  "roster",
  "lines",
  "injuries",
  "contracts",
  "cap",
  "prospects",
  "draft-picks",
  "schedule",
  "standings",
  "transactions",
] as const;

export type TeamSection = (typeof TEAM_SECTIONS)[number];

export const FOCUS_TEAM_SLUGS = [
  "new-york-islanders",
  "toronto-maple-leafs",
  "pittsburgh-penguins",
  "boston-bruins",
  "florida-panthers",
  "tampa-bay-lightning",
] as const;

export type FocusTeamSlug = (typeof FOCUS_TEAM_SLUGS)[number];
