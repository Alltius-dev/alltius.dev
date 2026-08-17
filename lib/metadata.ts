import type { Metadata } from "next";

import { routePairs, type Locale } from "./site-content";

const origin = "https://alltius.dev";

export function metadataFor(
  locale: Locale,
  path: string,
  title: string,
  description: string,
  absoluteTitle = false,
): Metadata {
  const pair = Object.values(routePairs).find((route) => route[locale] === path);

  return {
    title: absoluteTitle ? title : `${title} | Alltius`,
    description,
    alternates: {
      canonical: path,
      languages: pair
        ? {
            en: pair.en,
            "pt-BR": pair.pt,
            "es-419": pair.es,
            "x-default": pair.en,
          }
        : undefined,
    },
    metadataBase: new URL(origin),
  };
}
