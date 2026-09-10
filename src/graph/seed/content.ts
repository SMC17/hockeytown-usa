import { nodeId } from "../ids";
import { agent, article, draft, edge, quote, source, video } from "./builders";
import type { GraphEdge, GraphNode } from "../types";

const NYI = nodeId("team", "new-york-islanders");
const TOR = nodeId("team", "toronto-maple-leafs");
const PIT = nodeId("team", "pittsburgh-penguins");
const BOS = nodeId("team", "boston-bruins");
const FLA = nodeId("team", "florida-panthers");
const TBL = nodeId("team", "tampa-bay-lightning");

export const agents = [
  agent({ name: "Pat Brisson", agency: "CAA", summary: "Represents multiple Hockey Graph focus stars." }),
  agent({ name: "J.P. Barry", slug: "j-p-barry", agency: "CAA" }),
  agent({ name: "Craig Oster", agency: "Newport" }),
  agent({ name: "Paul Theofanous", agency: "The Sports Corporation" }),
  agent({ name: "Jay Grossman", agency: "The Sports & Entertainment Group" }),
];

export const drafts = [
  draft({ slug: "nhl-2025", name: "2025 NHL Draft", leagueId: nodeId("league", "nhl"), year: 2025, location: "Los Angeles" }),
  draft({ slug: "nhl-2026", name: "2026 NHL Draft", leagueId: nodeId("league", "nhl"), year: 2026, location: "TBD" }),
  draft({ slug: "nhl-2023", name: "2023 NHL Draft", leagueId: nodeId("league", "nhl"), year: 2023 }),
  draft({ slug: "nhl-2016", name: "2016 NHL Draft", leagueId: nodeId("league", "nhl"), year: 2016 }),
  draft({ slug: "nhl-2014", name: "2014 NHL Draft", leagueId: nodeId("league", "nhl"), year: 2014 }),
  draft({ slug: "nhl-2013", name: "2013 NHL Draft", leagueId: nodeId("league", "nhl"), year: 2013 }),
  draft({ slug: "nhl-2011", name: "2011 NHL Draft", leagueId: nodeId("league", "nhl"), year: 2011 }),
  draft({ slug: "nhl-2009", name: "2009 NHL Draft", leagueId: nodeId("league", "nhl"), year: 2009 }),
  draft({ slug: "nhl-2005", name: "2005 NHL Draft", leagueId: nodeId("league", "nhl"), year: 2005 }),
  draft({ slug: "nhl-2004", name: "2004 NHL Draft", leagueId: nodeId("league", "nhl"), year: 2004 }),
];

export const sources = [
  source({
    slug: "nhl-official",
    name: "NHL.com",
    publisher: "National Hockey League",
    reliability: "official",
    url: "https://www.nhl.com",
  }),
  source({
    slug: "hockey-reference",
    name: "Hockey-Reference",
    publisher: "Sports Reference",
    reliability: "wire",
    url: "https://www.hockey-reference.com",
    summary: "Used to ground 2025-26 standings and roster tables for Phase-1 stubs.",
  }),
  source({
    slug: "hockeytown-desk",
    name: "Hockeytown USA desk",
    publisher: "Hockeytown USA",
    reliability: "internal",
    summary: "Internal newsroom. Articles are graph nodes with mention edges.",
  }),
];

const schaefer = nodeId("player", "matthew-schaefer");
const kucherov = nodeId("player", "nikita-kucherov");
const matthews = nodeId("player", "auston-matthews");
const crosby = nodeId("player", "sidney-crosby");
const pasta = nodeId("player", "david-pastrnak");
const barkov = nodeId("player", "aleksander-barkov");
const vas = nodeId("player", "andrei-vasilevskiy");

