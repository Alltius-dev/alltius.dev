# Service-First Trilingual Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reposition AIULLMA around managed technology-and-AI services for revenue growth and add a complete neutral Latin American Spanish version without changing the approved B1 visual identity or legal scope.

**Architecture:** Keep the existing server-rendered vinext route structure and typed content registry. Expand the locale contract from two to three locales, derive all equivalent routes from one `routePairs` record, render a server-side EN/PT/ES selector, and publish canonical/alternate metadata and sitemap entries from the same route data. Keep all copy in `lib/site-content.ts`, routes as thin wrappers, and shared rendering in the existing components.

**Tech Stack:** TypeScript, React 19, vinext, CSS, Next-compatible metadata APIs, Node.js built-in test runner, Cloudflare Workers-compatible deployment.

## Global Constraints

- Required source of truth: `docs/superpowers/specs/2026-08-16-service-first-growth-copy-design.md`.
- Copy every approved EN, PT-BR and ES-419 string verbatim from the named sections of the specification; do not machine-translate or paraphrase during implementation.
- English remains canonical at `/`; Portuguese remains under `/pt/`; Spanish uses neutral Latin American wording under `/es/` and `lang="es-419"`.
- Publish exactly these Spanish routes: `/es/`, `/es/contacto`, `/es/privacidad`, `/es/terminos`, `/es/eliminacion-de-datos`.
- Preserve the B1 “Midnight Cobalt” palette, wordmark, layout, responsive behavior, accessibility behavior and route structure for existing pages.
- Preserve direct email contact and the existing corporate address. Add no form, analytics, pixels, cookies, authentication, CRM, CMS or database.
- Preserve the substantive legal scope of Privacy, Terms and Data Deletion; Spanish is a faithful localization of the approved public text.
- Use qualified outcome language. Never guarantee revenue, ROI, savings, conversion, margins or delivery time.
- Do not add Meta, partner, certification, provider or endorsement claims.
- Run each behavior change through RED → GREEN before committing.

---

### Task 1: Service-first content contract and EN/PT copy

**Files:**
- Modify: `tests/rendered-html.test.mjs`
- Modify: `lib/site-content.ts`
- Modify: `components/home-page.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: the approved hero, company, capability, service-model, scale-economics and contact copy in the specification.
- Produces: `Locale = "en" | "pt" | "es"`; `routePairs` entries with `en`, `pt`, and `es`; `SiteContent.home.support: string[]`; complete `siteContent.en`, `siteContent.pt`, and `siteContent.es` objects.

- [ ] **Step 1: Write failing tests for the approved positioning**

Replace the two old headline tests and add service-model/capability assertions:

```js
const positioningCases = [
  {
    path: "/",
    headline: /Managed technology and AI services for companies ready to grow revenue\./,
    support: /identify opportunities, make better decisions, serve more demand and grow\./,
    model: ["Growth-focused build", "Continuous operation", "Optimization with data and AI"],
    capabilities: ["Revenue-focused automation", "BI for growth decisions", "AI agents embedded in operations"],
  },
  {
    path: "/pt/",
    headline: /Serviços gerenciados de tecnologia e IA para empresas prontas para faturar mais\./,
    support: /identificar oportunidades, tomar decisões melhores, atender mais demanda e crescer\./,
    model: ["Construção orientada ao crescimento", "Operação contínua", "Otimização com dados e IA"],
    capabilities: ["Automação orientada à receita", "BI para decisões de crescimento", "Agentes de IA integrados à operação"],
  },
];

test("home pages lead with the approved service-first growth positioning", async () => {
  for (const item of positioningCases) {
    const html = await htmlFor(item.path);
    assert.match(html, item.headline);
    assert.match(html, item.support);
    for (const label of [...item.model, ...item.capabilities]) {
      assert.match(html, new RegExp(label));
    }
  }
});

