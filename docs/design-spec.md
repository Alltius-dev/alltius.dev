# AIULLMA Institutional Site — Design Specification

**Status:** Approved
**Primary domain:** `https://aiullma.com`

## Objective

Build a bilingual institutional website that makes AIULLMA LLC clear, credible and contactable, explains its service model accurately and provides stable public legal pages. The site must not imply third-party approval, certification or partnership.

## Architecture

English is the root language and Portuguese uses a `/pt/` prefix. The site does not redirect automatically by geolocation.

| English | Portuguese |
| --- | --- |
| `/` | `/pt/` |
| `/contact` | `/pt/contato` |
| `/privacy` | `/pt/privacidade` |
| `/terms` | `/pt/termos` |
| `/data-deletion` | `/pt/exclusao-de-dados` |

The home contains Header, Hero, Company, Capabilities, Operating Model, Scaling Principle, Trust, Contact CTA and Footer. Contact and legal pages share the same shell.

## Content and brand

- `AIULLMA` is the sole wordmark in the header and hero.
- The legal entity is always `AIULLMA LLC`.
- Alltius may be described only as a secondary operating brand in selected service-delivery contexts.
- English headline: `Technology services for scalable business operations.`
- Portuguese headline: `Serviços de tecnologia para operações empresariais escaláveis.`
- The service model combines initial implementation, ongoing service and dedicated infrastructure.
- Pricing language must state that cloud, telecommunications, platform and other third-party charges may apply.
- No web form is included at launch; visitors contact `contact@aiullma.com` directly.

## Legal boundaries

The Privacy Notice states that launch uses no advertising pixels, analytics, session replay, fingerprinting or non-essential cookies. It explains direct email contact, ordinary hosting/security logs, retention, security and requests to `privacy@aiullma.com`.

The Terms of Use apply only to the public site. Paid services are governed by separate proposals, statements of work or agreements.

The Data Deletion page asks users to email `privacy@aiullma.com` from an associated address and explains identity verification, legal/backup retention, and the distinction between AIULLMA-controlled and client-controlled data.

## Visual and accessibility direction

The approved direction is B1 “Midnight Cobalt” with “Operational Rails”. The palette is `#061222`, `#0B1A2E`, `#10233E`, `#2F66FF`, `#2B60F0`, `#7FA3FF`, `#FFFFFF`, `#F5F8FF`, `#AFC1DD` and `#29415F`.

The site uses a maximum 1280px content width, responsive 12/8/4-column behavior and editorial capability rows. It includes a skip link, semantic landmarks, visible focus, correct language attributes, 44px touch targets, reduced-motion support and no horizontal overflow at the approved breakpoints.

## Exclusions

No authentication, database, CMS, analytics, marketing pixel, chat widget, contact form, customer logos, testimonials, invented metrics, certification claims, partner badges, unlimited-usage promises or sensitive business identifiers are published.
