# Alltius.dev institutional service site

Date: 2026-08-17
Status: proposed for user review — AWS SES addition

## Objective

Create a public, trilingual institutional site for `alltius.dev`, using the
validated AIULLMA service-first site structure as a reference while making
Alltius the visible service brand.

Alltius should communicate that it builds, operates and optimizes technology
services that help companies identify opportunities, make better decisions,
serve more demand and grow revenue. The site must present the service model as
the product: initial implementation, ongoing service and the infrastructure
needed to operate it. Email delivery and lifecycle operations are an explicit
service front, capable of supporting both internal company use and selected
client tenants.

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
   Alltius Dados/BI, Alltius IA and Alltius Email & Messaging, each described
   as a focused service that can stand alone.
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

## AWS SES and email operations

The site must support a future Amazon SES production-access request and make
the actual operating model understandable to AWS reviewers. The site may
describe the capability as AWS SES-based only after the service is configured;
it must not imply that Alltius is an AWS partner, certified provider or
endorsed by AWS.

The public email-services page will explain four legitimate sending contexts:

1. **Internal operations** — Alltius/AIULLMA alerts, account messages,
   service notifications and other operational email.
2. **Transactional email** — one-to-one messages triggered by a user action or
   an active business relationship, such as account events, status changes,
   receipts, support updates or workflow notifications.
3. **Permission-based marketing email** — segmented campaigns and lifecycle
   communication sent only to recipients who explicitly requested or otherwise
   lawfully subscribed to that communication, with a visible unsubscribe path.
4. **Managed client tenants** — approved businesses may send through the
   service after sender identity, use case, list origin, content, consent and
   compliance controls are reviewed.

The site and legal pages will state the following operating rules:

- no purchased, scraped, harvested or rented recipient lists;
- no unsolicited bulk email, deceptive sender identity, spoofing, phishing or
  prohibited content;
- marketing messages identify the sender and provide a clear, functional
  unsubscribe mechanism;
- bounce, complaint, delivery and unsubscribe events are processed and used
  to suppress future sends;
- client tenants are responsible for lawful recipient collection and the
  accuracy of their content, while Alltius retains service-level monitoring,
  abuse controls and the right to pause a tenant;
- credentials, recipient data, templates, event data and suppression state are
  isolated by tenant and are not shared between clients;
- every tenant has a documented owner, approved sending identities, usage
  limits, escalation contact and offboarding process.

### Multi-tenant architecture boundary

The public site describes two supported operating patterns without promising a
single implementation for every client:

1. **Tenant management within the Alltius SES account** — each client is
   represented by an isolated SES tenant with associated identities,
   configuration sets, templates, event routing and suppression controls.
2. **Client-owned AWS account or identity** — where the client controls its
   AWS account or verified domain, Alltius may operate as an authorized
   delegate through SES sending authorization with permissions limited to the
   approved sender identity and actions.

The service design must preserve tenant-level reputation and data boundaries.
At minimum, implementation planning must cover identity verification, per-
tenant configuration sets, delivery/bounce/complaint event handling,
tenant-level suppression, rate and volume controls, access revocation and
abuse review. A client must never be treated as permission to send arbitrary
mail through a shared, unreviewed relay.

The website should include a public “Email & Messaging Operations” page in all
three languages, linked from the capabilities section and footer. It should
describe the use cases, onboarding review, sender authentication, consent,
unsubscribe, suppression and tenant isolation in plain language. The Terms of
Use should include a short acceptable-use section, and the Privacy Notice
should explain the roles of Alltius/AIULLMA LLC and client tenants when email
recipient or event data is processed.

This public site supports the evidence AWS may review, but it does not itself
grant Amazon SES production access. Production access remains a separate AWS
account review in which the sending type, website, consent process and bounce/
complaint handling must be accurately described.

## Readiness audit against the SMTPedia guide

