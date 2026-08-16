import { LegalPage } from "../../components/legal-page";
import { SiteShell } from "../../components/site-shell";
import { metadataFor } from "../../lib/metadata";
import { routePairs, siteContent } from "../../lib/site-content";

const content = siteContent.en.legal.contact;

export const metadata = metadataFor("en", routePairs.contact.en, content.title, content.description);

export default function ContactPage() {
  return <SiteShell locale="en" localizedPaths={routePairs.contact}><LegalPage locale="en" pageKey="contact" /></SiteShell>;
}
