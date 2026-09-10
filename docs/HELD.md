# Public HELD policy

Held is a first-class `ArticleStatus`. It is not a draft folder and not a published story.

## What held means

- The article is a graph node with entity IDs (`mentioned_in` edges).
- Copy may live in `content/held/*.mdx`.
- Status is `held` until the desk explicitly publishes.

## Public

| Surface | Held behavior |
| --- | --- |
| `/articles` | Omitted |
| Now / Discover / team Latest | Omitted |
| sitemap.xml | Omitted |
| `/articles/[slug]` | Title, dek, mentions, gate. **No body.** `noindex`. |
| `/api/graph` | Node may exist; **body is stripped** |

## Desk

| Surface | Held behavior |
| --- | --- |
| `/use` | Listed in the held queue |
| `/use/held/[slug]` | Full body + mention chips. `noindex`. |

## Vault-aligned held titles (this seed)

1. Pipeline Calibration Window — McKenna, Eiserman, NCAA clocks
2. Four-Game Filter — Crosby, Sturm, small-sample Now
3. Window Contract — Barkov term / LTIR
4. Hub Restore — Sturm Bruins after Marchand
5. Interior Tax — Brady Tkachuk, Barkov, Markstrom

These are original conceptual shells aligned to those entities. They are not a dump of a private vault. Entity JSON import is a separate path: [VAULT_SYNC.md](./VAULT_SYNC.md).
