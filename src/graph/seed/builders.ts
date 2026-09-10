import { edgeId, nodeId, slugify } from "../ids";
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
  LineAssignment,
  LineUnit,
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
} from "../types";

export const STAMP = "2026-09-10";
export const SEASON_2026 = nodeId("season", "nhl-2025-26");
export const NHL_ID = nodeId("league", "nhl");

export function player(
  partial: Omit<Player, "id" | "type" | "updatedAt" | "slug" | "name"> & { slug?: string; name?: string },
): Player {
  const slug = partial.slug ?? slugify(`${partial.firstName} ${partial.lastName}`);
  return {
    ...partial,
    id: nodeId("player", slug),
    type: "player",
    slug,
    name: partial.name ?? `${partial.firstName} ${partial.lastName}`,
    updatedAt: STAMP,
  };
}

export function team(partial: Omit<Team, "id" | "type" | "updatedAt">): Team {
  return {
    ...partial,
    id: nodeId("team", partial.slug),
    type: "team",
    updatedAt: STAMP,
  };
}

export function league(partial: Omit<League, "id" | "type" | "updatedAt">): League {
  return { ...partial, id: nodeId("league", partial.slug), type: "league", updatedAt: STAMP };
}

export function season(partial: Omit<Season, "id" | "type" | "updatedAt">): Season {
  return { ...partial, id: nodeId("season", partial.slug), type: "season", updatedAt: STAMP };
}

export function arena(partial: Omit<Arena, "id" | "type" | "updatedAt">): Arena {
  return { ...partial, id: nodeId("arena", partial.slug), type: "arena", updatedAt: STAMP };
}

export function coach(partial: Omit<Coach, "id" | "type" | "updatedAt" | "slug"> & { slug?: string }): Coach {
  const slug = partial.slug ?? slugify(partial.name);
  return { ...partial, id: nodeId("coach", slug), type: "coach", slug, updatedAt: STAMP };
}

export function agent(partial: Omit<Agent, "id" | "type" | "updatedAt" | "slug"> & { slug?: string }): Agent {
  const slug = partial.slug ?? slugify(partial.name);
  return { ...partial, id: nodeId("agent", slug), type: "agent", slug, updatedAt: STAMP };
}

export function contract(partial: Omit<Contract, "id" | "type" | "updatedAt" | "slug" | "name"> & { slug: string }): Contract {
  return {
    ...partial,
    id: nodeId("contract", partial.slug),
    type: "contract",
    name: `Contract ${partial.slug}`,
    updatedAt: STAMP,
  };
}

export function injury(partial: Omit<Injury, "id" | "type" | "updatedAt" | "slug"> & { slug: string }): Injury {
  return { ...partial, id: nodeId("injury", partial.slug), type: "injury", updatedAt: STAMP };
}

export function transaction(partial: Omit<Transaction, "id" | "type" | "updatedAt" | "slug"> & { slug: string }): Transaction {
  return { ...partial, id: nodeId("transaction", partial.slug), type: "transaction", updatedAt: STAMP };
}

export function draft(partial: Omit<Draft, "id" | "type" | "updatedAt">): Draft {
  return { ...partial, id: nodeId("draft", partial.slug), type: "draft", updatedAt: STAMP };
}

export function draftPick(partial: Omit<DraftPick, "id" | "type" | "updatedAt" | "slug" | "name"> & { slug: string; name?: string }): DraftPick {
  return {
    ...partial,
    id: nodeId("draft_pick", partial.slug),
    type: "draft_pick",
    name: partial.name ?? `Pick ${partial.year} R${partial.round}`,
    updatedAt: STAMP,
  };
}

export function prospect(partial: Omit<Prospect, "id" | "type" | "updatedAt" | "slug" | "name"> & { slug: string; name: string }): Prospect {
  return { ...partial, id: nodeId("prospect", partial.slug), type: "prospect", updatedAt: STAMP };
}

export function commitment(partial: Omit<Commitment, "id" | "type" | "updatedAt" | "slug" | "name"> & { slug: string; name: string }): Commitment {
  return { ...partial, id: nodeId("commitment", partial.slug), type: "commitment", updatedAt: STAMP };
}

export function transfer(partial: Omit<Transfer, "id" | "type" | "updatedAt" | "slug" | "name"> & { slug: string; name: string }): Transfer {
  return { ...partial, id: nodeId("transfer", partial.slug), type: "transfer", updatedAt: STAMP };
}

export function game(partial: Omit<Game, "id" | "type" | "updatedAt">): Game {
  return { ...partial, id: nodeId("game", partial.slug), type: "game", updatedAt: STAMP };
}

export function roster(partial: Omit<Roster, "id" | "type" | "updatedAt">): Roster {
  return { ...partial, id: nodeId("roster", partial.slug), type: "roster", updatedAt: STAMP };
}

export function article(partial: Omit<Article, "id" | "type" | "updatedAt">): Article {
  return { ...partial, id: nodeId("article", partial.slug), type: "article", updatedAt: STAMP };
}

export function video(partial: Omit<Video, "id" | "type" | "updatedAt">): Video {
  return { ...partial, id: nodeId("video", partial.slug), type: "video", updatedAt: STAMP };
}

export function quote(partial: Omit<Quote, "id" | "type" | "updatedAt">): Quote {
  return { ...partial, id: nodeId("quote", partial.slug), type: "quote", updatedAt: STAMP };
}

export function source(partial: Omit<Source, "id" | "type" | "updatedAt">): Source {
  return { ...partial, id: nodeId("source", partial.slug), type: "source", updatedAt: STAMP };
}

export function edge(
  type: EdgeType,
  from: string,
  to: string,
  extra?: Partial<GraphEdge> & { extraKey?: string },
): GraphEdge {
  const { extraKey, ...rest } = extra ?? {};
  return {
    id: edgeId(type, from, to, extraKey),
    type,
    from,
    to,
    ...rest,
  };
}

export function playedFor(
  playerId: string,
  teamId: string,
  extra?: Partial<GraphEdge> & { extraKey?: string },
): GraphEdge {
  const extraKey = extra?.extraKey ?? extra?.seasonId ?? SEASON_2026;
  return edge("played_for", playerId, teamId, { seasonId: SEASON_2026, ...extra, extraKey });
}

export function line(
  teamId: string,
  unit: LineUnit,
  playerIds: string[],
  label?: string,
): LineAssignment {
  return {
    id: `line:${teamId.split(":")[1]}:${unit}`,
    teamId,
    seasonId: SEASON_2026,
    unit,
    playerIds,
    label,
  };
}

export function bag(...groups: GraphNode[][]): GraphNode[] {
  return groups.flat();
}