test("growth claims remain qualified and preserve the third-party cost notice", async () => {
  assert.match(await htmlFor("/"), /help companies identify opportunities/);
  assert.match(await htmlFor("/pt/"), /ajudar empresas a identificar oportunidades/);
  assert.match(await htmlFor("/"), /Cloud, telecommunications, platform and other third-party charges may apply\./);
  assert.match(await htmlFor("/pt/"), /Tarifas de nuvem, telecomunicações, plataformas e outros terceiros podem ser aplicadas\./);
});
```

Update `prohibitedPatterns` with `/guaranteed revenue/i`, `/guaranteed ROI/i`, `/receita garantida/i`, `/ROI garantido/i`, `/ingresos garantizados/i`.

Update the EN/PT cases in `home metadata uses concise SEO copy separate from the hero` to use the approved SEO titles and descriptions. Keep the 150–165 character assertion; the approved EN/PT descriptions are 157 and 158 characters. Replace the old `Implementation`/`Ongoing service`/`Dedicated infrastructure` assertions in `home exposes semantic navigation and the operational model` with the new build/operate/optimize labels. Replace the old primary CTA expectations with `Discuss your growth objective` and `Fale sobre sua meta de crescimento`. Replace the old `hero support qualifies pricing language in both languages` test with `growth claims remain qualified and preserve the third-party cost notice` above.

- [ ] **Step 2: Run the tests and verify RED**

Run: `npm test`

Expected: FAIL because the current pages still render “Technology services for scalable business operations”, “Serviços de tecnologia para operações empresariais escaláveis”, and the implementation/ongoing-service/infrastructure rail labels.

- [ ] **Step 3: Expand the typed content model and install the approved copy**

Change the contracts at the top of `lib/site-content.ts`:

```ts
export type Locale = "en" | "pt" | "es";

export const routePairs = {
  home: { en: "/", pt: "/pt/", es: "/es/" },
  contact: { en: "/contact", pt: "/pt/contato", es: "/es/contacto" },
  privacy: { en: "/privacy", pt: "/pt/privacidade", es: "/es/privacidad" },
  terms: { en: "/terms", pt: "/pt/termos", es: "/es/terminos" },
  dataDeletion: {
    en: "/data-deletion",
    pt: "/pt/exclusao-de-dados",
    es: "/es/eliminacion-de-datos",
  },
} as const;
```

Change `SiteContent.home.support` from `string` to `string[]`. For each locale, store the two approved support paragraphs separately. Replace the EN/PT home, company, capability, model, scale and contact strings with the exact approved values from the specification. Add the complete `siteContent.es` object, including navigation, footer, home and all four legal entries from “Spanish navigation and footer” and “Spanish legal and contact content”.

The Spanish home object begins with these exact values:

```ts
home: {
  seoTitle: "AIULLMA | Servicios gestionados de tecnología e IA para crecer",
  seoDescription:
    "AIULLMA construye, opera y optimiza automatizaciones, agentes de IA, BI e infraestructura dedicada para ayudar a aumentar ingresos y capacidad operativa.",
  eyebrow: "AIULLMA LLC · NEW MEXICO, ESTADOS UNIDOS",
  headline:
    "Servicios gestionados de tecnología e IA para empresas preparadas para generar más ingresos.",
  support: [
    "AIULLMA construye, opera y optimiza automatizaciones, sistemas, agentes de IA, inteligencia de negocios e infraestructura dedicada para ayudar a las empresas a identificar oportunidades, tomar mejores decisiones, atender una mayor demanda y crecer.",
    "Entregamos esta capacidad como un servicio continuo, para que cada avance en escala fortalezca los ingresos y los márgenes, en lugar de quedar absorbido por cobros por usuario, contacto, mensaje o automatización.",
  ],
  primaryCta: "Hablemos de su objetivo de crecimiento",
  secondaryCta: "Conozca nuestro modelo de servicio",
  companyTitle: "Una empresa de servicios orientada al crecimiento",
  capabilitiesTitle: "Capacidades que convierten la operación en crecimiento",
  modelTitle: "Construimos, operamos y optimizamos como un servicio continuo.",
  scalingTitle: "Haga que la escala fortalezca los ingresos y los márgenes.",
  trustTitle: "Preparada para una evaluación clara",
  contactTitle: "Comience por el objetivo de crecimiento",
}
```

Render support paragraphs in `components/home-page.tsx`:

```tsx
<div className="hero-support">
  {content.support.map((paragraph) => (
    <p key={paragraph}>{paragraph}</p>
  ))}
