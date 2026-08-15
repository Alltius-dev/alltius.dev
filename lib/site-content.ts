export type Locale = "en" | "pt";

export type LegalPageKey = "contact" | "privacy" | "terms" | "dataDeletion";

export const routePairs = {
  home: { en: "/", pt: "/pt/" },
  contact: { en: "/contact", pt: "/pt/contato" },
  privacy: { en: "/privacy", pt: "/pt/privacidade" },
  terms: { en: "/terms", pt: "/pt/termos" },
  dataDeletion: { en: "/data-deletion", pt: "/pt/exclusao-de-dados" },
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
    eyebrow: string;
    headline: string;
    support: string;
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
      eyebrow: "AIULLMA LLC · NEW MEXICO, UNITED STATES",
      headline: "Technology services for scalable business operations.",
      support:
        "AIULLMA LLC designs, implements and supports specialized technology services powered by dedicated infrastructure. Our model combines initial implementation, ongoing service and infrastructure, helping companies grow without tying every user, contact, message or workflow to another subscription fee. Cloud, telecommunications, platform and other third-party charges may apply.",
      primaryCta: "Discuss your operation",
      secondaryCta: "See our operating model",
      companyTitle: "Company",
      company:
        "AIULLMA LLC is a technology services company registered in New Mexico, United States. We design, implement and operate specialized systems for business workflows. Certain engagements may be delivered under the Alltius operating brand.",
      capabilitiesTitle: "Capabilities",
      capabilities: [
        {
          title: "Process automation",
          description:
            "We design practical automations around the work that teams need to complete.",
        },
        {
          title: "Systems and integrations",
          description:
            "We connect the systems and data flows that support an agreed business process.",
        },
        {
          title: "AI-supported operations",
          description:
            "We apply appropriate AI capabilities to help teams operate with clearer, more useful information.",
        },
        {
          title: "Managed applications and infrastructure",
          description:
            "We operate agreed application environments and the infrastructure that supports them.",
        },
      ],
      modelTitle:
        "Implementation, ongoing service and dedicated infrastructure under one service model.",
      model: [
        {
          title: "Initial implementation",
          description:
            "Discovery, system design, configuration, integrations and launch.",
        },
        {
          title: "Ongoing service",
          description:
            "Monitoring, maintenance, operational support and agreed improvements.",
        },
        {
          title: "Dedicated infrastructure",
          description:
            "Capacity and environments provisioned for the engagement under the agreed scope.",
        },
      ],
      scalingTitle: "Scale the operation, not the billing units.",
      commercialQualifier:
        "AIULLMA’s fees are structured around scope and capacity rather than automatically multiplied by every seat, contact, message or workflow. Cloud, telecommunications, platform and other third-party charges may apply.",
      trustTitle: "Built for clear diligence",
      trust:
        "AIULLMA LLC is registered in New Mexico, United States. Our public policies and direct company contacts are available below.",
      contactTitle: "Start with the operating context",
      contactPrompt:
        "Tell us about the workflow, systems involved, desired outcome and relevant operating constraints.",
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
      eyebrow: "AIULLMA LLC · NEW MEXICO, ESTADOS UNIDOS",
      headline: "Serviços de tecnologia para operações empresariais escaláveis.",
      support:
        "A AIULLMA LLC projeta, implanta e sustenta serviços tecnológicos especializados sobre infraestrutura dedicada. Nosso modelo combina implantação inicial, serviço contínuo e infraestrutura, permitindo que empresas cresçam sem transformar cada usuário, contato, mensagem ou automação em uma nova cobrança. Tarifas de nuvem, telecomunicações, plataformas e outros terceiros podem ser aplicadas.",
      primaryCta: "Fale sobre sua operação",
      secondaryCta: "Conheça nosso modelo",
      companyTitle: "Empresa",
      company:
        "A AIULLMA LLC é uma empresa de serviços tecnológicos registrada no New Mexico, Estados Unidos. Projetamos, implantamos e operamos sistemas especializados para fluxos empresariais. Determinados projetos podem ser entregues sob a marca operacional Alltius.",
      capabilitiesTitle: "Capacidades",
      capabilities: [
        {
          title: "Automação de processos",
          description:
            "Projetamos automações práticas para o trabalho que as equipes precisam realizar.",
        },
        {
          title: "Sistemas e integrações",
          description:
            "Conectamos sistemas e fluxos de dados que apoiam um processo empresarial acordado.",
        },
        {
          title: "Operações apoiadas por IA",
          description:
            "Aplicamos recursos adequados de IA para ajudar as equipes a operar com informações mais claras e úteis.",
        },
        {
          title: "Aplicações e infraestrutura gerenciadas",
          description:
            "Operamos ambientes de aplicação acordados e a infraestrutura que os sustenta.",
        },
      ],
      modelTitle:
        "Implantação, serviço contínuo e infraestrutura dedicada em um único modelo de serviço.",
      model: [
        {
          title: "Implantação inicial",
          description:
            "Descoberta, desenho de sistema, configuração, integrações e lançamento.",
        },
        {
          title: "Serviço contínuo",
          description:
            "Monitoramento, manutenção, suporte operacional e melhorias acordadas.",
        },
        {
          title: "Infraestrutura dedicada",
          description:
            "Capacidade e ambientes provisionados para o projeto dentro do escopo acordado.",
        },
      ],
      scalingTitle: "Escale a operação, não as unidades de cobrança.",
      commercialQualifier:
        "As cobranças da AIULLMA são estruturadas por escopo e capacidade, sem multiplicação automática por usuário, contato, mensagem ou fluxo. Tarifas de nuvem, telecomunicações, plataformas e outros terceiros podem ser aplicadas.",
      trustTitle: "Base para uma diligência clara",
      trust:
        "A AIULLMA LLC é registrada no New Mexico, Estados Unidos. Nossas políticas públicas e contatos corporativos diretos estão disponíveis abaixo.",
      contactTitle: "Comece pelo contexto operacional",
      contactPrompt:
        "Conte sobre o fluxo, os sistemas envolvidos, o resultado desejado e as restrições operacionais relevantes.",
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
};
