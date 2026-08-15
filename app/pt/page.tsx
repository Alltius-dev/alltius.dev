import { HomePage } from "../../components/home-page";
import { SiteShell } from "../../components/site-shell";
import { metadataFor } from "../../lib/metadata";
import { routePairs, siteContent } from "../../lib/site-content";

const content = siteContent.pt.home;

export const metadata = metadataFor("pt", routePairs.home.pt, content.headline, content.support);

export default function PortugueseHome() {
  return (
    <SiteShell locale="pt" alternatePath={routePairs.home.en}>
      <HomePage locale="pt" />
    </SiteShell>
  );
}
