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
  const fullTitle = absoluteTitle ? title : `${title} | Alltius`;
  const socialAlt = `${fullTitle} — ${description}`;

  return {
    title: fullTitle,
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
    openGraph: {
      siteName: "Alltius",
      type: "website",
      title: fullTitle,
      description,
      images: [
        {
          url: "/og.png",
          width: 1200,
          height: 630,
          alt: socialAlt,
        },
      ],
    },
    twitter: {
      title: fullTitle,
      description,
      images: ["/og.png"],
    },
  };
}
