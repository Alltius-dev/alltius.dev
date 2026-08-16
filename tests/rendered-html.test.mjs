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
  "/es/",
  "/es/contacto",
  "/es/privacidad",
  "/es/terminos",
  "/es/eliminacion-de-datos",
];

const prohibitedPatterns = [
  /Meta approved/i,
  /Tech Provider/i,
  /official partner/i,
  /unlimited users/i,
  /unlimited messages/i,
  /zero SaaS/i,
  /guaranteed revenue/i,
  /guaranteed ROI/i,
  /receita garantida/i,
  /ROI garantido/i,
  /ingresos garantizados/i,
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

const positioningCases = [
  {
    path: "/",
    headline: /Managed technology and AI services for companies ready to grow revenue\./,
    support: /identify opportunities, make better decisions, serve more demand and grow\./,
    model: ["Growth-focused build", "Continuous operation", "Optimization with data and AI"],
    capabilities: ["Revenue-focused automation", "BI for growth decisions", "AI agents embedded in operations"],
  },
  {
    path: "/pt/",
    headline: /Serviços gerenciados de tecnologia e IA para empresas prontas para faturar mais\./,
    support: /identificar oportunidades, tomar decisões melhores, atender mais demanda e crescer\./,
    model: ["Construção orientada ao crescimento", "Operação contínua", "Otimização com dados e IA"],
    capabilities: ["Automação orientada à receita", "BI para decisões de crescimento", "Agentes de IA integrados à operação"],
  },
  {
    path: "/es/",
    headline: /Servicios gestionados de tecnología e IA para empresas preparadas para generar más ingresos\./,
    support: /identificar oportunidades, tomar mejores decisiones, atender una mayor demanda y crecer\./,
    model: ["Construcción orientada al crecimiento", "Operación continua", "Optimización con datos e IA"],
    capabilities: ["Automatización orientada a los ingresos", "BI para decisiones de crecimiento", "Agentes de IA integrados en la operación"],
  },
];

test("home pages lead with the approved service-first growth positioning", async () => {
  for (const item of positioningCases) {
    const html = await htmlFor(item.path);
    assert.match(html, item.headline);
    assert.match(html, item.support);
    for (const label of [...item.model, ...item.capabilities]) {
      assert.match(html, new RegExp(label));
    }
  }
});

test("home metadata uses concise SEO copy separate from the hero", async () => {
  const cases = [
    {
      path: "/",
      title: "AIULLMA | Managed technology and AI services for growth",
      description:
        "AIULLMA builds, operates and optimizes automation, AI agents, BI, systems and dedicated infrastructure to help companies grow revenue and operating capacity.",
    },
    {
      path: "/pt/",
      title: "AIULLMA | Serviços gerenciados de tecnologia e IA para crescimento",
      description:
        "A AIULLMA constrói, opera e otimiza automações, agentes de IA, BI e infraestrutura dedicada para ampliar receita, margem e capacidade operacional de empresas.",
    },
    {
      path: "/es/",
      title: "AIULLMA | Servicios gestionados de tecnología e IA para crecer",
      description:
        "AIULLMA construye, opera y optimiza automatizaciones, agentes de IA, BI e infraestructura dedicada para ayudar a aumentar ingresos y capacidad operativa.",
      heroSupport:
        "AIULLMA construye, opera y optimiza automatizaciones, sistemas, agentes de IA, inteligencia de negocios e infraestructura dedicada para ayudar a las empresas a identificar oportunidades, tomar mejores decisiones, atender una mayor demanda y crecer.",
    },
  ];

  for (const { path, title, description: expectedDescription, heroSupport } of cases) {
    const html = await htmlFor(path);
    const renderedTitle = html.match(/<title>([^<]+)<\/title>/i)?.[1];
    const description = html.match(
      /<meta[^>]+name="description"[^>]+content="([^"]+)"[^>]*>/i,
    )?.[1];

    assert.equal(renderedTitle, title);
    assert.ok(description, `${path} must render a meta description`);
    assert.equal(description, expectedDescription);
    assert.ok(
      description.length >= 150 && description.length <= 165,
      `${path} meta description must be 150–165 characters; received ${description.length}`,
    );
    if (heroSupport) {
      assert.match(html, new RegExp(heroSupport));
    }
  }
});

