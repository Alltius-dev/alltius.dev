import assert from "node:assert/strict";
import test from "node:test";

const expectedRoutes = [
  "/",
  "/contact",
  "/privacy",
  "/terms",
  "/data-deletion",
  "/pt/",
  "/pt/contato",
  "/pt/privacidade",
  "/pt/termos",
  "/pt/exclusao-de-dados",
];

const prohibitedPatterns = [
  /Meta approved/i,
  /Tech Provider/i,
  /official partner/i,
  /unlimited users/i,
  /unlimited messages/i,
  /zero SaaS/i,
];

async function render(path) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${path}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

async function htmlFor(path) {
  const response = await render(path);
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  return response.text();
}

for (const path of expectedRoutes) {
  test(`${path} renders a public HTML page`, async () => {
    const response = await render(path);
    assert.equal(response.status, 200);
    assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  });
}

test("English home renders the approved headline", async () => {
  assert.match(
    await htmlFor("/"),
    /Technology services for scalable business operations\./,
  );
});

test("Portuguese home renders the approved headline", async () => {
  assert.match(
    await htmlFor("/pt/"),
    /Serviços de tecnologia para operações empresariais escaláveis\./,
  );
});

test("legal pages identify the AIULLMA LLC legal entity", async () => {
  for (const path of expectedRoutes.filter((path) => path !== "/" && path !== "/pt/")) {
    assert.match(await htmlFor(path), /AIULLMA LLC/);
  }
});

test("language switchers link to the equivalent localized route", async () => {
  const equivalents = [
    ["/", "/pt/"],
    ["/contact", "/pt/contato"],
    ["/privacy", "/pt/privacidade"],
    ["/terms", "/pt/termos"],
    ["/data-deletion", "/pt/exclusao-de-dados"],
  ];

  for (const [englishPath, portuguesePath] of equivalents) {
    assert.match(await htmlFor(englishPath), new RegExp(`href=["']${portuguesePath}["']`));
    assert.match(await htmlFor(portuguesePath), new RegExp(`href=["']${englishPath}["']`));
  }
});

test("contact and data-deletion pages expose the correct corporate emails", async () => {
  for (const path of ["/contact", "/pt/contato"]) {
    assert.match(await htmlFor(path), /href=["']mailto:contact@aiullma\.com["']/i);
  }

  for (const path of ["/data-deletion", "/pt/exclusao-de-dados"]) {
    assert.match(await htmlFor(path), /href=["']mailto:privacy@aiullma\.com["']/i);
  }
});

test("rendered pages avoid prohibited claims", async () => {
  for (const path of expectedRoutes) {
    const html = await htmlFor(path);
    for (const pattern of prohibitedPatterns) {
      assert.doesNotMatch(html, pattern, `${path} must not contain ${pattern}`);
    }
  }
});
