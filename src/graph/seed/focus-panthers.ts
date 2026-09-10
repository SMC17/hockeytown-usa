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

const TEAM = nodeId("team", "florida-panthers");
const AFFILIATE = nodeId("team", "springfield-thunderbirds");

const p = {
  barkov: player({ firstName: "Aleksander", lastName: "Barkov", sweaterNumber: 16, position: "C", shootsCatches: "L", nationality: "FI", birthDate: "1995-09-02", captaincy: "C", summary: "Captain; 2025-26 availability was severely limited." }),
  reinhart: player({ firstName: "Sam", lastName: "Reinhart", sweaterNumber: 13, position: "C", shootsCatches: "R", nationality: "CA", birthDate: "1995-11-06", captaincy: "A" }),
  tkachuk: player({ firstName: "Matthew", lastName: "Tkachuk", sweaterNumber: 19, position: "LW", shootsCatches: "L", nationality: "US", birthDate: "1997-12-11", captaincy: "A" }),
  bennett: player({ firstName: "Sam", lastName: "Bennett", sweaterNumber: 9, position: "C", shootsCatches: "L", nationality: "CA", birthDate: "1996-06-20" }),
  marchand: player({ firstName: "Brad", lastName: "Marchand", sweaterNumber: 63, position: "LW", shootsCatches: "L", nationality: "CA", birthDate: "1988-05-11" }),
  verhaeghe: player({ firstName: "Carter", lastName: "Verhaeghe", sweaterNumber: 23, position: "C", shootsCatches: "L", nationality: "CA", birthDate: "1995-08-14" }),
  lundell: player({ firstName: "Anton", lastName: "Lundell", sweaterNumber: 15, position: "C", shootsCatches: "L", nationality: "FI", birthDate: "2001-10-03" }),
  luostarinen: player({ firstName: "Eetu", lastName: "Luostarinen", sweaterNumber: 27, position: "C", shootsCatches: "L", nationality: "FI", birthDate: "1998-09-02" }),
  ekblad: player({ firstName: "Aaron", lastName: "Ekblad", sweaterNumber: 5, position: "D", shootsCatches: "R", nationality: "CA", birthDate: "1996-02-07", captaincy: "A" }),
  forsling: player({ firstName: "Gustav", lastName: "Forsling", sweaterNumber: 42, position: "D", shootsCatches: "L", nationality: "SE", birthDate: "1996-06-12" }),
  jones: player({ firstName: "Seth", lastName: "Jones", sweaterNumber: 3, position: "D", shootsCatches: "R", nationality: "US", birthDate: "1994-10-03" }),
  mikkola: player({ firstName: "Niko", lastName: "Mikkola", sweaterNumber: 77, position: "D", shootsCatches: "L", nationality: "FI", birthDate: "1996-04-27" }),
  bob: player({ firstName: "Sergei", lastName: "Bobrovsky", sweaterNumber: 72, position: "G", shootsCatches: "L", nationality: "RU", birthDate: "1988-09-20" }),
  samos: player({ firstName: "Mackie", lastName: "Samoskevich", sweaterNumber: 11, position: "RW", shootsCatches: "R", nationality: "US", birthDate: "2002-11-15" }),
  gadjovich: player({ firstName: "Jonah", lastName: "Gadjovich", sweaterNumber: 12, position: "LW", shootsCatches: "L", nationality: "CA", birthDate: "1998-10-12" }),
  kulikov: player({ firstName: "Dmitry", lastName: "Kulikov", sweaterNumber: 7, position: "D", shootsCatches: "L", nationality: "RU", birthDate: "1990-10-29" }),
};

const maurice = coach({ name: "Paul Maurice", role: "head", teamId: TEAM, seasonId: SEASON_2026 });
const players = Object.values(p);

