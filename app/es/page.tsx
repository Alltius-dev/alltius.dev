import { HomePage } from "../../components/home-page";
import { SiteShell } from "../../components/site-shell";
import { metadataFor } from "../../lib/metadata";
import { routePairs, siteContent } from "../../lib/site-content";

const content = siteContent.es.home;

export const metadata = metadataFor(
  "es",
  routePairs.home.es,
  content.seoTitle,
  content.seoDescription,
  true,
);

export default function SpanishHome() {
  return (
    <SiteShell locale="es" localizedPaths={routePairs.home}>
      <HomePage locale="es" />
    </SiteShell>
  );
}
