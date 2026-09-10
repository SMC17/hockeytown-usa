# Phases 0–14 (condensed)

Phase 0–1 is this PR. Later phases extend the same objects; they do not replace the IA.

| Phase | Name | Outcome |
| --- | --- | --- |
| 0 | Map | Inventory the repo. This one was empty; brand name kept. |
| 1 | Foundation | Canonical schema, 32 NHL teams, six deep stubs, flagship IA, team mini-OS, CMS mention path, docs, rights. |
| 2 | Live ingest | Schedule, boxscores, standings feeds replace snapshots. Idempotent upserts onto existing IDs. |
| 3 | Newsroom CMS | Authored desk, drafts, embargoes, mention autocomplete, `corrects` workflow in UI. |
| 4 | Identity | Real accounts. Follow Player/Team/League once; every front end reads it. |
| 5 | College pipeline | Commitments, portal, draft rights as daily objects (Michigan hometown depth first). |
| 6 | PWHL depth | Same mini-OS as NHL. Not a blog tag. |
| 7 | Cap model | Real SPC/LTIR math; retire illustrative AAV flags. |
| 8 | Video | Official/licensed players only. Quote + Video nodes with rights enum. |
| 9 | Analyze | On-ice, lines, RAPM-style views as graph queries, not a second warehouse. |
| 10 | Many front ends | Newsletter, mobile, embeddable team OS, public API versioning. |
| 11 | Representation | Agents, agencies, negotiation graph. |
| 12 | Provenance | Source reliability, `cites` / `sourced_from` / `corrects` as newsroom law. |
| 13 | Hockeytown front | Regional Michigan/Detroit skin on the same graph — not a fork. |
| 14 | Operating company | One newsroom staffing many products; graph is the shared asset. |
