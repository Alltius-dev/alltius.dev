import type { Metadata } from "next";
import { headers } from "next/headers";

import "./globals.css";

export const metadata: Metadata = {
  title: "AIULLMA LLC",
  description: "Technology services for scalable business operations.",
  metadataBase: new URL("https://aiullma.com"),
  icons: { icon: "/favicon.svg" },
  openGraph: {
    type: "website",
    siteName: "AIULLMA LLC",
    title: "AIULLMA LLC",
    description: "Technology services for scalable business operations.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "AIULLMA — Technology services for scalable business operations.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og.png"],
  },
};

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "AIULLMA LLC",
  url: "https://aiullma.com",
  email: "contact@aiullma.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "2105 Vista Oeste NW Ste E, 1349",
    addressLocality: "Albuquerque",
    addressRegion: "NM",
    postalCode: "87120",
    addressCountry: "US",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const requestHeaders = await headers();
  const language = requestHeaders.get("x-aiullma-language") === "pt-BR" ? "pt-BR" : "en";

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
