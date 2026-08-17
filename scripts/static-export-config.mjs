export const localizedPublicRoutes = [
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

export const staticDocumentRoutes = ["/sitemap.xml", "/robots.txt"];

export function localeHeaderForRoute(route) {
  if (route === "/pt/" || route.startsWith("/pt/")) {
    return "pt-BR";
  }

  if (route === "/es/" || route.startsWith("/es/")) {
    return "es-419";
  }

  return "en";
}

export function staticArtifactPathForRoute(route) {
  if (route === "/") {
    return "index.html";
  }

  const normalizedRoute = route.startsWith("/") ? route.slice(1) : route;
  return normalizedRoute.endsWith("/")
    ? `${normalizedRoute}index.html`
    : `${normalizedRoute}/index.html`;
}
