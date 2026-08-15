import { LegalPage } from "../../../components/legal-page";
import { SiteShell } from "../../../components/site-shell";
import { metadataFor } from "../../../lib/metadata";
import { routePairs, siteContent } from "../../../lib/site-content";

const content = siteContent.pt.legal.privacy;

export const metadata = metadataFor("pt", routePairs.privacy.pt, content.title, content.description);

export default function PortuguesePrivacyPage() {
  return <SiteShell locale="pt" alternatePath={routePairs.privacy.en}><LegalPage locale="pt" pageKey="privacy" /></SiteShell>;
}
