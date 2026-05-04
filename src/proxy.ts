import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { routing } from "./i18n/routing";

const shouldSkip = (pathname: string): boolean =>
  pathname.startsWith("/_next") ||
  pathname.startsWith("/api") ||
  pathname.includes(".") ||
  pathname.startsWith("/favicon.ico");

const handleIntl = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (shouldSkip(pathname)) {
    return NextResponse.next();
  }

  const localeCookie = request.cookies.get("NEXT_LOCALE")?.value;
  const hasLocalePrefix = new RegExp(
    `^/(${routing.locales.join("|")})(/|$)`
  ).test(pathname);

  if (!hasLocalePrefix && !localeCookie) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = `/${routing.defaultLocale}${pathname}`;
    const response = NextResponse.redirect(redirectUrl);
    response.cookies.set("NEXT_LOCALE", routing.defaultLocale, {
      path: "/",
      sameSite: "lax",
    });
    return response;
  }

  const response = handleIntl(request);

  if (response.status >= 300 && response.status < 400) {
    return response;
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", pathname);
  const nextResponse = NextResponse.next({
    request: { headers: requestHeaders },
  });
  response.headers.forEach((value, key) => {
    nextResponse.headers.set(key, value);
  });
  return nextResponse;
}

export const config = {
  matcher: ["/", "/(vi|en)/:path*", "/((?!_next|_vercel|.*\\..*).*)"],
};
