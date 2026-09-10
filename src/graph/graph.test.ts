import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { EDGE_TYPES, NODE_TYPES } from "./types";
import { buildSeedGraph } from "./seed";
import { GraphIndex } from "./query";
import { parseArticleBody } from "./render";

describe("Hockey Graph foundation", () => {
  const graph = new GraphIndex(buildSeedGraph());

  it("seeds all 32 NHL teams", () => {
    const nhl = graph.nhlTeams();
    assert.equal(nhl.length, 32);
    const abbr = new Set(nhl.map((t) => t.abbreviation));
    assert.equal(abbr.size, 32);
  });

  it("marks six focus teams as deep coverage", () => {
    const focus = graph.focusTeams();
    assert.equal(focus.length, 6);
    for (const team of focus) {
      assert.equal(team.coverage, "deep");
      assert.ok(graph.rosterFor(team.id).length >= 12, `${team.slug} roster`);
      assert.ok(graph.linesFor(team.id).length >= 4, `${team.slug} lines`);
      assert.ok(graph.capFor(team.id), `${team.slug} cap`);
      assert.ok(graph.standingFor(team.id), `${team.slug} standing`);
    }
  });

  it("includes Detroit as hometown catalog, not a coverage hole", () => {
    const wings = graph.teamBySlug("detroit-red-wings");
    assert.ok(wings);
    assert.equal(wings.hometown, true);
    assert.equal(wings.coverage, "catalog");
  });

  it("covers every canonical node and edge type at least once", () => {
    const stats = graph.stats();
    for (const type of NODE_TYPES) {
      assert.ok((stats.counts[type] ?? 0) > 0, `missing node type ${type}`);
    }
    for (const type of EDGE_TYPES) {
      assert.ok((stats.edgeCounts[type] ?? 0) > 0, `missing edge type ${type}`);
    }
  });

  it("has no dangling edge endpoints", () => {
    for (const edge of graph.raw.edges) {
      assert.ok(graph.node(edge.from), `dangling from ${edge.id}`);
      assert.ok(graph.node(edge.to), `dangling to ${edge.id}`);
    }
  });

  it("wires article mentions into the graph", () => {
    const articles = graph.publishedArticles();
    assert.ok(articles.length >= 6);
    const sample = graph.byTypeSlug("article", "schaefer-rewired-the-island");
    assert.ok(sample);
    const mentions = graph.edgesTo(sample.id, "mentioned_in");
    assert.ok(mentions.length >= 3);
    const blocks = parseArticleBody(
      (sample as { body: string }).body,
    );
    assert.ok(blocks.some((b) => b.kind === "mention" && b.slug === "matthew-schaefer"));
  });

  it("records a corrects edge for provenance", () => {
    const corr = graph.edgesFrom("article:schaefer-rewired-correction-note", "corrects");
    assert.equal(corr.length, 1);
    assert.equal(corr[0].to, "article:schaefer-rewired-the-island");
  });

  it("seeds college and PWHL league stubs", () => {
    assert.ok(graph.teamBySlug("michigan-wolverines"));
    assert.ok(graph.teamBySlug("montreal-victoire"));
    assert.equal(graph.teams().filter((t) => t.leagueId === "league:pwhl").length, 8);
  });

  it("includes Utah Mammoth as the 32nd NHL club", () => {
    const utah = graph.teamBySlug("utah-mammoth");
    assert.ok(utah);
    assert.equal(utah.abbreviation, "UTA");
    assert.equal(utah.division, "Central");
  });
});
