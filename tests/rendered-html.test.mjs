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

async function textFor(path) {
  const response = await render(path);
  assert.equal(response.status, 200);
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

test("hero support qualifies pricing language in both languages", async () => {
  assert.match(
    await htmlFor("/"),
    /another subscription fee\. Cloud, telecommunications, platform and other third-party charges may apply\./,
  );
  assert.match(
    await htmlFor("/pt/"),
    /nova cobrança\. Tarifas de nuvem, telecomunicações, plataformas e outros terceiros podem ser aplicadas\./,
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

test("localized pages publish canonical and alternate metadata", async () => {
  const english = await htmlFor("/contact");
  assert.match(english, /rel="canonical" href="https:\/\/aiullma\.com\/contact"/i);
  assert.match(english, /rel="alternate" hrefLang="en" href="https:\/\/aiullma\.com\/contact"/i);
  assert.match(english, /rel="alternate" hrefLang="pt-BR" href="https:\/\/aiullma\.com\/pt\/contato"/i);

  const portuguese = await htmlFor("/pt/contato");
  assert.match(portuguese, /rel="canonical" href="https:\/\/aiullma\.com\/pt\/contato"/i);
  assert.match(portuguese, /rel="alternate" hrefLang="en" href="https:\/\/aiullma\.com\/contact"/i);
  assert.match(portuguese, /rel="alternate" hrefLang="pt-BR" href="https:\/\/aiullma\.com\/pt\/contato"/i);
});

test("crawler discovery routes publish the approved canonical URLs", async () => {
  const robots = await textFor("/robots.txt");
  assert.match(robots, /User-agent: \*/i);
  assert.match(robots, /Allow: \//i);
  assert.match(robots, /Sitemap: https:\/\/aiullma\.com\/sitemap\.xml/i);

  const sitemap = await textFor("/sitemap.xml");
  for (const path of expectedRoutes) {
    assert.match(sitemap, new RegExp(`https://aiullma\\.com${path}`));
  }
});

test("home publishes the approved Organization JSON-LD", async () => {
  const html = await htmlFor("/");
  const match = html.match(/<script type="application\/ld\+json">(.*?)<\/script>/);
  assert.ok(match, "Organization JSON-LD must be rendered in the document");

  const organization = JSON.parse(match[1]);
  assert.deepEqual(organization, {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "AIULLMA LLC",
    url: "https://aiullma.com",
    email: "contact@aiullma.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "2105 Vista Oeste NW Ste E, 1349",
      addressLocality: "Albuquerque",
      addressRegion: "NM",
      postalCode: "87120",
      addressCountry: "US",
    },
  });
});
