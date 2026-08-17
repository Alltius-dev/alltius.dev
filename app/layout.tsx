import type { Metadata } from "next";
import { headers } from "next/headers";

import "./globals.css";

export const metadata: Metadata = {
  title: "Alltius",
  description: "Alltius builds, operates and optimizes managed digital capacity for growth.",
  metadataBase: new URL("https://alltius.dev"),
  icons: { icon: "/favicon.svg" },
  openGraph: {
    type: "website",
    siteName: "Alltius",
    title: "Alltius",
    description: "Alltius builds, operates and optimizes managed digital capacity for growth.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Alltius — Build, operate and optimize managed digital capacity for growth.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alltius",
    description: "Alltius builds, operates and optimizes managed digital capacity for growth.",
    images: ["/og.png"],
  },
};

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Alltius",
  legalName: "AIULLMA LLC",
  url: "https://alltius.dev",
  email: "contact@aiullma.com",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const requestHeaders = await headers();
  const requestedLanguage = requestHeaders.get("x-aiullma-language");
  const language = requestedLanguage === "pt-BR" || requestedLanguage === "es-419"
    ? requestedLanguage
    : "en";

  return (
    <html lang={language}>
      <body className="site-body">
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
          type="application/ld+json"
        />
        {children}
      </body>
    </html>
  );
}
