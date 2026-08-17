import { EmailOperationsPage } from "../../../components/email-operations-page";
import { SiteShell } from "../../../components/site-shell";
import { metadataFor } from "../../../lib/metadata";
import { routePairs, siteContent } from "../../../lib/site-content";

const content = siteContent.es.emailOperations;

export const metadata = metadataFor("es", routePairs.email.es, content.title, content.description);

export default function SpanishEmailPage() {
  return <SiteShell locale="es" localizedPaths={routePairs.email}><EmailOperationsPage locale="es" /></SiteShell>;
}
