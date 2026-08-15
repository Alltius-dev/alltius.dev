import { routePairs, siteContent, type Locale } from "../lib/site-content";

export function HomePage({ locale }: { locale: Locale }) {
  const content = siteContent[locale].home;

  return (
    <main id="main-content">
      <section className="hero" aria-labelledby="hero-title">
        <p>{content.eyebrow}</p>
        <h1 id="hero-title">{content.headline}</h1>
        <p>{content.support}</p>
        <p>
          <a href={routePairs.contact[locale]}>{content.primaryCta}</a>{" "}
          <a href="#model">{content.secondaryCta}</a>
        </p>
        <ol aria-label={content.modelTitle} className="operational-rails">
          {content.model.map((item) => (
            <li key={item.title}>{item.title}</li>
          ))}
        </ol>
      </section>

      <section id="company" aria-labelledby="company-title">
        <h2 id="company-title">{content.companyTitle}</h2>
        <p>{content.company}</p>
      </section>

      <section id="capabilities" aria-labelledby="capabilities-title">
        <h2 id="capabilities-title">{content.capabilitiesTitle}</h2>
        {content.capabilities.map((item) => (
          <article className="capability-row" key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </section>

      <section id="model" aria-labelledby="model-title">
        <h2 id="model-title">{content.modelTitle}</h2>
        <ol>
          {content.model.map((item) => (
            <li key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="scaling-title">
        <h2 id="scaling-title">{content.scalingTitle}</h2>
        <p>{content.commercialQualifier}</p>
      </section>

      <section aria-labelledby="trust-title">
        <h2 id="trust-title">{content.trustTitle}</h2>
        <p>{content.trust}</p>
      </section>

      <section aria-labelledby="contact-title">
        <h2 id="contact-title">{content.contactTitle}</h2>
        <p>{content.contactPrompt}</p>
        <p>{content.contactSafety}</p>
        <a href={routePairs.contact[locale]}>{content.primaryCta}</a>
      </section>
    </main>
  );
}
