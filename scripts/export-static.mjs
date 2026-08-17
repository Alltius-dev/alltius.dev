import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import {
  localeHeaderForRoute,
  localizedPublicRoutes,
  staticArtifactPathForRoute,
  staticDocumentRoutes,
  workerRenderPathForRoute,
} from "./static-export-config.mjs";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const distClientDirectory = resolve(projectRoot, "dist/client");
const distStaticDirectory = resolve(projectRoot, "dist-static");
const workerEntryUrl = pathToFileURL(resolve(projectRoot, "dist/server/index.js"));
workerEntryUrl.searchParams.set("static-export", `${process.pid}-${Date.now()}`);

const { default: worker } = await import(workerEntryUrl.href);

const env = {
  ASSETS: {
    fetch: async () => new Response("Not found", { status: 404 }),
  },
};

const ctx = {
  waitUntil() {},
  passThroughOnException() {},
};

async function writeArtifact(relativePath, contents) {
  const targetPath = resolve(distStaticDirectory, relativePath);
  await mkdir(dirname(targetPath), { recursive: true });
  await writeFile(targetPath, contents);
}

async function fetchFromWorker(path, { headers = {} } = {}) {
  const response = await worker.fetch(
    new Request(`http://localhost${path}`, { headers }),
    env,
    ctx,
  );

  if (response.status !== 200) {
    throw new Error(`${path} returned ${response.status} during static export`);
  }

  return response;
}

async function exportHtmlRoute(route) {
  const response = await fetchFromWorker(workerRenderPathForRoute(route), {
    headers: {
      accept: "text/html",
      "x-aiullma-language": localeHeaderForRoute(route),
    },
  });
  const contentType = response.headers.get("content-type") ?? "";

  if (!/^text\/html\b/i.test(contentType)) {
    throw new Error(
      `${route} returned ${contentType || "no content-type"} during static export`,
    );
  }

  await writeArtifact(staticArtifactPathForRoute(route), await response.text());
}

async function exportDocument(path) {
  const response = await fetchFromWorker(path);
  await writeArtifact(path.slice(1), new Uint8Array(await response.arrayBuffer()));
}

await rm(distStaticDirectory, { recursive: true, force: true });
await mkdir(distStaticDirectory, { recursive: true });
await cp(distClientDirectory, distStaticDirectory, { recursive: true });

for (const route of localizedPublicRoutes) {
  await exportHtmlRoute(route);
}

for (const path of staticDocumentRoutes) {
  await exportDocument(path);
}
