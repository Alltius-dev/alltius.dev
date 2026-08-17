import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const expectedRoutes = [
  "/",
  "/contact",
  "/email",
  "/privacy",
  "/terms",
  "/data-deletion",
  "/pt/",
  "/pt/contato",
  "/pt/email",
  "/pt/privacidade",
  "/pt/termos",
  "/pt/exclusao-de-dados",
  "/es/",
  "/es/contacto",
  "/es/email",
  "/es/privacidad",
  "/es/terminos",
  "/es/eliminacion-de-datos",
];

const prohibitedPatterns = [
  /Meta approved/i,
  /Tech Provider/i,
  /official partner/i,
  /AWS partner/i,
  /AWS certified/i,
  /SES approved/i,
  /purchased lists?/i,
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
    headline: /Alltius builds, operates and optimizes digital capacity for growth\./,
    support: /help companies identify opportunities, make better decisions, serve more demand and grow\./,
    company:
      /Alltius is a service brand operated by AIULLMA LLC, registered in New Mexico, United States\./,
    model: ["Build", "Operate", "Optimize"],
    capabilities: [
      "Alltius Atendimento",
      "Alltius Automação",
      "Alltius Dados/BI",
      "Alltius IA",
      "Alltius Email & Messaging",
    ],
  },
  {
    path: "/pt/",
    headline: /Alltius constrói, opera e otimiza capacidade digital para crescer\./,
    support: /ajudar empresas a identificar oportunidades, tomar decisões melhores, atender mais demanda e crescer\./,
    company:
      /Alltius é uma marca de serviços operada pela AIULLMA LLC, registrada no New Mexico, Estados Unidos\./,
    model: ["Construir", "Operar", "Otimizar"],
    capabilities: [
      "Alltius Atendimento",
      "Alltius Automação",
      "Alltius Dados/BI",
      "Alltius IA",
      "Alltius Email & Messaging",
    ],
  },
  {
    path: "/es/",
    headline: /Alltius construye, opera y optimiza capacidad digital para crecer\./,
    support: /ayudar a las empresas a identificar oportunidades, tomar mejores decisiones, atender más demanda y crecer\./,
    company:
      /Alltius es una marca de servicios operada por AIULLMA LLC, registrada en New Mexico, Estados Unidos\./,
    model: ["Construir", "Operar", "Optimizar"],
    capabilities: [
      "Alltius Atendimento",
      "Alltius Automação",
      "Alltius Dados/BI",
      "Alltius IA",
      "Alltius Email & Messaging",
    ],
  },
];

test("home pages lead with the approved Alltius service-first positioning", async () => {
  for (const item of positioningCases) {
    const html = await htmlFor(item.path);
    assert.match(html, item.headline);
    assert.match(html, item.support);
    assert.match(html, item.company);
    for (const label of [...item.model, ...item.capabilities]) {
      assert.match(html, new RegExp(label.replace("&", "(?:&|&amp;)")));
    }
  }
});

test("home metadata uses the Alltius public brand in each locale", async () => {
  const cases = [
    {
      path: "/",
      title: "Alltius | Digital capacity services for growth",
      description:
        "Alltius builds, operates and optimizes automation, BI, AI, customer-service systems and managed infrastructure to expand growth capacity.",
    },
    {
      path: "/pt/",
      title: "Alltius | Serviços de capacidade digital para crescimento",
      description:
        "Alltius constrói, opera e otimiza automação, dados/BI, IA, atendimento e infraestrutura gerenciada para ampliar capacidade de crescimento.",
    },
    {
      path: "/es/",
      title: "Alltius | Servicios de capacidad digital para crecer",
      description:
        "Alltius construye, opera y optimiza automatización, datos/BI, IA, atención e infraestructura gestionada para ampliar la capacidad de crecimiento.",
    },
  ];

  for (const { path, title, description: expectedDescription } of cases) {
    const html = await htmlFor(path);
    const renderedTitle = html.match(/<title>([^<]+)<\/title>/i)?.[1];
    const description = html.match(
      /<meta[^>]+name="description"[^>]+content="([^"]+)"[^>]*>/i,
    )?.[1];

    assert.equal(renderedTitle, title);
    assert.ok(description, `${path} must render a meta description`);
    assert.equal(description, expectedDescription);
  }
});

