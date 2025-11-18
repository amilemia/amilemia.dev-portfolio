import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { Carousel } from "@/components/testimonials/Carousel";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { Button } from "@/components/ui/button";
import { ServiceCard } from "@/components/ui/service-card";
import { FaqList } from "./_components/service-sections";
import { getLocalizedServicePackages } from "@/data/services";
import { getTestimonials } from "@/data/testimonials";
import { generateHreflangAlternates } from "@/lib/metadata";
import { getMessages, type Locale } from "@/i18n";
import { fallbackLocale, isLocale } from "@/i18n/locales";

type PageParams = {
  locale: string;
};

type PageProps = {
  params: Promise<PageParams>;
};

type GenerateMetadataProps = {
  params: Promise<PageParams>;
};

export async function generateMetadata({ params }: GenerateMetadataProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : fallbackLocale;
  const messages = getMessages(locale);

  const alternates = generateHreflangAlternates('/services', locale);

  return {
    title: messages.services.page.meta.title,
    description: messages.ads.metaDescriptions.services,
    alternates,
  } satisfies Metadata;
}

export default async function ServicesPage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : fallbackLocale;
  const messages = getMessages(locale);

  const packages = getLocalizedServicePackages(messages.services.packages).map((service) => ({
    ...service,
    href: `/${locale}/contact?service=${encodeURIComponent(service.name)}`,
  }));
  const testimonials = getTestimonials(messages.shared.testimonials);

  const pageCopy = messages.services.page;

  return (
    <Section size="xl">
      <Container className="space-y-16">
        <SectionHeading
          eyebrow={pageCopy.hero.eyebrow}
          title={pageCopy.hero.title}
          description={pageCopy.hero.description}
        />

        <div className="flex flex-col gap-8 rounded-3xl border border-border/60 bg-card/60 p-6 shadow-sm backdrop-blur-sm md:flex-row md:items-center md:justify-between">
          <ul className="flex flex-1 flex-col gap-3 text-sm text-muted-foreground">
            {pageCopy.hero.highlights.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span aria-hidden="true" className="mt-1 size-2 rounded-full bg-primary" />
                {item}
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-3 md:w-56">
            <Button asChild size="lg">
              <TrackedLink href={`/${locale}/contact`} eventName="CTA: Services hero" eventData={{ source: 'services-intro' }}>
                {messages.common.actions.bookIntro}
              </TrackedLink>
            </Button>
            <Button asChild variant="outline">
              <TrackedLink href={`/${locale}/projects`} eventName="CTA: View case studies" eventData={{ source: 'services-intro' }}>
                {messages.common.actions.viewCaseStudies}
              </TrackedLink>
            </Button>
          </div>
        </div>

        <section aria-labelledby="packages-heading" className="space-y-8">
          <SectionHeading
            title={pageCopy.packages.title}
            description={pageCopy.packages.description}
            className="max-w-xl"
            id="packages-heading"
          />
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {packages.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                locale={locale}
                messages={messages.services.labels}
              />
            ))}
          </div>
        </section>

        <Carousel items={testimonials} messages={messages.common.testimonials} />

        <section className="space-y-8" aria-label={pageCopy.differentiators.title}>
          <SectionHeading title={pageCopy.differentiators.title} className="max-w-xl" />
          <div className="grid gap-6 md:grid-cols-3">
            {pageCopy.differentiators.items.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-border/60 bg-background/80 p-6 shadow-sm backdrop-blur-sm"
              >
                <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="process-heading" className="space-y-8">
          <SectionHeading title={pageCopy.process.title} className="max-w-xl" id="process-heading" />
          <ol className="grid gap-6 sm:grid-cols-2">
            {pageCopy.process.steps.map((step, index) => (
              <li
                key={step.title}
                className="flex gap-4 rounded-xl border p-6 shadow-sm transition-colors hover:border-primary/40 focus-within:border-primary/60"
              >
                <span className="mt-1 inline-flex size-10 items-center justify-center rounded-full bg-primary/10 text-lg font-semibold text-primary">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="faq-heading" className="space-y-8">
          <SectionHeading title={pageCopy.faq.title} className="max-w-xl" id="faq-heading" />
          <FaqList items={pageCopy.faq.items} />
        </section>

        <div className="rounded-3xl border border-border/60 bg-card/60 p-8 text-center shadow-sm backdrop-blur-sm">
          <h2 className="text-2xl font-semibold">{pageCopy.cta.title}</h2>
          <p className="mt-3 text-sm text-muted-foreground">{pageCopy.cta.description}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <TrackedLink href={`/${locale}/contact`} eventName="CTA: Services footer" eventData={{ source: 'services-footer' }}>
                {messages.common.actions.bookIntro}
              </TrackedLink>
            </Button>
            <Button asChild variant="outline">
              <TrackedLink href="mailto:hi@amilemia.dev" eventName="CTA: Email direct" eventData={{ source: 'services-footer' }}>
                {messages.common.actions.emailDirect}
              </TrackedLink>
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
