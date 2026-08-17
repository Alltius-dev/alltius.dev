# Alltius Institutional Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox ( - [ ] ) syntax for tracking.

**Goal:** Build, publish and verify a trilingual Alltius.dev institutional service site with a discreet AIULLMA LLC relationship and an honest, low-volume AWS SES production-readiness posture.

**Architecture:** Fork the validated server-rendered vinext site into a separate Alltius project, centralize all brand/copy/legal content in lib/site-content.ts, add a dedicated Email & Messaging Operations route per locale, and generate a static Pages directory from the Cloudflare-compatible build. Use Cloudflare Pages free hosting for the public site and keep SES operational evidence in a private local document outside the public GitHub repository.

**Tech Stack:** TypeScript, React 19, vinext, Vite, Cloudflare Vite plugin, Cloudflare Pages, Wrangler, CSS, Next-compatible metadata APIs, Node.js built-in test runner, GitHub CLI.

## Global Constraints

- Alltius is the public and commercial brand; AIULLMA LLC is the official legal entity behind it.
- The site is trilingual: English at /, Brazilian Portuguese at /pt/, and neutral Latin American Spanish at /es/.
- The site presents specialist service fronts: Atendimento, Automação, Dados/BI, IA, and Email & Messaging; it must not read as an undifferentiated everything bundle.
- Growth, revenue and operating capacity are outcomes; never guarantee revenue, ROI, savings, conversion, margins or delivery time.
- The commercial model is initial implementation plus ongoing service plus infrastructure; disclose third-party cloud, platform and telecommunications charges.
- Email copy must describe opt-in, unsubscribe, suppression, bounce/complaint handling, tenant isolation and acceptable use without claiming AWS partnership, certification or approval.
- Initial SES request posture is Transactional, with 10–50 recipients/day, occasional peaks up to 100/day and approximately 1,000–3,000 recipients/month.
- Marketing email is a future phase activated only after consent, preference-management and unsubscribe controls operate.
- Multi-tenant onboarding is gradual and reviewed; there is no open relay, anonymous sending, purchased list, rented list, scraped list or unsolicited bulk sending.
- Initial SES infrastructure uses the shared IP pool; no dedicated IP purchase or complex dedicated-IP warm-up is part of the first release.
- No analytics, advertising pixels, non-essential cookies, public signup, web form, database, authentication or lead backend.
- The static site uses https://alltius.dev as canonical origin and is deployed to Cloudflare Pages free hosting.
- AWS limits, quotas, policies and production approval are confirmed against current AWS documentation immediately before submission.
- Secrets, AWS keys, SMTP passwords and private SES request notes never enter GitHub.

---

## File map

