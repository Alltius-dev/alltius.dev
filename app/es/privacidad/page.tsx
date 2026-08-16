import { LegalPage } from "../../../components/legal-page";
import { SiteShell } from "../../../components/site-shell";
import { metadataFor } from "../../../lib/metadata";
import { routePairs, siteContent } from "../../../lib/site-content";

const content = siteContent.es.legal.privacy;

export const metadata = metadataFor("es", routePairs.privacy.es, content.title, content.description);

export default function SpanishPrivacyPage() {
  return <SiteShell locale="es" localizedPaths={routePairs.privacy}><LegalPage locale="es" pageKey="privacy" /></SiteShell>;
}
