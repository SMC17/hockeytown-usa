import type {
  CapSnapshot,
  Coach,
  Contract,
  DraftPick,
  Game,
  GraphEdge,
  GraphNode,
  Injury,
  LineAssignment,
  Player,
  Prospect,
  Roster,
  Transaction,
} from "../types";

export interface FocusPack {
  teamSlug: string;
  players: Player[];
  coaches: Coach[];
  roster: Roster;
  contracts: Contract[];
  injuries: Injury[];
  transactions: Transaction[];
  prospects: Prospect[];
  picks: DraftPick[];
  games: Game[];
  lines: LineAssignment[];
  cap: CapSnapshot;
  extraNodes?: GraphNode[];
  extraEdges?: GraphEdge[];
}

export function flattenPack(pack: FocusPack): { nodes: GraphNode[]; edges: GraphEdge[] } {
  const nodes: GraphNode[] = [
    ...pack.players,
    ...pack.coaches,
    pack.roster,
    ...pack.contracts,
    ...pack.injuries,
    ...pack.transactions,
    ...pack.prospects,
    ...pack.picks,
    ...pack.games,
    ...(pack.extraNodes ?? []),
  ];
  return { nodes, edges: pack.extraEdges ?? [] };
}
