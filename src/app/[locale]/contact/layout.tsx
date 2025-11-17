import type { Metadata } from "next";
import type { ReactNode } from "react";

import { generateHreflangAlternates } from "@/lib/metadata";
import { getMessages, type Locale } from "@/i18n";
import { fallbackLocale, isLocale } from "@/i18n/locales";

type LayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : fallbackLocale;
  const messages = getMessages(locale);

  const alternates = generateHreflangAlternates('/contact', locale);

  return {
    title: messages.contact.heading.title,
    description: messages.ads.metaDescriptions.contact,
    alternates,
  } satisfies Metadata;
}

export default function ContactLayout({ children }: LayoutProps) {
  return children;
}
