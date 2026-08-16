import { LegalPage } from "../../../components/legal-page";
import { SiteShell } from "../../../components/site-shell";
import { metadataFor } from "../../../lib/metadata";
import { routePairs, siteContent } from "../../../lib/site-content";

const content = siteContent.es.legal.dataDeletion;

export const metadata = metadataFor("es", routePairs.dataDeletion.es, content.title, content.description);

export default function SpanishDataDeletionPage() {
  return <SiteShell locale="es" localizedPaths={routePairs.dataDeletion}><LegalPage locale="es" pageKey="dataDeletion" /></SiteShell>;
}
