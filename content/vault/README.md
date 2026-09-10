# Vault drop

`hockey-graph-seed.json` is the committed ingest file. Rebuild with `npm run vault-seed`.

- New IDs merge into the graph. In-repo IDs win on collision (`uniqueById`, first ID wins).
- Shape fixture: `hockey-graph-seed.example.json` (3 objects).
- Missing file is a no-op. No invented live game stats. Held article bodies in JSON are empty.
