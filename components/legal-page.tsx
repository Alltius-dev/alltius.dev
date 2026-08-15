import { siteContent, type LegalPageKey, type Locale } from "../lib/site-content";

export function LegalPage({
  locale,
  pageKey,
}: {
  locale: Locale;
  pageKey: LegalPageKey;
}) {
  const page = siteContent[locale].legal[pageKey];

  return (
    <main className="legal-layout" id="main-content">
      <article className="legal-document">
        <header className="legal-header">
          <h1>{page.title}</h1>
          <p>{page.introduction}</p>
          {page.email ? <p><a href={`mailto:${page.email}`}>{page.email}</a></p> : null}
        </header>
        <div className="legal-sections">
          {page.sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}
        </div>
      </article>
    </main>
  );
}
