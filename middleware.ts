import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Import locales and fallback from source
import { locales, fallbackLocale } from './src/i18n/locales';

const PUBLIC_FILE = /\.(.*)$/;

function isLocale(value: string | undefined): boolean {
  if (!value) return false;
  return (locales as readonly string[]).includes(value);
}

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  // Skip next internals, assets, and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const segments = pathname.split('/');
  const first = segments[1];

  // If path is root "/", redirect to default locale
  if (!first) {
    const url = req.nextUrl.clone();
    url.pathname = `/${fallbackLocale}`;
    return NextResponse.redirect(url);
  }

  // If first segment is already a supported locale, continue
  if (isLocale(first)) {
    return NextResponse.next();
  }

  // Otherwise, prefix the path with the fallback locale
  const url = req.nextUrl.clone();
  url.pathname = `/${fallbackLocale}${pathname}`;
  // preserve search params
  url.search = search;
  return NextResponse.redirect(url);
}

export const config = {
  // Exclude Next internals, assets and API from middleware
  matcher: [
    '/((?!_next/|api/|.*\\..*).*)',
  ],
};
