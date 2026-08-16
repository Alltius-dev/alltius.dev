# AIULLMA Institutional Site Gates

Public summary — operational identifiers and internal review artifacts intentionally omitted. The authoritative internal record is maintained outside this public repository.

**Updated:** 2026-08-16

This public register records the approved decisions and outstanding release checks for `aiullma.com`.

| Gate | Decision | Status |
| --- | --- | --- |
| Legal identity | Use `AIULLMA LLC` as the legal entity and `AIULLMA` as the wordmark. Its New Mexico registration was verified against the company formation record supplied by the owner. | Approved |
| Domain | Publish at `aiullma.com`, with `www.aiullma.com` resolving or redirecting to the canonical domain. | Active; the current production release is live on the canonical domain |
| Architecture | Trilingual one-page home plus Contact, Privacy, Terms and Data Deletion pages in English, Portuguese and Latin American Spanish. | Approved |
| Positioning | Managed technology and AI services that build, operate and optimize automation, systems, AI agents, BI and dedicated infrastructure as an ongoing service for companies ready to grow revenue. | Approved |
| Brand | AIULLMA is primary; Alltius is secondary and discreet. | Approved |
| Visual system | B1 “Midnight Cobalt” and “Operational Rails”. | Approved |
| Claims | No unsupported approval, provider, certification or partnership claims. | Approved |
| Privacy | No analytics, pixels, replay, fingerprinting, non-essential cookies or launch form. | Approved |
| Accessibility | WCAG 2.2 AA, keyboard, focus, localization, reduced motion and responsive checks. | Validated in the reviewed candidate |
| Code and review | Test-first implementation, clean build and reviewed branch. | Fresh local validation complete; controller review pending |
| Publication | Public source repository, compatible hosting, HTTPS and custom domain. | Active; this release candidate awaits controller-managed publication |
| Corporate email | `contact@aiullma.com` and `privacy@aiullma.com` are routed to a verified destination. | Approved |
| External verification | Public routes, sitemap, robots, canonical and language alternates return correctly in production. | Current production verified; release-candidate verification is controller-managed |

## Approved content

- Headline EN: **Managed technology and AI services for companies ready to grow revenue.**
- Headline PT: **Serviços gerenciados de tecnologia e IA para empresas prontas para faturar mais.**
- Headline ES: **Servicios gestionados de tecnología e IA para empresas preparadas para generar más ingresos.**
- CTA EN: **Discuss your growth objective.**
- CTA PT: **Fale sobre sua meta de crescimento.**
- CTA ES: **Hablemos de su objetivo de crecimiento.**
- Required qualifier: cloud, telecommunications, platform and other third-party charges may apply.

## Approved routes

| English | Portuguese | Spanish (Latin America) |
| --- | --- | --- |
| `/` | `/pt/` | `/es/` |
| `/contact` | `/pt/contato` | `/es/contacto` |
| `/privacy` | `/pt/privacidade` | `/es/privacidad` |
| `/terms` | `/pt/termos` | `/es/terminos` |
| `/data-deletion` | `/pt/exclusao-de-dados` | `/es/eliminacion-de-datos` |

## Release rule

The release is complete only when accessibility, code-review, publication and external-verification gates have current evidence and the public domain is available over HTTPS. The controller performs the external publication and verification for each release candidate.
