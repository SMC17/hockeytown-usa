export const FOLLOW_KEY = "hockey-graph-follow";

export type FollowTarget = {
  slug: string;
  name: string;
  abbreviation: string;
  href: string;
  group: "nhl" | "college" | "pwhl" | "ahl";
  hint?: string;
};

export function readFollows(): string[] {
  try {
    const raw = localStorage.getItem(FOLLOW_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (Array.isArray(parsed) && parsed.every((x) => typeof x === "string")) return parsed;
    return [];
  } catch {
    return [];
  }
}

export function writeFollows(slugs: string[]) {
  localStorage.setItem(FOLLOW_KEY, JSON.stringify(slugs));
}
