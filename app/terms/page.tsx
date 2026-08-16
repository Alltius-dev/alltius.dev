import { LegalPage } from "../../components/legal-page";
import { SiteShell } from "../../components/site-shell";
import { metadataFor } from "../../lib/metadata";
import { routePairs, siteContent } from "../../lib/site-content";

const content = siteContent.en.legal.terms;

export const metadata = metadataFor("en", routePairs.terms.en, content.title, content.description);

export default function TermsPage() {
  return <SiteShell locale="en" localizedPaths={routePairs.terms}><LegalPage locale="en" pageKey="terms" /></SiteShell>;
}
