import { nodeId } from "../ids";
import {
  NHL_ID,
  SEASON_2026,
  coach,
  contract,
  draftPick,
  edge,
  game,
  injury,
  line,
  playedFor,
  player,
  prospect,
  roster,
  transaction,
} from "./builders";
import { NHL_CAP_CEILING_2026 } from "./catalog";
import type { FocusPack } from "./focus-pack";

const TEAM = nodeId("team", "toronto-maple-leafs");
const AFFILIATE = nodeId("team", "toronto-marlies");

const p = {
  matthews: player({ firstName: "Auston", lastName: "Matthews", sweaterNumber: 34, position: "C", shootsCatches: "L", nationality: "US", birthDate: "1997-09-17", captaincy: "C" }),
  nylander: player({ firstName: "William", lastName: "Nylander", sweaterNumber: 88, position: "RW", shootsCatches: "R", nationality: "SE", birthDate: "1996-05-01", captaincy: "A" }),
  knies: player({ firstName: "Matthew", lastName: "Knies", sweaterNumber: 23, position: "LW", shootsCatches: "L", nationality: "US", birthDate: "2002-10-17" }),
  tavares: player({ firstName: "John", lastName: "Tavares", sweaterNumber: 91, position: "C", shootsCatches: "L", nationality: "CA", birthDate: "1990-09-20", captaincy: "A" }),
  mcmann: player({ firstName: "Bobby", lastName: "McMann", sweaterNumber: 74, position: "LW", shootsCatches: "L", nationality: "CA", birthDate: "1996-06-15" }),
  cowan: player({ firstName: "Easton", lastName: "Cowan", sweaterNumber: 53, position: "RW", shootsCatches: "L", nationality: "CA", birthDate: "2005-05-20" }),
  maccelli: player({ firstName: "Matias", lastName: "Maccelli", sweaterNumber: 63, position: "LW", shootsCatches: "L", nationality: "FI", birthDate: "2000-10-14" }),
  roy: player({ firstName: "Nicolas", lastName: "Roy", sweaterNumber: 55, position: "C", shootsCatches: "R", nationality: "CA", birthDate: "1997-02-05" }),
  robertson: player({ firstName: "Nicholas", lastName: "Robertson", sweaterNumber: 89, position: "LW", shootsCatches: "L", nationality: "US", birthDate: "2001-09-11" }),
  domi: player({ firstName: "Max", lastName: "Domi", sweaterNumber: 11, position: "LW", shootsCatches: "L", nationality: "CA", birthDate: "1995-03-02" }),
  laughton: player({ firstName: "Scott", lastName: "Laughton", sweaterNumber: 24, position: "C", shootsCatches: "L", nationality: "CA", birthDate: "1994-05-30" }),
  rielly: player({ firstName: "Morgan", lastName: "Rielly", sweaterNumber: 44, position: "D", shootsCatches: "L", nationality: "CA", birthDate: "1994-03-09" }),
  mccabe: player({ firstName: "Jake", lastName: "McCabe", sweaterNumber: 22, position: "D", shootsCatches: "L", nationality: "US", birthDate: "1993-10-12" }),
  tanev: player({ firstName: "Chris", lastName: "Tanev", sweaterNumber: 8, position: "D", shootsCatches: "R", nationality: "CA", birthDate: "1989-12-20" }),
  carlo: player({ firstName: "Brandon", lastName: "Carlo", sweaterNumber: 25, position: "D", shootsCatches: "R", nationality: "US", birthDate: "1996-11-26" }),
  oel: player({ firstName: "Oliver", lastName: "Ekman-Larsson", slug: "oliver-ekman-larsson", sweaterNumber: 95, position: "D", shootsCatches: "L", nationality: "SE", birthDate: "1991-07-17" }),
  stolarz: player({ firstName: "Anthony", lastName: "Stolarz", sweaterNumber: 41, position: "G", shootsCatches: "L", nationality: "US", birthDate: "1994-01-20" }),
  woll: player({ firstName: "Joseph", lastName: "Woll", sweaterNumber: 60, position: "G", shootsCatches: "L", nationality: "US", birthDate: "1998-07-12" }),
};

const berube = coach({ name: "Craig Berube", role: "head", teamId: TEAM, seasonId: SEASON_2026 });
const players = Object.values(p);
const mintenId = nodeId("player", "fraser-minten");

