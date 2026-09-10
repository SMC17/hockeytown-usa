import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { edge, STAMP } from "./seed/builders";
import { nodeId } from "./ids";
import type {
  Agent,
  Arena,
  Article,
  Coach,
  Commitment,
  Contract,
  Draft,
  DraftPick,
  EdgeType,
  Game,
  GraphEdge,
  GraphNode,
  Injury,
  League,
  NodeType,
  Player,
  Prospect,
  Quote,
  Roster,
  Season,
  Source,
  Team,
  Transaction,
  Transfer,
  Video,
} from "./types";
import { EDGE_TYPES, NODE_TYPES } from "./types";

export const VAULT_SEED_EXPORT = "hockey-graph-seed";
export const VAULT_SEED_FILENAME = "hockey-graph-seed.json";
export const VAULT_SEED_EXAMPLE_FILENAME = "hockey-graph-seed.example.json";

export type VaultExportEntity = {
  id: string;
  type: NodeType;
  slug: string;
  name: string;
  props?: Record<string, unknown>;
};

export type VaultExportEdge = {
  type: EdgeType;
  from: string;
  to: string;
  since?: string;
  until?: string;
  seasonId?: string;
  extra?: string;
  properties?: Record<string, string | number | boolean | null>;
};

/** Envelope matching a Hockey Graph vault export. Production dumps set entityCount to 106. */
export type VaultExportEnvelope = {
  export: typeof VAULT_SEED_EXPORT;
  version: number;
  generatedAt: string;
  entityCount: number;
  entities: VaultExportEntity[];
  edges: VaultExportEdge[];
};

export type VaultImportResult = {
  nodes: GraphNode[];
  edges: GraphEdge[];
  warnings: string[];
  entityCount: number;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function asString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value : undefined;
}

function asNumber(value: unknown): number | undefined {
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}

function asBoolean(value: unknown): boolean | undefined {
  return typeof value === "boolean" ? value : undefined;
}

function isNodeType(value: unknown): value is NodeType {
  return typeof value === "string" && (NODE_TYPES as readonly string[]).includes(value);
}

function isEdgeType(value: unknown): value is EdgeType {
  return typeof value === "string" && (EDGE_TYPES as readonly string[]).includes(value);
}

export function vaultSeedPath(filename = VAULT_SEED_FILENAME): string {
  return join(process.cwd(), "content", "vault", filename);
}

export function parseVaultExport(raw: unknown): VaultExportEnvelope {
  if (!isRecord(raw)) throw new Error("Vault export must be a JSON object");
  if (raw.export !== VAULT_SEED_EXPORT) {
    throw new Error(`Vault export.export must be "${VAULT_SEED_EXPORT}"`);
  }
  if (typeof raw.version !== "number") throw new Error("Vault export.version must be a number");
  if (typeof raw.generatedAt !== "string") throw new Error("Vault export.generatedAt must be an ISO string");
  if (typeof raw.entityCount !== "number") throw new Error("Vault export.entityCount must be a number");
  if (!Array.isArray(raw.entities)) throw new Error("Vault export.entities must be an array");
  if (!Array.isArray(raw.edges)) throw new Error("Vault export.edges must be an array");

  const entities: VaultExportEntity[] = raw.entities.map((item, i) => {
    if (!isRecord(item)) throw new Error(`entities[${i}] must be an object`);
    if (!isNodeType(item.type)) throw new Error(`entities[${i}].type is not a NodeType`);
    const slug = asString(item.slug);
    const name = asString(item.name);
    if (!slug || !name) throw new Error(`entities[${i}] needs slug and name`);
    const id = asString(item.id) ?? nodeId(item.type, slug);
    return {
      id,
      type: item.type,
      slug,
      name,
      props: isRecord(item.props) ? item.props : {},
    };
  });

  const edges: VaultExportEdge[] = raw.edges.map((item, i) => {
    if (!isRecord(item)) throw new Error(`edges[${i}] must be an object`);
    if (!isEdgeType(item.type)) throw new Error(`edges[${i}].type is not an EdgeType`);
    const from = asString(item.from);
    const to = asString(item.to);
    if (!from || !to) throw new Error(`edges[${i}] needs from and to`);
    return {
      type: item.type,
      from,
      to,
      since: asString(item.since),
      until: asString(item.until),
      seasonId: asString(item.seasonId),
      extra: asString(item.extra),
      properties: isRecord(item.properties)
        ? (item.properties as VaultExportEdge["properties"])
        : undefined,
    };
  });

  return {
    export: VAULT_SEED_EXPORT,
    version: raw.version,
    generatedAt: raw.generatedAt,
    entityCount: raw.entityCount,
    entities,
    edges,
  };
}

