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

const TEAM = nodeId("team", "pittsburgh-penguins");
const AFFILIATE = nodeId("team", "wbs-penguins");

const p = {
  crosby: player({ firstName: "Sidney", lastName: "Crosby", sweaterNumber: 87, position: "C", shootsCatches: "L", nationality: "CA", birthDate: "1987-08-07", captaincy: "C" }),
  malkin: player({ firstName: "Evgeni", lastName: "Malkin", sweaterNumber: 71, position: "C", shootsCatches: "L", nationality: "RU", birthDate: "1986-07-31", captaincy: "A" }),
  rust: player({ firstName: "Bryan", lastName: "Rust", sweaterNumber: 17, position: "RW", shootsCatches: "R", nationality: "US", birthDate: "1992-05-11" }),
  rakell: player({ firstName: "Rickard", lastName: "Rakell", sweaterNumber: 67, position: "RW", shootsCatches: "R", nationality: "SE", birthDate: "1993-05-05" }),
  mantha: player({ firstName: "Anthony", lastName: "Mantha", sweaterNumber: 39, position: "RW", shootsCatches: "L", nationality: "CA", birthDate: "1994-09-16" }),
  lizotte: player({ firstName: "Blake", lastName: "Lizotte", sweaterNumber: 46, position: "C", shootsCatches: "L", nationality: "US", birthDate: "1997-12-13" }),
  kindel: player({ firstName: "Benjamin", lastName: "Kindel", sweaterNumber: 81, position: "C", shootsCatches: "R", nationality: "CA", birthDate: "2007-04-19" }),
  mcg: player({ firstName: "Rutger", lastName: "McGroarty", sweaterNumber: 2, position: "RW", shootsCatches: "L", nationality: "US", birthDate: "2004-03-30" }),
  letang: player({ firstName: "Kris", lastName: "Letang", sweaterNumber: 58, position: "D", shootsCatches: "R", nationality: "CA", birthDate: "1987-04-24", captaincy: "A" }),
  karlsson: player({ firstName: "Erik", lastName: "Karlsson", sweaterNumber: 65, position: "D", shootsCatches: "R", nationality: "SE", birthDate: "1990-05-31" }),
  girard: player({ firstName: "Samuel", lastName: "Girard", sweaterNumber: 49, position: "D", shootsCatches: "L", nationality: "CA", birthDate: "1998-05-12" }),
  graves: player({ firstName: "Ryan", lastName: "Graves", sweaterNumber: 27, position: "D", shootsCatches: "L", nationality: "CA", birthDate: "1995-05-21" }),
  skinner: player({ firstName: "Stuart", lastName: "Skinner", sweaterNumber: 74, position: "G", shootsCatches: "L", nationality: "CA", birthDate: "1998-11-01" }),
  jarry: player({ firstName: "Tristan", lastName: "Jarry", sweaterNumber: 35, position: "G", shootsCatches: "L", nationality: "CA", birthDate: "1995-04-29" }),
  murashov: player({ firstName: "Sergei", lastName: "Murashov", sweaterNumber: 1, position: "G", shootsCatches: "R", nationality: "RU", birthDate: "2004-04-01" }),
};

const muse = coach({ name: "Dan Muse", role: "head", teamId: TEAM, seasonId: SEASON_2026 });
const players = Object.values(p);