</div>
```

Adjust the existing CSS selector without changing typography or spacing tokens:

```css
.hero-support {
  display: grid;
  gap: 14px;
}

.hero-support p {
  margin: 0;
}
```

- [ ] **Step 4: Run tests and verify GREEN**

Run: `npm test`

Expected: PASS for all existing routes and the new service-first assertions. Spanish routes are not in `expectedRoutes` yet.

- [ ] **Step 5: Commit the content contract**

```bash
git add tests/rendered-html.test.mjs lib/site-content.ts components/home-page.tsx app/globals.css
git commit -m "feat: reposition AIULLMA around managed growth services"
```

---

### Task 2: Complete Spanish route surface and document language

**Files:**
- Create: `app/es/page.tsx`
- Create: `app/es/contacto/page.tsx`
- Create: `app/es/privacidad/page.tsx`
- Create: `app/es/terminos/page.tsx`
- Create: `app/es/eliminacion-de-datos/page.tsx`
- Modify: `components/site-shell.tsx`
- Modify: `app/sitemap.ts`
- Modify: `proxy.ts`
- Modify: `app/layout.tsx`
- Modify: `tests/rendered-html.test.mjs`

**Interfaces:**
- Consumes: `siteContent.es`, Spanish entries in `routePairs`, `HomePage`, `LegalPage`, `SiteShell`, and `metadataFor`.
- Produces: five public Spanish pages and request language propagation as `es-419`.

- [ ] **Step 1: Write failing route, language, CTA and legal tests**

Add these values to `expectedRoutes`:

```js
"/es/",
"/es/contacto",
"/es/privacidad",
"/es/terminos",
"/es/eliminacion-de-datos",
```

Add tests:

```js
test("Spanish home renders the approved Latin American positioning", async () => {
  const html = await htmlFor("/es/");
  assert.match(html, /Servicios gestionados de tecnología e IA para empresas preparadas para generar más ingresos\./);
  assert.match(html, /identificar oportunidades, tomar mejores decisiones, atender una mayor demanda y crecer\./);
  assert.match(html, /Hablemos de su objetivo de crecimiento/);
});

test("Spanish pages localize accessibility labels", async () => {
  const html = await htmlFor("/es/");
  assert.match(html, /<a[^>]+href="#main-content"[^>]*>Ir al contenido<\/a>/i);
  assert.match(html, /aria-label="Página de inicio de AIULLMA"/i);
  assert.match(html, /aria-label="Navegación principal"/i);
  assert.match(html, /aria-label="Navegación móvil"/i);
  assert.match(html, /aria-label="Políticas"/i);
});
```

Change the expected language calculation:

```js
const expectedLanguage = path.startsWith("/pt")
  ? "pt-BR"
  : path.startsWith("/es")
    ? "es-419"
    : "en";
```

Extend contact/data-deletion email cases with `/es/contacto` and `/es/eliminacion-de-datos`.

Extend the home metadata cases with Spanish title `AIULLMA | Servicios gestionados de tecnología e IA para crecer`, the approved 153-character Spanish description and the first Spanish hero-support paragraph. Extend the primary CTA test with `/es/` → `/es/contacto` → `Hablemos de su objetivo de crecimiento`. Extend the visible home contact-section loop to include `/es/`.

- [ ] **Step 2: Run tests and verify RED**

Run: `npm test`

Expected: FAIL with HTTP 404 for the five Spanish paths.

- [ ] **Step 3: Create all five Spanish routes**

Create `app/es/page.tsx`:

```tsx
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
    <SiteShell locale="es" alternatePath={routePairs.home.en}>
      <HomePage locale="es" />
    </SiteShell>
  );
}
```

Create the four legal route files with these exact page contracts:

```tsx
// app/es/contacto/page.tsx
const content = siteContent.es.legal.contact;
export const metadata = metadataFor("es", routePairs.contact.es, content.title, content.description);
export default function SpanishContactPage() {
  return <SiteShell locale="es" alternatePath={routePairs.contact.en}><LegalPage locale="es" pageKey="contact" /></SiteShell>;
}

