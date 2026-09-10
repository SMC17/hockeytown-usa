# Vault drop

Drop a real `hockey-graph-seed.json` here to merge **new** graph IDs into the seed.

- Expected export: **106 entities** (see `/docs/vault-sync` and `docs/VAULT_SYNC.md`).
- Shape: `hockey-graph-seed.example.json` (3-entity fixture — not the 106-entity dump).
- Missing `hockey-graph-seed.json` is a no-op. The loader does not invent players or live game stats.
- In-repo seed IDs win on collision (`uniqueById`, first ID wins).