export const panthersPack: FocusPack = {
  teamSlug: "florida-panthers",
  players,
  coaches: [maurice],
  roster: roster({
    slug: "fla-2025-26",
    name: "Panthers 2025-26 roster",
    teamId: TEAM,
    seasonId: SEASON_2026,
    kind: "nhl",
  }),
  contracts: [
    contract({ slug: "fla-barkov", playerId: p.barkov.id, teamId: TEAM, seasonStart: 2022, seasonEnd: 2030, aavUsd: 10_000_000, years: 8, expiry: "UFA", contractType: "standard", illustrative: true }),
    contract({ slug: "fla-tkachuk", playerId: p.tkachuk.id, teamId: TEAM, seasonStart: 2022, seasonEnd: 2030, aavUsd: 9_500_000, years: 8, expiry: "UFA", contractType: "standard", illustrative: true }),
    contract({ slug: "fla-reinhart", playerId: p.reinhart.id, teamId: TEAM, seasonStart: 2024, seasonEnd: 2032, aavUsd: 8_625_000, years: 8, expiry: "UFA", contractType: "standard", illustrative: true }),
    contract({ slug: "fla-bob", playerId: p.bob.id, teamId: TEAM, seasonStart: 2019, seasonEnd: 2026, aavUsd: 10_000_000, years: 7, expiry: "UFA", contractType: "standard", illustrative: true }),
  ],
  injuries: [
    injury({
      slug: "fla-barkov-ltir",
      name: "Aleksander Barkov — long-term injury",
      playerId: p.barkov.id,
      teamId: TEAM,
      status: "ltir",
      bodyPart: "Knee",
      notes: "Captain listed; 2025-26 availability was a season-defining absence.",
    }),
    injury({
      slug: "fla-tkachuk-limited",
      name: "Matthew Tkachuk — limited games",
      playerId: p.tkachuk.id,
      teamId: TEAM,
      status: "returned",
      bodyPart: "Groin / core",
      notes: "31 GP stub from 2025-26 table.",
    }),
  ],
  transactions: [
    transaction({
      slug: "fla-marchand-signing",
      name: "Panthers sign Brad Marchand",
      kind: "signing",
      date: "2025-07-01",
      toTeamId: TEAM,
      fromTeamId: nodeId("team", "boston-bruins"),
      playerIds: [p.marchand.id],
      notes: "UFA landing after Boston. Illustrative.",
    }),
  ],
  prospects: [
    prospect({ slug: "fla-samoskevich", name: "Mackie Samoskevich", playerId: p.samos.id, teamId: TEAM, rank: 1, eta: "now", leagueHint: "NHL" }),
  ],
  picks: [
    draftPick({
      slug: "fla-2013-barkov",
      name: "2013 2nd overall — Aleksander Barkov",
      draftId: nodeId("draft", "nhl-2013"),
      round: 1,
      overall: 2,
      originalTeamId: TEAM,
      currentTeamId: TEAM,
      year: 2013,
      playerId: p.barkov.id,
    }),
    draftPick({
      slug: "fla-2026-2",
      name: "2026 2nd-round pick (owned)",
      draftId: nodeId("draft", "nhl-2026"),
      round: 2,
      originalTeamId: TEAM,
      currentTeamId: TEAM,
      year: 2026,
    }),
  ],
  games: [
    game({
      slug: "2026-03-28-nyi-fla",
      name: "Islanders 5, Panthers 2",
      seasonId: SEASON_2026,
      leagueId: NHL_ID,
      homeTeamId: TEAM,
      awayTeamId: nodeId("team", "new-york-islanders"),
      startsAt: "2026-03-28T23:00:00Z",
      venueId: nodeId("arena", "amerant-bank-arena"),
      status: "final",
      homeScore: 2,
      awayScore: 5,
    }),
  ],
  lines: [
    line(TEAM, "f1", [p.marchand.id, p.bennett.id, p.reinhart.id], "1F"),
    line(TEAM, "f2", [p.tkachuk.id, p.lundell.id, p.verhaeghe.id], "2F"),
    line(TEAM, "f3", [p.luostarinen.id, p.samos.id], "3F"),
    line(TEAM, "f4", [p.gadjovich.id], "4F"),
    line(TEAM, "d1", [p.forsling.id, p.ekblad.id], "1D"),
    line(TEAM, "d2", [p.jones.id, p.mikkola.id], "2D"),
    line(TEAM, "d3", [p.kulikov.id], "3D"),
    line(TEAM, "g", [p.bob.id], "G"),
    line(TEAM, "pp1", [p.reinhart.id, p.bennett.id, p.verhaeghe.id, p.ekblad.id, p.forsling.id], "PP1"),
    line(TEAM, "pk1", [p.lundell.id, p.luostarinen.id, p.mikkola.id, p.jones.id], "PK1"),
  ],
  cap: {
    teamId: TEAM,
    seasonId: SEASON_2026,
    ceilingUsd: NHL_CAP_CEILING_2026,
    committedUsd: 93_600_000,
    spaceUsd: 1_900_000,
    ltirUsedUsd: 10_000_000,
    notes: "LTIR on Barkov is the structural story of the 2025-26 cap.",
  },
  extraEdges: [
    ...players.map((pl) => playedFor(pl.id, TEAM)),
    playedFor(p.marchand.id, nodeId("team", "boston-bruins"), { until: "2025-07-01", extraKey: "bos-era" }),
    edge("coached_by", TEAM, maurice.id, { seasonId: SEASON_2026, extraKey: SEASON_2026 }),
    edge("drafted_by", p.barkov.id, TEAM, { extraKey: "2013" }),
    edge("drafted_by", p.ekblad.id, TEAM, { extraKey: "2014" }),
    edge("affiliate_of", AFFILIATE, TEAM),
    edge("linemate_with", p.reinhart.id, p.bennett.id, { extraKey: "fla-f1", seasonId: SEASON_2026 }),
    edge("member_of_line", p.ekblad.id, p.forsling.id, { extraKey: "fla-d1" }),
    edge("contract_with", p.barkov.id, TEAM, { extraKey: "fla-barkov" }),
    edge("represented_by", p.tkachuk.id, nodeId("agent", "craig-oster")),
  ],
};
