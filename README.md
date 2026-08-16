# AIULLMA institutional website

Public source for the trilingual institutional website of AIULLMA LLC. The site explains the company, its managed technology and AI services model, direct contact channels and public policies without implying third-party approval, certification or partnership.

The canonical production domain is [https://aiullma.com](https://aiullma.com). `www.aiullma.com` is expected to resolve or redirect to the canonical domain.

## Routes

| English | Portuguese | Spanish (Latin America) |
| --- | --- | --- |
| `/` | `/pt/` | `/es/` |
| `/contact` | `/pt/contato` | `/es/contacto` |
| `/privacy` | `/pt/privacidade` | `/es/privacidad` |
| `/terms` | `/pt/termos` | `/es/terminos` |
| `/data-deletion` | `/pt/exclusao-de-dados` | `/es/eliminacion-de-datos` |

## Architecture and privacy

The application uses server-rendered React routes, reusable components and typed trilingual content. It is stateless and has no contact form, authentication, database, CMS, analytics, advertising pixels, session replay, fingerprinting or non-essential cookies. Visitors contact AIULLMA through the corporate email addresses published on the site.

## Stack

- vinext and React 19
- TypeScript and CSS
- Node.js built-in test runner
- Cloudflare Workers-compatible ESM output

Node.js 22.13 or newer is required.

## Local commands

```bash
npm install
npm run dev
npm test
npm run lint
npm run build
npm run start
```

`npm test` creates a production build and exercises the rendered worker entrypoint. `npm run build` writes the deployable server entrypoint to `dist/server/index.js`.

## Deployment

The project is configured for OpenAI Sites deployment and produces a Cloudflare-compatible worker bundle. Deployment must preserve `https://aiullma.com` as the canonical origin and keep all English, Portuguese and Latin American Spanish routes publicly available over HTTPS.

## Documentation

The files in [`docs/`](docs/) are sanitized public summaries derived from the approved internal design, gate register and implementation plan. Operational identifiers and internal review artifacts remain in the authoritative records maintained outside this public repository.
