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

const TEAM = nodeId("team", "boston-bruins");
const AFFILIATE = nodeId("team", "providence-bruins");

const p = {
  pasta: player({ firstName: "David", lastName: "Pastrnak", slug: "david-pastrnak", sweaterNumber: 88, position: "RW", shootsCatches: "R", nationality: "CZ", birthDate: "1996-05-25", captaincy: "A" }),
  geekie: player({ firstName: "Morgan", lastName: "Geekie", sweaterNumber: 39, position: "C", shootsCatches: "R", nationality: "CA", birthDate: "1998-07-20" }),
  zacha: player({ firstName: "Pavel", lastName: "Zacha", sweaterNumber: 18, position: "C", shootsCatches: "L", nationality: "CZ", birthDate: "1997-04-06" }),
  arvidsson: player({ firstName: "Viktor", lastName: "Arvidsson", sweaterNumber: 71, position: "LW", shootsCatches: "R", nationality: "SE", birthDate: "1993-04-08" }),
  elias: player({ firstName: "Elias", lastName: "Lindholm", sweaterNumber: 28, position: "C", shootsCatches: "R", nationality: "SE", birthDate: "1994-12-02" }),
  mittelstadt: player({ firstName: "Casey", lastName: "Mittelstadt", sweaterNumber: 11, position: "C", shootsCatches: "L", nationality: "US", birthDate: "1998-11-22" }),
  minten: player({ firstName: "Fraser", lastName: "Minten", sweaterNumber: 93, position: "C", shootsCatches: "L", nationality: "CA", birthDate: "2004-07-05" }),
  hagens: player({ firstName: "James", lastName: "Hagens", sweaterNumber: 44, position: "C", shootsCatches: "L", nationality: "US", birthDate: "2006-11-03" }),
  mcavoy: player({ firstName: "Charlie", lastName: "McAvoy", sweaterNumber: 73, position: "D", shootsCatches: "R", nationality: "US", birthDate: "1997-12-21", captaincy: "A" }),
  zadorov: player({ firstName: "Nikita", lastName: "Zadorov", sweaterNumber: 91, position: "D", shootsCatches: "L", nationality: "RU", birthDate: "1995-04-16" }),
  hampus: player({ firstName: "Hampus", lastName: "Lindholm", sweaterNumber: 27, position: "D", shootsCatches: "L", nationality: "SE", birthDate: "1994-01-20" }),
  lohrei: player({ firstName: "Mason", lastName: "Lohrei", sweaterNumber: 6, position: "D", shootsCatches: "L", nationality: "US", birthDate: "2001-01-17" }),
  swayman: player({ firstName: "Jeremy", lastName: "Swayman", sweaterNumber: 1, position: "G", shootsCatches: "L", nationality: "US", birthDate: "1998-11-24" }),
  korpi: player({ firstName: "Joonas", lastName: "Korpisalo", sweaterNumber: 70, position: "G", shootsCatches: "L", nationality: "FI", birthDate: "1994-04-28" }),
  khusnutdinov: player({ firstName: "Marat", lastName: "Khusnutdinov", sweaterNumber: 92, position: "C", shootsCatches: "L", nationality: "RU", birthDate: "2002-07-17" }),
  peeke: player({ firstName: "Andrew", lastName: "Peeke", sweaterNumber: 26, position: "D", shootsCatches: "R", nationality: "US", birthDate: "1998-03-17" }),
};

const sturm = coach({ name: "Marco Sturm", role: "head", teamId: TEAM, seasonId: SEASON_2026 });
const players = Object.values(p);

