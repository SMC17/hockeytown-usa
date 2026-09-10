# Hockeytown USA → Hockey Graph

Hockeytown USA is the company and brand. Hockey Graph is the knowledge layer: the operating system for following hockey.

The atomic unit is a **structured hockey object** in the graph — a Player, Team, Injury, Contract, Article — not the article alone. Copy, data, and product UI are projections of the same nodes and edges.

## Architecture

One newsroom + one data infra + one CMS + one identity + many front ends.

| Layer | In this repo (Phase 0–1) |
| --- | --- |
| Company / brand | Hockeytown USA wordmark, hometown Detroit/Michigan texture |
| Knowledge layer | `src/graph` TypeScript schema, seed graph, query index |
| CMS | Articles as graph nodes with `[[type:slug]]` mentions → `mentioned_in` edges |
| Identity | Follow mode (browser-local); contract is one identity later |
| Front ends | NHL flagship (`/` six modes), team mini-OS, college & PWHL stubs, JSON API |

National OS architecture wins over a regional-only site. Hockeytown USA can still be a regional front (Michigan, Red Wings, NCAA) without making the graph Detroit-only.

Verified on the empty `main` branch: the repo was a README stub. This foundation scaffolds Next.js App Router + TypeScript rather than extending a prior geo CMS.

## What exists now

- Framework: Next.js App Router, TypeScript, CSS (no thrash — greenfield)
- Routes: `/` six-mode flagship, `/nhl` mini-OS (including `/nhl/[team]/lines|injuries|roster|prospects`), `/college/[slug]`, `/pwhl/[slug]`, `/tools`, entity pages, `/articles` (published only), `/use` CMS desk, `/docs/strategy`, JSON API
- Data: in-memory typed graph assembled from seed modules (swap-ready for a database)
- Content: newsroom stubs that cite graph objects
- Deploy: `next build` / Node 20+; Vercel-compatible, no special config required