export const leafsPack: FocusPack = {
  teamSlug: "toronto-maple-leafs",
  players,
  coaches: [berube],
  roster: roster({
    slug: "tor-2025-26",
    name: "Maple Leafs 2025-26 roster",
    teamId: TEAM,
    seasonId: SEASON_2026,
    kind: "nhl",
  }),
  contracts: [
    contract({ slug: "tor-matthews", playerId: p.matthews.id, teamId: TEAM, seasonStart: 2024, seasonEnd: 2028, aavUsd: 13_250_000, years: 4, expiry: "UFA", contractType: "standard", illustrative: true }),
    contract({ slug: "tor-nylander", playerId: p.nylander.id, teamId: TEAM, seasonStart: 2024, seasonEnd: 2032, aavUsd: 11_500_000, years: 8, expiry: "UFA", contractType: "standard", illustrative: true }),
    contract({ slug: "tor-tavares", playerId: p.tavares.id, teamId: TEAM, seasonStart: 2025, seasonEnd: 2026, aavUsd: 4_500_000, years: 1, expiry: "UFA", contractType: "standard", illustrative: true }),
    contract({ slug: "tor-rielly", playerId: p.rielly.id, teamId: TEAM, seasonStart: 2021, seasonEnd: 2030, aavUsd: 7_500_000, years: 8, expiry: "UFA", contractType: "standard", illustrative: true }),
  ],
  injuries: [
    injury({
      slug: "tor-tanev-block",
      name: "Chris Tanev — lower body",
      playerId: p.tanev.id,
      teamId: TEAM,
      status: "day-to-day",
      bodyPart: "Lower body",
      notes: "Stub: shot-block volume season. Empty/live IR feed later.",
    }),
  ],
  transactions: [
    transaction({
      slug: "tor-carlo-acquired",
      name: "Leafs acquire Brandon Carlo",
      kind: "trade",
      date: "2025-03-07",
      toTeamId: TEAM,
      fromTeamId: nodeId("team", "boston-bruins"),
      playerIds: [p.carlo.id],
      notes: "Illustrative historical edge; confirm assets on ingest.",
    }),
  ],
  prospects: [
    prospect({ slug: "tor-cowan", name: "Easton Cowan", playerId: p.cowan.id, teamId: TEAM, rank: 1, eta: "now", leagueHint: "NHL" }),
  ],
  picks: [
    draftPick({
      slug: "tor-2023-cowan",
      name: "2023 1st round — Easton Cowan",
      draftId: nodeId("draft", "nhl-2023"),
      round: 1,
      overall: 28,
      originalTeamId: TEAM,
      currentTeamId: TEAM,
      year: 2023,
      playerId: p.cowan.id,
    }),
    draftPick({
      slug: "tor-2026-1",
      name: "2026 1st-round pick (owned)",
      draftId: nodeId("draft", "nhl-2026"),
      round: 1,
      originalTeamId: TEAM,
      currentTeamId: TEAM,
      year: 2026,
    }),
  ],
  games: [
    game({
      slug: "2026-04-09-nyi-tor",
      name: "Islanders 5, Maple Leafs 3",
      seasonId: SEASON_2026,
      leagueId: NHL_ID,
      homeTeamId: TEAM,
      awayTeamId: nodeId("team", "new-york-islanders"),
      startsAt: "2026-04-09T23:00:00Z",
      venueId: nodeId("arena", "scotiabank-arena"),
      status: "final",
      homeScore: 3,
      awayScore: 5,
    }),
  ],
  lines: [
    line(TEAM, "f1", [p.knies.id, p.matthews.id, p.nylander.id], "1F"),
    line(TEAM, "f2", [p.mcmann.id, p.tavares.id, p.cowan.id], "2F"),
    line(TEAM, "f3", [p.maccelli.id, p.roy.id, p.robertson.id], "3F"),
    line(TEAM, "f4", [p.domi.id, p.laughton.id], "4F"),
    line(TEAM, "d1", [p.mccabe.id, p.rielly.id], "1D"),
    line(TEAM, "d2", [p.tanev.id, p.carlo.id], "2D"),
    line(TEAM, "d3", [p.oel.id], "3D"),
    line(TEAM, "g", [p.stolarz.id, p.woll.id], "G"),
  ],
  cap: {
    teamId: TEAM,
    seasonId: SEASON_2026,
    ceilingUsd: NHL_CAP_CEILING_2026,
    committedUsd: 94_800_000,
    spaceUsd: 700_000,
    notes: "Illustrative. Leafs remain tight to the ceiling.",
  },
  extraEdges: [
    ...players.map((pl) => playedFor(pl.id, TEAM)),
    edge("coached_by", TEAM, berube.id, { seasonId: SEASON_2026, extraKey: SEASON_2026 }),
    edge("drafted_by", p.matthews.id, TEAM, { extraKey: "2016" }),
    edge("drafted_by", p.nylander.id, TEAM, { extraKey: "2014" }),
    edge("drafted_by", p.cowan.id, TEAM, { extraKey: "2023" }),
    edge("drafted_by", p.tavares.id, nodeId("team", "new-york-islanders"), { extraKey: "2009" }),
    edge("affiliate_of", AFFILIATE, TEAM),
    edge("linemate_with", p.matthews.id, p.nylander.id, { extraKey: "tor-f1", seasonId: SEASON_2026 }),
    edge("linemate_with", p.knies.id, p.matthews.id, { extraKey: "tor-f1", seasonId: SEASON_2026 }),
    edge("member_of_line", p.knies.id, p.matthews.id, { extraKey: "tor-f1" }),
    edge("contract_with", p.matthews.id, TEAM, { extraKey: "tor-matthews" }),
    edge("represented_by", p.matthews.id, nodeId("agent", "pat-brisson")),
    edge("transferred_from", mintenId, TEAM, { extraKey: "to-bos", properties: { note: "pipeline / later Bruins NHL time" } }),
  ],
};
