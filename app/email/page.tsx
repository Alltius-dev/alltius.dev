import { EmailOperationsPage } from "../../components/email-operations-page";
import { SiteShell } from "../../components/site-shell";
import { metadataFor } from "../../lib/metadata";
import { routePairs, siteContent } from "../../lib/site-content";

const content = siteContent.en.emailOperations;

export const metadata = metadataFor("en", routePairs.email.en, content.title, content.description);

export default function EmailPage() {
  return <SiteShell locale="en" localizedPaths={routePairs.email}><EmailOperationsPage locale="en" /></SiteShell>;
}
