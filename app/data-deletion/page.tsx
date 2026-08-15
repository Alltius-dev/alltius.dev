import { LegalPage } from "../../components/legal-page";
import { SiteShell } from "../../components/site-shell";
import { metadataFor } from "../../lib/metadata";
import { routePairs, siteContent } from "../../lib/site-content";

const content = siteContent.en.legal.dataDeletion;

export const metadata = metadataFor("en", routePairs.dataDeletion.en, content.title, content.description);

export default function DataDeletionPage() {
  return <SiteShell locale="en" alternatePath={routePairs.dataDeletion.pt}><LegalPage locale="en" pageKey="dataDeletion" /></SiteShell>;
}