// app/es/privacidad/page.tsx
const content = siteContent.es.legal.privacy;
export const metadata = metadataFor("es", routePairs.privacy.es, content.title, content.description);
export default function SpanishPrivacyPage() {
  return <SiteShell locale="es" alternatePath={routePairs.privacy.en}><LegalPage locale="es" pageKey="privacy" /></SiteShell>;
}

// app/es/terminos/page.tsx
const content = siteContent.es.legal.terms;
export const metadata = metadataFor("es", routePairs.terms.es, content.title, content.description);
export default function SpanishTermsPage() {
  return <SiteShell locale="es" alternatePath={routePairs.terms.en}><LegalPage locale="es" pageKey="terms" /></SiteShell>;
}

// app/es/eliminacion-de-datos/page.tsx
const content = siteContent.es.legal.dataDeletion;
export const metadata = metadataFor("es", routePairs.dataDeletion.es, content.title, content.description);
export default function SpanishDataDeletionPage() {
  return <SiteShell locale="es" alternatePath={routePairs.dataDeletion.en}><LegalPage locale="es" pageKey="dataDeletion" /></SiteShell>;
}
```

Each legal file must include imports for `LegalPage`, `SiteShell`, `metadataFor`, `routePairs`, and `siteContent` at the correct relative depth.

Update `proxy.ts`:

```ts
const language = request.nextUrl.pathname.startsWith("/pt")
  ? "pt-BR"
  : request.nextUrl.pathname.startsWith("/es")
    ? "es-419"
    : "en";
```

Update `app/layout.tsx`:

```ts
const requestedLanguage = requestHeaders.get("x-aiullma-language");
const language = requestedLanguage === "pt-BR" || requestedLanguage === "es-419"
  ? requestedLanguage
  : "en";
```

Replace the two-way accessibility ternary in `components/site-shell.tsx` with a locale record and include these exact Spanish values:

```ts
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
```

Publish the new route surface in `app/sitemap.ts` as soon as the routes exist:

```ts
return Object.values(routePairs).flatMap((pair) =>
  Object.values(pair).map((path) => ({ url: `https://aiullma.com${path}` })),
);
```

- [ ] **Step 4: Run tests and verify GREEN**

Run: `npm test`

Expected: all 15 localized routes return HTTP 200; Spanish pages render `lang="es-419"` and approved corporate email addresses.

- [ ] **Step 5: Commit the Spanish route surface**

```bash
git add app/es components/site-shell.tsx app/sitemap.ts proxy.ts app/layout.tsx tests/rendered-html.test.mjs
git commit -m "feat: add Latin American Spanish site"
```

---

### Task 3: Trilingual navigation and alternate metadata

**Files:**
- Modify: `components/site-shell.tsx`
- Modify: `lib/site-content.ts`
- Modify: `lib/metadata.ts`
- Modify: `app/globals.css`
- Modify: all 15 localized `app/**/page.tsx` route wrappers
- Modify: `tests/rendered-html.test.mjs`

**Interfaces:**
- Consumes: `routePairs`, `Locale`, and all localized route wrappers.
- Produces: `LocalizedPaths = Readonly<Record<Locale, string>>`; `SiteShell({ locale, localizedPaths, children })`; EN/PT/ES selector; canonical and alternate links for `en`, `pt-BR`, `es-419`, and `x-default`.

- [ ] **Step 1: Write failing navigation and metadata tests**

Replace the pair-only switcher test with:

```js
test("language selectors link every page to its EN PT and ES equivalents", async () => {
  const routeGroups = [
    [{ path: "/", label: "English" }, { path: "/pt/", label: "Português" }, { path: "/es/", label: "Español" }],
    [{ path: "/contact", label: "English" }, { path: "/pt/contato", label: "Português" }, { path: "/es/contacto", label: "Español" }],
    [{ path: "/privacy", label: "English" }, { path: "/pt/privacidade", label: "Português" }, { path: "/es/privacidad", label: "Español" }],
    [{ path: "/terms", label: "English" }, { path: "/pt/termos", label: "Português" }, { path: "/es/terminos", label: "Español" }],
    [{ path: "/data-deletion", label: "English" }, { path: "/pt/exclusao-de-dados", label: "Português" }, { path: "/es/eliminacion-de-datos", label: "Español" }],
  ];

  for (const group of routeGroups) {
    for (const current of group) {
      const html = await htmlFor(current.path);
      const switchers = [...html.matchAll(/<div[^>]+class="language-switcher"[^>]*>([\\s\\S]*?)<\\/div>/gi)];
      assert.equal(switchers.length, 2, `${current.path} must render desktop and mobile selectors`);
      for (const [, switcher] of switchers) {
        assert.match(switcher, new RegExp(`<span[^>]+aria-current=["']page["'][^>]*>${current.label}<\\/span>`));
        for (const target of group.filter((item) => item.path !== current.path)) {
          assert.match(switcher, new RegExp(`href=["']${target.path}["']`));
        }
      }
    }
  }
});
```

Expand canonical/alternate assertions for each equivalent contact route:

```js
for (const [path, canonical] of [
  ["/contact", "https://aiullma.com/contact"],
  ["/pt/contato", "https://aiullma.com/pt/contato"],
  ["/es/contacto", "https://aiullma.com/es/contacto"],
]) {
  const html = await htmlFor(path);
  assert.match(html, new RegExp(`rel="canonical" href="${canonical}"`, "i"));
  assert.match(html, /hrefLang="en" href="https:\/\/aiullma\.com\/contact"/i);
  assert.match(html, /hrefLang="pt-BR" href="https:\/\/aiullma\.com\/pt\/contato"/i);
  assert.match(html, /hrefLang="es-419" href="https:\/\/aiullma\.com\/es\/contacto"/i);
  assert.match(html, /hrefLang="x-default" href="https:\/\/aiullma\.com\/contact"/i);
}
```

Keep the sitemap loop over `expectedRoutes`; it will now require all 15 entries.

- [ ] **Step 2: Run tests and verify RED**

Run: `npm test`

Expected: FAIL because each page still exposes only one alternate language and metadata lacks ES-419/x-default.

- [ ] **Step 3: Implement route-derived language switching**

Change the `SiteShell` contract:

```ts
export type LocalizedPaths = Readonly<Record<Locale, string>>;

