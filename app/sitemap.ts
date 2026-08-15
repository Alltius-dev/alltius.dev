import type { MetadataRoute } from "next";

import { routePairs } from "../lib/site-content";

export default function sitemap(): MetadataRoute.Sitemap {
  return Object.values(routePairs).flatMap((pair) => [
    { url: `https://aiullma.com${pair.en}` },
    { url: `https://aiullma.com${pair.pt}` },
  ]);
}
