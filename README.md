# Hockeytown USA

**The operating system for following hockey.**

Hockeytown USA is the company. **Hockey Graph** is the knowledge layer: one newsroom, one graph, one CMS, one identity, many front ends. The atomic unit is a structured hockey object — not the article alone.

## How to run

Requires Node 20+.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm test          # graph integrity
npm run typecheck
npm run lint
npm run build
```

JSON for other front ends: [http://localhost:3000/api/graph](http://localhost:3000/api/graph)

## Flagship IA

| Mode | Path | Job |
| --- | --- | --- |
| Now | `/` | Latest **published** objects, injuries, focus clubs |
| Understand | `/understand` | Why the graph exists |
| Analyze | `/analyze` | Standings as objects |
| Discover | `/discover` | Search public nodes |
| Follow | `/follow` | Identity (local in Phase 1) |
| Use | `/use` | CMS desk + held queue |

NHL: `/nhl` and `/nhl/[teamSlug]` with Latest, Roster, Lines, Injuries, Contracts, Cap, Prospects, Draft picks, Schedule, Standings, Transactions.

SEO utilities: `/nhl/[team]/lines|injuries|roster|prospects`, plus league indexes at `/injuries`, `/roster`, `/prospects` (and `/nhl/...` aliases).

College flagship: `/college` and `/college/[slug]` (Michigan, Minnesota, Denver, BU, Quinnipiac). PWHL: `/pwhl` and `/pwhl/[slug]`. Tools stubs: `/tools`.

## Public HELD policy

Held articles are graph nodes. They are **not published**. They do not appear on Now, Discover, `/articles`, or the sitemap. Direct `/articles/[slug]` shows a gate (no body). Desk body: `/use/held/[slug]`. Details: [docs/HELD.md](docs/HELD.md) and [/docs/held](/docs/held).

## Docs

- [Strategy](docs/STRATEGY.md) · in-product [/docs/strategy](/docs/strategy)
- [Hockeytown USA → Hockey Graph](docs/HOCKEY_GRAPH.md)
- [Phases 0–14](docs/PHASES.md)
- [Rights](docs/RIGHTS.md)
- [Focus teams](docs/FOCUS_TEAMS.md)
- [HELD](docs/HELD.md)

## Schema

Canonical types live in `src/graph/types.ts`. Seed assembly in `src/graph/seed/`. Query index in `src/graph/query.ts`. Held MDX in `content/held/`.
