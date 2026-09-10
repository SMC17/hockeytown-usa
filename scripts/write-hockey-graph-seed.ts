import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { buildHockeyGraphSeedEnvelope } from "../src/graph/seed/vault-payload";

const envelope = buildHockeyGraphSeedEnvelope();
const path = join(process.cwd(), "content", "vault", "hockey-graph-seed.json");
writeFileSync(path, `${JSON.stringify(envelope, null, 2)}\n`);
console.log(`wrote ${path} (${envelope.entityCount} entities, ${envelope.edges.length} edges)`);
