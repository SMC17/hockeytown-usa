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

const TEAM = nodeId("team", "tampa-bay-lightning");
const AFFILIATE = nodeId("team", "syracuse-crunch");

const p = {
  kucherov: player({ firstName: "Nikita", lastName: "Kucherov", sweaterNumber: 86, position: "RW", shootsCatches: "L", nationality: "RU", birthDate: "1993-06-17", captaincy: "A", summary: "Hart Trophy, 2025-26 (44-86—130)." }),
  point: player({ firstName: "Brayden", lastName: "Point", sweaterNumber: 21, position: "C", shootsCatches: "R", nationality: "CA", birthDate: "1996-03-13", captaincy: "A" }),
  hagel: player({ firstName: "Brandon", lastName: "Hagel", sweaterNumber: 38, position: "LW", shootsCatches: "L", nationality: "CA", birthDate: "1998-08-27" }),
  guentzel: player({ firstName: "Jake", lastName: "Guentzel", sweaterNumber: 59, position: "C", shootsCatches: "L", nationality: "US", birthDate: "1994-10-06" }),
  cirelli: player({ firstName: "Anthony", lastName: "Cirelli", sweaterNumber: 71, position: "C", shootsCatches: "L", nationality: "CA", birthDate: "1997-07-15" }),
  bjork: player({ firstName: "Oliver", lastName: "Bjorkstrand", sweaterNumber: 22, position: "RW", shootsCatches: "R", nationality: "DK", birthDate: "1995-04-10" }),
  hedman: player({ firstName: "Victor", lastName: "Hedman", sweaterNumber: 77, position: "D", shootsCatches: "L", nationality: "SE", birthDate: "1990-12-18", captaincy: "C" }),
  cernak: player({ firstName: "Erik", lastName: "Cernak", slug: "erik-cernak", sweaterNumber: 81, position: "D", shootsCatches: "R", nationality: "SK", birthDate: "1997-05-28" }),
  mcdonagh: player({ firstName: "Ryan", lastName: "McDonagh", sweaterNumber: 27, position: "D", shootsCatches: "L", nationality: "US", birthDate: "1989-06-13" }),
  raddysh: player({ firstName: "Darren", lastName: "Raddysh", sweaterNumber: 43, position: "D", shootsCatches: "R", nationality: "CA", birthDate: "1996-02-28" }),
  vas: player({ firstName: "Andrei", lastName: "Vasilevskiy", sweaterNumber: 88, position: "G", shootsCatches: "L", nationality: "RU", birthDate: "1994-07-25", summary: "Vezina Trophy, 2025-26." }),
  geekie: player({ firstName: "Conor", lastName: "Geekie", sweaterNumber: 14, position: "C", shootsCatches: "L", nationality: "CA", birthDate: "2004-05-05" }),
};

const cooper = coach({ name: "Jon Cooper", role: "head", teamId: TEAM, seasonId: SEASON_2026 });
const players = Object.values(p);