function splitName(name: string): { firstName: string; lastName: string } {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return { firstName: parts[0], lastName: parts[0] };
  return { firstName: parts[0], lastName: parts.slice(1).join(" ") };
}

function hydrateNode(entity: VaultExportEntity, stamp: string): { node?: GraphNode; warning?: string } {
  const props = entity.props ?? {};
  const base = {
    id: entity.id,
    slug: entity.slug,
    name: entity.name,
    updatedAt: asString(props.updatedAt) ?? stamp,
    summary: asString(props.summary),
  };

  switch (entity.type) {
    case "player": {
      const names = splitName(entity.name);
      const position = asString(props.position);
      if (!position) return { warning: `skip player ${entity.slug}: props.position required` };
      const node: Player = {
        ...base,
        type: "player",
        firstName: asString(props.firstName) ?? names.firstName,
        lastName: asString(props.lastName) ?? names.lastName,
        position: position as Player["position"],
        sweaterNumber: asNumber(props.sweaterNumber),
        shootsCatches: asString(props.shootsCatches) as Player["shootsCatches"],
        nationality: asString(props.nationality),
        birthDate: asString(props.birthDate),
        birthplace: asString(props.birthplace),
        captaincy: asString(props.captaincy) as Player["captaincy"],
      };
      return { node };
    }
    case "team": {
      const abbreviation = asString(props.abbreviation);
      const city = asString(props.city);
      const leagueId = asString(props.leagueId);
      const coverage = asString(props.coverage);
      if (!abbreviation || !city || !leagueId) {
        return { warning: `skip team ${entity.slug}: props.abbreviation, city, leagueId required` };
      }
      const node: Team = {
        ...base,
        type: "team",
        abbreviation,
        city,
        region: asString(props.region),
        leagueId,
        conference: asString(props.conference) as Team["conference"],
        division: asString(props.division),
        primaryColor: asString(props.primaryColor) ?? "#111111",
        secondaryColor: asString(props.secondaryColor) ?? "#eeeeee",
        coverage: coverage === "deep" ? "deep" : "catalog",
        focus: asBoolean(props.focus),
        hometown: asBoolean(props.hometown),
        arenaId: asString(props.arenaId),
        founded: asNumber(props.founded),
      };
      return { node };
    }
    case "league": {
      const abbreviation = asString(props.abbreviation);
      const level = asString(props.level);
      if (!abbreviation || !level) return { warning: `skip league ${entity.slug}: abbreviation and level required` };
      const node: League = {
        ...base,
        type: "league",
        abbreviation,
        level: level as League["level"],
        country: asString(props.country),
      };
      return { node };
    }
    case "season": {
      const leagueId = asString(props.leagueId);
      const startYear = asNumber(props.startYear);
      const endYear = asNumber(props.endYear);
      const label = asString(props.label);
      if (!leagueId || startYear == null || endYear == null || !label) {
        return { warning: `skip season ${entity.slug}: leagueId, startYear, endYear, label required` };
      }
      const node: Season = {
        ...base,
        type: "season",
        leagueId,
        startYear,
        endYear,
        label,
        current: asBoolean(props.current),
      };
      return { node };
    }
    case "game": {
      const seasonId = asString(props.seasonId);
      const leagueId = asString(props.leagueId);
      const homeTeamId = asString(props.homeTeamId);
      const awayTeamId = asString(props.awayTeamId);
      const startsAt = asString(props.startsAt);
      if (!seasonId || !leagueId || !homeTeamId || !awayTeamId || !startsAt) {
        return { warning: `skip game ${entity.slug}: schedule fields required` };
      }
      // Refuse live boxscores. Import is a graph seat, not a stats wire.
      const node: Game = {
        ...base,
        type: "game",
        seasonId,
        leagueId,
        homeTeamId,
        awayTeamId,
        startsAt,
        venueId: asString(props.venueId),
        status: "scheduled",
      };
      return { node };
    }
    case "roster": {
      const teamId = asString(props.teamId);
      const seasonId = asString(props.seasonId);
      const kind = asString(props.kind);
      if (!teamId || !seasonId || !kind) return { warning: `skip roster ${entity.slug}: teamId, seasonId, kind required` };
      const node: Roster = { ...base, type: "roster", teamId, seasonId, kind: kind as Roster["kind"] };
      return { node };
    }
    case "contract": {
      const playerId = asString(props.playerId);
      const teamId = asString(props.teamId);
      const seasonStart = asNumber(props.seasonStart);
      const seasonEnd = asNumber(props.seasonEnd);
      const contractType = asString(props.contractType);
      if (!playerId || !teamId || seasonStart == null || seasonEnd == null || !contractType) {
        return { warning: `skip contract ${entity.slug}: player, team, term, contractType required` };
      }
      const node: Contract = {
        ...base,
        type: "contract",
        playerId,
        teamId,
        seasonStart,
        seasonEnd,
        aavUsd: asNumber(props.aavUsd),
        totalValueUsd: asNumber(props.totalValueUsd),
        years: asNumber(props.years),
        expiry: asString(props.expiry) as Contract["expiry"],
        clause: asString(props.clause),
        contractType: contractType as Contract["contractType"],
        illustrative: asBoolean(props.illustrative) ?? true,
      };
      return { node };
    }
    case "transaction": {
      const kind = asString(props.kind);
      const date = asString(props.date);
      if (!kind || !date) return { warning: `skip transaction ${entity.slug}: kind and date required` };
      const playerIds = Array.isArray(props.playerIds)
        ? props.playerIds.filter((id): id is string => typeof id === "string")
        : [];
      const node: Transaction = {
        ...base,
        type: "transaction",
        kind: kind as Transaction["kind"],
        date,
        fromTeamId: asString(props.fromTeamId),
        toTeamId: asString(props.toTeamId),
        playerIds,
        notes: asString(props.notes),
      };
      return { node };
    }
    case "injury": {
      const playerId = asString(props.playerId);
      const teamId = asString(props.teamId);
      const status = asString(props.status);
      if (!playerId || !teamId || !status) return { warning: `skip injury ${entity.slug}: playerId, teamId, status required` };
      const node: Injury = {
        ...base,
        type: "injury",
        playerId,
        teamId,
        status: status as Injury["status"],
        bodyPart: asString(props.bodyPart),
        injuredOn: asString(props.injuredOn),
        expectedReturn: asString(props.expectedReturn),
        notes: asString(props.notes),
      };
      return { node };
    }
    case "draft": {
      const leagueId = asString(props.leagueId);
      const year = asNumber(props.year);
      if (!leagueId || year == null) return { warning: `skip draft ${entity.slug}: leagueId and year required` };
      const node: Draft = { ...base, type: "draft", leagueId, year, location: asString(props.location) };
      return { node };
    }
    case "draft_pick": {
      const draftId = asString(props.draftId);
      const round = asNumber(props.round);
      const originalTeamId = asString(props.originalTeamId);
      const currentTeamId = asString(props.currentTeamId);
      const year = asNumber(props.year);
      if (!draftId || round == null || !originalTeamId || !currentTeamId || year == null) {
        return { warning: `skip draft_pick ${entity.slug}: draft, round, teams, year required` };
      }
      const node: DraftPick = {
        ...base,
        type: "draft_pick",
        draftId,
        round,
        overall: asNumber(props.overall),
        originalTeamId,
        currentTeamId,
        year,
        playerId: asString(props.playerId),
        notes: asString(props.notes),
      };
      return { node };
    }
    case "prospect": {
      const playerId = asString(props.playerId);
      const teamId = asString(props.teamId);
      if (!playerId || !teamId) return { warning: `skip prospect ${entity.slug}: playerId and teamId required` };
      const node: Prospect = {
        ...base,
        type: "prospect",
        playerId,
        teamId,
        rank: asNumber(props.rank),
        eta: asString(props.eta),
        leagueHint: asString(props.leagueHint),
      };
      return { node };
    }
    case "commitment": {
      const playerId = asString(props.playerId);
      const schoolTeamId = asString(props.schoolTeamId);
      if (!playerId || !schoolTeamId) {
        return { warning: `skip commitment ${entity.slug}: playerId and schoolTeamId required` };
      }
      const node: Commitment = {
        ...base,
        type: "commitment",
        playerId,
        schoolTeamId,
        classYear: asNumber(props.classYear),
        announcedOn: asString(props.announcedOn),
      };
      return { node };
    }
    case "transfer": {
      const playerId = asString(props.playerId);
      const fromTeamId = asString(props.fromTeamId);
      if (!playerId || !fromTeamId) return { warning: `skip transfer ${entity.slug}: playerId and fromTeamId required` };
      const node: Transfer = {
        ...base,
        type: "transfer",
        playerId,
        fromTeamId,
        toTeamId: asString(props.toTeamId),
        portalDate: asString(props.portalDate),
        notes: asString(props.notes),
      };
      return { node };
    }
    case "coach": {
      const role = asString(props.role);
      const teamId = asString(props.teamId);
      if (!role || !teamId) return { warning: `skip coach ${entity.slug}: role and teamId required` };
      const node: Coach = {
        ...base,
        type: "coach",
        role: role as Coach["role"],
        teamId,
        seasonId: asString(props.seasonId),
      };
      return { node };
    }
    case "agent": {
      const node: Agent = { ...base, type: "agent", agency: asString(props.agency) };
      return { node };
    }
    case "arena": {
      const city = asString(props.city);
      if (!city) return { warning: `skip arena ${entity.slug}: props.city required` };
      const node: Arena = {
        ...base,
        type: "arena",
        city,
        region: asString(props.region),
        country: asString(props.country),
        capacity: asNumber(props.capacity),
        opened: asNumber(props.opened),
      };
      return { node };
    }
    case "article": {
      const publishedAt = asString(props.publishedAt);
      const author = asString(props.author);
      const status = asString(props.status);
      if (!publishedAt || !author || !status) {
        return { warning: `skip article ${entity.slug}: publishedAt, author, status required` };
      }
      const mentions = Array.isArray(props.mentions)
        ? props.mentions
            .map((m) => (isRecord(m) && asString(m.entityId) ? { entityId: String(m.entityId), label: asString(m.label) } : null))
            .filter(Boolean) as Article["mentions"]
        : [];
      const node: Article = {
        ...base,
        type: "article",
        dek: asString(props.dek),
        body: asString(props.body) ?? "",
        publishedAt,
        author,
        status: status as Article["status"],
        section: asString(props.section),
        heroKicker: asString(props.heroKicker),
        mentions,
      };
      return { node };
    }
    case "video": {
      const rights = asString(props.rights);
      if (!rights) return { warning: `skip video ${entity.slug}: props.rights required` };
      const relatedEntityIds = Array.isArray(props.relatedEntityIds)
        ? props.relatedEntityIds.filter((id): id is string => typeof id === "string")
        : [];
      const node: Video = {
        ...base,
        type: "video",
        rights: rights as Video["rights"],
        provider: asString(props.provider),
        canonicalUrl: asString(props.canonicalUrl),
        durationSec: asNumber(props.durationSec),
        relatedEntityIds,
      };
      return { node };
    }
    case "quote": {
      const text = asString(props.text);
      const speakerName = asString(props.speakerName);
      if (!text || !speakerName) return { warning: `skip quote ${entity.slug}: text and speakerName required` };
      const node: Quote = {
        ...base,
        type: "quote",
        text,
        speakerName,
        speakerId: asString(props.speakerId),
        utteredOn: asString(props.utteredOn),
        context: asString(props.context),
      };
      return { node };
    }
    case "source": {
      const publisher = asString(props.publisher);
      const reliability = asString(props.reliability);
      if (!publisher || !reliability) {
        return { warning: `skip source ${entity.slug}: publisher and reliability required` };
      }
      const node: Source = {
        ...base,
        type: "source",
        url: asString(props.url),
        publisher,
        reliability: reliability as Source["reliability"],
      };
      return { node };
    }
    default:
      return { warning: `skip ${entity.type}:${entity.slug}: unsupported type` };
  }
}

