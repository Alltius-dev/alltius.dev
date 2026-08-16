import type { MetadataRoute } from "next";

import { routePairs } from "../lib/site-content";

export default function sitemap(): MetadataRoute.Sitemap {
  return Object.values(routePairs).flatMap((pair) =>
    Object.values(pair).map((path) => ({ url: `https://aiullma.com${path}` })),
  );
}
