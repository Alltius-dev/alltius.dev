export type Locale = "en" | "pt" | "es";

export type LegalPageKey = "contact" | "privacy" | "terms" | "dataDeletion";

export type EmailOperationsContent = {
  title: string;
  description: string;
  introduction: string;
  sections: Array<{ heading: string; paragraphs: string[] }>;
  cta: string;
};

export const routePairs = {
  home: { en: "/", pt: "/pt/", es: "/es/" },
  contact: { en: "/contact/", pt: "/pt/contato/", es: "/es/contacto/" },
  privacy: { en: "/privacy/", pt: "/pt/privacidade/", es: "/es/privacidad/" },
  terms: { en: "/terms/", pt: "/pt/termos/", es: "/es/terminos/" },
  email: { en: "/email/", pt: "/pt/email/", es: "/es/email/" },
  dataDeletion: {
    en: "/data-deletion/",
    pt: "/pt/exclusao-de-dados/",
    es: "/es/eliminacion-de-datos/",
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
    languages: string;
  };
  footer: {
    policies: string;
    email: string;
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
  emailOperations: EmailOperationsContent;
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
      languages: "Languages",
    },
    footer: {
      policies: "Policies",
      email: "Email & Messaging",
      privacy: "Privacy",
      terms: "Terms",
      dataDeletion: "Data deletion",
      disclaimer:
        "References to third-party products do not imply affiliation, certification or endorsement.",
    },
    home: {
      seoTitle: "Alltius | Digital capacity services for growth",
      seoDescription:
        "Alltius builds, operates and optimizes automation, BI, AI, customer-service systems and managed infrastructure to expand growth capacity.",
      eyebrow: "ALLTIUS · OPERATED BY AIULLMA LLC",
      headline: "Alltius builds, operates and optimizes digital capacity for growth.",
      support: [
        "Focused services in customer operations, automation, data and BI, AI, email and managed infrastructure help companies identify opportunities, make better decisions, serve more demand and grow.",
        "Each specialist front can stand alone and is delivered through implementation, continuous operation and measured optimization.",
      ],
      primaryCta: "Discuss your growth objective",
      secondaryCta: "See our service model",
      companyTitle: "A specialist service brand for growth capacity",
      company:
        "Alltius is a service brand operated by AIULLMA LLC, registered in New Mexico, United States. We build, operate and optimize focused technology capabilities that can expand commercial and operating capacity.",
      capabilitiesTitle: "Specialist service fronts",
      capabilities: [
        {
          title: "Alltius Atendimento",
          description:
            "Managed customer-service systems, channels and operating workflows designed to help teams respond consistently and serve more demand.",
        },
        {
          title: "Alltius Automação",
          description:
            "Focused workflow and systems automation that can reduce friction, accelerate execution and connect commercial and operating work.",
        },
        {
          title: "Alltius Dados/BI",
          description:
            "Data foundations, indicators and business intelligence designed to support faster, better-informed growth decisions.",
        },
        {
          title: "Alltius IA",
          description:
            "AI agents and assisted workflows applied to defined tasks, with operational context, oversight and measurable boundaries.",
        },
        {
          title: "Alltius Email & Messaging",
          description:
            "Transactional and operational delivery comes first; permission-based marketing may be activated later after opt-in, preference and unsubscribe controls are operating.",
        },
      ],
      modelTitle: "Build, operate and optimize as an ongoing service.",
      model: [
        {
          title: "Build",
          description:
            "An initial implementation translates the selected objective into systems, workflows, indicators and the right technical foundation.",
        },
        {
          title: "Operate",
          description:
            "A monthly service keeps applications, integrations, messaging and infrastructure operating within the agreed scope and capacity.",
        },
        {
          title: "Optimize",
          description:
            "Observed performance, data and AI can guide prioritized improvements as demand, constraints and opportunities evolve.",
        },
      ],
      scalingTitle: "Economics designed for useful scale",
      commercialQualifier:
        "The model combines initial implementation, monthly service and infrastructure. It is designed so scale does not automatically become a new per-contact, per-message, per-user or per-execution charge. Cloud, telecommunications, platform and other third-party charges may still apply.",
      trustTitle: "Built for clear diligence",
      trust:
        "Alltius is a service brand operated by AIULLMA LLC, registered in New Mexico, United States. Our public policies and direct company contact are available below.",
      contactTitle: "Start with the growth objective",
      contactPrompt:
        "Tell us which revenue or capacity outcome your company is pursuing, how the operation works today and which specialist service can remove the next constraint.",
      contactSafety:
        "Please do not send credentials, API keys, client databases or sensitive personal data by email.",
    },
    emailOperations: {
      title: "Email & Messaging Operations",
      description:
        "How Alltius manages transactional email, permission-based lifecycle communication and reviewed client tenants.",
      introduction:
        "Alltius Email & Messaging is a managed service operated by AIULLMA LLC. It starts with low-volume transactional and operational communication, with controls designed around sender identity, consent, deliverability and tenant boundaries.",
      sections: [
        {
          heading: "What we send",
          paragraphs: [
            "Transactional email is the initial focus: account notices, security messages, support updates and workflow alerts tied to an action or active business relationship.",
            "Permission-based marketing may be activated later only after opt-in, preference and unsubscribe controls are operating for the relevant audience.",
            "Alltius does not offer an open relay, anonymous sending or public email-sending access.",
          ],
        },
        {
          heading: "How a tenant is reviewed",
          paragraphs: [
            "Each client tenant is reviewed for ownership, sender identity, use case, recipient source, content and operating limits before sending is enabled.",
            "Client tenants are reviewed and isolated. Every approved tenant has a documented owner, reviewed sending identities, usage limits and an escalation contact.",
          ],
        },
        {
          heading: "Deliverability controls",
          paragraphs: [
            "Marketing recipients must have requested or lawfully subscribed to the communication, and every marketing message must provide a clear unsubscribe path.",
            "Unsubscribe, bounce and complaint events are processed into suppression controls so affected recipients are not sent the same category of communication again.",
            "Credentials, recipient data, templates, events and suppression state are isolated by tenant, with access revocation and offboarding controls.",
          ],
        },
        {
          heading: "What we do not support",
          paragraphs: [
            "Delivery, bounce and complaint signals are monitored, and a tenant may be paused when activity creates abuse, compliance or reputation risk.",
            "No purchased, rented, scraped or unsolicited lists are allowed, and no deceptive identity, phishing or prohibited content is supported.",
          ],
        },
        {
          heading: "Contact and legal operator",
          paragraphs: [
            "AIULLMA LLC remains the legal operator of the public site and the service brand relationship is disclosed in the public legal pages.",
            "Use the existing AIULLMA corporate contact bridge for reviewed inquiries; operational mailbox and provider setup remain manual and outside this public site.",
          ],
        },
      ],
      cta: "Discuss a reviewed email or messaging use case",
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
              "Where Alltius operates a managed email service for a client, we may process recipient, delivery, bounce, complaint and preference data on that client's behalf.",
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
              "You may request access, correction, deletion or other applicable privacy rights by emailing privacy@aiullma.com. AIULLMA LLC is the controller for this website; the client may control recipient data in a managed service and the relevant request.",
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
              "For managed email operations, Alltius does not offer an open relay, unlawful or unsolicited mail, or anonymous sending. Tenant review, identity verification and the right to suspend service for abuse are part of acceptable use.",
            ],
          },
          {
            heading: "Information and third parties",
            paragraphs: [
              "Site content is general information and does not create a service commitment. References or links to third-party products or sites do not imply affiliation, certification or endorsement.",
              "Paid services are governed by separate proposals, statements of work or other agreements accepted for the relevant engagement.",
              "Managed email operations for a client are also governed by separate client agreements that define approved identities, list origin and operating limits.",
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
              "State whether the request concerns Alltius-controlled records or a client-controlled audience so we can route the request correctly.",
            ],
          },
          {
            heading: "How requests are handled",
            paragraphs: [
              "We may verify your identity before acting on a request. Where appropriate, we will delete or anonymize information, subject to legitimate legal, security, accounting and backup-retention requirements that may limit immediate erasure.",
              "If the requested data is controlled by one of our clients, the request may need to be directed to that client because the audience is client-controlled. We will explain the applicable next step where reasonably possible.",
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
      languages: "Idiomas",
    },
    footer: {
      policies: "Políticas",
      email: "E-mail e Mensageria",
      privacy: "Privacidade",
      terms: "Termos",
      dataDeletion: "Exclusão de dados",
      disclaimer:
        "Referências a produtos de terceiros não implicam afiliação, certificação ou endosso.",
    },
    home: {
      seoTitle: "Alltius | Serviços de capacidade digital para crescimento",
      seoDescription:
        "Alltius constrói, opera e otimiza automação, dados/BI, IA, atendimento e infraestrutura gerenciada para ampliar capacidade de crescimento.",
      eyebrow: "ALLTIUS · OPERADA PELA AIULLMA LLC",
      headline: "Alltius constrói, opera e otimiza capacidade digital para crescer.",
      support: [
        "Serviços focados em atendimento, automação, dados e BI, IA, e-mail e infraestrutura gerenciada são desenhados para ajudar empresas a identificar oportunidades, tomar decisões melhores, atender mais demanda e crescer.",
        "Cada frente especialista pode ser contratada separadamente e é entregue com implementação, operação contínua e otimização orientada por evidências.",
      ],
      primaryCta: "Fale sobre seu objetivo de crescimento",
      secondaryCta: "Conheça nosso modelo de serviço",
      companyTitle: "Uma marca de serviços especialistas para crescer",
      company:
        "Alltius é uma marca de serviços operada pela AIULLMA LLC, registrada no New Mexico, Estados Unidos. Construímos, operamos e otimizamos capacidades tecnológicas focadas que podem ampliar a capacidade comercial e operacional.",
      capabilitiesTitle: "Frentes de serviço especialistas",
      capabilities: [
        {
          title: "Alltius Atendimento",
          description:
            "Sistemas, canais e fluxos de atendimento gerenciados para ajudar equipes a responder com consistência e absorver mais demanda.",
        },
        {
          title: "Alltius Automação",
          description:
            "Automação focada de processos e sistemas que pode reduzir atrito, acelerar a execução e conectar o trabalho comercial ao operacional.",
        },
        {
          title: "Alltius Dados/BI",
          description:
            "Bases de dados, indicadores e inteligência de negócios desenhados para apoiar decisões de crescimento mais rápidas e bem fundamentadas.",
        },
        {
          title: "Alltius IA",
          description:
            "Agentes de IA e fluxos assistidos aplicados a tarefas definidas, com contexto operacional, supervisão e limites mensuráveis.",
        },
        {
          title: "Alltius Email & Messaging",
          description:
            "Envios transacionais e operacionais vêm primeiro; marketing baseado em permissão pode ser ativado depois que os controles de consentimento, preferências e descadastro estiverem funcionando.",
        },
      ],
      modelTitle: "Construir, operar e otimizar como serviço contínuo.",
      model: [
        {
          title: "Construir",
          description:
            "A implementação inicial traduz o objetivo escolhido em sistemas, fluxos, indicadores e uma base técnica adequada.",
        },
        {
          title: "Operar",
          description:
            "O serviço mensal mantém aplicações, integrações, mensageria e infraestrutura operando dentro do escopo e da capacidade acordados.",
        },
        {
          title: "Otimizar",
          description:
            "Desempenho observado, dados e IA podem orientar melhorias priorizadas conforme demanda, restrições e oportunidades evoluem.",
        },
      ],
      scalingTitle: "Economia desenhada para escalar com utilidade",
      commercialQualifier:
        "O modelo combina implementação inicial, serviço mensal e infraestrutura. Ele foi desenhado para que a escala não se transforme automaticamente em uma nova cobrança por contato, mensagem, usuário ou execução. Custos de nuvem, telecomunicações, plataforma e outros terceiros ainda podem ser aplicados.",
      trustTitle: "Base para uma diligência clara",
      trust:
        "Alltius é uma marca de serviços operada pela AIULLMA LLC, registrada no New Mexico, Estados Unidos. Nossas políticas públicas e nosso contato corporativo direto estão disponíveis abaixo.",
      contactTitle: "Comece pelo objetivo de crescimento",
      contactPrompt:
        "Conte qual resultado de receita ou capacidade sua empresa busca, como a operação funciona hoje e qual serviço especialista pode remover a próxima restrição.",
      contactSafety:
        "Não envie credenciais, chaves de API, bases de clientes ou dados pessoais sensíveis por e-mail.",
    },
    emailOperations: {
      title: "Operações de E-mail e Mensageria",
      description:
        "Como a Alltius gerencia e-mail transacional, comunicação de ciclo de vida baseada em permissão e clientes revisados.",
      introduction:
        "Alltius Email & Messaging é um serviço gerenciado operado pela AIULLMA LLC. Ele começa com comunicação transacional e operacional de baixo volume, com controles desenhados para identidade do remetente, consentimento, entregabilidade e separação entre clientes.",
      sections: [
        {
          heading: "O que enviamos",
          paragraphs: [
            "E-mail transacional é o foco inicial: avisos de conta, mensagens de segurança, atualizações de suporte e alertas de fluxo ligados a uma ação ou relação comercial ativa.",
            "Marketing baseado em permissão pode ser ativado depois, somente quando os controles de opt-in, consentimento, preferências e descadastro estiverem funcionando para o público correspondente.",
            "A Alltius não oferece um open relay, envio anônimo ou acesso público para disparo de e-mails.",
          ],
        },
        {
          heading: "Como um tenant é revisado",
          paragraphs: [
            "Cada tenant de cliente é revisado quanto a responsável, identidade do remetente, caso de uso, origem dos destinatários, conteúdo e limites operacionais antes da liberação de envios.",
            "Tenants de clientes são revisados e isolados. Cada tenant aprovado possui responsável documentado, identidades revisadas, limites de uso e contato de escalonamento.",
          ],
        },
        {
          heading: "Controles de entregabilidade",
          paragraphs: [
            "Destinatários de marketing devem ter solicitado ou aderido legalmente à comunicação, e toda mensagem de marketing deve oferecer um caminho claro de descadastro.",
            "Eventos de descadastro, bounce e reclamação alimentam controles de supressão para evitar novos envios da mesma categoria aos destinatários afetados.",
            "Credenciais, dados de destinatários, modelos, eventos e estado de supressão são isolados por tenant, com controles de revogação de acesso e encerramento.",
          ],
        },
        {
          heading: "O que não apoiamos",
          paragraphs: [
            "Sinais de entrega, devolução e reclamação são monitorados, e um cliente pode ser pausado quando a atividade gera risco de abuso, conformidade ou reputação.",
            "Não usamos listas compradas, alugadas, raspadas ou não solicitadas, e não aceitamos identidade enganosa, phishing ou conteúdo proibido.",
          ],
        },
        {
          heading: "Contato e operador legal",
          paragraphs: [
            "A AIULLMA LLC permanece como operadora legal do site público, e a relação da marca de serviço é declarada nas páginas legais.",
            "Use a ponte oficial de contato corporativo da AIULLMA para consultas revisadas; configuração de provedor e caixas operacionais continua manual e fora do escopo deste site público.",
          ],
        },
      ],
      cta: "Converse sobre um caso revisado de e-mail ou mensageria",
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
              "Quando a Alltius opera um serviço gerenciado de e-mail para um cliente, podemos tratar dados de destinatários, entrega, bounce, reclamações e preferências em nome desse cliente.",
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
              "Você pode solicitar acesso, correção, exclusão ou outros direitos aplicáveis enviando um e-mail para privacy@aiullma.com. A AIULLMA LLC é controladora deste site; o cliente pode controlar os dados de destinatários em um serviço gerenciado e a solicitação pertinente.",
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
              "Nas operações gerenciadas de e-mail, a Alltius não oferece um open relay, e-mail ilegal ou não solicitado, nem envio anônimo. Revisão do tenant, verificação de identidade e o direito de suspender o serviço por abuso fazem parte do uso aceitável.",
            ],
          },
          {
            heading: "Informações e terceiros",
            paragraphs: [
              "O conteúdo do site é informação geral e não cria compromisso de serviço. Referências ou links a produtos ou sites de terceiros não implicam afiliação, certificação ou endosso.",
              "Serviços pagos são regidos por propostas, declarações de trabalho ou outros contratos separados aceitos para o projeto correspondente.",
              "Operações gerenciadas de e-mail para clientes também dependem de acordos separados com clientes que definem identidades aprovadas, origem das listas e limites operacionais.",
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
              "Informe se o pedido trata de registros controlados pela Alltius ou de uma audiência controlada por cliente para que possamos encaminhá-lo corretamente.",
            ],
          },
          {
            heading: "Como as solicitações são tratadas",
            paragraphs: [
              "Podemos verificar sua identidade antes de agir. Quando apropriado, excluiremos ou anonimizaremos informações, sujeito a requisitos legítimos de retenção legal, de segurança, contábil e de backup que podem limitar a exclusão imediata.",
              "Se os dados solicitados forem controlados por um de nossos clientes, a solicitação poderá precisar ser direcionada ao cliente, porque a audiência é controlada por cliente. Explicaremos o próximo passo aplicável quando razoavelmente possível.",
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
      languages: "Idiomas",
    },
    footer: {
      policies: "Políticas",
      email: "Email y Mensajería",
      privacy: "Privacidad",
      terms: "Términos",
      dataDeletion: "Eliminación de datos",
      disclaimer:
        "Las referencias a productos de terceros no implican afiliación, certificación ni respaldo.",
    },
    home: {
      seoTitle: "Alltius | Servicios de capacidad digital para crecer",
      seoDescription:
        "Alltius construye, opera y optimiza automatización, datos/BI, IA, atención e infraestructura gestionada para ampliar la capacidad de crecimiento.",
      eyebrow: "ALLTIUS · OPERADA POR AIULLMA LLC",
      headline: "Alltius construye, opera y optimiza capacidad digital para crecer.",
      support: [
        "Los servicios especializados en atención, automatización, datos y BI, IA, correo e infraestructura gestionada pueden ayudar a las empresas a identificar oportunidades, tomar mejores decisiones, atender más demanda y crecer.",
        "Cada frente especializado puede contratarse por separado y se entrega mediante implementación, operación continua y optimización basada en evidencia.",
      ],
      primaryCta: "Hablemos de su objetivo de crecimiento",
      secondaryCta: "Conozca nuestro modelo de servicio",
      companyTitle: "Una marca de servicios especializados para crecer",
      company:
        "Alltius es una marca de servicios operada por AIULLMA LLC, registrada en New Mexico, Estados Unidos. Construimos, operamos y optimizamos capacidades tecnológicas especializadas que pueden ampliar la capacidad comercial y operativa.",
      capabilitiesTitle: "Frentes de servicio especializados",
      capabilities: [
        {
          title: "Alltius Atendimento",
          description:
            "Sistemas, canales y flujos de atención gestionados para ayudar a los equipos a responder con consistencia y atender más demanda.",
        },
        {
          title: "Alltius Automação",
          description:
            "Automatización focalizada de procesos y sistemas que puede reducir fricción, acelerar la ejecución y conectar el trabajo comercial con el operativo.",
        },
        {
          title: "Alltius Dados/BI",
          description:
            "Bases de datos, indicadores e inteligencia de negocios diseñados para apoyar decisiones de crecimiento más rápidas y mejor fundamentadas.",
        },
        {
          title: "Alltius IA",
          description:
            "Agentes de IA y flujos asistidos aplicados a tareas definidas, con contexto operativo, supervisión y límites medibles.",
        },
        {
          title: "Alltius Email & Messaging",
          description:
            "Los envíos transaccionales y operativos vienen primero; el marketing basado en permisos puede activarse más adelante cuando estén activos los controles de consentimiento, preferencias y cancelación de suscripción.",
        },
      ],
      modelTitle: "Construir, operar y optimizar como servicio continuo.",
      model: [
        {
          title: "Construir",
          description:
            "La implementación inicial traduce el objetivo elegido en sistemas, flujos, indicadores y una base técnica adecuada.",
        },
        {
          title: "Operar",
          description:
            "El servicio mensual mantiene aplicaciones, integraciones, mensajería e infraestructura operando dentro del alcance y la capacidad acordados.",
        },
        {
          title: "Optimizar",
          description:
            "El desempeño observado, los datos y la IA pueden orientar mejoras priorizadas a medida que evolucionan la demanda, las restricciones y las oportunidades.",
        },
      ],
      scalingTitle: "Economía diseñada para escalar con utilidad",
      commercialQualifier:
        "El modelo combina implementación inicial, servicio mensual e infraestructura. Está diseñado para que la escala no se convierta automáticamente en un nuevo cargo por contacto, mensaje, usuario o ejecución. Los cargos de nube, telecomunicaciones, plataforma y otros terceros todavía pueden aplicarse.",
      trustTitle: "Preparada para una evaluación clara",
      trust:
        "Alltius es una marca de servicios operada por AIULLMA LLC, registrada en New Mexico, Estados Unidos. Nuestras políticas públicas y nuestro contacto corporativo directo están disponibles a continuación.",
      contactTitle: "Comience por el objetivo de crecimiento",
      contactPrompt:
        "Cuéntenos qué resultado de ingresos o capacidad busca su empresa, cómo funciona actualmente la operación y qué servicio especializado puede eliminar la siguiente restricción.",
      contactSafety:
        "No envíe credenciales, claves de API, bases de clientes ni datos personales sensibles por correo electrónico.",
    },
    emailOperations: {
      title: "Operaciones de Email y Mensajería",
      description:
        "Cómo Alltius gestiona correo transaccional, comunicación de ciclo de vida basada en permisos y clientes revisados.",
      introduction:
        "Alltius Email & Messaging es un servicio gestionado operado por AIULLMA LLC. Comienza con comunicación transaccional y operativa de bajo volumen, con controles diseñados para identidad del remitente, consentimiento, entregabilidad y separación entre clientes.",
      sections: [
        {
          heading: "Qué enviamos",
          paragraphs: [
            "El email transaccional es el enfoque inicial: avisos de cuenta, mensajes de seguridad, actualizaciones de soporte y alertas de flujo vinculados a una acción o relación comercial activa.",
            "El marketing basado en permisos puede activarse más adelante solamente cuando estén operativos los controles de opt-in, consentimiento, preferencias y cancelación de suscripción para la audiencia correspondiente.",
            "Alltius no ofrece un open relay, envío anónimo ni acceso público para enviar correos.",
          ],
        },
        {
          heading: "Cómo se revisa un tenant",
          paragraphs: [
            "Cada tenant de cliente se revisa en cuanto a responsable, identidad del remitente, caso de uso, origen de destinatarios, contenido y límites operativos antes de habilitar los envíos.",
            "Los tenants de clientes quedan revisados y aislados. Cada tenant aprobado tiene un responsable documentado, identidades revisadas, límites de uso y un contacto de escalamiento.",
          ],
        },
        {
          heading: "Controles de entregabilidad",
          paragraphs: [
            "Los destinatarios de marketing deben haber solicitado la comunicación o haberse suscrito legalmente, y todo mensaje de marketing debe ofrecer una vía clara de cancelación de suscripción.",
            "Los eventos de cancelación de suscripción, rebotes y quejas alimentan controles de supresión para evitar nuevos envíos de la misma categoría a los destinatarios afectados.",
            "Las credenciales, los datos de destinatarios, las plantillas, los eventos y el estado de supresión se aíslan por tenant, con controles para revocar el acceso y cerrar el servicio.",
          ],
        },
        {
          heading: "Lo que no apoyamos",
          paragraphs: [
            "Las señales de entrega, rebote y queja se supervisan, y un cliente puede pausarse cuando la actividad genera riesgos de abuso, cumplimiento o reputación.",
            "No usamos listas compradas, alquiladas, extraídas ni no solicitadas, y no admitimos identidad engañosa, phishing ni contenido prohibido.",
          ],
        },
        {
          heading: "Contacto y operador legal",
          paragraphs: [
            "AIULLMA LLC sigue siendo la operadora legal del sitio público, y la relación con la marca de servicio se declara en las páginas legales.",
            "Use el puente oficial de contacto corporativo de AIULLMA para consultas revisadas; la configuración del proveedor y los buzones operativos sigue siendo manual y queda fuera del alcance de este sitio público.",
          ],
        },
      ],
      cta: "Conversemos sobre un caso revisado de correo o mensajería",
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
              "Cuando Alltius opera un servicio gestionado de email para un cliente, podemos tratar datos de destinatarios, entrega, rebotes, quejas y preferencias en nombre de ese cliente.",
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
              "Puede solicitar acceso, corrección, eliminación u otros derechos aplicables escribiendo a privacy@aiullma.com. AIULLMA LLC es responsable del tratamiento de este sitio; el cliente puede controlar los datos de destinatarios en un servicio gestionado y la solicitud correspondiente.",
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
              "En las operaciones gestionadas de email, Alltius no ofrece un open relay, correo ilegal o no solicitado, ni envío anónimo. La revisión del tenant, la verificación de identidad y el derecho a suspender el servicio por abuso forman parte del uso aceptable.",
            ],
          },
          {
            heading: "Información y terceros",
            paragraphs: [
              "El contenido del sitio es información general y no crea un compromiso de servicio. Las referencias o enlaces a productos o sitios de terceros no implican afiliación, certificación ni respaldo.",
              "Los servicios de pago se rigen por propuestas, alcances de trabajo u otros contratos independientes aceptados para la contratación correspondiente.",
              "Las operaciones gestionadas de email para clientes también dependen de acuerdos separados con clientes que definen identidades aprobadas, origen de listas y límites operativos.",
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
              "Indique si la solicitud se refiere a registros controlados por Alltius o a una audiencia controlada por el cliente para que podamos dirigirla correctamente.",
            ],
          },
          {
            heading: "Cómo se gestionan las solicitudes",
            paragraphs: [
              "Podemos verificar su identidad antes de actuar. Cuando corresponda, eliminaremos o anonimizaremos la información, sujeto a requisitos legítimos de conservación legal, de seguridad, contable y de respaldo que pueden limitar la eliminación inmediata.",
              "Si los datos solicitados están controlados por uno de nuestros clientes, es posible que la solicitud deba dirigirse a ese cliente porque la audiencia está controlada por el cliente. Explicaremos el siguiente paso aplicable cuando sea razonablemente posible.",
            ],
          },
        ],
      },
    },
  },
};