The independent [SMTPedia Amazon SES guide](https://smtpedia.com/amazon-ses-guide/)
was used as a secondary checklist. It reinforces the direction above and adds
operational gates that must be explicit before requesting production access.
AWS documentation remains authoritative for current limits, policies and
account decisions.

| Area | Current design status | Gate before SES request |
| --- | --- | --- |
| Website, privacy and contact | Covered | Publish the Alltius site and verify the contact route works. |
| Transactional, marketing and agency use cases | Covered | Prepare an accurate daily/monthly volume estimate and sending cadence. |
| Consent and list hygiene | Covered as policy | Record consent source and timestamp where applicable; use confirmed opt-in for new marketing lists; never import purchased, scraped or rented lists. |
| Unsubscribe | Covered as policy | Implement a visible one-click/list-unsubscribe path and tenant-specific preference handling. |
| Abuse and support | Missing as an operational gate | Create and monitor `abuse@alltius.dev`, `postmaster@alltius.dev` or an equivalent company-controlled mailbox before onboarding tenants. |
| Domain authentication | Planned | Verify every sending domain and configure aligned SPF, Easy DKIM and DMARC; use a custom MAIL FROM domain where appropriate. |
| Bounces and complaints | Covered as policy | Connect SES events to an operational handler, suppress affected recipients and document escalation/pause procedures. |
| Reputation and warm-up | Missing as an explicit gate | Start with controlled volume, monitor per tenant and configuration set, and pause or review sources that harm account reputation. |
| API versus SMTP | Not yet selected | Use SES API as the default for Alltius-managed services; permit SMTP only for reviewed existing tools that require it, with scoped credentials and TLS. |
| Multi-tenant controls | Covered in architecture | Verify each client identity, isolate data and reputation, define rate limits, and revoke access when a tenant is paused or offboarded. |
| Public signup | Intentionally not required | Alltius is a managed service, not an anonymous self-service relay; onboarding occurs through review and a client agreement. Explain this in the SES request. |

The implementation plan must also create a private operational document named
`docs/ses-production-access.md`. It will contain the AWS request narrative,
expected volumes, regions, message categories, list-origination process,
consent evidence, unsubscribe flow, bounce/complaint controls, abuse contact,
tenant model and sample messages. It must never contain access keys or SMTP
passwords.

The authentication and monitoring gates follow AWS guidance on [email
authentication](https://docs.aws.amazon.com/ses/latest/dg/email-authentication-methods.html),
[sending activity](https://docs.aws.amazon.com/ses/latest/dg/monitor-sending-activity.html)
and [lists and subscriptions](https://docs.aws.amazon.com/ses/latest/dg/lists-and-subscriptions.html).

## Legal and contact treatment

The reference site has no analytics, advertising pixels, non-essential
cookies or web form. The Alltius site keeps that low-collection posture. Email
delivery itself is a separate managed service: the public site does not
collect subscriber lists or send campaigns from a web form.

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
- no open relay, anonymous sending or permission to use purchased lists;
- no Meta app, Tech Provider workflow or WhatsApp integration in this site
  release;
- no changes to the existing AIULLMA site or its Cloudflare records.

## Acceptance criteria

The release is ready when:

1. The three language surfaces and all 18 routes, including the public email
   operations page, build successfully.
2. All visible commercial branding says Alltius, while the official AIULLMA
   relationship is present in the footer and legal pages.
3. The home copy presents specialist service fronts and the build/operate/
   optimize model rather than a generic SaaS catalog.
4. The site has no analytics, pixels, non-essential cookies or form backend.
5. Email-service copy documents opt-in, unsubscribe, suppression,
   bounce/complaint handling, tenant isolation and acceptable use without
   claiming AWS partnership or guaranteed SES approval.
6. Operational readiness includes monitored abuse/support contact, sender
   authentication, volume/warm-up assumptions, event handling and an
   `docs/ses-production-access.md` request narrative.
7. `robots.txt`, `sitemap.xml`, canonical metadata, language alternates and
   social metadata use `alltius.dev`.
8. The static build deploys to Cloudflare Pages at no hosting cost.
9. `https://alltius.dev` serves the published site over HTTPS, with any
   `www` behavior explicitly verified.
10. The GitHub repository contains the exact source used for the deployment.