export function vaultExportToGraph(envelope: VaultExportEnvelope): VaultImportResult {
  const warnings: string[] = [];
  if (envelope.entityCount !== envelope.entities.length) {
    warnings.push(
      `entityCount ${envelope.entityCount} does not match entities.length ${envelope.entities.length}`,
    );
  }
  if (envelope.entityCount < 32) {
    warnings.push(`vault seed looks thin (${envelope.entityCount} entities); expected a full NHL set`);
  }

  const nodes: GraphNode[] = [];
  for (const entity of envelope.entities) {
    const { node, warning } = hydrateNode(entity, envelope.generatedAt || STAMP);
    if (warning) warnings.push(warning);
    if (node) nodes.push(node);
  }

  const edges: GraphEdge[] = envelope.edges.map((e) =>
    edge(e.type, e.from, e.to, {
      extraKey: e.extra,
      since: e.since,
      until: e.until,
      seasonId: e.seasonId,
      properties: e.properties,
    }),
  );

  return { nodes, edges, warnings, entityCount: envelope.entityCount };
}

export function loadVaultSeedFile(filename = VAULT_SEED_FILENAME): VaultImportResult {
  const path = vaultSeedPath(filename);
  if (!existsSync(path)) {
    return { nodes: [], edges: [], warnings: [`no ${filename} at ${path}`], entityCount: 0 };
  }
  const parsed = parseVaultExport(JSON.parse(readFileSync(path, "utf8")));
  return vaultExportToGraph(parsed);
}

/** Merge hook for the seed assembler. Missing file is a no-op. */
export function loadVaultSeedImport(): { nodes: GraphNode[]; edges: GraphEdge[] } {
  const result = loadVaultSeedFile(VAULT_SEED_FILENAME);
  return { nodes: result.nodes, edges: result.edges };
}

