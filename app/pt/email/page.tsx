import { EmailOperationsPage } from "../../../components/email-operations-page";
import { SiteShell } from "../../../components/site-shell";
import { metadataFor } from "../../../lib/metadata";
import { routePairs, siteContent } from "../../../lib/site-content";

const content = siteContent.pt.emailOperations;

export const metadata = metadataFor("pt", routePairs.email.pt, content.title, content.description);

export default function PortugueseEmailPage() {
  return <SiteShell locale="pt" localizedPaths={routePairs.email}><EmailOperationsPage locale="pt" /></SiteShell>;
}
