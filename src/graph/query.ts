import { buildSeedGraph } from "./seed";
import type {
  Article,
  CapSnapshot,
  Coach,
  Contract,
  DraftPick,
  EdgeType,
  Game,
  GraphEdge,
  GraphNode,
  HockeyGraph,
  Injury,
  LineAssignment,
  NodeType,
  Player,
  Prospect,
  StandingRow,
  Team,
  TeamSection,
  Transaction,
} from "./types";
import { FOCUS_TEAM_SLUGS, TEAM_SECTIONS } from "./types";

let cached: GraphIndex | null = null;

export class GraphIndex {
  readonly raw: HockeyGraph;
  private byId: Map<string, GraphNode>;
  private byType: Map<NodeType, GraphNode[]>;
  private bySlug: Map<string, GraphNode>;
  private outgoing: Map<string, GraphEdge[]>;
  private incoming: Map<string, GraphEdge[]>;

  constructor(raw: HockeyGraph) {
    this.raw = raw;
    this.byId = new Map(raw.nodes.map((n) => [n.id, n]));
    this.byType = new Map();
    this.bySlug = new Map();
    for (const node of raw.nodes) {
      const list = this.byType.get(node.type) ?? [];
      list.push(node);
      this.byType.set(node.type, list);
      this.bySlug.set(`${node.type}:${node.slug}`, node);
    }
    this.outgoing = new Map();
    this.incoming = new Map();
    for (const edge of raw.edges) {
      const out = this.outgoing.get(edge.from) ?? [];
      out.push(edge);
      this.outgoing.set(edge.from, out);
      const inn = this.incoming.get(edge.to) ?? [];
      inn.push(edge);
      this.incoming.set(edge.to, inn);
    }
  }

  node(id: string): GraphNode | undefined {
    return this.byId.get(id);
  }

  require<T extends GraphNode>(id: string): T {
    const n = this.byId.get(id);
    if (!n) throw new Error(`Missing graph node ${id}`);
    return n as T;
  }

  ofType<T extends GraphNode>(type: NodeType): T[] {
    return (this.byType.get(type) ?? []) as T[];
  }

  byTypeSlug(type: NodeType, slug: string): GraphNode | undefined {
    return this.bySlug.get(`${type}:${slug}`);
  }

  teams(): Team[] {
    return this.ofType<Team>("team");
  }

