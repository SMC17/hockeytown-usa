# Strategy

Hockeytown USA is the company. **Hockey Graph** is the knowledge layer: the operating system for following hockey.

One newsroom + one data infra + one CMS + one identity + many front ends. The atomic unit is a structured hockey object, not the article alone.

## Phases

Phase 0–1 is this foundation. Later phases extend the same objects; they do not replace the IA. Condensed table: [PHASES.md](./PHASES.md).

| Now | Next (not this PR) |
| --- | --- |
| Schema, seed graph, six-mode flagship, focus-six mini-OS, college/PWHL hubs, tools stubs, HELD policy | Live ingest, real cap math, licensed video playback, auth identity, interactive tools beyond stubs |

## Rights

No pirated highlights. `Video.rights` is `official` | `licensed` | `none`. `none` never renders a player. Details: [RIGHTS.md](./RIGHTS.md).

## Focus teams

Deep NHL hubs: Islanders, Maple Leafs, Penguins, Bruins, Panthers, Lightning. Each has every mini-OS section seeded (Latest through Transactions), including PP1/PK1.

College flagship hubs: Michigan, Minnesota, Denver, Boston University, Quinnipiac.

Hometown texture (not Phase-1 NHL depth): Detroit Red Wings; Michigan / Michigan State / Western Michigan.

Details: [FOCUS_TEAMS.md](./FOCUS_TEAMS.md).

## Public HELD policy

Five vault-aligned articles exist as graph nodes with `status: held`. They are **not published**.

Public surfaces must not render held bodies:

- `/articles` index
- Now, Discover, team Latest
- sitemap

Direct `/articles/[slug]` shows title, dek, mentions, and a gate — no body. Desk body: `/use/held/[slug]`. `noindex` on held URLs.

Full policy: [HELD.md](./HELD.md).
