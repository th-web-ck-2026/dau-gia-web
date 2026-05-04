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

  /*
  // Auth Protection Logic
  const accessToken = request.cookies.get("access_token")?.value;
  
  // Strip locale prefix for route matching
  const pathnameWithoutLocale = pathname.replace(
    new RegExp(`^/(${routing.locales.join("|")})(/|$)`),
    "/"
  ).replace(/\/$/, "") || "/";

  const AUTH_ROUTES = ["/login", "/register", "/forgot-password", "/reset-password"];
  const PUBLIC_ROUTES = ["/", "/demo"];

  const isAuthRoute = AUTH_ROUTES.some(route => pathnameWithoutLocale.startsWith(route));
  const isPublicRoute = PUBLIC_ROUTES.some(route => pathnameWithoutLocale === route);
  const isPrivateRoute = !isAuthRoute && !isPublicRoute;

  const currentLocale = hasLocalePrefix 
    ? pathname.split("/")[1] 
    : localeCookie || routing.defaultLocale;

  if (isPrivateRoute && !accessToken) {
    const loginUrl = new URL(`/${currentLocale}/login`, request.url);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthRoute && accessToken) {
    const homeUrl = new URL(`/${currentLocale}/`, request.url);
    return NextResponse.redirect(homeUrl);
  }
  */

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
