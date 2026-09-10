import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/use/held", "/api/"] },
    ],
    sitemap: "/sitemap.xml",
  };
}
