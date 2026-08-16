import { LegalPage } from "../../../components/legal-page";
import { SiteShell } from "../../../components/site-shell";
import { metadataFor } from "../../../lib/metadata";
import { routePairs, siteContent } from "../../../lib/site-content";

const content = siteContent.pt.legal.terms;

export const metadata = metadataFor("pt", routePairs.terms.pt, content.title, content.description);

export default function PortugueseTermsPage() {
  return <SiteShell locale="pt" localizedPaths={routePairs.terms}><LegalPage locale="pt" pageKey="terms" /></SiteShell>;
}
