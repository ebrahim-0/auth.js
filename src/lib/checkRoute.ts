import { routing } from "@/i18n/routing";

const locales = routing.locales;

export const publicRoutes = ["/sign-in", "/sign-up"];

export const hybridRoutes = ["/dashboard"];

export const testPathnameRegex = (
  pages: string[],
  pathName: string
): boolean => {
  const pathsWithParams = pages.map((p) => p.replace(/\[.*?\]/g, "[^/]+"));

  return RegExp(
    `^(/(${locales.join("|")}))?(${pathsWithParams
      .flatMap((p) => (p === "/" ? ["", "/"] : p))
      .join("|")})/?$`,
    "i"
  ).test(pathName);
};