| File | Responsibility |
| --- | --- |
| lib/site-content.ts | EN/PT/ES navigation, home copy, email operations copy, legal copy, route pairs and public contact addresses. |
| components/site-shell.tsx | Alltius wordmark, localized navigation, AIULLMA LLC relationship and footer links. |
| components/home-page.tsx | Growth-first home layout and specialist capability rows. |
| components/email-operations-page.tsx | Dedicated email service page with transactional, marketing, internal and tenant onboarding explanations. |
| components/legal-page.tsx | Shared localized legal rendering for contact, privacy, terms and deletion routes. |
| app/* | Thin localized route wrappers and metadata declarations. |
| app/layout.tsx, lib/metadata.ts, app/sitemap.ts, app/robots.ts | Alltius metadata, JSON-LD, canonical URLs, alternates, sitemap and robots. |
| app/globals.css | Dark Alltius visual system, responsive layout, accessible focus states and email-page styles. |
| public/favicon.svg, public/og.png | Alltius browser icon and social preview. |
| scripts/export-static.mjs | Convert the built vinext worker responses into static route HTML for Pages. |
| tests/rendered-html.test.mjs | Route, copy, metadata, legal, localization and safety regression tests. |
| docs/ses-production-access.md | Local ignored SES request narrative and operational checklist; never publish. |
| vite.config.ts, package.json | Cloudflare-compatible build without the stale AIULLMA Sites project binding. |

---

### Task 1: Establish Alltius Cloudflare email and project boundaries

**Files:**
- Modify: .git/info/exclude
- Create: docs/ses-production-access.md (local ignored file)
- Modify: Cloudflare zone alltius.dev only
- Modify: Git remote after the GitHub repository is confirmed/created

**Interfaces:**
- Consumes: the existing verified AIULLMA corporate email destination and the approved SES production posture.
- Produces: verified company-controlled addresses for public contact and SES abuse handling; a private request note; an isolated Alltius branch with no future push target pointing at AIULLMA.

- [ ] Step 1: Verify the current Alltius DNS and email-routing state

Run read-only checks before any DNS change:

~~~
dig +short NS alltius.dev
dig +short MX alltius.dev
gh repo view Alltius-dev/alltius.dev --json nameWithOwner,url,defaultBranchRef,isPrivate
~~~

Expected: the Cloudflare-managed zone is present; the repository either exists and is inspected or the command reports that it does not exist. Do not change AIULLMA DNS records.

- [ ] Step 2: Create only the required company email aliases

In the Cloudflare Email Routing configuration for alltius.dev, create or verify contact@alltius.dev, privacy@alltius.dev, abuse@alltius.dev and postmaster@alltius.dev, all forwarding to the already verified company-controlled destination. Preserve unrelated DNS, MX, SPF and DKIM records. If Cloudflare requires destination confirmation, complete it only for the existing verified destination.

Verify each alias with a controlled message and record only the routing status, never message contents or credentials.

- [ ] Step 3: Add the private SES request note to local Git exclusions

Add this exact line to .git/info/exclude:

~~~
/docs/ses-production-access.md
~~~

Create docs/ses-production-access.md locally with the approved production narrative, the 10–50/day and 1,000–3,000/month estimate, Transactional as the initial type, shared-IP posture, tenant onboarding policy, abuse mailbox, list-origination policy, consent evidence, unsubscribe controls, event-handling design and a short list of sample transactional messages. The note must not include AWS credentials, SMTP passwords or private customer data.

- [ ] Step 4: Confirm the project is isolated before code changes

Run:

~~~
git remote -v
git status -sb
git branch --show-current
~~~

Expected: the branch is agent/alltius-dev-site, the worktree contains only the approved spec/plan commits, and no remote push is attempted while origin still references aiullma.com.

- [ ] Step 5: Verify the local SES checklist boundary

Because .git/info/exclude is local Git metadata and is not versioned, do not
stage or commit it. Verify the private note is ignored:

~~~
git check-ignore -v docs/ses-production-access.md
git status --short
~~~

Expected: the first command reports .git/info/exclude as the matching rule and
the second command does not list docs/ses-production-access.md.

---

### Task 2: Replace the public content model with Alltius service-first copy

**Files:**
- Modify: lib/site-content.ts
- Modify: components/home-page.tsx
- Modify: app/globals.css
- Modify: tests/rendered-html.test.mjs
- Create: tests/static-artifact.test.mjs

**Interfaces:**
- Consumes: the approved Alltius brand architecture, specialist service fronts and initial SES posture from docs/superpowers/specs/2026-08-17-alltius-institutional-site-design.md.
- Produces: typed EN/PT/ES home content, five specialist capability rows, build/operate/optimize model, qualified scale economics, and content keys for the email operations page and localized legal pages.

- [ ] Step 1: Extend tests before changing content

Update the test fixture to expect Alltius rather than AIULLMA in all public commercial surfaces, add Email & Messaging Operations to the route/content assertions, add the five capability labels in all three locales, and add these safety checks:

~~~
const prohibitedPatterns = [
  /AWS partner/i,
  /AWS certified/i,
  /SES approved/i,
  /open relay/i,
  /purchased lists/i,
  /guaranteed revenue/i,
  /guaranteed ROI/i,
  /receita garantida/i,
  /ROI garantido/i,
  /ingresos garantizados/i,
];
~~~

Add a test that the home page includes the service economics phrase equivalent to “initial implementation + ongoing service + infrastructure” and the future-gated marketing statement in each locale.

- [ ] Step 2: Run tests and verify RED

Run: npm test

Expected: FAIL because the current site still renders AIULLMA as the public wordmark, contains only four capabilities, lacks the email route, and does not use the Alltius/SES copy.

- [ ] Step 3: Update the typed locale contract

In lib/site-content.ts:

~~~
export type Locale = "en" | "pt" | "es";
export type LegalPageKey = "contact" | "privacy" | "terms" | "dataDeletion";
export type EmailOperationsContent = {
  title: string;
  description: string;
  introduction: string;
  sections: Array<{ heading: string; paragraphs: string[] }>;
  cta: string;
};
~~~

Keep routePairs as the single source of truth and add:

~~~
email: { en: "/email", pt: "/pt/email", es: "/es/email" },
~~~

Add emailOperations: EmailOperationsContent to SiteContent. Change legal email fields to use the verified Alltius addresses created in Task 1. Keep the AIULLMA LLC address, New Mexico registration and official relationship in the company/trust/legal copy.

- [ ] Step 4: Write the Alltius home copy in all three locales

Use native EN/PT/ES-419 copy with this exact message hierarchy:

1. Hero: Alltius builds, operates and optimizes digital capacity for growth.
2. Company: Alltius is operated by AIULLMA LLC.
3. Capabilities: Alltius Atendimento, Alltius Automação, Alltius Dados/BI, Alltius IA, Alltius Email & Messaging.
4. Model: initial implementation, monthly service and infrastructure.
5. Economics: scale should not automatically become a new per-contact, per-message, per-user or per-execution charge.
6. Trust: legal entity, policies and direct contact.

Use qualified language such as “helps”, “designed to”, “can” and “may”; do not copy a specific ROI guarantee into any locale.

- [ ] Step 5: Render service content and run GREEN tests

Render content.support as a list of paragraphs and keep the existing semantic sections, rails and responsive behavior. Add CSS only for the new capability/email content; preserve the Midnight Cobalt tokens and accessibility states.

Run: npm test

Expected: PASS for the current route set with the updated Alltius content assertions.

- [ ] Step 6: Commit the public content contract

~~~
git add lib/site-content.ts components/home-page.tsx app/globals.css tests/rendered-html.test.mjs
git commit -m "feat: position Alltius around managed growth services"
~~~

---

### Task 3: Add Email & Messaging Operations routes and legal language

**Files:**
- Create: components/email-operations-page.tsx
- Create: app/email/page.tsx
- Create: app/pt/email/page.tsx
- Create: app/es/email/page.tsx
- Modify: components/site-shell.tsx
- Modify: components/legal-page.tsx only if an email-specific callout is needed
- Modify: lib/site-content.ts
- Modify: tests/rendered-html.test.mjs

**Interfaces:**
- Consumes: routePairs.email, siteContent[locale].emailOperations, SiteShell, metadataFor and the verified public email aliases.
- Produces: three equivalent public email-service pages and legal copy that describes acceptable use, tenant roles and privacy boundaries.

- [ ] Step 1: Add failing route and copy tests

Add /email, /pt/email and /es/email to expectedRoutes and assert for every locale:

- transactional email is the initial focus;
- marketing requires opt-in and unsubscribe controls;
- no purchased, rented, scraped or unsolicited lists;
- bounces and complaints are suppressed/handled;
- client tenants are reviewed and isolated;
- Alltius does not offer an open relay;
- AIULLMA LLC remains the legal operator.

Assert that the language selector maps /email ↔ /pt/email ↔ /es/email.

- [ ] Step 2: Run tests and verify RED

Run: npm test

Expected: FAIL because the three email routes do not exist.

- [ ] Step 3: Implement the shared email page component

Render an accessible main with one h1, an introduction, sections for “what we send”, “how a tenant is reviewed”, “deliverability controls”, “what we do not support”, and a contact CTA. Use semantic section elements and ordinary text links; do not add a signup form or a public email-sending endpoint.

- [ ] Step 4: Add localized route wrappers and metadata

Each route wrapper should use SiteShell, EmailOperationsPage, routePairs.email[locale] and metadataFor. Keep English canonical at /email, Portuguese at /pt/email, Spanish at /es/email, and set hrefLang values en, pt-BR and es-419.

- [ ] Step 5: Expand legal copy

Add to each locale’s Privacy Notice: Alltius may process recipient, delivery, bounce, complaint and preference data on behalf of a client; AIULLMA LLC controls the public site; the client may control recipient data in a managed service. Add to Terms: no open relay, no unlawful or unsolicited mail, tenant review, identity verification, suspension for abuse, and separate client agreements. Keep the Data Deletion page explicit about whether the request concerns Alltius-controlled records or a client-controlled audience.

- [ ] Step 6: Run tests and commit

Run: npm test

Expected: PASS for 18 localized public routes and the new email safety assertions.

~~~
git add components/email-operations-page.tsx app/email app/pt/email app/es/email components/site-shell.tsx lib/site-content.ts tests/rendered-html.test.mjs
git commit -m "feat: add managed email operations service"
~~~

---

### Task 4: Rebrand metadata, SEO, shell and visual assets

**Files:**
- Modify: components/site-shell.tsx
- Modify: app/layout.tsx
- Modify: lib/metadata.ts
- Modify: app/sitemap.ts
- Modify: app/robots.ts
- Modify: app/globals.css
- Replace: public/favicon.svg
- Replace: public/og.png
- Modify: tests/rendered-html.test.mjs

**Interfaces:**
- Consumes: the Alltius content registry and the https://alltius.dev canonical origin.
- Produces: Alltius-first metadata and navigation with AIULLMA LLC visible in legal/company contexts, plus a non-starter social card.

- [ ] Step 1: Write failing brand and metadata tests

Assert:

- every public commercial wordmark says Alltius;
- the footer and legal pages say Alltius is operated by AIULLMA LLC or the localized equivalent;
- metadataBase, JSON-LD url, sitemap and robots use https://alltius.dev;
- Open Graph and Twitter metadata use Alltius copy and /og.png;
- no rendered HTML contains aiullma.com or an AIULLMA-only page title.

- [ ] Step 2: Run tests and verify RED

Run: npm test

Expected: FAIL because the current shell, metadata, sitemap, robots and assets still identify AIULLMA as the primary site.

- [ ] Step 3: Rebrand shared shell and metadata

Change the wordmark, accessibility labels, localized footer, canonical origin and organization JSON-LD. Use name: Alltius, legalName: AIULLMA LLC, url: https://alltius.dev and a verified Alltius contact address. Keep the New Mexico address only in the company/trust/legal content where it supports corporate diligence.

Update metadataFor to suffix non-absolute titles with | Alltius, add email-page alternates, and update sitemap/robots to the new origin.

- [ ] Step 4: Create the Alltius visual assets

Replace the AIULLMA favicon with a simple white Alltius mark that remains legible on the Midnight Cobalt background. Generate one cohesive 1200×630 Alltius social preview using the approved dark palette, white wordmark, electric-blue rails and the final growth/service message; inspect it for exact text and omit og:image if it is not legible rather than shipping an incorrect card.

- [ ] Step 5: Run tests and commit

Run: npm test && npm run lint

Expected: PASS with no Alltius branding regressions or lint errors.

~~~
git add components/site-shell.tsx app/layout.tsx lib/metadata.ts app/sitemap.ts app/robots.ts app/globals.css public/favicon.svg public/og.png tests/rendered-html.test.mjs
git commit -m "feat: brand the site as Alltius"
~~~

---

### Task 5: Remove stale Sites binding and produce a static Cloudflare Pages artifact

**Files:**
- Modify: vite.config.ts
- Modify: package.json
- Create: scripts/export-static.mjs
- Delete: .openai/hosting.json
- Delete: build/sites-vite-plugin.ts
- Modify: tests/rendered-html.test.mjs

**Interfaces:**
- Consumes: the built vinext worker at dist/server/index.js, its dist/client assets and the 18-route list.
- Produces: dist-static/ containing route index.html files plus all client assets, deployable by wrangler pages deploy without Sites project metadata or databases.

- [ ] Step 1: Add a failing static artifact test

Create a Node test that checks each route maps to a static file:

~~~
const staticFiles = [
  "dist-static/index.html",
  "dist-static/contact/index.html",
  "dist-static/pt/index.html",
  "dist-static/pt/email/index.html",
  "dist-static/es/email/index.html",
  "dist-static/sitemap.xml",
  "dist-static/robots.txt",
];
~~~

Assert that each file exists, contains <html, and contains Alltius. Add a check that dist-static contains no .openai/hosting.json.

- [ ] Step 2: Run the static test and verify RED

Run: node --test tests/static-artifact.test.mjs

Expected: FAIL because the static export directory does not exist.

- [ ] Step 3: Remove the old Sites-only bindings

Remove the hostingConfig import, Sites plugin import and D1/R2 placeholder declarations from vite.config.ts, preserving the Cloudflare worker entry and nodejs_compat. Remove the stale .openai/hosting.json and build/sites-vite-plugin.ts. Keep the build output compatible with the existing worker/index.ts.

- [ ] Step 4: Implement the static exporter

Create scripts/export-static.mjs that:

1. deletes and recreates dist-static;
2. copies dist/client into dist-static;
3. imports dist/server/index.js after the production build;
4. fetches each of the 18 routes with accept: text/html and the correct x-aiullma-language header (en, pt-BR, es-419);
5. writes / to dist-static/index.html, /pt/ to dist-static/pt/index.html, and each other route to its directory index.html;
6. fetches /sitemap.xml and /robots.txt from the built worker and writes their
   response bodies to dist-static/sitemap.xml and dist-static/robots.txt;
7. fails on any non-200 or non-HTML response.

Add pages:build: npm run build && node scripts/export-static.mjs to package.json. The exporter must not read secrets or depend on a database.

- [ ] Step 5: Run the full static build and tests

Run:

~~~
npm run pages:build
node --test tests/static-artifact.test.mjs
npm run lint
~~~

Expected: all 18 HTML files exist, the generated artifacts use Alltius metadata and the static test/lint pass.

- [ ] Step 6: Commit the Cloudflare Pages build path

~~~
git add vite.config.ts package.json scripts/export-static.mjs tests/static-artifact.test.mjs
git add -u .openai/hosting.json build/sites-vite-plugin.ts
git commit -m "build: prepare static Cloudflare Pages deployment"
~~~

---

### Task 6: Create the GitHub repository and publish the source

**Files:**
- Modify: Git remote configuration
- No source changes beyond the committed tasks

**Interfaces:**
- Consumes: the verified local branch, passing tests, dist-static build and approved scope.
- Produces: public repository https://github.com/Alltius-dev/alltius.dev containing the exact source used for deployment.

- [ ] Step 1: Verify the final local scope

Run:

~~~
git status -sb
git log --oneline --decorate -8
git diff --check
npm test
npm run lint
npm run pages:build
~~~

Expected: clean worktree, passing build/test/lint/static export and no untracked private SES note.

- [ ] Step 2: Create or inspect the GitHub repository

If gh repo view Alltius-dev/alltius.dev reports no repository, create it:

~~~
gh repo create Alltius-dev/alltius.dev --public --description "Alltius managed technology, AI and email operations" --homepage https://alltius.dev
~~~

Then set the local remote explicitly:

~~~
git remote set-url origin https://github.com/Alltius-dev/alltius.dev.git
git remote -v
~~~

If the repository already exists, inspect its default branch and preserve any unrelated remote content before pushing.

- [ ] Step 3: Push the source branch

~~~
git push -u origin agent/alltius-dev-site
~~~

Open a draft PR into the repository default branch with a body describing Alltius branding, the SES readiness posture, static Pages build and validation commands. Do not push to the AIULLMA repository.

---

### Task 7: Deploy to Cloudflare Pages and bind alltius.dev

**Files:**
- Create/modify: Cloudflare Pages project alltius-dev
- Modify: Cloudflare custom-domain/DNS records for alltius.dev only

**Interfaces:**
- Consumes: dist-static/ from Task 5, the Cloudflare account already managing alltius.dev, and the GitHub source branch.
- Produces: a public Pages preview URL, the production Pages deployment and verified HTTPS on https://alltius.dev.

- [ ] Step 1: Confirm Wrangler authentication and Pages project state

Run:

~~~
npx wrangler whoami
npx wrangler pages project list
~~~

Expected: the authenticated account is the one that manages alltius.dev; if it is not authenticated or the account is wrong, stop and request the correct Cloudflare login.

- [ ] Step 2: Create the Pages project if absent

Create project alltius-dev through the authenticated Cloudflare Pages flow using the free plan and no D1, R2, Workers Paid, analytics or database resource. Keep the source of truth in GitHub and use the static output directory dist-static.

- [ ] Step 3: Deploy the static artifact

Run:

~~~
npx wrangler pages deploy dist-static --project-name alltius-dev
~~~

Record the returned pages.dev URL and verify it before attaching the custom domain.

- [ ] Step 4: Add custom domains without disturbing unrelated DNS

In the Cloudflare Pages custom-domain settings, add alltius.dev as the canonical domain and www.alltius.dev as the secondary domain or redirect. Accept only the DNS records Cloudflare identifies for this Pages project; preserve the email-routing MX, SPF, DKIM and DMARC records created in Task 1.

- [ ] Step 5: Verify live HTTPS and route behavior

Run:

~~~
curl -fsS -I https://alltius.dev/
curl -fsS https://alltius.dev/pt/email | rg "Alltius|AIULLMA LLC|Transactional"
curl -fsS https://alltius.dev/es/email | rg "Alltius|AIULLMA LLC|transaccional"
curl -fsS https://alltius.dev/sitemap.xml | rg "https://alltius.dev"
curl -fsS https://alltius.dev/robots.txt | rg "sitemap"
~~~

Expected: HTTPS 200 responses, localized content, Alltius canonical URLs and a sitemap containing the 18 routes.

---

### Task 8: Final verification, SES readiness gate and handoff

**Files:**
- Modify: docs/ses-production-access.md only in the local ignored workspace
- Modify: docs/superpowers/plans/2026-08-17-alltius-institutional-site.md checklist status if tracking is desired

**Interfaces:**
- Consumes: the published site, Cloudflare DNS state, the private SES request note and current AWS documentation.
- Produces: evidence-backed handoff with GitHub link, Pages preview/custom-domain link, verified routes and explicit SES next actions.

- [ ] Step 1: Run fresh source and artifact verification

Run:

~~~
git status -sb
npm test
npm run lint
npm run pages:build
node --test tests/static-artifact.test.mjs
~~~

Expected: every command exits 0; report any failure instead of claiming completion.

- [ ] Step 2: Verify every production route

Run a loop over the exact 18 paths from routePairs, requesting each URL at https://alltius.dev and asserting HTTP 200, HTML content for page routes, and the correct localized <html lang> value. Also verify /sitemap.xml, /robots.txt, /favicon.svg and /og.png.

- [ ] Step 3: Verify brand/legal/SES claims

Search downloaded production HTML for:

~~~
Alltius
AIULLMA LLC
Transactional
unsubscribe
bounce
complaint
tenant
~~~

Assert that no production page contains aiullma.com, AWS partnership language, guaranteed ROI, open-relay language or purchased-list permission. Confirm that footer, privacy, terms, deletion and contact pages all disclose the legal operator.

- [ ] Step 4: Verify AWS readiness evidence

Confirm in the private note and current AWS console:

- the chosen Region is recorded;
- Alltius sending identities are verified;
- SPF, Easy DKIM and DMARC are aligned for each active sender domain;
- abuse/support mailboxes are monitored;
- Transactional is the honest majority use case;
- the 10–50/day, peak 100/day and 1,000–3,000/month estimate is current;
- bounce, complaint, delivery and unsubscribe events have a handler;
- marketing remains disabled until preference controls are live;
- tenants are reviewed and no open relay exists;
- shared IPs remain the initial posture;
- no secrets appear in Git or the public site.

- [ ] Step 5: Handoff

Return:

- GitHub repository link;
- Cloudflare Pages preview URL;
- https://alltius.dev production URL;
- branch and commit used for deployment;
- verification command summary;
- SES status as “prepared for an honest Transactional production request”, never “AWS approved” unless the AWS console shows that status.
