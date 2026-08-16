import { LegalPage } from "../../../components/legal-page";
import { SiteShell } from "../../../components/site-shell";
import { metadataFor } from "../../../lib/metadata";
import { routePairs, siteContent } from "../../../lib/site-content";

const content = siteContent.es.legal.contact;

export const metadata = metadataFor("es", routePairs.contact.es, content.title, content.description);

export default function SpanishContactPage() {
  return <SiteShell locale="es" alternatePath={routePairs.contact.en}><LegalPage locale="es" pageKey="contact" /></SiteShell>;
}