  nhlTeams(): Team[] {
    return this.teams()
      .filter((t) => t.leagueId === "league:nhl")
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  focusTeams(): Team[] {
    return this.nhlTeams().filter((t) => t.focus);
  }

  teamBySlug(slug: string): Team | undefined {
    return this.byTypeSlug("team", slug) as Team | undefined;
  }

  players(): Player[] {
    return this.ofType<Player>("player");
  }

  articles(): Article[] {
    return this.ofType<Article>("article").sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  }

  publishedArticles(): Article[] {
    return this.articles().filter((a) => a.status === "published" || a.status === "corrected");
  }

  edgesFrom(id: string, type?: EdgeType): GraphEdge[] {
    const all = this.outgoing.get(id) ?? [];
    return type ? all.filter((e) => e.type === type) : all;
  }

  edgesTo(id: string, type?: EdgeType): GraphEdge[] {
    const all = this.incoming.get(id) ?? [];
    return type ? all.filter((e) => e.type === type) : all;
  }

  neighbors(id: string): { edge: GraphEdge; node: GraphNode; direction: "out" | "in" }[] {
    const out = this.edgesFrom(id)
      .map((edge) => {
        const node = this.byId.get(edge.to);
        return node ? { edge, node, direction: "out" as const } : null;
      })
      .filter(Boolean) as { edge: GraphEdge; node: GraphNode; direction: "out" }[];
    const inn = this.edgesTo(id)
      .map((edge) => {
        const node = this.byId.get(edge.from);
        return node ? { edge, node, direction: "in" as const } : null;
      })
      .filter(Boolean) as { edge: GraphEdge; node: GraphNode; direction: "in" }[];
    return [...out, ...inn];
  }

  rosterFor(teamId: string): Player[] {
    return this.edgesTo(teamId, "played_for")
      .map((e) => this.byId.get(e.from))
      .filter((n): n is Player => n?.type === "player")
      .sort((a, b) => (a.sweaterNumber ?? 99) - (b.sweaterNumber ?? 99));
  }

  coachesFor(teamId: string): Coach[] {
    return this.edgesFrom(teamId, "coached_by")
      .map((e) => this.byId.get(e.to))
      .filter((n): n is Coach => n?.type === "coach");
  }

  contractsFor(teamId: string): Contract[] {
    return this.ofType<Contract>("contract").filter((c) => c.teamId === teamId);
  }

  injuriesFor(teamId: string): Injury[] {
    return this.ofType<Injury>("injury").filter((i) => i.teamId === teamId);
  }

  transactionsFor(teamId: string): Transaction[] {
    return this.ofType<Transaction>("transaction").filter(
      (t) => t.toTeamId === teamId || t.fromTeamId === teamId,
    );
  }

  prospectsFor(teamId: string): Prospect[] {
    return this.ofType<Prospect>("prospect").filter((p) => p.teamId === teamId);
  }

  picksFor(teamId: string): DraftPick[] {
    return this.ofType<DraftPick>("draft_pick").filter(
      (p) => p.currentTeamId === teamId || p.originalTeamId === teamId,
    );
  }

  gamesFor(teamId: string): Game[] {
    return this.ofType<Game>("game")
      .filter((g) => g.homeTeamId === teamId || g.awayTeamId === teamId)
      .sort((a, b) => a.startsAt.localeCompare(b.startsAt));
  }

  linesFor(teamId: string): LineAssignment[] {
    return this.raw.lines.filter((l) => l.teamId === teamId);
  }

  capFor(teamId: string): CapSnapshot | undefined {
    return this.raw.cap.find((c) => c.teamId === teamId);
  }

  standingFor(teamId: string): StandingRow | undefined {
    return this.raw.standings.find((s) => s.teamId === teamId);
  }

  standings(): StandingRow[] {
    return this.raw.standings;
  }

  articlesMentioning(entityId: string): Article[] {
    return this.edgesFrom(entityId, "mentioned_in")
      .map((e) => this.byId.get(e.to))
      .filter((n): n is Article => n?.type === "article");
  }

  search(q: string, limit = 24): GraphNode[] {
    const needle = q.trim().toLowerCase();
    if (!needle) return [];
    const scored = this.raw.nodes
      .map((n) => {
        const hay = `${n.name} ${n.slug} ${n.summary ?? ""}`.toLowerCase();
        let score = 0;
        if (n.slug === needle) score += 8;
        if (n.name.toLowerCase() === needle) score += 7;
        if (n.name.toLowerCase().startsWith(needle)) score += 5;
        if (hay.includes(needle)) score += 2;
        if ("abbreviation" in n && String((n as Team).abbreviation).toLowerCase() === needle) score += 6;
        return { n, score };
      })
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score || a.n.name.localeCompare(b.n.name));
    return scored.slice(0, limit).map((x) => x.n);
  }

  stats() {
    const counts: Record<string, number> = {};
    for (const n of this.raw.nodes) counts[n.type] = (counts[n.type] ?? 0) + 1;
    const edgeCounts: Record<string, number> = {};
    for (const e of this.raw.edges) edgeCounts[e.type] = (edgeCounts[e.type] ?? 0) + 1;
    return {
      nodes: this.raw.nodes.length,
      edges: this.raw.edges.length,
      nhlTeams: this.nhlTeams().length,
      focusTeams: this.focusTeams().length,
      counts,
      edgeCounts,
    };
  }
}

export function getGraph(): GraphIndex {
  if (!cached) cached = new GraphIndex(buildSeedGraph());
  return cached;
}

export function isFocusTeam(slug: string): boolean {
  return (FOCUS_TEAM_SLUGS as readonly string[]).includes(slug);
}

export function isTeamSection(value: string): value is TeamSection {
  return (TEAM_SECTIONS as readonly string[]).includes(value);
}

export { FOCUS_TEAM_SLUGS, TEAM_SECTIONS };
