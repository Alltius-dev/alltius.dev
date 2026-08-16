import { LegalPage } from "../../../components/legal-page";
import { SiteShell } from "../../../components/site-shell";
import { metadataFor } from "../../../lib/metadata";
import { routePairs, siteContent } from "../../../lib/site-content";

const content = siteContent.pt.legal.contact;

export const metadata = metadataFor("pt", routePairs.contact.pt, content.title, content.description);

export default function PortugueseContactPage() {
  return <SiteShell locale="pt" localizedPaths={routePairs.contact}><LegalPage locale="pt" pageKey="contact" /></SiteShell>;
}