test("home pages include the endorsed-brand relationship copy", async () => {
  const html = await htmlFor("/");
  assert.match(
    html,
    /Alltius is a service brand operated by AIULLMA LLC, registered in New Mexico, United States\./,
  );
  assert.match(html, /Our public policies and direct company contact are available below\./);
});

test("home exposes semantic navigation and the updated operating model", async () => {
  const html = await htmlFor("/");
  assert.match(html, /<a[^>]+href="#main-content"[^>]*>Skip to content<\/a>/i);
  assert.match(html, /<nav[^>]+aria-label="Primary navigation"/i);
  assert.match(html, /<header[^>]+class="site-header"/i);
  assert.match(html, /<section[^>]+class="hero"/i);
  assert.match(html, /<ol[^>]+class="operational-rails"/i);
  assert.match(html, /<article[^>]+class="[^"]*\bcapability-row\b[^"]*"/i);
  assert.match(html, /<footer[^>]+class="site-footer"/i);
  assert.match(html, /Build/);
  assert.match(html, /Operate/);
  assert.match(html, /Optimize/);

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

test("Spanish home renders the approved Alltius positioning", async () => {
  const html = await htmlFor("/es/");
  assert.match(html, /Alltius construye, opera y optimiza capacidad digital para crecer\./);
  assert.match(
    html,
    /ayudar a las empresas a identificar oportunidades, tomar mejores decisiones, atender más demanda y crecer\./,
  );
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
    /<a[^>]+href="\/pt\/contato"[^>]*>Fale sobre seu objetivo de crescimento<\/a>/i,
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

test("home copy keeps growth claims qualified and preserves the scale-economics message", async () => {
  assert.match(await htmlFor("/"), /help companies identify opportunities/);
  assert.match(await htmlFor("/pt/"), /ajudar empresas a identificar oportunidades/);
  assert.match(await htmlFor("/es/"), /ayudar a las empresas a identificar oportunidades/);

  assert.match(await htmlFor("/"), /initial implementation, monthly service and infrastructure/i);
  assert.match(await htmlFor("/pt/"), /implementação inicial, serviço mensal e infraestrutura/i);
  assert.match(await htmlFor("/es/"), /implementación inicial, servicio mensual e infraestructura/i);

  assert.match(await htmlFor("/"), /per-contact, per-message, per-user or per-execution charge/i);
  assert.match(await htmlFor("/pt/"), /por contato, mensagem, usuário ou execução/i);
  assert.match(await htmlFor("/es/"), /por contacto, mensaje, usuario o ejecución/i);

  assert.match(await htmlFor("/"), /third-party charges may still apply\./i);
  assert.match(await htmlFor("/pt/"), /custos de terceiros ainda podem ser aplicados\./i);
  assert.match(await htmlFor("/es/"), /los cargos de terceros todavía pueden aplicarse\./i);
});

test("home copy keeps permission-based marketing explicitly future-gated", async () => {
  assert.match(await htmlFor("/"), /permission-based marketing may be activated later/i);
  assert.match(await htmlFor("/pt/"), /marketing baseado em permissão pode ser ativado depois/i);
  assert.match(await htmlFor("/es/"), /marketing basado en permisos puede activarse más adelante/i);
});

test("email operations pages publish the reviewed service boundaries in every locale", async () => {
  const cases = [
    {
      path: "/email",
      title: "Email & Messaging Operations",
      transactional: /Transactional email is the initial focus/i,
      marketing: /opt-?in[\s\S]*unsubscribe/i,
      lists: /no purchased, rented, scraped or unsolicited lists/i,
      delivery: /bounce[\s\S]*complaint[\s\S]*suppress/i,
      tenants: /client tenants?[\s\S]*reviewed[\s\S]*isolated/i,
      relay: /not offer an open relay/i,
      operator: /AIULLMA LLC/i,
    },
    {
      path: "/pt/email",
      title: "Operações de E-mail e Mensageria",
      transactional: /e-?mail transacional é o foco inicial/i,
      marketing: /opt-?in[\s\S]*descadastro/i,
      lists: /não usamos listas compradas, alugadas, raspadas ou não solicitadas/i,
      delivery: /bounce[\s\S]*reclamaç(?:ão|oes)[\s\S]*supress/i,
      tenants: /tenants? de clientes?[\s\S]*revisad[\w\s\S]*isolad/i,
      relay: /não oferece um open relay/i,
      operator: /AIULLMA LLC/i,
    },
    {
      path: "/es/email",
      title: "Operaciones de Email y Mensajería",
      transactional: /el email transaccional es el enfoque inicial/i,
      marketing: /opt-?in[\s\S]*cancelación de suscripción/i,
      lists: /no usamos listas compradas, alquiladas, extraídas ni no solicitadas/i,
      delivery: /rebotes?[\s\S]*quejas?[\s\S]*supresi/i,
      tenants: /tenants? de clientes?[\s\S]*revisad[\w\s\S]*aislad/i,
      relay: /no ofrece un open relay/i,
      operator: /AIULLMA LLC/i,
    },
  ];

  for (const item of cases) {
    const html = await htmlFor(item.path);
    assert.match(html, new RegExp(`<main[^>]*id=["']main-content["']`, "i"));
    const escapedTitle = item.title.replaceAll("&", "(?:&|&amp;)");
    assert.match(html, new RegExp(`<h1[^>]*>${escapedTitle}<\\/h1>`, "i"));
    assert.equal((html.match(/<h1\b/gi) ?? []).length, 1, `${item.path} must render a single h1`);
    assert.match(html, item.transactional);
    assert.match(html, item.marketing);
    assert.match(html, item.lists);
    assert.match(html, item.delivery);
    assert.match(html, item.tenants);
    assert.match(html, item.relay);
    assert.match(html, item.operator);
  }
});

test("legal pages identify the AIULLMA LLC legal entity", async () => {
  for (const path of expectedRoutes.filter((path) => path !== "/" && path !== "/pt/" && path !== "/es/")) {
    assert.match(await htmlFor(path), /AIULLMA LLC/);
  }
});

test("legal pages explain email-service privacy, acceptable use and control boundaries", async () => {
  const cases = [
    {
      privacy: "/privacy",
      privacyPatterns: [
        /recipient[\s\S]*delivery[\s\S]*bounce[\s\S]*complaint[\s\S]*preference data/i,
        /AIULLMA LLC is the controller for this website/i,
        /client may control recipient data in a managed service/i,
      ],
      terms: "/terms",
      termsPatterns: [
        /not offer an open relay/i,
        /unlawful or unsolicited mail/i,
        /tenant review/i,
        /identity verification/i,
        /suspend service for abuse/i,
        /separate client agreements/i,
      ],
      deletion: "/data-deletion",
      deletionPatterns: [
        /Alltius-controlled records/i,
        /client-controlled audience/i,
      ],
    },
    {
      privacy: "/pt/privacidade",
      privacyPatterns: [
        /destinatári[\w\s\S]*entrega[\s\S]*bounce[\s\S]*reclamaç(?:ão|ões)[\s\S]*preferênc/i,
        /A AIULLMA LLC é controladora deste site/i,
        /cliente pode controlar os dados de destinatários em um serviço gerenciado/i,
      ],
      terms: "/pt/termos",
      termsPatterns: [
        /não oferece um open relay/i,
        /e-?mail ilegal ou não solicitado/i,
        /revisão do tenant/i,
        /verificação de identidade/i,
        /suspender o serviço por abuso/i,
        /acordos separados com clientes/i,
      ],
      deletion: "/pt/exclusao-de-dados",
      deletionPatterns: [
        /registros controlados pela Alltius/i,
        /audiência controlada por cliente/i,
      ],
    },
    {
      privacy: "/es/privacidad",
      privacyPatterns: [
        /destinatari[\w\s\S]*entrega[\s\S]*rebotes?[\s\S]*quejas?[\s\S]*preferenci/i,
        /AIULLMA LLC es responsable del tratamiento de este sitio/i,
        /cliente puede controlar los datos de destinatarios en un servicio gestionado/i,
      ],
      terms: "/es/terminos",
      termsPatterns: [
        /no ofrece un open relay/i,
        /correo ilegal o no solicitado/i,
        /revisión del tenant/i,
        /verificación de identidad/i,
        /suspender el servicio por abuso/i,
        /acuerdos separados con clientes/i,
      ],
      deletion: "/es/eliminacion-de-datos",
      deletionPatterns: [
        /registros controlados por Alltius/i,
        /audiencia controlada por el cliente/i,
      ],
    },
  ];

  for (const item of cases) {
    const privacyHtml = await htmlFor(item.privacy);
    for (const pattern of item.privacyPatterns) {
      assert.match(privacyHtml, pattern, `${item.privacy} must include ${pattern}`);
    }

    const termsHtml = await htmlFor(item.terms);
    for (const pattern of item.termsPatterns) {
      assert.match(termsHtml, pattern, `${item.terms} must include ${pattern}`);
    }

    const deletionHtml = await htmlFor(item.deletion);
    for (const pattern of item.deletionPatterns) {
      assert.match(deletionHtml, pattern, `${item.deletion} must include ${pattern}`);
    }
  }
});

test("language selectors link every page to its EN PT and ES equivalents", async () => {
  const routeGroups = [
    [{ path: "/", label: "English", hrefLang: "en" }, { path: "/pt/", label: "Português", hrefLang: "pt-BR" }, { path: "/es/", label: "Español", hrefLang: "es-419" }],
    [{ path: "/contact", label: "English", hrefLang: "en" }, { path: "/pt/contato", label: "Português", hrefLang: "pt-BR" }, { path: "/es/contacto", label: "Español", hrefLang: "es-419" }],
    [{ path: "/email", label: "English", hrefLang: "en" }, { path: "/pt/email", label: "Português", hrefLang: "pt-BR" }, { path: "/es/email", label: "Español", hrefLang: "es-419" }],
    [{ path: "/privacy", label: "English", hrefLang: "en" }, { path: "/pt/privacidade", label: "Português", hrefLang: "pt-BR" }, { path: "/es/privacidad", label: "Español", hrefLang: "es-419" }],
    [{ path: "/terms", label: "English", hrefLang: "en" }, { path: "/pt/termos", label: "Português", hrefLang: "pt-BR" }, { path: "/es/terminos", label: "Español", hrefLang: "es-419" }],
    [{ path: "/data-deletion", label: "English", hrefLang: "en" }, { path: "/pt/exclusao-de-dados", label: "Português", hrefLang: "pt-BR" }, { path: "/es/eliminacion-de-datos", label: "Español", hrefLang: "es-419" }],
  ];

  for (const group of routeGroups) {
    for (const current of group) {
      const html = await htmlFor(current.path);
      const switchers = [...html.matchAll(/<div[^>]+class="language-switcher"[^>]*>([\s\S]*?)<\/div>/gi)];
      assert.equal(switchers.length, 2, `${current.path} must render desktop and mobile selectors`);
      for (const [, switcher] of switchers) {
        assert.match(switcher, new RegExp(`<span[^>]+aria-current=["']page["'][^>]*>${current.label}<\\/span>`));
        for (const target of group.filter((item) => item.path !== current.path)) {
          assert.match(
            switcher,
            new RegExp(`<a(?=[^>]*href=["']${target.path}["'])(?=[^>]*hrefLang=["']${target.hrefLang}["'])[^>]*>`),
          );
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
