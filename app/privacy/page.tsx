import { LegalPage } from "../../components/legal-page";
import { SiteShell } from "../../components/site-shell";
import { metadataFor } from "../../lib/metadata";
import { routePairs, siteContent } from "../../lib/site-content";

const content = siteContent.en.legal.privacy;

export const metadata = metadataFor("en", routePairs.privacy.en, content.title, content.description);

export default function PrivacyPage() {
  return <SiteShell locale="en" localizedPaths={routePairs.privacy}><LegalPage locale="en" pageKey="privacy" /></SiteShell>;
}
