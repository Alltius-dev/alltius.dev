import type { Metadata } from "next";

import { routePairs, type Locale } from "./site-content";

const origin = "https://aiullma.com";

function alternatePath(locale: Locale, path: string) {
  const pair = Object.values(routePairs).find((route) => route[locale] === path);
  return pair?.[locale === "en" ? "pt" : "en"];
}

export function metadataFor(
  locale: Locale,
  path: string,
  title: string,
  description: string,
): Metadata {
  const alternate = alternatePath(locale, path);

  return {
    title: `${title} | AIULLMA LLC`,
    description,
    alternates: {
      canonical: path,
      languages: alternate
        ? {
            en: locale === "en" ? path : alternate,
            "pt-BR": locale === "pt" ? path : alternate,
          }
        : undefined,
    },
    metadataBase: new URL(origin),
  };
}