export const articles = [
  article({
    slug: "schaefer-rewired-the-island",
    name: "Schaefer rewired the Island",
    dek: "An 18-year-old No. 1 pick did not wait his turn. The Islanders' blue line is now a graph with him at the center.",
    heroKicker: "Now · Islanders",
    section: "now",
    author: "Hockeytown USA desk",
    publishedAt: "2026-06-22T14:00:00Z",
    status: "published",
    sourceIds: [nodeId("source", "hockey-reference"), nodeId("source", "hockeytown-desk")],
    mentions: [
      { entityId: schaefer },
      { entityId: NYI },
      { entityId: nodeId("player", "bo-horvat") },
      { entityId: nodeId("player", "ilya-sorokin") },
      { entityId: nodeId("coach", "peter-deboer") },
    ],
    body: `[[player:matthew-schaefer]] did not arrive in [[team:new-york-islanders|Elmont]] as atmosphere. He arrived as a first-class object: 23 goals, 36 assists, a Calder Trophy, and a Norris-ballot cameo on a team that still missed the playoffs.

That last clause is the story. The Islanders were a 91-point club with a Calder-winning defenseman. [[player:bo-horvat]] and [[player:mathew-barzal]] still drive the middle of the ice. [[player:ilya-sorokin]] still is the last line. [[coach:peter-deboer]] inherits a graph that is no longer built around "wait for the kids." The kid is the axis.

Hockey Graph stores that as edges — drafted_by, played_for, member_of_line — not as a recap that evaporates on Monday.`,
  }),
  article({
    slug: "kucherov-hart-unfinished",
    name: "Kucherov won the Hart. The Lightning still have unfinished business.",
    dek: "130 points, a Vezina partner, a first-round exit. Tampa's core is still the league's most decorated — and still not done.",
    heroKicker: "Understand · Lightning",
    section: "understand",
    author: "Hockeytown USA desk",
    publishedAt: "2026-06-18T14:00:00Z",
    status: "published",
    sourceIds: [nodeId("source", "hockeytown-desk")],
    mentions: [
      { entityId: kucherov },
      { entityId: TBL },
      { entityId: vas },
      { entityId: nodeId("player", "victor-hedman") },
      { entityId: nodeId("player", "brayden-point") },
    ],
    body: `[[player:nikita-kucherov]] put up 130 points and took the Hart. [[player:andrei-vasilevskiy]] took the Vezina. [[player:victor-hedman]] still wears the C in [[team:tampa-bay-lightning|Tampa]]. And the season ended in a Game 7 in Montreal.

That is not a paradox. It is the Lightning's current object: a core that still produces at a historic clip, attached to a first-round edge that [[player:brayden-point]] and [[player:jake-guentzel]] could not break. The graph does not editorialize. It holds both facts.`,
  }),
  article({
    slug: "leafs-year-of-subtraction",
    name: "The Leafs' year of subtraction",
    dek: "Matthews still scored. The standings did not. Toronto's 2025-26 season is a case study in what the graph keeps when star gravity changes.",
    heroKicker: "Analyze · Maple Leafs",
    section: "analyze",
    author: "Hockeytown USA desk",
    publishedAt: "2026-04-20T14:00:00Z",
    status: "published",
    mentions: [
      { entityId: matthews },
      { entityId: TOR },
      { entityId: nodeId("player", "william-nylander") },
      { entityId: nodeId("player", "john-tavares") },
      { entityId: nodeId("coach", "craig-berube") },
    ],
    body: `[[team:toronto-maple-leafs]] finished 32-36-14. [[player:auston-matthews]] still wore the C. [[player:william-nylander]] led the club in points. [[player:john-tavares]] still won faceoffs in the hard minutes. None of that produced a playoff series.

[[coach:craig-berube]]'s first full winter in Toronto is now a graph of absences as much as presences. Hockey Graph keeps the contracts, the lines, and the mentions so the next version of the club is not written on a blank page.`,
  }),
  article({
    slug: "crosby-still-the-axis",
    name: "Crosby is still the axis",
    dek: "A 98-point Penguins team ran into Philadelphia in round one. The objects around 87 keep changing. The center of gravity does not.",
    heroKicker: "Now · Penguins",
    section: "now",
    author: "Hockeytown USA desk",
    publishedAt: "2026-05-02T14:00:00Z",
    status: "published",
    mentions: [
      { entityId: crosby },
      { entityId: PIT },
      { entityId: nodeId("player", "evgeni-malkin") },
      { entityId: nodeId("player", "erik-karlsson") },
      { entityId: nodeId("coach", "dan-muse") },
    ],
    body: `[[player:sidney-crosby]] is 38 and still the way [[team:pittsburgh-penguins]] are understood. [[player:evgeni-malkin]] and [[player:kris-letang]] remain attached. [[player:erik-karlsson]] ran the power play. [[coach:dan-muse]]'s first year got them a Metro two-seed and a first-round loss.

The operating system for following hockey does not need a new metaphor for this club. It needs the edges to stay honest: played_for, coached_by, drafted_by 2005, still true.`,
  }),
  article({
    slug: "pastrnak-100-new-bruins",
    name: "Pastrnak's 100-point season in a new Bruins shape",
    dek: "Geekie scored 39. McAvoy drove 61 points from the blue line. Boston made the dance without the old captain.",
    heroKicker: "Discover · Bruins",
    section: "discover",
    author: "Hockeytown USA desk",
    publishedAt: "2026-05-04T14:00:00Z",
    status: "published",
    mentions: [
      { entityId: pasta },
      { entityId: BOS },
      { entityId: nodeId("player", "morgan-geekie") },
      { entityId: nodeId("player", "charlie-mcavoy") },
      { entityId: nodeId("coach", "marco-sturm") },
    ],
    body: `[[player:david-pastrnak]] put up 100 points. That used to be the sentence. In 2025-26 it shared the page with [[player:morgan-geekie]]'s 39 goals and [[player:charlie-mcavoy]]'s 61 points under [[coach:marco-sturm]].

[[team:boston-bruins]] are a different object than the Marchand-era club. Brad Marchand's played_for edge now points at [[team:florida-panthers]]. The Bruins mini-OS has to show both: the current lines, and the transferred identity.`,
  }),
  article({
    slug: "panthers-without-barkov",
    name: "Two-time champs, one missing center",
    dek: "Florida spent 2025-26 defending a dynasty with Barkov on LTIR. The graph treats that as structure, not vibes.",
    heroKicker: "Follow · Panthers",
    section: "follow",
    author: "Hockeytown USA desk",
    publishedAt: "2026-04-16T14:00:00Z",
    status: "published",
    mentions: [
      { entityId: barkov },
      { entityId: FLA },
      { entityId: nodeId("player", "sam-reinhart") },
      { entityId: nodeId("player", "matthew-tkachuk") },
      { entityId: nodeId("player", "brad-marchand") },
      { entityId: nodeId("injury", "fla-barkov-ltir") },
    ],
    body: `[[player:aleksander-barkov]] is still the captain of [[team:florida-panthers]]. He is also an Injury node on LTIR. Those two facts can coexist because the atomic unit is the object, not the paragraph.

[[player:sam-reinhart]] led the club. [[player:matthew-tkachuk]] played 31 games. [[player:brad-marchand]] arrived from Boston. Paul Maurice's team missed the playoffs at 84 points. The dynasty did not vanish. It became a different graph.`,
  }),
  article({
    slug: "how-hockey-graph-thinks",
    name: "How Hockey Graph thinks about a roster",
    dek: "A primer for the newsroom and every future front end: articles cite objects. Objects do not dissolve into copy.",
    heroKicker: "Use · CMS",
    section: "use",
    author: "Hockeytown USA desk",
    publishedAt: "2026-09-10T12:00:00Z",
    status: "published",
    mentions: [
      { entityId: nodeId("league", "nhl") },
      { entityId: NYI },
      { entityId: schaefer },
    ],
    body: `Hockeytown USA is the company. Hockey Graph is the knowledge layer. The flagship at \`/\` is one front end of many.

When this desk writes [[player:matthew-schaefer]], the CMS does not store a string. It stores a mention edge into the graph, next to drafted_by [[team:new-york-islanders]] and played_for 2025-26. College, PWHL, AHL affiliates, agents, and corrections are the same species of object.

If a later story is wrong, it does not vanish. It grows a \`corrects\` edge.`,
  }),
];

