import type { Metadata, Viewport } from "next";
import React from "react";
import { Geist, Geist_Mono } from 'next/font/google';

import "../globals.css";

import { ClientLayout } from "./client-layout";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { absoluteUrl, site } from "@/lib/site";
import { getMessages, locales, fallbackLocale } from "@/i18n";
import type { Locale } from "@/i18n";
import { isLocale } from "@/i18n/locales";

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : fallbackLocale;
  const messages = getMessages(locale);
  const siteCopy = messages.common.site;

  const basePath = `/${locale}`;
  const ogImageUrl = absoluteUrl("/opengraph-image");

  // Build hreflang alternates for all locales
  const languages: Record<string, string> = {};
  locales.forEach((loc) => {
    languages[loc] = absoluteUrl(`/${loc}`);
  });

  return {
    metadataBase: new URL(site.url),
    title: {
      default: siteCopy.title,
      template: `%s | ${siteCopy.name}`,
    },
    description: messages.ads.metaDescriptions.home,
    applicationName: siteCopy.name,
    referrer: "origin-when-cross-origin",
    keywords: [
      "Web Developer",
      "Frontend Developer",
      "React",
      "TypeScript",
      "Next.js",
      "Freelance Developer",
    ],
    authors: [{ name: "Amilemia", url: site.url }],
    creator: "Amilemia",
    publisher: "Amilemia",
    formatDetection: {
      email: true,
      address: false,
      telephone: false,
    },
    alternates: {
      canonical: basePath,
      languages,
    },
    openGraph: {
      type: "website",
      locale: siteCopy.openGraphLocale,
      url: site.url,
      title: siteCopy.title,
      description: messages.ads.metaDescriptions.home,
      siteName: siteCopy.name,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: siteCopy.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: siteCopy.title,
      description: messages.ads.metaDescriptions.home,
      images: [ogImageUrl],
      creator: "@amilemia",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      ],
      apple: [
        { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      ],
    },
    manifest: "/site.webmanifest",
    other: {
      "msapplication-TileColor": "#0a0a0a",
      "msapplication-config": "/browserconfig.xml",
    },
  } satisfies Metadata;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
type RootLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: RootLayoutProps) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : fallbackLocale;
  const messages = getMessages(locale);

  return (
    <html lang={locale} className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <ClientLayout locale={locale} messages={messages}>
            {children}
          </ClientLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
