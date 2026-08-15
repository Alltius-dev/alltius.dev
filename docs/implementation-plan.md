# AIULLMA Institutional Site Implementation Plan

Public summary — operational identifiers and internal review artifacts intentionally omitted. The authoritative internal record is maintained outside this public repository.

## Goal

Build and verify the bilingual institutional website for AIULLMA LLC at `https://aiullma.com`, with public legal/contact pages and static, server-rendered content.

## Constraints

- Canonical origin: `https://aiullma.com`.
- Public contact addresses: `contact@aiullma.com` and `privacy@aiullma.com`.
- No authentication, database, CMS, analytics, advertising pixels, session replay, fingerprinting, marketing cookies or contact form.
- No unsupported third-party approvals, provider status, certifications or partnerships.
- No unlimited-use, guaranteed-savings, uptime or support-response claims.
- Keep secrets and sensitive business identifiers out of the repository.
- Use the approved B1 visual tokens, accessible semantic HTML and reduced-motion-safe CSS.

## Delivery sequence

1. Establish the server-rendered route, copy and metadata contract with tests written first.
2. Implement typed bilingual content, shared semantic components, all English/Portuguese routes, `robots.txt`, sitemap and Organization JSON-LD.
3. Apply the approved responsive “Operational Rails” visual system and verify accessibility, linting and build output.
4. Publish the reviewed source, configure the canonical domain and verify every public route over HTTPS.

## Route contract

| English | Portuguese |
| --- | --- |
| `/` | `/pt/` |
| `/contact` | `/pt/contato` |
| `/privacy` | `/pt/privacidade` |
| `/terms` | `/pt/termos` |
| `/data-deletion` | `/pt/exclusao-de-dados` |

## Verification

Rendered tests verify routes, localized copy, legal identity, language alternates, active corporate email links and the absence of prohibited claims. Release verification additionally checks crawler discovery, canonical metadata, responsive accessibility and public HTTPS availability.
