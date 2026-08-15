import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
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

test("home metadata uses concise SEO copy separate from the hero", async () => {
  const cases = [
    {
      path: "/",
      title: "AIULLMA | Technology services for scalable operations",
      heroSupport:
        "AIULLMA LLC designs, implements and supports specialized technology services powered by dedicated infrastructure. Our model combines initial implementation, ongoing service and infrastructure, helping companies grow without tying every user, contact, message or workflow to another subscription fee. Cloud, telecommunications, platform and other third-party charges may apply.",
    },
    {
      path: "/pt/",
      title: "AIULLMA | Serviços de tecnologia para operações escaláveis",
      heroSupport:
        "A AIULLMA LLC projeta, implanta e sustenta serviços tecnológicos especializados sobre infraestrutura dedicada. Nosso modelo combina implantação inicial, serviço contínuo e infraestrutura, permitindo que empresas cresçam sem transformar cada usuário, contato, mensagem ou automação em uma nova cobrança. Tarifas de nuvem, telecomunicações, plataformas e outros terceiros podem ser aplicadas.",
    },
  ];

  for (const { path, title, heroSupport } of cases) {
    const html = await htmlFor(path);
    const renderedTitle = html.match(/<title>([^<]+)<\/title>/i)?.[1];
    const description = html.match(
      /<meta[^>]+name="description"[^>]+content="([^"]+)"[^>]*>/i,
    )?.[1];

    assert.equal(renderedTitle, title);
    assert.ok(description, `${path} must render a meta description`);
    assert.ok(
      description.length >= 150 && description.length <= 165,
      `${path} meta description must be 150–165 characters; received ${description.length}`,
    );
    assert.ok(
      !description.includes(heroSupport),
      `${path} meta description must not reuse the complete hero copy`,
    );
  }
});

test("home exposes semantic navigation and the operational model", async () => {
  const html = await htmlFor("/");
  assert.match(html, /<a[^>]+href="#main-content"[^>]*>Skip to content<\/a>/i);
  assert.match(html, /<nav[^>]+aria-label="Primary navigation"/i);
  assert.match(html, /<header[^>]+class="site-header"/i);
  assert.match(html, /<section[^>]+class="hero"/i);
  assert.match(html, /<ol[^>]+class="operational-rails"/i);
  assert.match(html, /<article[^>]+class="[^"]*\bcapability-row\b[^"]*"/i);
  assert.match(html, /<footer[^>]+class="site-footer"/i);
  assert.match(html, /Implementation/);
  assert.match(html, /Ongoing service/);
  assert.match(html, /Dedicated infrastructure/);

  assert.match(await htmlFor("/privacy"), /<main[^>]+class="legal-layout"/i);
});

test("localized pages declare their language in server-rendered HTML", async () => {
  for (const path of expectedRoutes) {
    const expectedLanguage = path.startsWith("/pt") ? "pt-BR" : "en";
    assert.match(
      await htmlFor(path),
      new RegExp(`<html[^>]+lang=["']${expectedLanguage}["']`, "i"),
      `${path} must render lang=${expectedLanguage}`,
    );
  }
});

test("Portuguese pages localize accessibility labels", async () => {
  const html = await htmlFor("/pt/");
  assert.match(html, /<a[^>]+href="#main-content"[^>]*>Pular para o conteúdo<\/a>/i);
  assert.match(html, /<a[^>]+aria-label="Página inicial da AIULLMA"/i);
  assert.match(html, /<nav[^>]+aria-label="Navegação principal"/i);
  assert.match(html, /<nav[^>]+aria-label="Navegação móvel"/i);
  assert.match(html, /<nav[^>]+aria-label="Políticas"/i);
});

test("mobile menu summaries describe the disclosure action in both languages", async () => {
  const english = await htmlFor("/");
  assert.match(english, /<summary>Menu<\/summary>/i);
  assert.doesNotMatch(english, /<summary>Home<\/summary>/i);

  const portuguese = await htmlFor("/pt/");
  assert.match(portuguese, /<summary>Menu<\/summary>/i);
  assert.doesNotMatch(portuguese, /<summary>Início<\/summary>/i);
});

test("primary CTAs preserve the equivalent contact route", async () => {
  assert.match(
    await htmlFor("/"),
    /<a[^>]+href="\/contact"[^>]*>Discuss your operation<\/a>/i,
  );
  assert.match(
    await htmlFor("/pt/"),
    /<a[^>]+href="\/pt\/contato"[^>]*>Fale sobre sua operação<\/a>/i,
  );
});

test("home contact sections visibly expose the corporate email and business address", async () => {
  const address =
    "2105 Vista Oeste NW Ste E, 1349, Albuquerque, NM 87120, United States";

  for (const path of ["/", "/pt/"]) {
    const html = await htmlFor(path);
    const contactSection = html.match(
      /<section[^>]+class="[^"]*\bcontact-section\b[^"]*"[^>]*>([\s\S]*?)<\/section>/i,
    )?.[1];

    assert.ok(contactSection, `${path} must render its Contact section`);
    assert.match(
      contactSection,
      /<a[^>]+href="mailto:contact@aiullma\.com"[^>]*>contact@aiullma\.com<\/a>/i,
    );
    assert.match(contactSection, new RegExp(address));
    assert.doesNotMatch(
      html,
      new RegExp(`<span[^>]+class="[^"]*sr-only[^"]*"[^>]*>${address}</span>`, "i"),
      `${path} must not duplicate the address in hidden global content`,
    );
  }
});

test("every rendered mail link uses an approved corporate address", async () => {
  const approved = new Set([
    "mailto:contact@aiullma.com",
    "mailto:privacy@aiullma.com",
  ]);

  for (const path of expectedRoutes) {
    const mailLinks = [...(await htmlFor(path)).matchAll(/href=["'](mailto:[^"']+)["']/gi)];
    for (const [, href] of mailLinks) {
      assert.ok(approved.has(href.toLowerCase()), `${path} exposes unexpected mail link ${href}`);
    }
  }
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

test("rendered head publishes favicon and 1200 by 630 social preview metadata", async () => {
  for (const [path, canonical] of [
    ["/", "https://aiullma.com"],
    ["/pt/", "https://aiullma.com/pt/"],
  ]) {
    const html = await htmlFor(path);
    assert.match(html, new RegExp(`rel="canonical" href="${canonical}"`, "i"));
    assert.match(html, /rel="alternate" hrefLang="en" href="https:\/\/aiullma\.com"/i);
    assert.match(html, /rel="alternate" hrefLang="pt-BR" href="https:\/\/aiullma\.com\/pt\/"/i);
    assert.match(html, /rel="icon" href="\/favicon\.svg"/i);
    assert.match(html, /property="og:image" content="https:\/\/aiullma\.com\/og\.png"/i);
    assert.match(html, /property="og:image:width" content="1200"/i);
    assert.match(html, /property="og:image:height" content="630"/i);
  }
});

test("social preview and favicon assets are available at their declared dimensions", async () => {
  const preview = await readFile(new URL("../public/og.png", import.meta.url));
  assert.equal(preview.readUInt32BE(16), 1200);
  assert.equal(preview.readUInt32BE(20), 630);

  const favicon = await readFile(new URL("../public/favicon.svg", import.meta.url), "utf8");
  assert.match(favicon, /<svg\b/i);
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
