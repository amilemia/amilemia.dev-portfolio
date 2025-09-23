/**
 * Site-wide configuration and utilities
 */

export const site = {
  name: "amilemia.dev",
  title: "Amilemia — Web Developer",
  description: "Freelance web developer building fast, accessible web apps.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
} as const;

type AbsoluteUrlOptions = {
  protocol?: 'http' | 'https';
  trailingSlash?: boolean;
};

export function absoluteUrl(
  path = "",
  options: AbsoluteUrlOptions = {}
): string {
  const { protocol, trailingSlash = false } = options;
  
  // Ensure path starts with a single slash
  const normalizedPath = `/${path.replace(/^\/+/, '')}`;
  
  // Handle protocol override
  let baseUrl = site.url;
  if (protocol) {
    baseUrl = baseUrl.replace(/^https?:/, `${protocol}:`);
  }
  
  // Construct URL
  const url = new URL(normalizedPath, baseUrl);
  
  // Handle trailing slash
  if (trailingSlash && !url.pathname.endsWith('/')) {
    url.pathname = `${url.pathname}/`;
  } else if (!trailingSlash && url.pathname.endsWith('/') && url.pathname !== '/') {
    url.pathname = url.pathname.replace(/\/+$/, '');
  }
  
  return url.toString();
}

type JsonLdValue = string | number | boolean | null | JsonLdObject | JsonLdValue[];
type JsonLdObject = { [key: string]: JsonLdValue };

// Helper for JSON-LD structured data
export function jsonLd<T extends JsonLdObject>(data: T): string {
  return JSON.stringify(data, null, 2);
}