export const penguinsPack: FocusPack = {
  teamSlug: "pittsburgh-penguins",
  players,
  coaches: [muse],
  roster: roster({
    slug: "pit-2025-26",
    name: "Penguins 2025-26 roster",
    teamId: TEAM,
    seasonId: SEASON_2026,
    kind: "nhl",
  }),
  contracts: [
    contract({ slug: "pit-crosby", playerId: p.crosby.id, teamId: TEAM, seasonStart: 2025, seasonEnd: 2027, aavUsd: 8_700_000, years: 2, expiry: "UFA", contractType: "standard", illustrative: true }),
    contract({ slug: "pit-malkin", playerId: p.malkin.id, teamId: TEAM, seasonStart: 2025, seasonEnd: 2026, aavUsd: 6_100_000, years: 1, expiry: "UFA", contractType: "standard", illustrative: true }),
    contract({ slug: "pit-letang", playerId: p.letang.id, teamId: TEAM, seasonStart: 2022, seasonEnd: 2028, aavUsd: 6_100_000, years: 6, expiry: "UFA", contractType: "standard", illustrative: true }),
    contract({ slug: "pit-karlsson", playerId: p.karlsson.id, teamId: TEAM, seasonStart: 2019, seasonEnd: 2027, aavUsd: 11_500_000, years: 8, expiry: "UFA", contractType: "standard", illustrative: true }),
  ],
  injuries: [
    injury({
      slug: "pit-malkin-maintenance",
      name: "Evgeni Malkin — maintenance",
      playerId: p.malkin.id,
      teamId: TEAM,
      status: "returned",
      bodyPart: "Lower body",
      notes: "Managed minutes in a long season. Status stub.",
    }),
  ],
  transactions: [
    transaction({
      slug: "pit-skinner-acquired",
      name: "Penguins acquire Stuart Skinner",
      kind: "trade",
      date: "2026-03-05",
      toTeamId: TEAM,
      fromTeamId: nodeId("team", "edmonton-oilers"),
      playerIds: [p.skinner.id],
      notes: "Deadline goaltending addition — illustrative.",
    }),
  ],
  prospects: [
    prospect({ slug: "pit-kindel", name: "Benjamin Kindel", playerId: p.kindel.id, teamId: TEAM, rank: 1, eta: "now", leagueHint: "NHL" }),
    prospect({ slug: "pit-murashov", name: "Sergei Murashov", playerId: p.murashov.id, teamId: TEAM, rank: 2, eta: "2026-27", leagueHint: "AHL/NHL" }),
  ],
  picks: [
    draftPick({
      slug: "pit-2005-crosby",
      name: "2005 1st overall — Sidney Crosby",
      draftId: nodeId("draft", "nhl-2005"),
      round: 1,
      overall: 1,
      originalTeamId: TEAM,
      currentTeamId: TEAM,
      year: 2005,
      playerId: p.crosby.id,
    }),
    draftPick({
      slug: "pit-2026-1",
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
      slug: "2026-04-29-pit-phi",
      name: "Flyers 1, Penguins 0 (OT) — series over",
      seasonId: SEASON_2026,
      leagueId: NHL_ID,
      homeTeamId: nodeId("team", "philadelphia-flyers"),
      awayTeamId: TEAM,
      startsAt: "2026-04-29T23:00:00Z",
      status: "final",
      homeScore: 1,
      awayScore: 0,
      overtime: true,
    }),
  ],
  lines: [
    line(TEAM, "f1", [p.rakell.id, p.crosby.id, p.rust.id], "1F"),
    line(TEAM, "f2", [p.mantha.id, p.malkin.id, p.mcg.id], "2F"),
    line(TEAM, "f3", [p.lizotte.id, p.kindel.id], "3F"),
    line(TEAM, "d1", [p.letang.id, p.karlsson.id], "1D"),
    line(TEAM, "d2", [p.girard.id, p.graves.id], "2D"),
    line(TEAM, "g", [p.skinner.id, p.jarry.id], "G"),
  ],
  cap: {
    teamId: TEAM,
    seasonId: SEASON_2026,
    ceilingUsd: NHL_CAP_CEILING_2026,
    committedUsd: 88_400_000,
    spaceUsd: 7_100_000,
    notes: "Core three still the axis; space is a 2026-27 question.",
  },
  extraEdges: [
    ...players.map((pl) => playedFor(pl.id, TEAM)),
    edge("coached_by", TEAM, muse.id, { seasonId: SEASON_2026, extraKey: SEASON_2026 }),
    edge("drafted_by", p.crosby.id, TEAM, { extraKey: "2005" }),
    edge("drafted_by", p.malkin.id, TEAM, { extraKey: "2004" }),
    edge("drafted_by", p.letang.id, TEAM, { extraKey: "2005" }),
    edge("affiliate_of", AFFILIATE, TEAM),
    edge("linemate_with", p.crosby.id, p.rust.id, { extraKey: "pit-f1", seasonId: SEASON_2026 }),
    edge("linemate_with", p.crosby.id, p.rakell.id, { extraKey: "pit-f1b", seasonId: SEASON_2026 }),
    edge("member_of_line", p.letang.id, p.karlsson.id, { extraKey: "pit-d1" }),
    edge("contract_with", p.crosby.id, TEAM, { extraKey: "pit-crosby" }),
    edge("represented_by", p.crosby.id, nodeId("agent", "pat-brisson")),
    edge("represented_by", p.malkin.id, nodeId("agent", "j-p-barry")),
  ],
};
