# Vault sync — `hockey-graph-seed`

The private vault export is a **106-entity** graph dump. This repo does not invent those entities. It documents the JSON shape and ships a loader stub that merges a file if you drop it.

## Drop path

```
content/vault/hockey-graph-seed.json
```

- If the file is **missing**, seed assembly is unchanged (no-op).
- If the file is **present**, valid entities and edges are appended. Existing in-repo IDs win (`uniqueById`, first ID wins).
- Copy shape from `content/vault/hockey-graph-seed.example.json` (3 objects — a fixture, not the dump).

Public page: [`/docs/vault-sync`](/docs/vault-sync).

## Envelope

```json
{
  "export": "hockey-graph-seed",
  "version": 1,
  "generatedAt": "2026-09-10T00:00:00.000Z",
  "entityCount": 106,
  "entities": [],
  "edges": []
}
```

| Field | Rule |
| --- | --- |
| `export` | Must be `"hockey-graph-seed"` |
| `version` | Number. Stub accepts `1`. |
| `generatedAt` | ISO timestamp |
| `entityCount` | Production dump: **106**. Must match `entities.length`. Other counts load with a warning. |
| `entities` | Graph objects |
| `edges` | Typed edges (`from` / `to`) |

## Entity

```json
{
  "id": "player:gavin-mckenna",
  "type": "player",
  "slug": "gavin-mckenna",
  "name": "Gavin McKenna",
  "props": {
    "firstName": "Gavin",
    "lastName": "McKenna",
    "position": "LW",
    "shootsCatches": "L"
  }
}
```

`id` should be `type:slug`. `props` holds the rest of the node. Required props vary by `type` (see `src/graph/vault-import.ts`). Incomplete rows are skipped with a warning — the stub will not invent a position, AAV, or boxscore.

## Edge

```json
{
  "type": "committed_to",
  "from": "player:gavin-mckenna",
  "to": "team:penn-state-nittany-lions",
  "extra": "ncaa-2026"
}
```

`type` must be an `EdgeType`. `from` / `to` are node IDs.

## What the loader refuses

- Live game stats. Imported `game` nodes are forced to `status: "scheduled"` with **no scores**.
- Inventing the 106-entity dump. No synthetic players, contracts, or boxscores.
- Publishing held prose. Article nodes still need an explicit `status`. Held copy stays in `content/held/`.

## Already seeded without the dump

Hand-aligned vault objects live in `src/graph/seed/vault.ts` (McKenna, Brady Tkachuk, Markstrom, Eiserman, plus IDs that already exist in focus packs: Crosby, Barkov, Sturm). Five held articles are separate graph nodes, not this JSON.

## Code

- Parser / hydrator: `src/graph/vault-import.ts`
- Seed hook: `loadVaultSeedImport()` in `src/graph/seed/index.ts`
- Constant: `VAULT_SEED_ENTITY_COUNT = 106` in `src/graph/types.ts`
