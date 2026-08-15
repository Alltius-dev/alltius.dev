import { HomePage } from "../components/home-page";
import { SiteShell } from "../components/site-shell";
import { metadataFor } from "../lib/metadata";
import { routePairs, siteContent } from "../lib/site-content";

const content = siteContent.en.home;

export const metadata = metadataFor("en", routePairs.home.en, content.headline, content.support);

export default function Home() {
  return (
    <SiteShell locale="en" alternatePath={routePairs.home.pt}>
      <HomePage locale="en" />
    </SiteShell>
  );
}