const correction = article({
  slug: "schaefer-rewired-correction-note",
  name: "Correction note: Schaefer age styling",
  dek: "We prefer '18-year-old' only with a birthdate object attached. This note exists to demonstrate the corrects edge.",
  author: "Hockeytown USA desk",
  publishedAt: "2026-06-23T12:00:00Z",
  status: "corrected",
  section: "use",
  mentions: [{ entityId: schaefer }, { entityId: nodeId("article", "schaefer-rewired-the-island") }],
  body: `This is not a substory. It is a [[article:schaefer-rewired-the-island|corrects]] edge on the original Islanders Calder piece so provenance is visible in the OS.`,
});

export const quotes = [
  quote({
    slug: "crosby-work",
    name: "Crosby on the work",
    speakerId: crosby,
    speakerName: "Sidney Crosby",
    text: "You just want to help the team win. That's always been it.",
    context: "Illustrative attributed stub — replace with a sourced quote on ingest.",
    utteredOn: "2026-04-01",
  }),
  quote({
    slug: "deboer-island",
    name: "DeBoer on the Islanders",
    speakerId: nodeId("coach", "peter-deboer"),
    speakerName: "Peter DeBoer",
    text: "The structure is here. Our job is to make it harder to play against.",
    context: "Desk-written stub for the CMS quote object. Not a live transcript.",
  }),
];

export const videos = [
  video({
    slug: "nyi-official-schaefer-calder",
    name: "Official Calder package (placeholder)",
    rights: "official",
    provider: "NHL / Islanders",
    canonicalUrl: "https://www.nhl.com/islanders",
    relatedEntityIds: [schaefer, NYI],
    summary: "No pirated highlights. Phase 1 stores rights-safe metadata only; playback requires an official or licensed source.",
  }),
  video({
    slug: "unlicensed-rejected",
    name: "Rejected: unlicensed stream clip",
    rights: "none",
    relatedEntityIds: [],
    summary: "Example of a Video node that must never render a player. The OS can hold the refusal.",
  }),
];

export const contentNodes: GraphNode[] = [...agents, ...drafts, ...sources, ...articles, correction, ...quotes, ...videos];

export const contentEdges: GraphEdge[] = [
  ...articles.flatMap((a) => [
    ...a.mentions.map((m) => edge("mentioned_in", m.entityId, a.id, { extraKey: a.slug })),
    ...(a.sourceIds ?? []).map((sid) => edge("sourced_from", a.id, sid, { extraKey: sid })),
    ...(a.sourceIds ?? []).map((sid) => edge("cites", a.id, sid, { extraKey: `${a.slug}:${sid}` })),
  ]),
  edge("mentioned_in", schaefer, correction.id, { extraKey: "corr" }),
  edge("corrects", correction.id, nodeId("article", "schaefer-rewired-the-island")),
  edge("sourced_from", nodeId("quote", "crosby-work"), nodeId("source", "hockeytown-desk")),
];