export const lightningPack: FocusPack = {
  teamSlug: "tampa-bay-lightning",
  players,
  coaches: [cooper],
  roster: roster({
    slug: "tbl-2025-26",
    name: "Lightning 2025-26 roster",
    teamId: TEAM,
    seasonId: SEASON_2026,
    kind: "nhl",
  }),
  contracts: [
    contract({ slug: "tbl-kucherov", playerId: p.kucherov.id, teamId: TEAM, seasonStart: 2027, seasonEnd: 2034, aavUsd: 8_500_000, years: 8, expiry: "UFA", contractType: "standard", clause: "Extension on books; AAV illustrative", illustrative: true }),
    contract({ slug: "tbl-hedman", playerId: p.hedman.id, teamId: TEAM, seasonStart: 2025, seasonEnd: 2027, aavUsd: 8_000_000, years: 2, expiry: "UFA", contractType: "standard", illustrative: true }),
    contract({ slug: "tbl-vas", playerId: p.vas.id, teamId: TEAM, seasonStart: 2024, seasonEnd: 2032, aavUsd: 9_500_000, years: 8, expiry: "UFA", contractType: "standard", illustrative: true }),
    contract({ slug: "tbl-point", playerId: p.point.id, teamId: TEAM, seasonStart: 2022, seasonEnd: 2030, aavUsd: 9_500_000, years: 8, expiry: "UFA", contractType: "standard", illustrative: true }),
  ],
  injuries: [
    injury({
      slug: "tbl-point-missed",
      name: "Brayden Point — missed time",
      playerId: p.point.id,
      teamId: TEAM,
      status: "returned",
      bodyPart: "Lower body",
      notes: "63 GP in 2025-26 table.",
    }),
  ],
  transactions: [
    transaction({
      slug: "tbl-guentzel-year-two",
      name: "Jake Guentzel in Tampa — year two",
      kind: "signing",
      date: "2024-07-01",
      toTeamId: TEAM,
      fromTeamId: nodeId("team", "carolina-hurricanes"),
      playerIds: [p.guentzel.id],
      notes: "UFA era in Tampa; prior Pittsburgh drafted_by still on graph.",
    }),
  ],
  prospects: [
    prospect({ slug: "tbl-conor-geekie", name: "Conor Geekie", playerId: p.geekie.id, teamId: TEAM, rank: 1, eta: "now", leagueHint: "NHL" }),
  ],
  picks: [
    draftPick({
      slug: "tbl-2012-kucherov",
      name: "2011 2nd round — Nikita Kucherov",
      draftId: nodeId("draft", "nhl-2011"),
      round: 2,
      overall: 58,
      originalTeamId: TEAM,
      currentTeamId: TEAM,
      year: 2011,
      playerId: p.kucherov.id,
    }),
    draftPick({
      slug: "tbl-2009-hedman",
      name: "2009 2nd overall — Victor Hedman",
      draftId: nodeId("draft", "nhl-2009"),
      round: 1,
      overall: 2,
      originalTeamId: TEAM,
      currentTeamId: TEAM,
      year: 2009,
      playerId: p.hedman.id,
    }),
    draftPick({
      slug: "tbl-2026-3",
      name: "2026 3rd-round pick (owned)",
      draftId: nodeId("draft", "nhl-2026"),
      round: 3,
      originalTeamId: TEAM,
      currentTeamId: TEAM,
      year: 2026,
    }),
  ],
  games: [
    game({
      slug: "2026-05-03-tbl-mtl",
      name: "Canadiens 2, Lightning 1 — series over",
      seasonId: SEASON_2026,
      leagueId: NHL_ID,
      homeTeamId: nodeId("team", "montreal-canadiens"),
      awayTeamId: TEAM,
      startsAt: "2026-05-03T23:00:00Z",
      status: "final",
      homeScore: 2,
      awayScore: 1,
    }),
  ],
  lines: [
    line(TEAM, "f1", [p.hagel.id, p.point.id, p.kucherov.id], "1F"),
    line(TEAM, "f2", [p.guentzel.id, p.cirelli.id, p.bjork.id], "2F"),
    line(TEAM, "f3", [p.geekie.id], "3F"),
    line(TEAM, "d1", [p.hedman.id, p.cernak.id], "1D"),
    line(TEAM, "d2", [p.mcdonagh.id, p.raddysh.id], "2D"),
    line(TEAM, "g", [p.vas.id], "G"),
  ],
  cap: {
    teamId: TEAM,
    seasonId: SEASON_2026,
    ceilingUsd: NHL_CAP_CEILING_2026,
    committedUsd: 94_200_000,
    spaceUsd: 1_300_000,
    notes: "Core locked; Raddysh's breakout is the 2026-27 contractual story.",
  },
  extraEdges: [
    ...players.map((pl) => playedFor(pl.id, TEAM)),
    edge("coached_by", TEAM, cooper.id, { seasonId: SEASON_2026, extraKey: SEASON_2026 }),
    edge("drafted_by", p.kucherov.id, TEAM, { extraKey: "2011" }),
    edge("drafted_by", p.hedman.id, TEAM, { extraKey: "2009" }),
    edge("drafted_by", p.point.id, TEAM, { extraKey: "2014" }),
    edge("drafted_by", p.guentzel.id, nodeId("team", "pittsburgh-penguins"), { extraKey: "2013" }),
    edge("affiliate_of", AFFILIATE, TEAM),
    edge("linemate_with", p.kucherov.id, p.point.id, { extraKey: "tbl-f1", seasonId: SEASON_2026 }),
    edge("linemate_with", p.hagel.id, p.kucherov.id, { extraKey: "tbl-f1b", seasonId: SEASON_2026 }),
    edge("member_of_line", p.hedman.id, p.cernak.id, { extraKey: "tbl-d1" }),
    edge("contract_with", p.vas.id, TEAM, { extraKey: "tbl-vas" }),
    edge("represented_by", p.kucherov.id, nodeId("agent", "jay-grossman")),
  ],
};
