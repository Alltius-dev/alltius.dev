import type { Metadata } from "next";

import "./globals.css";
import { publicAddress } from "../lib/site-content";

export const metadata: Metadata = {
  title: "AIULLMA LLC",
  description: "Technology services for scalable business operations.",
  metadataBase: new URL("https://aiullma.com"),
  icons: { icon: "/favicon.svg" },
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="site-body">
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
          type="application/ld+json"
        />
        <span className="sr-only">{publicAddress}</span>
        {children}
      </body>
    </html>
  );
}
