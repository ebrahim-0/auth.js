import { auth } from "./lib/auth";
import { routing } from "./i18n/routing";
import createMiddleware from "next-intl/middleware";

const intlMiddleware = createMiddleware(routing);

export const middleware = auth(async (req) => {
  return intlMiddleware(req);
});

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(ar|en)/:path*", "/((?!api|_next|_vercel|.*\\..*).*)"],
};
