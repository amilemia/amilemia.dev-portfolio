import Link from "next/link";

import { Button } from "@/components/ui/button";
import { getMessages, type Locale } from "@/i18n";
import { fallbackLocale, isLocale } from "@/i18n/locales";

type NotFoundProps = {
  params?: { locale?: string };
};

export default function NotFound({ params }: NotFoundProps = {}) {
  const rawLocale = params?.locale;
  const locale: Locale = rawLocale && isLocale(rawLocale) ? rawLocale : fallbackLocale;
  const messages = getMessages(locale);

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center text-center">
      <div className="space-y-4">
        <h1 className="text-6xl font-bold tracking-tight text-primary">404</h1>
        <h2 className="text-3xl font-bold tracking-tight">{messages.notFound.title}</h2>
        <p className="max-w-md text-muted-foreground">{messages.notFound.description}</p>
        <Button asChild className="mt-6">
          <Link href={`/${locale}`}>{messages.notFound.cta}</Link>
        </Button>
      </div>
    </div>
  );
}
