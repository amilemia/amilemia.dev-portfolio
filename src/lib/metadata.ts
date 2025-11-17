/**
 * Metadata utilities for SEO and internationalization
 */

import { absoluteUrl } from './site';
import { locales, type Locale } from '@/i18n/locales';

/**
 * Generate hreflang alternates for a given path
 * @param path - The path without locale prefix (e.g., '/projects', '/about')
 * @param currentLocale - The current locale
 * @returns Object with language alternates for metadata
 */
export function generateHreflangAlternates(
  path: string,
  currentLocale: Locale
): {
  canonical: string;
  languages: Record<string, string>;
} {
  // Normalize path to ensure it starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  // Build canonical URL for current locale
  const canonical = absoluteUrl(`/${currentLocale}${normalizedPath}`);
  
  // Build language alternates for all locales
  const languages: Record<string, string> = {};
  locales.forEach((locale) => {
    languages[locale] = absoluteUrl(`/${locale}${normalizedPath}`);
  });
  
  return {
    canonical,
    languages,
  };
}
