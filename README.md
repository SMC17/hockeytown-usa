# Hockeytown USA

**The operating system for following hockey.**

Hockeytown USA is the company. **Hockey Graph** is the knowledge layer: one newsroom, one graph, one CMS, one identity, many front ends. The atomic unit is a structured hockey object — not the article alone.

This flagship does **not** play live NHL rights footage. Video nodes are official, licensed, or `none` — and `none` never renders a player. Seed numbers are snapshots or illustrative; this repo does **not** invent live game stats.

## How to run

Requires Node 20+.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm test
npm run typecheck
npm run lint
npm run build
```

JSON for other front ends: [http://localhost:3000/api/graph](http://localhost:3000/api/graph) (held article bodies stripped)

## Held vs live

**Live (public):** published or corrected articles; 32 NHL mini-OS shells (six focus clubs fully seeded, including PP1/PK1); seven college program hubs; eight PWHL clubs; six AHL affiliate seats; tools empty states; Hockey Map stub; My Hockey chips; docs.

**Held (not published):** five vault-aligned articles as graph nodes with entity IDs — Pipeline Calibration Window, Four-Game Filter, Window Contract, Hub Restore, Interior Tax.

| Surface | Held behavior |
| --- | --- |
| `/`, `/discover`, `/articles`, team Latest, `sitemap.xml` | Omitted |
| `/articles/[slug]` | Title, dek, mentions, gate. **No body.** `noindex`. |
| `/api/graph` | Node may exist; **body stripped** |
| `/use` | Listed in the desk queue |
| `/use/held/[slug]` | Full body. `noindex`. |

Policy: [docs/HELD.md](docs/HELD.md) · [/docs/held](/docs/held)

## Major routes

### Flagship modes

| Path | Mode | Job |
| --- | --- | --- |
| `/` | Now | Latest **published** objects |
| `/now` | Now alias | Redirects to `/` |
| `/understand` | Understand | Why the graph exists |
| `/analyze` | Analyze | Standings as objects |
| `/discover` | Discover | Search public nodes |
| `/my-hockey` | Follow | Identity chips (localStorage) |
| `/follow` | Follow alias | Same page as `/my-hockey` |
| `/use` | Use | CMS desk + held queue |

### NHL

| Path | Notes |
| --- | --- |
| `/nhl` | 32 clubs |
| `/nhl/[team]` | Mini-OS Latest |
| `/nhl/[team]/roster` | Roster |
| `/nhl/[team]/lines` | LineAssignment units |
| `/nhl/[team]/injuries` | Injury objects |
| `/nhl/[team]/contracts` | Contract objects (illustrative AAVs flagged) |
| `/nhl/[team]/cap` | Cap snapshot |
| `/nhl/[team]/prospects` | Prospect objects |
| `/nhl/[team]/draft-picks` | DraftPick objects |
| `/nhl/[team]/schedule` | Game shells — not live scores |
| `/nhl/[team]/standings` | Snapshot standings |
| `/nhl/[team]/transactions` | Transaction objects |
| `/nhl/lines` `/nhl/injuries` `/nhl/roster` `/nhl/prospects` | League indexes |
| `/injuries` `/roster` `/prospects` | SEO aliases |

Focus six: Islanders, Maple Leafs, Penguins, Bruins, Panthers, Lightning.

### College

| Path | Notes |
| --- | --- |
| `/college` | Seven hubs + catalog schools |
| `/college/[slug]` | Program Latest |
| `/college/[slug]/roster` | Roster shell |
| `/college/[slug]/commits` | Commitment objects |
| `/college/[slug]/pipeline` | Rights / draft path |

Hubs: Michigan, Minnesota, BU, BC, North Dakota, Quinnipiac, Wisconsin. Denver is deep but not a flagship slug. Penn State is catalog (McKenna seat).

### PWHL

| Path | Notes |
| --- | --- |
| `/pwhl` | Eight 2025-26 clubs |
| `/pwhl/[slug]` | Club hub |
| `/pwhl/[slug]/roster` | Roster shell |

### AHL

| Path | Notes |
| --- | --- |
| `/ahl` | Focus-six affiliates |
| `/ahl/[slug]` | Affiliate seat (parent NHL, empty roster, no invented boxscores) |

| AHL | NHL parent |
| --- | --- |
| `/ahl/bridgeport-islanders` | NYI |
| `/ahl/toronto-marlies` | TOR |
| `/ahl/wbs-penguins` | PIT |
| `/ahl/providence-bruins` | BOS |
| `/ahl/springfield-thunderbirds` | FLA |
| `/ahl/syracuse-crunch` | TBL |

Linked from each focus club Latest and from `/tools/org-depth`.

### Map, tools, docs

| Path | Notes |
| --- | --- |
| `/map` | Hockey Map |
| `/geography/detroit` | Hometown geography stub |
| `/tools` | Tool index |
| `/tools/transactions` | Transaction terminal (empty interactive) |
| `/tools/lines` | Line Intelligence |
| `/tools/org-depth` | Prospects + AHL affiliates + college rights |
| `/tools/transactions-terminal` | Redirect → `/tools/transactions` |
| `/tools/line-intelligence` | Redirect → `/tools/lines` |
| `/docs` | Docs index |
| `/docs/strategy` | Phases, rights, focus, HELD |
| `/docs/held` | Public held policy |
| `/docs/vault-sync` | Import `hockey-graph-seed` (106 entities) |

### Newsroom, entities, desk, API

| Path | Notes |
| --- | --- |
| `/articles` | Published / corrected only |
| `/articles/[slug]` | Story or held gate |
| `/use/held/[slug]` | Desk body |
| `/players/[slug]` | Player |
| `/coaches/[slug]` | Coach |
| `/prospects` `/prospects/[slug]` | Prospect index / node |
| `/games/[slug]` | Game shell |
| `/arenas/[slug]` | Arena |
| `/agents/[slug]` | Agent |
| `/leagues/[slug]` | League |
| `/graph/[type]/[slug]` | Generic entity |
| `/api/graph` | Full public graph JSON |
| `/api/graph/entity/[type]/[slug]` | One node |

## Vault import

Documented dump size: **106 entities**. Drop `content/vault/hockey-graph-seed.json`. Missing file is a no-op. Shape: `content/vault/hockey-graph-seed.example.json`. Details: [docs/VAULT_SYNC.md](docs/VAULT_SYNC.md) · [/docs/vault-sync](/docs/vault-sync).

## Docs (in-repo)

- [Strategy](docs/STRATEGY.md) · [HELD](docs/HELD.md) · [Rights](docs/RIGHTS.md) · [Focus teams](docs/FOCUS_TEAMS.md) · [Phases](docs/PHASES.md) · [Vault sync](docs/VAULT_SYNC.md) · [Hockey Graph](docs/HOCKEY_GRAPH.md)
