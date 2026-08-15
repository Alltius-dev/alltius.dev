import { LegalPage } from "../../../components/legal-page";
import { SiteShell } from "../../../components/site-shell";
import { metadataFor } from "../../../lib/metadata";
import { routePairs, siteContent } from "../../../lib/site-content";

const content = siteContent.pt.legal.dataDeletion;

export const metadata = metadataFor("pt", routePairs.dataDeletion.pt, content.title, content.description);

export default function PortugueseDataDeletionPage() {
  return <SiteShell locale="pt" alternatePath={routePairs.dataDeletion.en}><LegalPage locale="pt" pageKey="dataDeletion" /></SiteShell>;
}