type SiteShellProps = {
  locale: Locale;
  localizedPaths: LocalizedPaths;
  children: React.ReactNode;
};
```

Define options once:

```ts
const languageOptions = [
  { locale: "en", label: "English", hrefLang: "en" },
  { locale: "pt", label: "Português", hrefLang: "pt-BR" },
  { locale: "es", label: "Español", hrefLang: "es-419" },
] as const;
```

Render the selector in desktop and mobile navigation:

```tsx
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
```

Add `nav.languages` to `SiteContent`: English `Languages`, Portuguese `Idiomas`, Spanish `Idiomas`. Replace every route wrapper’s `alternatePath` prop with the page’s complete `localizedPaths`, for example:

```tsx
<SiteShell locale="es" localizedPaths={routePairs.privacy}>
  <LegalPage locale="es" pageKey="privacy" />
</SiteShell>
```

Replace `.language-link` styling with `.language-switcher` styles that reuse existing border, link, focus and 44px target tokens. Keep the group on one line at desktop and allow wrapping inside the mobile menu.

- [ ] **Step 4: Implement three-locale alternate metadata**

Replace pair lookup in `lib/metadata.ts` with route lookup and complete languages:

```ts
const pair = Object.values(routePairs).find((route) => route[locale] === path);

languages: pair
  ? {
      en: pair.en,
      "pt-BR": pair.pt,
      "es-419": pair.es,
      "x-default": pair.en,
    }
  : undefined,
