import { nodeId } from "../ids";
import {
  commitment,
  contract,
  draft,
  draftPick,
  edge,
  playedFor,
  player,
  prospect,
} from "./builders";
import type { GraphEdge, GraphNode } from "../types";

const NYI = nodeId("team", "new-york-islanders");
const OTT = nodeId("team", "ottawa-senators");
const NJD = nodeId("team", "new-jersey-devils");
const BU = nodeId("team", "boston-university-terriers");
const PSU = nodeId("team", "penn-state-nittany-lions");
const DRAFT_2024 = nodeId("draft", "nhl-2024");

const mckenna = player({
  firstName: "Gavin",
  lastName: "McKenna",
  position: "LW",
  shootsCatches: "L",
  nationality: "CA",
  birthDate: "2007-12-20",
  summary: "2026 draft-class axis. Penn State commitment; NHL rights not yet assigned.",
});

const brady = player({
  firstName: "Brady",
  lastName: "Tkachuk",
  sweaterNumber: 7,
  position: "LW",
  shootsCatches: "L",
  nationality: "US",
  birthDate: "1999-09-16",
  captaincy: "C",
  summary: "Ottawa captain. Interior-game object — not Matthew Tkachuk in Florida.",
});

const markstrom = player({
  firstName: "Jacob",
  lastName: "Markstrom",
  sweaterNumber: 25,
  position: "G",
  shootsCatches: "L",
  nationality: "SE",
  birthDate: "1990-01-31",
  summary: "New Jersey starter. Workload is a graph object, not a vibe.",
});

const eiserman = player({
  firstName: "Cole",
  lastName: "Eiserman",
  position: "LW",
  shootsCatches: "L",
  nationality: "US",
  birthDate: "2006-08-29",
  summary: "Islanders 2024 pick on the BU clock. rights_owned_by NYI, committed_to Terriers.",
});

/**
 * Vault-aligned entities (conceptual, original copy).
 * Crosby, Barkov, and Marco Sturm already live in focus packs — referenced by ID, not duplicated.
 */
export function vaultNodes(): GraphNode[] {
  return [
    draft({ slug: "nhl-2024", name: "2024 NHL Draft", leagueId: nodeId("league", "nhl"), year: 2024, location: "Las Vegas" }),
    mckenna,
    brady,
    markstrom,
    eiserman,
    commitment({
      slug: "mckenna-penn-state",
      name: "Gavin McKenna → Penn State",
      playerId: mckenna.id,
      schoolTeamId: PSU,
      classYear: 2025,
      announcedOn: "2025-08-01",
    }),
    commitment({
      slug: "eiserman-bu",
      name: "Cole Eiserman → Boston University",
      playerId: eiserman.id,
      schoolTeamId: BU,
      classYear: 2025,
      announcedOn: "2024-08-15",
    }),
    prospect({
      slug: "nyi-eiserman",
      name: "Cole Eiserman",
      playerId: eiserman.id,
      teamId: NYI,
      rank: 2,
      eta: "2026-27",
      leagueHint: "NCAA (BU)",
    }),
    prospect({
      slug: "draft-2026-mckenna",
      name: "Gavin McKenna",
      playerId: mckenna.id,
      teamId: PSU,
      rank: 1,
      eta: "2026 draft",
      leagueHint: "NCAA / 2026 NHL Draft",
    }),
    draftPick({
      slug: "nyi-2024-eiserman",
      name: "2024 1st round — Cole Eiserman",
      draftId: DRAFT_2024,
      round: 1,
      overall: 20,
      originalTeamId: NYI,
      currentTeamId: NYI,
      year: 2024,
      playerId: eiserman.id,
    }),
    contract({
      slug: "ott-brady-tkachuk",
      playerId: brady.id,
      teamId: OTT,
      seasonStart: 2022,
      seasonEnd: 2028,
      aavUsd: 8_205_714,
      years: 7,
      expiry: "UFA",
      contractType: "standard",
      illustrative: true,
    }),
    contract({
      slug: "njd-markstrom",
      playerId: markstrom.id,
      teamId: NJD,
      seasonStart: 2024,
      seasonEnd: 2026,
      aavUsd: 6_000_000,
      years: 2,
      expiry: "UFA",
      contractType: "standard",
      illustrative: true,
    }),
  ];
}

export function vaultEdges(): GraphEdge[] {
  return [
    playedFor(mckenna.id, PSU),
    edge("committed_to", mckenna.id, PSU, { extraKey: "ncaa-2026" }),
    playedFor(brady.id, OTT),
    edge("contract_with", brady.id, OTT, { extraKey: "ott-brady-tkachuk" }),
    playedFor(markstrom.id, NJD),
    edge("contract_with", markstrom.id, NJD, { extraKey: "njd-markstrom" }),
    playedFor(eiserman.id, BU),
    edge("committed_to", eiserman.id, BU, { extraKey: "ncaa-2026" }),
    edge("rights_owned_by", eiserman.id, NYI, { extraKey: "2024" }),
    edge("drafted_by", eiserman.id, NYI, { extraKey: "2024" }),
  ];
}
