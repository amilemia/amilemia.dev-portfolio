import { defaultLocale, type Locale } from "./locales";

function normalizePathname(pathname: string): string {
  if (!pathname) return "/";
  const withSlash = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return withSlash.replace(/\/+$/, "") || "/";
}

export function stripLocaleFromPathname(pathname: string, locale: Locale): string {
  // Separate pathname from query params and hash
  const queryIndex = pathname.indexOf('?');
  const hashIndex = pathname.indexOf('#');
  
  let basePath = pathname;
  let queryAndHash = '';
  
  if (queryIndex !== -1) {
    basePath = pathname.slice(0, queryIndex);
    queryAndHash = pathname.slice(queryIndex);
  } else if (hashIndex !== -1) {
    basePath = pathname.slice(0, hashIndex);
    queryAndHash = pathname.slice(hashIndex);
  }
  
  const normalized = normalizePathname(basePath);
  const prefix = `/${locale}`;

  if (locale === defaultLocale && !normalized.startsWith(`${prefix}/`) && normalized !== prefix) {
    return normalized + queryAndHash;
  }

  if (normalized === prefix) {
    return "/" + queryAndHash;
  }

  if (normalized.startsWith(`${prefix}/`)) {
    const nextPath = normalized.slice(prefix.length);
    const cleanPath = nextPath.startsWith("/") ? nextPath : `/${nextPath}`;
    return cleanPath + queryAndHash;
  }

  return normalized + queryAndHash;
}

export function buildLocalizedPathname(pathname: string, locale: Locale): string {
  const base = normalizePathname(pathname);
  // Always include locale prefix for both EN and FR to ensure reliable switching
  if (base === "/") {
    return `/${locale}`;
  }
  return `/${locale}${base}`;
}

export function replaceLocaleInPathname(pathname: string, nextLocale: Locale, currentLocale: Locale): string {
  const stripped = stripLocaleFromPathname(pathname, currentLocale);
  return buildLocalizedPathname(stripped, nextLocale);
}
