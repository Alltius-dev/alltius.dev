import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

import {
  localizedPublicRoutes,
  staticArtifactPathForRoute,
  staticDocumentRoutes,
} from "../scripts/static-export-config.mjs";
import { routePairs } from "../lib/site-content.ts";

const expectedCanonicalPublicRoutes = [
  "/",
  "/pt/",
  "/es/",
  "/contact/",
  "/pt/contato/",
  "/es/contacto/",
  "/privacy/",
  "/pt/privacidade/",
  "/es/privacidad/",
  "/terms/",
  "/pt/termos/",
  "/es/terminos/",
  "/email/",
  "/pt/email/",
  "/es/email/",
  "/data-deletion/",
  "/pt/exclusao-de-dados/",
  "/es/eliminacion-de-datos/",
];

test("static export routes are derived from routePairs and use canonical trailing slashes", () => {
  assert.deepEqual(
    localizedPublicRoutes,
    Object.values(routePairs).flatMap((pair) => Object.values(pair)),
  );
  assert.deepEqual(localizedPublicRoutes, expectedCanonicalPublicRoutes);
});

for (const route of localizedPublicRoutes) {
  test(`${route} exports a static HTML artifact`, async () => {
    const filePath = `dist-static/${staticArtifactPathForRoute(route)}`;
    const html = await readFile(new URL(`../${filePath}`, import.meta.url), "utf8");

    assert.match(html, /<html\b/i, `${filePath} must contain an <html> root`);
    assert.match(html, /Alltius/i, `${filePath} must contain Alltius branding`);
  });
}

for (const asset of staticDocumentRoutes.map((path) => `dist-static/${path.slice(1)}`)) {
  test(`${asset} exists in the static export`, async () => {
    const content = await readFile(new URL(`../${asset}`, import.meta.url), "utf8");
    assert.ok(content.length > 0, `${asset} must not be empty`);
  });
}

test("dist-static does not contain OpenAI Sites project metadata", async () => {
  await assert.rejects(
    access(new URL("../dist-static/.openai/hosting.json", import.meta.url)),
    (error) => error?.code === "ENOENT",
  );
});
