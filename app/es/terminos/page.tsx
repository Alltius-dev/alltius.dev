import { LegalPage } from "../../../components/legal-page";
import { SiteShell } from "../../../components/site-shell";
import { metadataFor } from "../../../lib/metadata";
import { routePairs, siteContent } from "../../../lib/site-content";

const content = siteContent.es.legal.terms;

export const metadata = metadataFor("es", routePairs.terms.es, content.title, content.description);

export default function SpanishTermsPage() {
  return <SiteShell locale="es" alternatePath={routePairs.terms.en}><LegalPage locale="es" pageKey="terms" /></SiteShell>;
}
