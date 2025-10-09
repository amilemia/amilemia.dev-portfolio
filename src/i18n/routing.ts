import { defaultLocale, type Locale } from "./locales";

function normalizePathname(pathname: string): string {
  if (!pathname) return "/";
  const withSlash = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return withSlash.replace(/\/+$/, "") || "/";
}

export function stripLocaleFromPathname(pathname: string, locale: Locale): string {
  const normalized = normalizePathname(pathname);
  const prefix = `/${locale}`;

  if (locale === defaultLocale && !normalized.startsWith(`${prefix}/`) && normalized !== prefix) {
    return normalized;
  }

  if (normalized === prefix) {
    return "/";
  }

  if (normalized.startsWith(`${prefix}/`)) {
    const nextPath = normalized.slice(prefix.length);
    return nextPath.startsWith("/") ? nextPath : `/${nextPath}`;
  }

  return normalized;
}

export function buildLocalizedPathname(pathname: string, locale: Locale): string {
  const base = normalizePathname(pathname);
  if (locale === defaultLocale) {
    return base;
  }
  if (base === "/") {
    return `/${locale}`;
  }
  return `/${locale}${base}`;
}

export function replaceLocaleInPathname(pathname: string, nextLocale: Locale, currentLocale: Locale): string {
  const stripped = stripLocaleFromPathname(pathname, currentLocale);
  return buildLocalizedPathname(stripped, nextLocale);
}
