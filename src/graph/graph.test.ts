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

  it("seeds every mini-OS section on the focus six, including PP1/PK1", () => {
    for (const team of graph.focusTeams()) {
      for (const row of graph.focusCompleteness(team.id)) {
        assert.ok(row.filled, `${team.slug} missing ${row.section}`);
      }
    }
  });

  it("aligns vault entities and five held articles without publishing them", () => {
    for (const id of [
      "player:gavin-mckenna",
      "player:sidney-crosby",
      "player:aleksander-barkov",
      "player:brady-tkachuk",
      "player:jacob-markstrom",
      "player:cole-eiserman",
      "coach:marco-sturm",
    ]) {
      assert.ok(graph.node(id), `missing vault entity ${id}`);
    }
    const held = graph.heldArticles();
    assert.equal(held.length, 5);
    const slugs = new Set(held.map((a) => a.slug));
    for (const slug of [
      "pipeline-calibration-window",
      "four-game-filter",
      "window-contract",
      "hub-restore",
      "interior-tax",
    ]) {
      assert.ok(slugs.has(slug), `missing held ${slug}`);
      assert.ok(!graph.publishedArticles().some((a) => a.slug === slug));
    }
    const eiserman = graph.require("player:cole-eiserman");
    assert.ok(graph.edgesFrom(eiserman.id, "rights_owned_by").some((e) => e.to === "team:new-york-islanders"));
    assert.ok(graph.edgesFrom(eiserman.id, "committed_to").some((e) => e.to === "team:boston-university-terriers"));
  });

  it("seeds seven NCAA program hubs", () => {
    assert.equal(graph.collegeHubs().length, 7);
    for (const slug of [
      "michigan-wolverines",
      "minnesota-golden-gophers",
      "boston-university-terriers",
      "boston-college-eagles",
      "north-dakota-fighting-hawks",
      "quinnipiac-bobcats",
      "wisconsin-badgers",
    ]) {
      const team = graph.teamBySlug(slug);
      assert.ok(team);
      assert.equal(team.coverage, "deep");
      assert.ok(graph.rosterFor(team.id).length >= 5, `${slug} roster`);
      assert.ok(graph.commitmentsFor(team.id).length >= 1, `${slug} commits`);
    }
  });
});
