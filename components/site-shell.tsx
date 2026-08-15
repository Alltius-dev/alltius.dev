import {
  routePairs,
  siteContent,
  type Locale,
} from "../lib/site-content";

type SiteShellProps = {
  locale: Locale;
  alternatePath: string;
  children: React.ReactNode;
};

export function SiteShell({ locale, alternatePath, children }: SiteShellProps) {
  const content = siteContent[locale];
  const paths = {
    home: routePairs.home[locale],
    contact: routePairs.contact[locale],
  };

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="site-header">
        <a aria-label="AIULLMA home" className="wordmark" href={paths.home}>
          AIULLMA
        </a>
        <nav aria-label="Primary navigation">
          <a href={`${paths.home}#company`}>{content.nav.company}</a>
          <a href={`${paths.home}#capabilities`}>{content.nav.capabilities}</a>
          <a href={`${paths.home}#model`}>{content.nav.model}</a>
          <a href={paths.contact}>{content.nav.contact}</a>
          <a href={alternatePath} hrefLang={locale === "en" ? "pt-BR" : "en"}>
            {content.nav.language}
          </a>
        </nav>
        <details className="mobile-navigation">
          <summary>{content.nav.home}</summary>
          <nav aria-label="Mobile navigation">
            <a href={paths.home}>{content.nav.home}</a>
            <a href={`${paths.home}#company`}>{content.nav.company}</a>
            <a href={`${paths.home}#capabilities`}>{content.nav.capabilities}</a>
            <a href={`${paths.home}#model`}>{content.nav.model}</a>
            <a href={paths.contact}>{content.nav.contact}</a>
            <a href={alternatePath} hrefLang={locale === "en" ? "pt-BR" : "en"}>
              {content.nav.language}
            </a>
          </nav>
        </details>
      </header>
      {children}
      <footer className="site-footer">
        <p>AIULLMA LLC · {"New Mexico, United States"}</p>
        <nav aria-label="Policies">
          <a href={routePairs.privacy[locale]}>{content.footer.privacy}</a>
          <a href={routePairs.terms[locale]}>{content.footer.terms}</a>
          <a href={routePairs.dataDeletion[locale]}>{content.footer.dataDeletion}</a>
        </nav>
        <a href="mailto:contact@aiullma.com">contact@aiullma.com</a>
        <p>{content.footer.disclaimer}</p>
      </footer>
    </>
  );
}
