# Task 4 Report — Rebrand metadata, SEO, shell and visual assets

Date: 2026-08-17

Implementation commit SHA: `4af086a78589a77e9ab9b5ae7084b6dd1ec76bc8`

## Scope completed

- Rebranded the shared shell wordmark and accessibility labels from AIULLMA to Alltius.
- Switched canonical origin, metadata base, JSON-LD URL, sitemap and robots from `https://aiullma.com` to `https://alltius.dev`.
- Updated Open Graph and Twitter metadata to Alltius-first copy with `/og.png`.
- Replaced `public/favicon.svg` with a deterministic dark B1 + white Alltius monogram treatment.
- Replaced `public/og.png` with a deterministic 1200×630 Alltius social preview and preserved the official AIULLMA contact bridge.
- Kept AIULLMA LLC visible in legal/company contexts and did not change mailbox, DNS, SES, MX, DKIM/DMARC or Cloudflare Email Routing work.

## Exact tests

RED:

- `npm test`
- Observed expected failures before implementation in brand/metadata coverage, including:
  - `Portuguese pages localize accessibility labels`
  - `Spanish pages localize accessibility labels`
  - `every public page uses Alltius as the commercial wordmark and keeps AIULLMA LLC in footer or legal contexts`
  - `rendered metadata uses alltius.dev, Alltius titles and the approved social image`
  - `organization JSON-LD uses the Alltius public identity and aiullma contact bridge`
  - `robots.txt and sitemap.xml publish the alltius.dev canonical origin`

GREEN:

- `npm test`
  - Passed: `tests/rendered-html.test.mjs`
  - Passed: `tests/static-artifact.test.mjs`
  - Total result: 51 tests passed, 0 failed
- `npm run lint`

Added/updated Task 4 assertions in `tests/rendered-html.test.mjs`:

- `every public page uses Alltius as the commercial wordmark and keeps AIULLMA LLC in footer or legal contexts`
- `rendered metadata uses alltius.dev, Alltius titles and the approved social image`
- `organization JSON-LD uses the Alltius public identity and aiullma contact bridge`
- `robots.txt and sitemap.xml publish the alltius.dev canonical origin`
- Updated canonical/alternate/head/JSON-LD assertions to `https://alltius.dev`
- Updated PT/ES accessibility label expectations to Alltius

## Changed files

- `components/site-shell.tsx`
- `app/layout.tsx`
- `lib/metadata.ts`
- `app/sitemap.ts`
- `app/robots.ts`
- `app/globals.css`
- `public/favicon.svg`
- `public/og.png`
- `tests/rendered-html.test.mjs`

## Asset validation details

`public/favicon.svg`

- Deterministic SVG only.
- Visual treatment: Midnight Cobalt background, white geometric `A` monogram, electric-blue rail accent.
- Verified as XML/SVG and referenced by the rendered head through `/favicon.svg`.

`public/og.png`

- Deterministic raster generated locally from scripted drawing, not freeform image generation.
- Verified dimensions: `1200 × 630`.
- Manual visual inspection confirmed the final rendered text is legible and exact:
  - `ALLTIUS · OPERATED BY AIULLMA LLC`
  - `Alltius`
  - `Build, operate and optimize`
  - `managed digital capacity`
  - `for growth.`
  - `Official legal entity: AIULLMA LLC`
- Confirmed dark B1 / white Alltius treatment with electric-blue operational rails and no illegible or incorrect text.

## Notes

- The official AIULLMA legal relationship remains intact.
- The existing AIULLMA contact bridge remains intact (`contact@aiullma.com`).
- Task 5 static build/export work was not touched in this task.
