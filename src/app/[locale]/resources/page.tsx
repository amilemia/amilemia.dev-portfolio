import { Metadata } from 'next';

import { Container } from '@/components/Container';
import { Section } from '@/components/Section';
import { SectionHeading } from '@/components/SectionHeading';
import { LeadMagnetGrid } from '@/components/lead-magnets';
import { getLeadMagnets } from '@/lib/content';
import { getMessages, type Locale } from '@/i18n';
import { fallbackLocale, isLocale } from '@/i18n/locales';
import { absoluteUrl } from '@/lib/site';
import { generateHreflangAlternates } from '@/lib/metadata';

type PageParams = {
  locale: string;
};

type PageProps = {
  params: Promise<PageParams>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : fallbackLocale;
  const messages = getMessages(locale);

  const title = `${messages.resources.meta.title} | ${messages.common.site.name}`;
  const description = messages.resources.meta.description;
  const path = `/${locale}/resources`;
  const url = absoluteUrl(path);

  const alternates = generateHreflangAlternates('/resources', locale);

  return {
    title,
    description,
    alternates,
    openGraph: {
      title,
      description,
      type: 'website',
      url,
      locale: messages.common.site.openGraphLocale,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  } satisfies Metadata;
}

export default async function ResourcesPage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : fallbackLocale;
  const messages = getMessages(locale);

  const leadMagnets = await getLeadMagnets();

  return (
    <>
      <Section size="lg">
        <Container>
          <div className="space-y-6 text-center">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              {messages.resources.hero.eyebrow}
            </span>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              {messages.resources.hero.title}
            </h1>
            <p className="mx-auto max-w-2xl text-base text-muted-foreground sm:text-lg">
              {messages.resources.hero.description}
            </p>
          </div>
        </Container>
      </Section>

      <Section>
        <Container className="space-y-10">
          <SectionHeading
            title={messages.resources.grid.title}
            description={messages.resources.grid.description}
          />

          <LeadMagnetGrid
            magnets={leadMagnets}
          />
        </Container>
      </Section>
    </>
  );
}
