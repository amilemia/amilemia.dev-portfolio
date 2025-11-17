import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { generateHreflangAlternates } from "@/lib/metadata";
import { getMessages, type Locale } from "@/i18n";
import { fallbackLocale, isLocale } from "@/i18n/locales";

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

  const alternates = generateHreflangAlternates('/about', locale);

  return {
    title: messages.about.heading.title,
    description: messages.ads.metaDescriptions.about,
    alternates,
  } satisfies Metadata;
}

export default async function AboutPage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : fallbackLocale;
  const messages = getMessages(locale);
  const about = messages.about;

  return (
    <Section size="lg">
      <Container className="space-y-12">
        <SectionHeading
          title={about.heading.title}
          description={about.heading.description}
          align="center"
        />

        <div className="rounded-3xl border border-border/60 bg-card/60 p-6 shadow-sm backdrop-blur-sm">
          <p className="text-lg text-muted-foreground">{about.introduction}</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <section className="rounded-2xl border border-border/60 bg-background/80 p-6 shadow-sm backdrop-blur-sm">
            <h2 className="mb-4 text-lg font-semibold">{about.focusAreas.title}</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {about.focusAreas.items.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span aria-hidden="true" className="mt-1 size-1.5 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </section>
          <section className="rounded-2xl border border-border/60 bg-background/80 p-6 shadow-sm backdrop-blur-sm">
            <h2 className="mb-4 text-lg font-semibold">{about.toolset.title}</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {about.toolset.items.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span aria-hidden="true" className="mt-1 size-1.5 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="space-y-8">
          <h2 className="text-2xl font-semibold">{about.experience.title}</h2>
          {about.experience.roles.map((role) => (
            <article
              key={role.title}
              className="relative pl-6 before:absolute before:left-0 before:top-2 before:h-3 before:w-3 before:rounded-full before:bg-primary"
            >
              <h3 className="text-lg font-semibold">{role.title}</h3>
              <p className="text-sm text-muted-foreground">
                {role.place} - {role.timeframe}
              </p>
              <p className="mt-2 text-muted-foreground">{role.summary}</p>
            </article>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <Button asChild size="lg">
            <Link href={`/${locale}/contact`}>{messages.common.actions.bookIntro}</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="mailto:hi@amilemia.dev">{messages.common.actions.emailDirect}</Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
