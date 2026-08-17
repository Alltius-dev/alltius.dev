import assert from "node:assert/strict";
import test from "node:test";

import { routePairs, siteContent } from "../lib/site-content.ts";

const prohibitedPatterns = [
  /AWS partner/i,
  /AWS certified/i,
  /SES approved/i,
  /purchased lists?/i,
  /guaranteed revenue/i,
  /guaranteed ROI/i,
  /receita garantida/i,
  /ROI garantido/i,
  /ingresos garantizados/i,
];

function collectStrings(value) {
  if (typeof value === "string") {
    return [value];
  }

  if (Array.isArray(value)) {
    return value.flatMap(collectStrings);
  }

  if (value && typeof value === "object") {
    return Object.values(value).flatMap(collectStrings);
  }

  return [];
}

test("site content adds the localized email operations route keys without assuming Task 3 pages exist", () => {
  assert.deepEqual(routePairs.email, {
    en: "/email",
    pt: "/pt/email",
    es: "/es/email",
  });
});

test("home content exposes five Alltius specialist service fronts in every locale", () => {
  const expectedTitles = [
    "Alltius Atendimento",
    "Alltius Automação",
    "Alltius Dados/BI",
    "Alltius IA",
    "Alltius Email & Messaging",
  ];

  for (const locale of ["en", "pt", "es"]) {
    assert.deepEqual(
      siteContent[locale].home.capabilities.map((item) => item.title),
      expectedTitles,
      `${locale} must expose the five approved service fronts`,
    );
  }
});

test("email operations content is present in EN PT and ES with the required policy posture", () => {
  for (const locale of ["en", "pt", "es"]) {
    const content = siteContent[locale].emailOperations;
    assert.ok(content.title.length > 0, `${locale} email title must exist`);
    assert.ok(content.description.length > 0, `${locale} email description must exist`);
    assert.ok(content.introduction.length > 0, `${locale} email introduction must exist`);
    assert.ok(content.cta.length > 0, `${locale} email CTA must exist`);
    assert.ok(content.sections.length >= 3, `${locale} email page needs multiple sections`);

    const blob = collectStrings(content).join("\n");
    assert.match(blob, /unsubscribe|descadastro|cancelación de suscripción/i);
    assert.match(blob, /suppression|supress|supresión/i);
    assert.match(blob, /tenant|cliente|inquilino/i);
    assert.match(blob, /transactional|transacional|transaccional/i);
    assert.match(blob, /permission-based marketing|marketing baseado em permissão|marketing basado en permisos/i);
  }
});

test("typed content avoids prohibited AWS and guarantee claims", () => {
  const contentBlob = collectStrings(siteContent).join("\n");
  for (const pattern of prohibitedPatterns) {
    assert.doesNotMatch(contentBlob, pattern, `typed content must not contain ${pattern}`);
  }
});
