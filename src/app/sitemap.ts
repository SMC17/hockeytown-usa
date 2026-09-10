import type { MetadataRoute } from "next";
import { getGraph } from "@/graph/query";
import { TEAM_SECTIONS } from "@/graph/types";
import { COLLEGE_SECTIONS } from "@/graph/types";
import { TOOL_SLUGS } from "@/graph/types";
import { teamHref } from "@/graph/ids";

export default function sitemap(): MetadataRoute.Sitemap {
  const g = getGraph();
  const paths = [
    "/",
    "/understand",
    "/analyze",
    "/discover",
    "/follow",
    "/my-hockey",
    "/map",
    "/geography/detroit",
    "/use",
    "/nhl",
    "/nhl/lines",
    "/nhl/injuries",
    "/nhl/roster",
    "/nhl/prospects",
    "/college",
    "/pwhl",
    "/ahl",
    "/articles",
    "/tools",
    "/docs",
    "/docs/strategy",
    "/docs/held",
    "/docs/vault-sync",
    "/docs/credentials",
    "/watch",
    "/alerts",
    "/injuries",
    "/roster",
    "/prospects",
  ];

  for (const team of g.nhlTeams()) {
    paths.push(`/nhl/${team.slug}`);
    for (const section of TEAM_SECTIONS) {
      if (section === "latest") continue;
      paths.push(`/nhl/${team.slug}/${section}`);
    }
  }
  for (const team of g.collegeTeams()) {
    paths.push(teamHref(team));
    for (const section of COLLEGE_SECTIONS) {
      if (section === "latest") continue;
      paths.push(`${teamHref(team)}/${section}`);
    }
  }
  for (const team of g.pwhlTeams()) {
    paths.push(teamHref(team));
    paths.push(`${teamHref(team)}/roster`);
  }
  for (const team of g.ahlTeams()) {
    paths.push(teamHref(team));
  }
  for (const slug of TOOL_SLUGS) paths.push(`/tools/${slug}`);
  for (const article of g.publishedArticles()) paths.push(`/articles/${article.slug}`);

  return paths.map((url) => ({ url }));
}
