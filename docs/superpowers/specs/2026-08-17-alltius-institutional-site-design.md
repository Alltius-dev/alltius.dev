# Alltius.dev institutional service site

Date: 2026-08-17
Status: proposed for user review

## Objective

Create a public, trilingual institutional site for `alltius.dev`, using the
validated AIULLMA service-first site structure as a reference while making
Alltius the visible service brand.

Alltius should communicate that it builds, operates and optimizes technology
services that help companies identify opportunities, make better decisions,
serve more demand and grow revenue. The site must present the service model as
the product: initial implementation, ongoing service and the infrastructure
needed to operate it.

The site must not present Alltius as a generic company that sells every tool
at once. Automation, customer service systems, BI, data, AI agents and managed
infrastructure are distinct specialist capabilities that can be contracted as
focused services.

## Brand architecture

Alltius is the public and commercial brand. AIULLMA LLC is the legal and
official company behind the service.

The public experience will follow this hierarchy:

1. Alltius appears in the wordmark, page titles, hero, navigation and primary
   calls to action.
2. AIULLMA LLC appears discreetly in the footer and clearly in the contact,
   privacy, terms and data-deletion pages.
3. The canonical legal relationship is stated as: “Alltius is a service brand
   operated by AIULLMA LLC, registered in New Mexico, United States.”
4. The legal entity is never omitted where corporate identity, privacy,
   contracts or user rights require it.

This creates a strong Alltius market presence without representing Alltius and
AIULLMA LLC as unrelated companies.

## Audience and message hierarchy

The primary audience is a company that needs more operational and commercial
capacity but does not want its technology economics to grow automatically with
every user, contact, message, workflow or execution.

The message order is:

1. Growth, revenue and capacity are the business outcomes.
2. Alltius provides those outcomes through managed technology services.
3. The service combines build, continuous operation and optimization.
4. Automation, BI, AI agents, systems and infrastructure are specialist
   service fronts, not a bundled product catalog.
5. The commercial model is initial implementation plus ongoing service plus
   infrastructure, with third-party charges disclosed where applicable.
6. The copy explains the economic advantage without promising a specific ROI,
   revenue increase, savings figure or margin result.

## Visual direction

Reuse the proven dark “Midnight Cobalt” family from AIULLMA while making the
brand more operational and product-like:

- dark navy background and layered blue surfaces;
- white Alltius wordmark;
- electric blue action color and restrained light-blue secondary text;
- the existing “operational rails” visual motif for build, operate and
  optimize;
- typography-led composition with no invented client logos, stock photos or
  product screenshots;
- responsive layout with the same accessibility baseline: keyboard focus,
  skip link, semantic headings, readable contrast and mobile navigation.

The first release uses a typographic wordmark in the interface. A separate
logo or brand system can replace it later without changing the information
architecture.

## Information architecture

The site keeps the same 15 public routes as the validated reference:

| Language | Home | Contact | Privacy | Terms | Data deletion |
| --- | --- | --- | --- | --- | --- |
| English | `/` | `/contact` | `/privacy` | `/terms` | `/data-deletion` |
| Português | `/pt/` | `/pt/contato` | `/pt/privacidade` | `/pt/termos` | `/pt/exclusao-de-dados` |
| Español 419 | `/es/` | `/es/contacto` | `/es/privacidad` | `/es/terminos` | `/es/eliminacion-de-datos` |

Each language has equivalent navigation, `hreflang` alternates and metadata.
There is no automatic language or IP redirect.

## Home page composition

The home page retains the validated sequence but changes every visible brand
reference to Alltius and changes legal/company copy to the endorsed-brand
model:

1. **Hero** — a growth and capacity promise, followed by the ongoing service
   model and the scale-economics distinction.
2. **Company** — Alltius as a specialist managed-services brand, with one
   sentence connecting it to AIULLMA LLC.
3. **Specialist service fronts** — Alltius Atendimento, Alltius Automação,
   Alltius Dados/BI and Alltius IA, each described as a focused service that
   can stand alone.
4. **Operating model** — build, operate and optimize, explicitly tied to
   initial implementation, monthly service and infrastructure.
5. **Scale economics** — explain that the model is designed to avoid making
   every unit of growth behave like a new SaaS charge; disclose cloud,
   telecommunications, platform and other third-party charges.
6. **Trust and diligence** — identify AIULLMA LLC, New Mexico, United States,
   and provide the public policies and direct contact.
7. **Contact** — invite the visitor to start with the growth objective and
   choose the relevant specialist service.

Suggested Portuguese hero direction:

> Construímos, operamos e otimizamos a capacidade digital que sua empresa
> precisa para crescer.

Supporting message:

> Automação, BI, atendimento, agentes de IA e infraestrutura gerenciada como
> serviço contínuo — para identificar oportunidades, tomar decisões melhores,
> atender mais demanda e transformar escala em crescimento.

The English and Latin American Spanish versions will be written as native
localizations, not literal translations. The core promise, limitations and
commercial qualification remain equivalent across all three languages.

## Legal and contact treatment

The reference site has no analytics, advertising pixels, non-essential
cookies or web form. The Alltius site keeps that low-collection posture.

The contact destination must use a verified company-controlled address. Before
implementation, verify whether an Alltius alias exists in Cloudflare Email
Routing. If it does not, use the existing AIULLMA corporate address as the
initial contact bridge and state the Alltius/AIULLMA relationship clearly.

The legal pages will state that they cover the Alltius public website and that
AIULLMA LLC is the responsible legal entity. Paid engagements remain governed
by proposals, statements of work or separate agreements.

## Repository and hosting

- GitHub repository: `Alltius-dev/alltius.dev`.
- Public static deployment through the free Cloudflare Pages plan.
- Canonical domain: `https://alltius.dev`.
- `https://www.alltius.dev` may be configured as an equivalent custom domain or
  redirect, depending on the existing Cloudflare zone state.
- No paid runtime, database, authentication, analytics or server-side data
  store is required for the first release.
- DNS changes are limited to the Alltius zone and will preserve unrelated
  records.

## Non-goals

- no bundled “we do everything” product catalog;
- no pricing table or guaranteed ROI claim;
- no client logos, fabricated case studies or invented metrics;
- no lead database or form backend;
- no Meta app, Tech Provider workflow or WhatsApp integration in this site
  release;
- no changes to the existing AIULLMA site or its Cloudflare records.

## Acceptance criteria

The release is ready when:

1. The three language surfaces and all 15 routes build successfully.
2. All visible commercial branding says Alltius, while the official AIULLMA
   relationship is present in the footer and legal pages.
3. The home copy presents specialist service fronts and the build/operate/
   optimize model rather than a generic SaaS catalog.
4. The site has no analytics, pixels, non-essential cookies or form backend.
5. `robots.txt`, `sitemap.xml`, canonical metadata, language alternates and
   social metadata use `alltius.dev`.
6. The static build deploys to Cloudflare Pages at no hosting cost.
7. `https://alltius.dev` serves the published site over HTTPS, with any
   `www` behavior explicitly verified.
8. The GitHub repository contains the exact source used for the deployment.
