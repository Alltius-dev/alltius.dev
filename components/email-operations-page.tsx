import {
  publicAddress,
  routePairs,
  siteContent,
  type Locale,
} from "../lib/site-content";

export function EmailOperationsPage({ locale }: { locale: Locale }) {
  const content = siteContent[locale].emailOperations;

  return (
    <main className="legal-layout" id="main-content">
      <article className="legal-document">
        <header className="legal-header">
          <h1>{content.title}</h1>
          <p>{content.introduction}</p>
        </header>
        <div className="legal-sections">
          {content.sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}
          <section>
            <h2>{content.cta}</h2>
            <p>
              <a href={routePairs.contact[locale]}>
                {locale === "en"
                  ? "Use the contact page to start the review."
                  : locale === "pt"
                    ? "Use a página de contato para iniciar a revisão."
                    : "Use la página de contacto para iniciar la revisión."}
              </a>
            </p>
            <p>
              <a href="mailto:contact@aiullma.com">contact@aiullma.com</a>
            </p>
            <p>{publicAddress}</p>
          </section>
        </div>
      </article>
    </main>
  );
}
