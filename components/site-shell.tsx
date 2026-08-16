import {
  routePairs,
  siteContent,
  type Locale,
} from "../lib/site-content";

export type LocalizedPaths = Readonly<Record<Locale, string>>;

type SiteShellProps = {
  locale: Locale;
  localizedPaths: LocalizedPaths;
  children: React.ReactNode;
};

const languageOptions = [
  { locale: "en", label: "English", hrefLang: "en" },
  { locale: "pt", label: "Português", hrefLang: "pt-BR" },
  { locale: "es", label: "Español", hrefLang: "es-419" },
] as const;

export function SiteShell({ locale, localizedPaths, children }: SiteShellProps) {
  const content = siteContent[locale];
  const accessibilityByLocale = {
    en: {
      home: "AIULLMA home",
      menu: "Menu",
      mobileNavigation: "Mobile navigation",
      policies: "Policies",
      primaryNavigation: "Primary navigation",
      skip: "Skip to content",
    },
    pt: {
      home: "Página inicial da AIULLMA",
      menu: "Menu",
      mobileNavigation: "Navegação móvel",
      policies: "Políticas",
      primaryNavigation: "Navegação principal",
      skip: "Pular para o conteúdo",
    },
    es: {
      home: "Página de inicio de AIULLMA",
      menu: "Menú",
      mobileNavigation: "Navegación móvil",
      policies: "Políticas",
      primaryNavigation: "Navegación principal",
      skip: "Ir al contenido",
    },
  } as const;
  const accessibility = accessibilityByLocale[locale];
  const paths = {
    home: routePairs.home[locale],
    contact: routePairs.contact[locale],
  };

  return (
    <>
      <a className="skip-link" href="#main-content">
        {accessibility.skip}
      </a>
      <header className="site-header">
        <div className="site-header-inner">
          <a aria-label={accessibility.home} className="wordmark" href={paths.home}>
            AIULLMA
          </a>
          <nav aria-label={accessibility.primaryNavigation} className="desktop-navigation">
            <a href={`${paths.home}#company`}>{content.nav.company}</a>
            <a href={`${paths.home}#capabilities`}>{content.nav.capabilities}</a>
            <a href={`${paths.home}#model`}>{content.nav.model}</a>
            <a href={paths.contact}>{content.nav.contact}</a>
            <div className="language-switcher" role="group" aria-label={content.nav.languages}>
              {languageOptions.map((option) =>
                option.locale === locale ? (
                  <span aria-current="page" key={option.locale}>{option.label}</span>
                ) : (
                  <a href={localizedPaths[option.locale]} hrefLang={option.hrefLang} key={option.locale}>
                    {option.label}
                  </a>
                ),
              )}
            </div>
          </nav>
          <details className="mobile-navigation">
            <summary>{accessibility.menu}</summary>
            <nav aria-label={accessibility.mobileNavigation}>
              <a href={paths.home}>{content.nav.home}</a>
              <a href={`${paths.home}#company`}>{content.nav.company}</a>
              <a href={`${paths.home}#capabilities`}>{content.nav.capabilities}</a>
              <a href={`${paths.home}#model`}>{content.nav.model}</a>
              <a href={paths.contact}>{content.nav.contact}</a>
              <div className="language-switcher" role="group" aria-label={content.nav.languages}>
                {languageOptions.map((option) =>
                  option.locale === locale ? (
                    <span aria-current="page" key={option.locale}>{option.label}</span>
                  ) : (
                    <a href={localizedPaths[option.locale]} hrefLang={option.hrefLang} key={option.locale}>
                      {option.label}
                    </a>
                  ),
                )}
              </div>
            </nav>
          </details>
        </div>
      </header>
      {children}
      <footer className="site-footer">
        <div className="site-footer-inner">
          <div className="footer-identity">
            <a aria-label={accessibility.home} className="wordmark" href={paths.home}>
              AIULLMA
            </a>
            <p>AIULLMA LLC · {"New Mexico, United States"}</p>
          </div>
          <nav aria-label={accessibility.policies}>
            <a href={routePairs.privacy[locale]}>{content.footer.privacy}</a>
            <a href={routePairs.terms[locale]}>{content.footer.terms}</a>
            <a href={routePairs.dataDeletion[locale]}>{content.footer.dataDeletion}</a>
          </nav>
          <a className="footer-email" href="mailto:contact@aiullma.com">contact@aiullma.com</a>
          <p className="footer-disclaimer">{content.footer.disclaimer}</p>
        </div>
      </footer>
    </>
  );
}
