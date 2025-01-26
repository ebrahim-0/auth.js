/* eslint-disable @typescript-eslint/no-explicit-any */

import { auth } from "@/lib/auth";
import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

import { routing } from "./i18n/routing";

const locales = routing.locales;

const intlMiddleware = createMiddleware(routing);

const publicRoutes = ["/sign-in", "/sign-up"];

const hybridRoutes = ["/dashboard"];

const authCookiesName =
  process.env.NODE_ENV === "development"
    ? "authjs.session-token"
    : "__Secure-next-auth.session-token";

const testPathnameRegex = (pages: string[], pathName: string): boolean => {
  const pathsWithParams = pages.map((p) => p.replace(/\[.*?\]/g, "[^/]+"));

  return RegExp(
    `^(/(${locales.join("|")}))?(${pathsWithParams
      .flatMap((p) => (p === "/" ? ["", "/"] : p))
      .join("|")})/?$`,
    "i"
  ).test(pathName);
};

const authMiddleware = auth(async (req) => {
  const isAuth = req.cookies.get(authCookiesName)?.value;
  const isPublicPage = testPathnameRegex(publicRoutes, req.nextUrl.pathname);

  if (!isAuth && !isPublicPage) {
    return NextResponse.redirect(new URL("/sign-in", req.nextUrl));
  }

  if (isAuth && isPublicPage) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  return intlMiddleware(req);
});

const middleware = (req: NextRequest) => {
  const isPublicPage = testPathnameRegex(publicRoutes, req.nextUrl.pathname);
  const isAuth = req.cookies.get(authCookiesName)?.value;
  const isHybridPage = testPathnameRegex(hybridRoutes, req.nextUrl.pathname);

  if (isHybridPage) {
    return intlMiddleware(req);
  }

  if (isAuth) {
    return (authMiddleware as any)(req);
  }

  if (isPublicPage) {
    return intlMiddleware(req);
  } else {
    return (authMiddleware as any)(req);
  }
};

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};

export default middleware;
