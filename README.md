# Hockeytown USA

**The operating system for following hockey.**

Hockeytown USA is the company. **Hockey Graph** is the knowledge layer: one newsroom, one graph, one CMS, one identity, many front ends. The atomic unit is a structured hockey object — not the article alone.

This flagship does **not** play live NHL rights footage. Video nodes are official, licensed, or `none` — and `none` never renders a player.

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

## Flagship IA

| Mode | Path | Job |
| --- | --- | --- |
| Now | `/` | Latest **published** objects |
| Understand | `/understand` | Why the graph exists |
| Analyze | `/analyze` | Standings as objects |
| Discover | `/discover` | Search public nodes |
| Follow | `/my-hockey` | Identity chips (localStorage) |
| Use | `/use` | CMS desk + held queue |

NHL mini-OS: `/nhl/[team]`. SEO: `/nhl/[team]/lines|injuries|roster|prospects` plus `/injuries`, `/roster`, `/prospects`.

College hubs: `/college/[slug]` — Michigan, Minnesota, BU, BC, North Dakota, Quinnipiac, Wisconsin.

PWHL: `/pwhl` and `/pwhl/[slug]` (first-class nav). Hockey Map: `/map`, `/geography/detroit`. Tools: `/tools/transactions`, `/tools/lines`, `/tools/org-depth`.

## Held vs live

**Live (public):** published/corrected articles, team mini-OS shells, college/PWHL hubs, tools empty states, map stub, My Hockey chips.

**Held (not published):** Pipeline Calibration Window, Four-Game Filter, Window Contract, Hub Restore, Interior Tax. Graph nodes with entity links. Public gate, no body. Desk: `/use/held/[slug]`.

## Docs

- [Strategy](docs/STRATEGY.md) · [/docs/strategy](/docs/strategy)
- [HELD](docs/HELD.md) · [Rights](docs/RIGHTS.md) · [Focus teams](docs/FOCUS_TEAMS.md) · [Phases](docs/PHASES.md)
