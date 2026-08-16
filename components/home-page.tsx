import {
  publicAddress,
  routePairs,
  siteContent,
  type Locale,
} from "../lib/site-content";

export function HomePage({ locale }: { locale: Locale }) {
  const content = siteContent[locale].home;

  return (
    <main id="main-content">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-inner content-grid">
          <div className="hero-copy">
            <p className="eyebrow">{content.eyebrow}</p>
            <h1 id="hero-title">{content.headline}</h1>
            <div className="hero-support">
              {content.support.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="hero-actions">
              <a className="button-link" href={routePairs.contact[locale]}>{content.primaryCta}</a>
              <a className="text-link" href="#model">{content.secondaryCta}</a>
            </div>
          </div>
          <ol aria-label={content.modelTitle} className="operational-rails">
            {content.model.map((item) => (
              <li key={item.title}>
                <span>{item.title}</span>
                <i aria-hidden="true" />
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="page-section company-section" id="company" aria-labelledby="company-title">
        <div className="section-inner content-grid">
          <h2 id="company-title">{content.companyTitle}</h2>
          <p>{content.company}</p>
        </div>
      </section>

      <section className="page-section capabilities-section" id="capabilities" aria-labelledby="capabilities-title">
        <div className="section-inner">
          <h2 id="capabilities-title">{content.capabilitiesTitle}</h2>
          <div className="capability-list">
            {content.capabilities.map((item) => (
              <article className="capability-row content-grid" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section model-section" id="model" aria-labelledby="model-title">
        <div className="section-inner">
          <h2 id="model-title">{content.modelTitle}</h2>
          <ol className="model-steps">
            {content.model.map((item) => (
              <li key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="page-section scaling-section" aria-labelledby="scaling-title">
        <div className="section-inner content-grid">
          <h2 id="scaling-title">{content.scalingTitle}</h2>
          <p>{content.commercialQualifier}</p>
        </div>
      </section>

      <section className="page-section trust-section" aria-labelledby="trust-title">
        <div className="section-inner content-grid">
          <h2 id="trust-title">{content.trustTitle}</h2>
          <p>{content.trust}</p>
        </div>
      </section>

      <section className="page-section contact-section" aria-labelledby="contact-title">
        <div className="section-inner content-grid">
          <h2 id="contact-title">{content.contactTitle}</h2>
          <div className="contact-copy">
            <p>{content.contactPrompt}</p>
            <p>
              <a className="text-link" href="mailto:contact@aiullma.com">
                contact@aiullma.com
              </a>
            </p>
            <p>{publicAddress}</p>
            <p className="safety-note">{content.contactSafety}</p>
            <a className="button-link" href={routePairs.contact[locale]}>{content.primaryCta}</a>
          </div>
        </div>
      </section>
    </main>
  );
}
