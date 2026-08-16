export type Locale = "en" | "pt" | "es";

export type LegalPageKey = "contact" | "privacy" | "terms" | "dataDeletion";

export const routePairs = {
  home: { en: "/", pt: "/pt/", es: "/es/" },
  contact: { en: "/contact", pt: "/pt/contato", es: "/es/contacto" },
  privacy: { en: "/privacy", pt: "/pt/privacidade", es: "/es/privacidad" },
  terms: { en: "/terms", pt: "/pt/termos", es: "/es/terminos" },
  dataDeletion: {
    en: "/data-deletion",
    pt: "/pt/exclusao-de-dados",
    es: "/es/eliminacion-de-datos",
  },
} as const;

export const publicAddress =
  "2105 Vista Oeste NW Ste E, 1349, Albuquerque, NM 87120, United States";

type Section = {
  heading: string;
  paragraphs: string[];
};

type LegalContent = {
  title: string;
  description: string;
  introduction: string;
  email?: "contact@aiullma.com" | "privacy@aiullma.com";
  sections: Section[];
};

export type SiteContent = {
  nav: {
    home: string;
    company: string;
    capabilities: string;
    model: string;
    contact: string;
    language: string;
  };
  footer: {
    policies: string;
    privacy: string;
    terms: string;
    dataDeletion: string;
    disclaimer: string;
  };
  home: {
    seoTitle: string;
    seoDescription: string;
    eyebrow: string;
    headline: string;
    support: string[];
    primaryCta: string;
    secondaryCta: string;
    companyTitle: string;
    company: string;
    capabilitiesTitle: string;
    capabilities: Array<{ title: string; description: string }>;
    modelTitle: string;
    model: Array<{ title: string; description: string }>;
    scalingTitle: string;
    commercialQualifier: string;
    trustTitle: string;
    trust: string;
    contactTitle: string;
    contactPrompt: string;
    contactSafety: string;
  };
  legal: Record<LegalPageKey, LegalContent>;
};

