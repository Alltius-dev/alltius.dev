import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  const language = request.nextUrl.pathname.startsWith("/pt") ? "pt-BR" : "en";

  requestHeaders.set("x-aiullma-language", language);

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}