```

- [ ] **Step 5: Run tests and verify GREEN**

Run: `npm test`

Expected: all route, language, accessibility, metadata, mail-link and sitemap tests pass for 15 localized pages.

- [ ] **Step 6: Run lint before committing**

Run: `npm run lint`

Expected: exit 0 with no lint errors.

- [ ] **Step 7: Commit localization infrastructure**

```bash
git add app components/site-shell.tsx lib/site-content.ts lib/metadata.ts app/globals.css tests/rendered-html.test.mjs
git commit -m "feat: add trilingual navigation and metadata"
```

---

### Task 4: Social preview, public documentation and release verification

**Files:**
- Modify: `public/og.png`
- Modify: `app/layout.tsx`
- Modify: `README.md`
- Modify: `docs/gates.md`
- Modify: `tests/rendered-html.test.mjs`

**Interfaces:**
- Consumes: approved English headline, B1 palette, final 15-route worker build, existing Sites project configuration.
- Produces: one updated 1200×630 social card; current Open Graph/X metadata; trilingual public documentation; verified commit ready for GitHub and Sites.

- [ ] **Step 1: Write failing social-metadata tests**

Add assertions:

```js
test("social metadata reflects the service-first growth positioning", async () => {
  const html = await htmlFor("/");
  assert.match(html, /property="og:title" content="AIULLMA LLC"/i);
  assert.match(html, /property="og:description" content="Managed technology and AI services for companies ready to grow revenue\./i);
  assert.match(html, /property="og:image:alt" content="AIULLMA — Managed technology and AI services for companies ready to grow revenue\./i);
});
```

- [ ] **Step 2: Run tests and verify RED**

Run: `npm test`

Expected: FAIL because root metadata still describes scalable business operations and the old social-card alt text.

- [ ] **Step 3: Generate and install exactly one updated social card**

Use one image-generation request with this complete prompt:

```text
Create a 1200×630 landscape social preview card for AIULLMA LLC. Match a premium dark corporate technology identity: midnight navy #061222 background, white typography, restrained cobalt #2F66FF and periwinkle #7FA3FF operational-rail accents, thin #29415F borders, no photos, no robots, no particles, no third-party logos, no badges. Use the exact text only: “AIULLMA” and “Managed technology and AI services for companies ready to grow revenue.” plus “AIULLMA LLC · New Mexico, United States”. Make all text perfectly legible and use the three connected operational rails as the distinctive motif. Do not invent any other words.
```

Inspect the result for exact text and visual consistency. Save the accepted image as `public/og.png` at exactly 1200×630. If the single result is unusable, omit the image metadata rather than shipping stale or invented text.

- [ ] **Step 4: Update root metadata**

Set description and alt text in `app/layout.tsx`:

```ts
description: "Managed technology and AI services for companies ready to grow revenue.",
```

```ts
alt: "AIULLMA — Managed technology and AI services for companies ready to grow revenue.",
```

- [ ] **Step 5: Update public documentation**

Update `README.md` to say “trilingual” and add the Spanish route column. Update `docs/gates.md` with the service-first positioning, EN/PT/ES headlines, complete route table, active publication status and current validation status. Human-facing prose requires review but no source-text test.

- [ ] **Step 6: Run full fresh verification**

Run:

```bash
npm test
npm run lint
npm run build
git diff --check
git status -sb
```

Expected: tests report zero failures; lint and build exit 0; diff check prints nothing; only intended files are modified.

- [ ] **Step 7: Commit the release candidate**

```bash
git add public/og.png app/layout.tsx README.md docs/gates.md tests/rendered-html.test.mjs
git commit -m "feat: complete service-first trilingual release"
```

- [ ] **Step 8: Review, publish and verify externally**

Run a two-stage review against the specification: first verify requirement coverage, then inspect code quality, accessibility and localization. Fix findings through failing tests and re-run the full verification suite.

Push `agent/service-first-growth-copy` to `origin`, open a draft pull request to `main`, and record the PR URL. Push the exact verified commit to the existing Sites source repository using a fresh short-lived write credential, package the exact build, save a new version, and deploy it publicly under the already-approved access policy. Poll deployment status until it succeeds.

Verify HTTP 200 for all 15 localized routes plus `robots.txt` and `sitemap.xml`. Verify `lang="es-419"`, the approved Spanish headline, canonical and all four `hreflang` values on `/es/`. Verify `https://aiullma.com`, `https://www.aiullma.com`, Email Routing status and the two corporate rules remain active. Update the internal gate, status, history and asset records in the parent META workspace in the same turn.
