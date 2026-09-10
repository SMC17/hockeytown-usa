# Hockeytown USA

**The operating system for following hockey.**

Hockeytown USA is the company. **Hockey Graph** is the knowledge layer: one newsroom, one graph, one CMS, one identity, many front ends. The atomic unit is a structured hockey object — not the article alone.

This repository was an empty README on `main`. Phase 0–1 scaffolds a Next.js App Router + TypeScript foundation around that brand rather than a regional-only site.

## How to run

Requires Node 20+.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm test          # graph integrity (32 teams, edges, mentions, focus depth)
npm run typecheck
npm run build     # production compile
```

JSON for other front ends: [http://localhost:3000/api/graph](http://localhost:3000/api/graph)

## Flagship IA

| Mode | Path | Job |
| --- | --- | --- |
| Now | `/` | Latest objects, injuries, focus clubs |
| Understand | `/understand` | Why the graph exists |
| Analyze | `/analyze` | Standings as objects |
| Discover | `/discover` | Search every node |
| Follow | `/follow` | Identity (local in Phase 1) |
| Use | `/use` | CMS desk + API |

NHL: `/nhl` and `/nhl/[teamSlug]` with Latest, Roster, Lines, Injuries, Contracts, Cap, Prospects, Draft picks, Schedule, Standings, Transactions.

Also: `/college`, `/pwhl`, `/articles`, entity pages (`/players/[slug]`, …), `/graph/[type]/[slug]`.

## Docs

- [Hockeytown USA → Hockey Graph](docs/HOCKEY_GRAPH.md)
- [Phases 0–14](docs/PHASES.md)
- [Rights](docs/RIGHTS.md)
- [Focus teams](docs/FOCUS_TEAMS.md)

## Schema

Canonical types live in `src/graph/types.ts`. Seed assembly in `src/graph/seed/`. Query index in `src/graph/query.ts`.