export const siteContent: Record<Locale, SiteContent> = {
  en: {
    nav: {
      home: "Home",
      company: "Company",
      capabilities: "Capabilities",
      model: "Operating model",
      contact: "Contact",
      language: "Português",
    },
    footer: {
      policies: "Policies",
      privacy: "Privacy",
      terms: "Terms",
      dataDeletion: "Data deletion",
      disclaimer:
        "References to third-party products do not imply affiliation, certification or endorsement.",
    },
    home: {
      seoTitle: "AIULLMA | Managed technology and AI services for growth",
      seoDescription:
        "AIULLMA builds, operates and optimizes automation, AI agents, BI, systems and dedicated infrastructure to help companies grow revenue and operating capacity.",
      eyebrow: "AIULLMA LLC · NEW MEXICO, UNITED STATES",
      headline: "Managed technology and AI services for companies ready to grow revenue.",
      support: [
        "AIULLMA builds, operates and optimizes automation, systems, AI agents, business intelligence and dedicated infrastructure to help companies identify opportunities, make better decisions, serve more demand and grow.",
        "We deliver this capability as an ongoing service, so every gain in scale strengthens revenue and margins—instead of being absorbed by fees for each user, contact, message or automation.",
      ],
      primaryCta: "Discuss your growth objective",
      secondaryCta: "See our service model",
      companyTitle: "A service company built around growth",
      company:
        "AIULLMA LLC is a managed technology and AI services company registered in New Mexico, United States. We build, operate and optimize systems that expand our clients’ commercial and operating capacity. Certain services may be delivered under the Alltius operating brand.",
      capabilitiesTitle: "Capabilities that turn operations into growth",
      capabilities: [
        {
          title: "Revenue-focused automation",
          description:
            "We connect commercial and operating workflows to reduce friction, accelerate execution and turn more demand into results.",
        },
        {
          title: "BI for growth decisions",
          description:
            "We bring together revenue, performance, cost and opportunity indicators so decisions can be faster and better informed.",
        },
        {
          title: "AI agents embedded in operations",
          description:
            "We apply AI agents to defined tasks and workflows, expanding team capacity with control and context.",
        },
        {
          title: "Managed systems and infrastructure",
          description:
            "We operate applications, integrations and dedicated environments that support the service as demand evolves.",
        },
      ],
      modelTitle: "We build, operate and optimize as an ongoing service.",
      model: [
        {
          title: "Growth-focused build",
          description:
            "We translate commercial and operating objectives into systems, automation, indicators and an appropriate technical foundation.",
        },
        {
          title: "Continuous operation",
          description:
            "We keep applications, integrations and infrastructure running within the agreed scope and capacity.",
        },
        {
          title: "Optimization with data and AI",
          description:
            "We use observed performance, BI and AI capabilities to prioritize improvements and expand results over time.",
        },
      ],
      scalingTitle: "Make scale strengthen revenue and margins.",
      commercialQualifier:
        "AIULLMA’s model combines ongoing service, scope and capacity. This reduces dependence on charges that automatically grow with every user, contact, message or automation and allows solution economics to follow the business objective. Cloud, telecommunications, platform and other third-party charges may apply.",
      trustTitle: "Built for clear diligence",
      trust:
        "AIULLMA LLC is registered in New Mexico, United States. Our public policies and direct company contacts are available below.",
      contactTitle: "Start with the growth objective",
      contactPrompt:
        "Tell us which revenue or capacity outcome your company is pursuing, how the operation works today, which systems are involved and what limits the next stage of growth.",
      contactSafety:
        "Please do not send credentials, API keys, client databases or sensitive personal data by email.",
    },
    legal: {
      contact: {
        title: "Contact AIULLMA LLC",
        description: "Direct corporate contact for AIULLMA LLC.",
        introduction:
          "Contact AIULLMA LLC directly to discuss a prospective technology-services engagement.",
        email: "contact@aiullma.com",
        sections: [
          {
            heading: "Useful initial context",
            paragraphs: [
              "Please include the workflow or operating objective, systems involved, desired outcome and any relevant timeline or constraints.",
              "Do not send credentials, passwords, tokens, API keys, client databases or sensitive personal data by email.",
            ],
          },
          {
            heading: "Business address",
            paragraphs: [publicAddress],
          },
        ],
      },
      privacy: {
        title: "Privacy Notice",
        description: "How AIULLMA LLC handles information for its public website.",
        introduction:
          "This notice explains how AIULLMA LLC handles personal information connected with this public website and direct email inquiries.",
        email: "privacy@aiullma.com",
        sections: [
          {
            heading: "Information we use",
            paragraphs: [
              "At launch, this website uses no advertising pixels, analytics, session replay, fingerprinting or non-essential cookies. Ordinary hosting and security logs may be generated when the site is visited.",
              "When you email us, we use the information you provide to respond to your inquiry, evaluate a potential engagement and maintain reasonable business records.",
            ],
          },
          {
            heading: "Service providers and transfers",
            paragraphs: [
              "We may use hosting, email, security and professional service providers to operate the website and respond to inquiries. These providers may process information in countries other than yours, subject to appropriate safeguards where required.",
            ],
          },
          {
            heading: "Retention, security and rights",
            paragraphs: [
              "We retain information only for as long as reasonably necessary for the purposes described here, including legal, accounting, security and backup needs. We use reasonable administrative and technical safeguards, but no transmission or system is completely secure.",
              "You may request access, correction, deletion or other applicable privacy rights by emailing privacy@aiullma.com. AIULLMA LLC is the controller for this website; where we process data for a client system, the client may control the relevant request.",
            ],
          },
        ],
      },
      terms: {
        title: "Terms of Use",
        description: "Terms that apply to the public AIULLMA LLC website.",
        introduction:
          "These Terms of Use apply only to this public AIULLMA LLC website.",
        sections: [
          {
            heading: "Permitted use",
            paragraphs: [
              "You may use this site for lawful informational purposes. Do not interfere with the site, attempt unauthorized access, introduce harmful material or use its content in a misleading way.",
              "The site content is owned by AIULLMA LLC or its licensors and may not be copied or reused except as permitted by law or with written permission.",
            ],
          },
          {
            heading: "Information and third parties",
            paragraphs: [
              "Site content is general information and does not create a service commitment. References or links to third-party products or sites do not imply affiliation, certification or endorsement.",
              "Paid services are governed by separate proposals, statements of work or other agreements accepted for the relevant engagement.",
            ],
          },
          {
            heading: "Disclaimers and governing context",
            paragraphs: [
              "This site is provided as available to the extent permitted by law, without warranties of uninterrupted availability or fitness for a particular purpose. AIULLMA LLC is not liable for indirect or consequential losses arising from use of this public site to the extent permitted by law.",
              "These terms are governed by the applicable laws of New Mexico, United States. We may update them by posting a revised version. Questions may be sent to contact@aiullma.com.",
            ],
          },
        ],
      },
      dataDeletion: {
        title: "Data Deletion Requests",
        description: "How to request deletion of AIULLMA LLC-controlled information.",
        introduction:
          "To request deletion of personal information controlled by AIULLMA LLC, email privacy@aiullma.com from an address associated with the request.",
        email: "privacy@aiullma.com",
        sections: [
          {
            heading: "What to include",
            paragraphs: [
              "Include your name, company, relationship to AIULLMA LLC, the data or service concerned and enough context to help us locate the relevant record.",
              "Do not send passwords, tokens, API keys, customer lists or sensitive datasets in a deletion request.",
            ],
          },
          {
            heading: "How requests are handled",
            paragraphs: [
              "We may verify your identity before acting on a request. Where appropriate, we will delete or anonymize information, subject to legitimate legal, security, accounting and backup-retention requirements that may limit immediate erasure.",
              "If the requested data is controlled by one of our clients, the request may need to be directed to that client. We will explain the applicable next step where reasonably possible.",
            ],
          },
        ],
      },
    },
  },
  pt: {
    nav: {
      home: "Início",
      company: "Empresa",
      capabilities: "Capacidades",
      model: "Modelo operacional",
      contact: "Contato",
      language: "English",
    },
    footer: {
      policies: "Políticas",
      privacy: "Privacidade",
      terms: "Termos",
      dataDeletion: "Exclusão de dados",
      disclaimer:
        "Referências a produtos de terceiros não implicam afiliação, certificação ou endosso.",
    },
    home: {
      seoTitle: "AIULLMA | Serviços gerenciados de tecnologia e IA para crescimento",
      seoDescription:
        "A AIULLMA constrói, opera e otimiza automações, agentes de IA, BI e infraestrutura dedicada para ampliar receita, margem e capacidade operacional de empresas.",
      eyebrow: "AIULLMA LLC · NEW MEXICO, ESTADOS UNIDOS",
      headline: "Serviços gerenciados de tecnologia e IA para empresas prontas para faturar mais.",
      support: [
        "A AIULLMA constrói, opera e otimiza automações, sistemas, agentes de IA, inteligência de dados e infraestrutura dedicada para ajudar empresas a identificar oportunidades, tomar decisões melhores, atender mais demanda e crescer.",
        "Entregamos essa capacidade como serviço contínuo, para que cada ganho de escala fortaleça a receita e a margem — em vez de ser absorvido por cobranças por usuário, contato, mensagem ou automação.",
      ],
      primaryCta: "Fale sobre sua meta de crescimento",
      secondaryCta: "Conheça nosso modelo de serviço",
      companyTitle: "Uma empresa de serviços para crescimento",
      company:
        "A AIULLMA LLC é uma empresa de serviços gerenciados de tecnologia e IA registrada no New Mexico, Estados Unidos. Construímos, operamos e otimizamos sistemas que ampliam a capacidade comercial e operacional de nossos clientes. Determinados serviços podem ser entregues sob a marca operacional Alltius.",
      capabilitiesTitle: "Capacidades para transformar operação em crescimento",
      capabilities: [
        {
          title: "Automação orientada à receita",
          description:
            "Conectamos processos comerciais e operacionais para reduzir atrito, acelerar execução e transformar mais demanda em resultado.",
        },
        {
          title: "BI para decisões de crescimento",
          description:
            "Reunimos indicadores de receita, desempenho, custos e oportunidades para tornar decisões mais rápidas e fundamentadas.",
        },
        {
          title: "Agentes de IA integrados à operação",
          description:
            "Aplicamos agentes de IA em tarefas e fluxos definidos, ampliando a capacidade das equipes com controle e contexto.",
        },
        {
          title: "Sistemas e infraestrutura gerenciados",
          description:
            "Operamos aplicações, integrações e ambientes dedicados que sustentam o serviço e acompanham a evolução da demanda.",
        },
      ],
      modelTitle: "Construímos, operamos e otimizamos como um serviço contínuo.",
      model: [
        {
          title: "Construção orientada ao crescimento",
          description:
            "Traduzimos objetivos comerciais e operacionais em sistemas, automações, indicadores e uma base técnica adequada.",
        },
        {
          title: "Operação contínua",
          description:
            "Mantemos aplicações, integrações e infraestrutura funcionando dentro do escopo e da capacidade acordados.",
        },
        {
          title: "Otimização com dados e IA",
          description:
            "Usamos desempenho observado, BI e recursos de IA para priorizar melhorias e ampliar resultados ao longo do tempo.",
        },
      ],
      scalingTitle: "Faça a escala fortalecer receita e margem.",
      commercialQualifier:
        "O modelo da AIULLMA combina serviço contínuo, escopo e capacidade. Isso reduz a dependência de cobranças que crescem automaticamente a cada usuário, contato, mensagem ou automação e permite que a economia da solução acompanhe o objetivo do negócio. Tarifas de nuvem, telecomunicações, plataformas e outros terceiros podem ser aplicadas.",
      trustTitle: "Base para uma diligência clara",
      trust:
        "A AIULLMA LLC é registrada no New Mexico, Estados Unidos. Nossas políticas públicas e contatos corporativos diretos estão disponíveis abaixo.",
      contactTitle: "Comece pela meta de crescimento",
      contactPrompt:
        "Conte qual resultado de receita ou capacidade sua empresa busca, como a operação funciona hoje, quais sistemas estão envolvidos e o que limita o próximo estágio de crescimento.",
      contactSafety:
        "Não envie credenciais, chaves de API, bases de clientes ou dados pessoais sensíveis por e-mail.",
    },
    legal: {
      contact: {
        title: "Contato da AIULLMA LLC",
        description: "Contato corporativo direto da AIULLMA LLC.",
        introduction:
          "Entre em contato diretamente com a AIULLMA LLC para conversar sobre uma possível contratação de serviços tecnológicos.",
        email: "contact@aiullma.com",
        sections: [
          {
            heading: "Contexto inicial útil",
            paragraphs: [
              "Inclua o fluxo ou objetivo operacional, sistemas envolvidos, resultado desejado e prazos ou restrições relevantes.",
              "Não envie credenciais, senhas, tokens, chaves de API, bases de clientes ou dados pessoais sensíveis por e-mail.",
            ],
          },
          { heading: "Endereço empresarial", paragraphs: [publicAddress] },
        ],
      },
      privacy: {
        title: "Aviso de Privacidade",
        description:
          "Como a AIULLMA LLC trata informações no seu site público.",
        introduction:
          "Este aviso explica como a AIULLMA LLC trata informações pessoais relacionadas a este site público e a contatos diretos por e-mail.",
        email: "privacy@aiullma.com",
        sections: [
          {
            heading: "Informações que usamos",
            paragraphs: [
              "No lançamento, este site não usa pixels publicitários, analytics, gravação de sessão, fingerprinting ou cookies não essenciais. Logs comuns de hospedagem e segurança podem ser gerados quando o site é visitado.",
              "Quando você nos envia um e-mail, usamos as informações fornecidas para responder à solicitação, avaliar um possível projeto e manter registros comerciais razoáveis.",
            ],
          },
          {
            heading: "Prestadores e transferências",
            paragraphs: [
              "Podemos usar prestadores de hospedagem, e-mail, segurança e serviços profissionais para operar o site e responder às solicitações. Esses prestadores podem processar informações em outros países, com salvaguardas apropriadas quando exigidas.",
            ],
          },
          {
            heading: "Retenção, segurança e direitos",
            paragraphs: [
              "Mantemos informações somente pelo tempo razoavelmente necessário às finalidades descritas, inclusive necessidades legais, contábeis, de segurança e de backup. Usamos salvaguardas administrativas e técnicas razoáveis, mas nenhuma transmissão ou sistema é completamente seguro.",
              "Você pode solicitar acesso, correção, exclusão ou outros direitos aplicáveis enviando um e-mail para privacy@aiullma.com. A AIULLMA LLC é controladora deste site; quando tratamos dados para um sistema de cliente, o cliente pode controlar a solicitação pertinente.",
            ],
          },
        ],
      },
      terms: {
        title: "Termos de Uso",
        description: "Termos aplicáveis ao site público da AIULLMA LLC.",
        introduction:
          "Estes Termos de Uso aplicam-se apenas a este site público da AIULLMA LLC.",
        sections: [
          {
            heading: "Uso permitido",
            paragraphs: [
              "Você pode usar este site para fins informativos e lícitos. Não interfira no site, tente acesso não autorizado, introduza material nocivo ou use seu conteúdo de forma enganosa.",
              "O conteúdo do site pertence à AIULLMA LLC ou a seus licenciadores e não pode ser copiado ou reutilizado exceto quando permitido por lei ou por autorização escrita.",
            ],
          },
          {
            heading: "Informações e terceiros",
            paragraphs: [
              "O conteúdo do site é informação geral e não cria compromisso de serviço. Referências ou links a produtos ou sites de terceiros não implicam afiliação, certificação ou endosso.",
              "Serviços pagos são regidos por propostas, declarações de trabalho ou outros contratos separados aceitos para o projeto correspondente.",
            ],
          },
          {
            heading: "Isenções e contexto aplicável",
            paragraphs: [
              "Este site é fornecido conforme disponível, na extensão permitida por lei, sem garantias de disponibilidade ininterrupta ou adequação a uma finalidade específica. A AIULLMA LLC não responde por perdas indiretas ou consequenciais decorrentes do uso deste site público na extensão permitida por lei.",
              "Estes termos são regidos pelas leis aplicáveis do New Mexico, Estados Unidos. Podemos atualizá-los mediante publicação de versão revisada. Dúvidas podem ser enviadas para contact@aiullma.com.",
            ],
          },
        ],
      },
      dataDeletion: {
        title: "Solicitações de Exclusão de Dados",
        description:
          "Como solicitar a exclusão de informações controladas pela AIULLMA LLC.",
        introduction:
          "Para solicitar a exclusão de informações pessoais controladas pela AIULLMA LLC, envie um e-mail para privacy@aiullma.com de um endereço associado à solicitação.",
        email: "privacy@aiullma.com",
        sections: [
          {
            heading: "O que incluir",
            paragraphs: [
              "Inclua seu nome, empresa, relação com a AIULLMA LLC, os dados ou serviço envolvidos e contexto suficiente para localizar o registro pertinente.",
              "Não envie senhas, tokens, chaves de API, listas de clientes ou conjuntos de dados sensíveis em uma solicitação de exclusão.",
            ],
          },
          {
            heading: "Como as solicitações são tratadas",
            paragraphs: [
              "Podemos verificar sua identidade antes de agir. Quando apropriado, excluiremos ou anonimizaremos informações, sujeito a requisitos legítimos de retenção legal, de segurança, contábil e de backup que podem limitar a exclusão imediata.",
              "Se os dados solicitados forem controlados por um de nossos clientes, a solicitação poderá precisar ser direcionada ao cliente. Explicaremos o próximo passo aplicável quando razoavelmente possível.",
            ],
          },
        ],
      },
    },
  },
  es: {
    nav: {
      home: "Inicio",
      company: "Empresa",
      capabilities: "Capacidades",
      model: "Modelo de servicio",
      contact: "Contacto",
      language: "English",
    },
    footer: {
      policies: "Políticas",
      privacy: "Privacidad",
      terms: "Términos",
      dataDeletion: "Eliminación de datos",
      disclaimer:
        "Las referencias a productos de terceros no implican afiliación, certificación ni respaldo.",
    },
    home: {
      seoTitle: "AIULLMA | Servicios gestionados de tecnología e IA para crecer",
      seoDescription:
        "AIULLMA construye, opera y optimiza automatizaciones, agentes de IA, BI e infraestructura dedicada para ayudar a aumentar ingresos y capacidad operativa.",
      eyebrow: "AIULLMA LLC · NEW MEXICO, ESTADOS UNIDOS",
      headline:
        "Servicios gestionados de tecnología e IA para empresas preparadas para generar más ingresos.",
      support: [
        "AIULLMA construye, opera y optimiza automatizaciones, sistemas, agentes de IA, inteligencia de negocios e infraestructura dedicada para ayudar a las empresas a identificar oportunidades, tomar mejores decisiones, atender una mayor demanda y crecer.",
        "Entregamos esta capacidad como un servicio continuo, para que cada avance en escala fortalezca los ingresos y los márgenes, en lugar de quedar absorbido por cobros por usuario, contacto, mensaje o automatización.",
      ],
      primaryCta: "Hablemos de su objetivo de crecimiento",
      secondaryCta: "Conozca nuestro modelo de servicio",
      companyTitle: "Una empresa de servicios orientada al crecimiento",
      company:
        "AIULLMA LLC es una empresa de servicios gestionados de tecnología e IA registrada en New Mexico, Estados Unidos. Construimos, operamos y optimizamos sistemas que amplían la capacidad comercial y operativa de nuestros clientes. Algunos servicios pueden prestarse bajo la marca operativa Alltius.",
      capabilitiesTitle: "Capacidades que convierten la operación en crecimiento",
      capabilities: [
        {
          title: "Automatización orientada a los ingresos",
          description:
            "Conectamos procesos comerciales y operativos para reducir fricción, acelerar la ejecución y convertir una mayor demanda en resultados.",
        },
        {
          title: "BI para decisiones de crecimiento",
          description:
            "Reunimos indicadores de ingresos, desempeño, costos y oportunidades para tomar decisiones más rápidas y mejor fundamentadas.",
        },
        {
          title: "Agentes de IA integrados en la operación",
          description:
            "Aplicamos agentes de IA a tareas y flujos definidos, ampliando la capacidad de los equipos con control y contexto.",
        },
        {
          title: "Sistemas e infraestructura gestionados",
          description:
            "Operamos aplicaciones, integraciones y entornos dedicados que sostienen el servicio a medida que evoluciona la demanda.",
        },
      ],
      modelTitle: "Construimos, operamos y optimizamos como un servicio continuo.",
      model: [
        {
          title: "Construcción orientada al crecimiento",
          description:
            "Traducimos objetivos comerciales y operativos en sistemas, automatizaciones, indicadores y una base técnica adecuada.",
        },
        {
          title: "Operación continua",
          description:
            "Mantenemos aplicaciones, integraciones e infraestructura en funcionamiento dentro del alcance y la capacidad acordados.",
        },
        {
          title: "Optimización con datos e IA",
          description:
            "Utilizamos el desempeño observado, BI y capacidades de IA para priorizar mejoras y ampliar resultados a lo largo del tiempo.",
        },
      ],
      scalingTitle: "Haga que la escala fortalezca los ingresos y los márgenes.",
      commercialQualifier:
        "El modelo de AIULLMA combina servicio continuo, alcance y capacidad. Esto reduce la dependencia de cobros que aumentan automáticamente con cada usuario, contacto, mensaje o automatización y permite que la economía de la solución acompañe el objetivo del negocio. Pueden aplicarse cargos de nube, telecomunicaciones, plataformas y otros terceros.",
      trustTitle: "Preparada para una evaluación clara",
      trust:
        "AIULLMA LLC está registrada en New Mexico, Estados Unidos. Nuestras políticas públicas y contactos corporativos directos están disponibles a continuación.",
      contactTitle: "Comience por el objetivo de crecimiento",
      contactPrompt:
        "Cuéntenos qué resultado de ingresos o capacidad busca su empresa, cómo funciona actualmente la operación, qué sistemas intervienen y qué limita la siguiente etapa de crecimiento.",
      contactSafety:
        "No envíe credenciales, claves de API, bases de clientes ni datos personales sensibles por correo electrónico.",
    },
    legal: {
      contact: {
        title: "Contacto de AIULLMA LLC",
        description: "Contacto corporativo directo de AIULLMA LLC.",
        introduction:
          "Comuníquese directamente con AIULLMA LLC para conversar sobre una posible contratación de servicios tecnológicos.",
        email: "contact@aiullma.com",
        sections: [
          {
            heading: "Contexto inicial útil",
            paragraphs: [
              "Indique el flujo u objetivo operativo, los sistemas involucrados, el resultado esperado y cualquier plazo o restricción relevante.",
              "No envíe credenciales, contraseñas, tokens, claves de API, bases de clientes ni datos personales sensibles por correo electrónico.",
            ],
          },
          { heading: "Dirección comercial", paragraphs: [publicAddress] },
        ],
      },
      privacy: {
        title: "Aviso de Privacidad",
        description:
          "Cómo gestiona AIULLMA LLC la información en su sitio web público.",
        introduction:
          "Este aviso explica cómo gestiona AIULLMA LLC la información personal relacionada con este sitio web público y con las consultas directas por correo electrónico.",
        email: "privacy@aiullma.com",
        sections: [
          {
            heading: "Información que utilizamos",
            paragraphs: [
              "En su lanzamiento, este sitio no utiliza píxeles publicitarios, herramientas de analítica, grabación de sesiones, técnicas de fingerprinting ni cookies no esenciales. Cuando se visita el sitio, pueden generarse registros ordinarios de alojamiento y seguridad.",
              "Cuando nos envía un correo electrónico, utilizamos la información proporcionada para responder a su consulta, evaluar una posible contratación y mantener registros comerciales razonables.",
            ],
          },
          {
            heading: "Proveedores y transferencias",
            paragraphs: [
              "Podemos utilizar proveedores de alojamiento, correo electrónico, seguridad y servicios profesionales para operar el sitio y responder a las consultas. Estos proveedores pueden procesar información en países distintos al suyo, con las salvaguardas adecuadas cuando sean exigidas.",
            ],
          },
          {
            heading: "Conservación, seguridad y derechos",
            paragraphs: [
              "Conservamos la información únicamente durante el tiempo razonablemente necesario para los fines descritos, incluidas necesidades legales, contables, de seguridad y de respaldo. Utilizamos salvaguardas administrativas y técnicas razonables, pero ninguna transmisión ni sistema es completamente seguro.",
              "Puede solicitar acceso, corrección, eliminación u otros derechos aplicables escribiendo a privacy@aiullma.com. AIULLMA LLC es responsable del tratamiento de este sitio; cuando tratamos datos para un sistema de un cliente, el cliente puede controlar la solicitud correspondiente.",
            ],
          },
        ],
      },
      terms: {
        title: "Términos de Uso",
        description: "Términos aplicables al sitio web público de AIULLMA LLC.",
        introduction:
          "Estos Términos de Uso se aplican únicamente a este sitio web público de AIULLMA LLC.",
        sections: [
          {
            heading: "Uso permitido",
            paragraphs: [
              "Puede utilizar este sitio con fines informativos y lícitos. No interfiera con el sitio, intente obtener acceso no autorizado, introduzca material dañino ni utilice su contenido de forma engañosa.",
              "El contenido del sitio pertenece a AIULLMA LLC o a sus licenciantes y no puede copiarse ni reutilizarse salvo cuando lo permita la ley o exista autorización por escrito.",
            ],
          },
          {
            heading: "Información y terceros",
            paragraphs: [
              "El contenido del sitio es información general y no crea un compromiso de servicio. Las referencias o enlaces a productos o sitios de terceros no implican afiliación, certificación ni respaldo.",
              "Los servicios de pago se rigen por propuestas, alcances de trabajo u otros contratos independientes aceptados para la contratación correspondiente.",
            ],
          },
          {
            heading: "Exenciones y contexto aplicable",
            paragraphs: [
              "Este sitio se proporciona según disponibilidad, en la medida permitida por la ley, sin garantías de disponibilidad ininterrumpida ni de idoneidad para un fin específico. AIULLMA LLC no responde por pérdidas indirectas o consecuentes derivadas del uso de este sitio público, en la medida permitida por la ley.",
              "Estos términos se rigen por las leyes aplicables de New Mexico, Estados Unidos. Podemos actualizarlos mediante la publicación de una versión revisada. Las consultas pueden enviarse a contact@aiullma.com.",
            ],
          },
        ],
      },
      dataDeletion: {
        title: "Solicitudes de Eliminación de Datos",
        description:
          "Cómo solicitar la eliminación de información controlada por AIULLMA LLC.",
        introduction:
          "Para solicitar la eliminación de información personal controlada por AIULLMA LLC, escriba a privacy@aiullma.com desde una dirección asociada con la solicitud.",
        email: "privacy@aiullma.com",
        sections: [
          {
            heading: "Qué debe incluir",
            paragraphs: [
              "Incluya su nombre, empresa, relación con AIULLMA LLC, los datos o el servicio involucrados y suficiente contexto para ayudarnos a localizar el registro correspondiente.",
              "No envíe contraseñas, tokens, claves de API, listas de clientes ni conjuntos de datos sensibles en una solicitud de eliminación.",
            ],
          },
          {
            heading: "Cómo se gestionan las solicitudes",
            paragraphs: [
              "Podemos verificar su identidad antes de actuar. Cuando corresponda, eliminaremos o anonimizaremos la información, sujeto a requisitos legítimos de conservación legal, de seguridad, contable y de respaldo que pueden limitar la eliminación inmediata.",
              "Si los datos solicitados están controlados por uno de nuestros clientes, es posible que la solicitud deba dirigirse a ese cliente. Explicaremos el siguiente paso aplicable cuando sea razonablemente posible.",
            ],
          },
        ],
      },
    },
  },
};