test("social metadata reflects the service-first growth positioning", async () => {
  const html = await htmlFor("/");
  assert.match(html, /property="og:title" content="AIULLMA LLC"/i);
  assert.match(html, /property="og:description" content="Managed technology and AI services for companies ready to grow revenue\./i);
  assert.match(html, /property="og:image:alt" content="AIULLMA — Managed technology and AI services for companies ready to grow revenue\./i);
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
  assert.match(html, /Growth-focused build/);
  assert.match(html, /Continuous operation/);
  assert.match(html, /Optimization with data and AI/);

  assert.match(await htmlFor("/privacy"), /<main[^>]+class="legal-layout"/i);
});

test("localized pages declare their language in server-rendered HTML", async () => {
  for (const path of expectedRoutes) {
    const expectedLanguage = path.startsWith("/pt")
      ? "pt-BR"
      : path.startsWith("/es")
        ? "es-419"
        : "en";
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

test("Spanish home renders the approved Latin American positioning", async () => {
  const html = await htmlFor("/es/");
  assert.match(html, /Servicios gestionados de tecnología e IA para empresas preparadas para generar más ingresos\./);
  assert.match(html, /identificar oportunidades, tomar mejores decisiones, atender una mayor demanda y crecer\./);
  assert.match(html, /Hablemos de su objetivo de crecimiento/);
});

test("Spanish pages localize accessibility labels", async () => {
  const html = await htmlFor("/es/");
  assert.match(html, /<a[^>]+href="#main-content"[^>]*>Ir al contenido<\/a>/i);
  assert.match(html, /aria-label="Página de inicio de AIULLMA"/i);
  assert.match(html, /aria-label="Navegación principal"/i);
  assert.match(html, /aria-label="Navegación móvil"/i);
  assert.match(html, /aria-label="Políticas"/i);
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
    /<a[^>]+href="\/contact"[^>]*>Discuss your growth objective<\/a>/i,
  );
  assert.match(
    await htmlFor("/pt/"),
    /<a[^>]+href="\/pt\/contato"[^>]*>Fale sobre sua meta de crescimento<\/a>/i,
  );
  assert.match(
    await htmlFor("/es/"),
    /<a[^>]+href="\/es\/contacto"[^>]*>Hablemos de su objetivo de crecimiento<\/a>/i,
  );
});

test("home contact sections visibly expose the corporate email and business address", async () => {
  const address =
    "2105 Vista Oeste NW Ste E, 1349, Albuquerque, NM 87120, United States";

  for (const path of ["/", "/pt/", "/es/"]) {
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

test("growth claims remain qualified and preserve the third-party cost notice", async () => {
  assert.match(await htmlFor("/"), /help companies identify opportunities/);
  assert.match(await htmlFor("/pt/"), /ajudar empresas a identificar oportunidades/);
  assert.match(await htmlFor("/"), /Cloud, telecommunications, platform and other third-party charges may apply\./);
  assert.match(await htmlFor("/pt/"), /Tarifas de nuvem, telecomunicações, plataformas e outros terceiros podem ser aplicadas\./);
});

test("legal pages identify the AIULLMA LLC legal entity", async () => {
  for (const path of expectedRoutes.filter((path) => path !== "/" && path !== "/pt/")) {
    assert.match(await htmlFor(path), /AIULLMA LLC/);
  }
});

test("language selectors link every page to its EN PT and ES equivalents", async () => {
  const routeGroups = [
    [{ path: "/", label: "English" }, { path: "/pt/", label: "Português" }, { path: "/es/", label: "Español" }],
    [{ path: "/contact", label: "English" }, { path: "/pt/contato", label: "Português" }, { path: "/es/contacto", label: "Español" }],
    [{ path: "/privacy", label: "English" }, { path: "/pt/privacidade", label: "Português" }, { path: "/es/privacidad", label: "Español" }],
    [{ path: "/terms", label: "English" }, { path: "/pt/termos", label: "Português" }, { path: "/es/terminos", label: "Español" }],
    [{ path: "/data-deletion", label: "English" }, { path: "/pt/exclusao-de-dados", label: "Português" }, { path: "/es/eliminacion-de-datos", label: "Español" }],
  ];

  for (const group of routeGroups) {
    for (const current of group) {
      const html = await htmlFor(current.path);
      const switchers = [...html.matchAll(/<div[^>]+class="language-switcher"[^>]*>([\s\S]*?)<\/div>/gi)];
      assert.equal(switchers.length, 2, `${current.path} must render desktop and mobile selectors`);
      for (const [, switcher] of switchers) {
        assert.match(switcher, new RegExp(`<span[^>]+aria-current=["']page["'][^>]*>${current.label}<\\/span>`));
        for (const target of group.filter((item) => item.path !== current.path)) {
          assert.match(switcher, new RegExp(`href=["']${target.path}["']`));
        }
      }
    }
  }
});

test("contact and data-deletion pages expose the correct corporate emails", async () => {
  for (const path of ["/contact", "/pt/contato", "/es/contacto"]) {
    assert.match(await htmlFor(path), /href=["']mailto:contact@aiullma\.com["']/i);
  }

  for (const path of ["/data-deletion", "/pt/exclusao-de-dados", "/es/eliminacion-de-datos"]) {
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
  for (const [path, canonical] of [
    ["/contact", "https://aiullma.com/contact"],
    ["/pt/contato", "https://aiullma.com/pt/contato"],
    ["/es/contacto", "https://aiullma.com/es/contacto"],
  ]) {
    const html = await htmlFor(path);
    assert.match(html, new RegExp(`rel="canonical" href="${canonical}"`, "i"));
    assert.match(html, /hrefLang="en" href="https:\/\/aiullma\.com\/contact"/i);
    assert.match(html, /hrefLang="pt-BR" href="https:\/\/aiullma\.com\/pt\/contato"/i);
    assert.match(html, /hrefLang="es-419" href="https:\/\/aiullma\.com\/es\/contacto"/i);
    assert.match(html, /hrefLang="x-default" href="https:\/\/aiullma\.com\/contact"/i);
  }
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