export const bruinsPack: FocusPack = {
  teamSlug: "boston-bruins",
  players,
  coaches: [sturm],
  roster: roster({
    slug: "bos-2025-26",
    name: "Bruins 2025-26 roster",
    teamId: TEAM,
    seasonId: SEASON_2026,
    kind: "nhl",
  }),
  contracts: [
    contract({ slug: "bos-pasta", playerId: p.pasta.id, teamId: TEAM, seasonStart: 2023, seasonEnd: 2031, aavUsd: 11_250_000, years: 8, expiry: "UFA", contractType: "standard", illustrative: true }),
    contract({ slug: "bos-mcavoy", playerId: p.mcavoy.id, teamId: TEAM, seasonStart: 2022, seasonEnd: 2030, aavUsd: 9_500_000, years: 8, expiry: "UFA", contractType: "standard", illustrative: true }),
    contract({ slug: "bos-swayman", playerId: p.swayman.id, teamId: TEAM, seasonStart: 2024, seasonEnd: 2032, aavUsd: 8_250_000, years: 8, expiry: "UFA", contractType: "standard", illustrative: true }),
  ],
  injuries: [
    injury({
      slug: "bos-hampus-ub",
      name: "Hampus Lindholm — upper body",
      playerId: p.hampus.id,
      teamId: TEAM,
      status: "day-to-day",
      bodyPart: "Upper body",
    }),
  ],
  transactions: [
    transaction({
      slug: "bos-hagens-signed",
      name: "Bruins sign James Hagens",
      kind: "signing",
      date: "2025-07-15",
      toTeamId: TEAM,
      playerIds: [p.hagens.id],
      notes: "ELC after Boston College / draft path. Illustrative date.",
    }),
  ],
  prospects: [
    prospect({ slug: "bos-hagens", name: "James Hagens", playerId: p.hagens.id, teamId: TEAM, rank: 1, eta: "now", leagueHint: "NCAA → NHL" }),
  ],
  picks: [
    draftPick({
      slug: "bos-2014-pasta",
      name: "2014 1st round — David Pastrnak",
      draftId: nodeId("draft", "nhl-2014"),
      round: 1,
      overall: 25,
      originalTeamId: TEAM,
      currentTeamId: TEAM,
      year: 2014,
      playerId: p.pasta.id,
    }),
    draftPick({
      slug: "bos-2025-hagens",
      name: "2025 1st round — James Hagens",
      draftId: nodeId("draft", "nhl-2025"),
      round: 1,
      originalTeamId: TEAM,
      currentTeamId: TEAM,
      year: 2025,
      playerId: p.hagens.id,
    }),
  ],
  games: [
    game({
      slug: "2026-05-01-bos-buf",
      name: "Sabres 4, Bruins 1 — series over",
      seasonId: SEASON_2026,
      leagueId: NHL_ID,
      homeTeamId: nodeId("team", "buffalo-sabres"),
      awayTeamId: TEAM,
      startsAt: "2026-05-01T23:00:00Z",
      status: "final",
      homeScore: 4,
      awayScore: 1,
    }),
  ],
  lines: [
    line(TEAM, "f1", [p.arvidsson.id, p.geekie.id, p.pasta.id], "1F"),
    line(TEAM, "f2", [p.zacha.id, p.elias.id, p.mittelstadt.id], "2F"),
    line(TEAM, "f3", [p.minten.id, p.hagens.id], "3F"),
    line(TEAM, "f4", [p.khusnutdinov.id], "4F"),
    line(TEAM, "d1", [p.mcavoy.id, p.zadorov.id], "1D"),
    line(TEAM, "d2", [p.hampus.id, p.lohrei.id], "2D"),
    line(TEAM, "d3", [p.peeke.id], "3D"),
    line(TEAM, "g", [p.swayman.id, p.korpi.id], "G"),
    line(TEAM, "pp1", [p.pasta.id, p.geekie.id, p.zacha.id, p.mcavoy.id, p.zadorov.id], "PP1"),
    line(TEAM, "pk1", [p.elias.id, p.minten.id, p.hampus.id, p.lohrei.id], "PK1"),
  ],
  cap: {
    teamId: TEAM,
    seasonId: SEASON_2026,
    ceilingUsd: NHL_CAP_CEILING_2026,
    committedUsd: 90_100_000,
    spaceUsd: 5_400_000,
    notes: "Post-Marchand Bruins: Pasta + McAvoy still the two pillars.",
  },
  extraEdges: [
    ...players.map((pl) => playedFor(pl.id, TEAM)),
    edge("coached_by", TEAM, sturm.id, { seasonId: SEASON_2026, extraKey: SEASON_2026 }),
    edge("drafted_by", p.pasta.id, TEAM, { extraKey: "2014" }),
    edge("drafted_by", p.mcavoy.id, TEAM, { extraKey: "2016" }),
    edge("drafted_by", p.hagens.id, TEAM, { extraKey: "2025" }),
    edge("committed_to", p.hagens.id, nodeId("team", "boston-college-eagles"), { extraKey: "ncaa" }),
    edge("affiliate_of", AFFILIATE, TEAM),
    edge("linemate_with", p.pasta.id, p.geekie.id, { extraKey: "bos-f1", seasonId: SEASON_2026 }),
    edge("member_of_line", p.mcavoy.id, p.zadorov.id, { extraKey: "bos-d1" }),
    edge("contract_with", p.pasta.id, TEAM, { extraKey: "bos-pasta" }),
    edge("represented_by", p.pasta.id, nodeId("agent", "j-p-barry")),
  ],
};
