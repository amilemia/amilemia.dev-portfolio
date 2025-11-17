import Link from "next/link";

import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { Carousel } from "@/components/testimonials/Carousel";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/ui/project-card";
import { getLocalizedServicePackages } from "@/data/services";
import { getTestimonials } from "@/data/testimonials";
import { getProjects } from "@/lib/content";
import { getMessages, type Locale } from "@/i18n";
import { fallbackLocale, isLocale } from "@/i18n/locales";
import { interpolate } from "@/i18n/interpolate";

function formatCurrency(locale: Locale) {
  const formatter = new Intl.NumberFormat(locale === 'fr' ? 'fr-FR' : 'en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });

  return (value: number, suffix?: string) => {
    const base = formatter.format(value);
    return suffix ? `${base}${suffix}` : base;
  };
}

type PageParams = {
  locale: string;
};

type PageProps = {
  params: Promise<PageParams>;
};

export default async function Home({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : fallbackLocale;
  const messages = getMessages(locale);

  const projects = (await getProjects(locale)).slice(0, 3);
  const testimonials = getTestimonials(messages.shared.testimonials);
  const servicePackages = getLocalizedServicePackages(messages.services.packages).map((service) => ({
    ...service,
    href: `/${locale}/contact?subject=${encodeURIComponent(service.name)}`,
  }));

  const availabilityDate = new Date();
  availabilityDate.setMonth(availabilityDate.getMonth() + 1);

  const availabilityLabel = new Intl.DateTimeFormat(locale === 'fr' ? 'fr-FR' : 'en-US', {
    month: 'long',
    year: 'numeric',
  }).format(availabilityDate);

  const availabilityCopy = interpolate(messages.home.hero.availability.template, {
    month: availabilityLabel,
  });

  const formatTierPrice = formatCurrency(locale);

  return (
    <>
      <Section size="xl">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,320px)] lg:items-center">
            <div className="space-y-10">
              <div
                className="inline-flex items-center gap-3 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary/80"
                data-testid="availability-pill"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400/60 animate-ping" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                </span>
                <span className="sr-only">{messages.home.hero.availability.srLabel}</span>
                <span>{availabilityCopy}</span>
              </div>

              <div className="space-y-6 text-left sm:text-center lg:text-left">
                <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                  {messages.home.hero.headline}
                </h1>
                <p className="text-base text-muted-foreground sm:text-lg">
                  {messages.home.hero.description}
                </p>
              </div>

              <ul className="space-y-2 text-sm text-muted-foreground">
                {messages.home.hero.bulletPoints.map((point) => (
                  <li key={point} className="flex items-start gap-2">
                    <span aria-hidden="true" className="mt-1 size-1.5 rounded-full bg-primary" />
                    {point}
                  </li>
                ))}
              </ul>

              <p className="text-sm text-muted-foreground">
                {messages.home.hero.pricingPrompt}{' '}
                <TrackedLink
                  href={`/${locale}/services`}
                  eventName="CTA: View services"
                  eventData={{ location: 'hero-copy' }}
                  className="font-semibold text-primary underline-offset-4 hover:underline"
                >
                  {messages.common.actions.exploreServices}
                </TrackedLink>
              </p>

              <div className="flex flex-wrap gap-3 sm:justify-center lg:justify-start">
                <Button asChild size="lg" className="px-6">
                  <TrackedLink href={`/${locale}/contact`} eventName="CTA: Start a project" eventData={{ location: 'hero' }}>
                    {messages.common.actions.bookIntro}
                  </TrackedLink>
                </Button>
                <Button variant="outline" size="lg" className="px-6" asChild>
                  <TrackedLink
                    href={`/${locale}/projects`}
                    eventName="CTA: View work"
                    eventData={{ location: 'hero' }}
                    aria-label={messages.common.actions.viewWork}
                  >
                    {messages.common.actions.viewWork}
                  </TrackedLink>
                </Button>
              </div>

              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground sm:justify-center lg:justify-start">
                  <span className="font-semibold text-foreground">{messages.home.hero.clientsIntro}</span>
                  {messages.home.hero.clients.map((client) => (
                    <span key={client} className="flex items-center gap-2">
                      <span className="size-2 rounded-full bg-muted" aria-hidden />
                      {client}
                    </span>
                  ))}
                </div>
                
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-muted-foreground sm:justify-center lg:justify-start">
                  <span className="flex items-center gap-2">
                    <svg className="size-4 text-primary" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                    </svg>
                    <span>{messages.home.hero.trustIndicators.wcagCompliant}</span>
                  </span>
                  <span className="flex items-center gap-2">
                    <svg className="size-4 text-primary" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                    </svg>
                    <span>{messages.home.hero.trustIndicators.lighthouse90Plus}</span>
                  </span>
                  <span className="flex items-center gap-2">
                    <svg className="size-4 text-primary" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                    </svg>
                    <span>{messages.home.hero.trustIndicators.postLaunchSupport}</span>
                  </span>
                </div>
              </div>
            </div>

            <aside className="hidden rounded-3xl border border-border/60 bg-background/80 p-6 shadow-sm backdrop-blur-sm lg:block">
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-foreground">{messages.home.hero.insights.title}</h2>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {messages.home.hero.insights.description}
                </p>
                <div className="grid gap-4 text-sm text-muted-foreground">
                  {messages.home.hero.insights.items.map((item) => (
                    <div key={item.title} className="rounded-2xl border border-border/60 bg-card/50 p-4">
                      <dt className="font-semibold text-foreground">{item.title}</dt>
                      <dd className="mt-1">{item.description}</dd>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      <Section size="lg">
        <Container className="space-y-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              title={messages.home.servicesPreview.heading.title}
              description={messages.home.servicesPreview.heading.description}
            />
            <Button asChild variant="ghost" className="px-3">
              <Link href={`/${locale}/services`} className="text-sm">
                {messages.home.servicesPreview.viewAll}
              </Link>
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {servicePackages.map((service) => (
              <article
                key={service.id}
                className="flex h-full flex-col justify-between gap-6 rounded-3xl border bg-card/60 p-6 shadow-sm backdrop-blur-sm"
              >
                <div className="space-y-4">
                  <div className="space-y-2">
                    {service.badge ? (
                      <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                        {service.badge}
                      </span>
                    ) : null}
                    <h3 className="text-2xl font-semibold text-foreground">{service.name}</h3>
                    <p className="text-sm text-muted-foreground">{service.pitch}</p>
                  </div>

                  <p className="inline-flex items-center rounded-full border border-border/60 bg-background/60 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    {interpolate(messages.services.labels.bestFor, { audience: service.idealFor })}
                  </p>

                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {service.deliverables.slice(0, 3).map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span aria-hidden="true" className="mt-1 size-1.5 rounded-full bg-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="space-y-2">
                    {service.tiers.map((tier) => (
                      <div key={`${service.id}-${tier.id}`} className="rounded-2xl border border-border/70 bg-background/70 p-3">
                        <div className="flex items-center justify-between text-xs font-semibold text-foreground">
                          <span>{tier.name}</span>
                          <span>{formatTierPrice(tier.price, tier.billingSuffix)}</span>
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">{tier.description}</p>
                      </div>
                    ))}
                    <p className="text-xs text-muted-foreground">
                      {interpolate(messages.services.labels.timeline, { timeline: service.timeline })}
                    </p>
                  </div>
                </div>

                <Button asChild className="w-full">
                  <TrackedLink
                    href={service.href}
                    eventName="CTA: Service package"
                    eventData={{ package: service.name }}
                  >
                    {messages.common.actions.startProject}
                  </TrackedLink>
                </Button>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section size="lg">
        <Container>
          <Carousel items={testimonials} messages={messages.common.testimonials} />
        </Container>
      </Section>

      <Section>
        <Container className="space-y-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              title={messages.home.recentProjects.heading.title}
              description={messages.home.recentProjects.heading.description}
            />
            <Button asChild variant="ghost" className="px-3">
              <Link href={`/${locale}/projects`} className="text-sm">
                {messages.home.recentProjects.viewAll}
              </Link>
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard
                key={project.slug}
                slug={project.slug}
                title={project.title}
                summary={project.summary}
                coverImage={project.cover}
                role={project.role}
                tags={project.tags}
                messages={messages.common.projectCard}
                locale={locale}
              />
            ))}
          </div>
        </Container>
      </Section>

      <Section size="lg">
        <Container>
          <div className="rounded-3xl border bg-gradient-to-br from-primary/5 via-background to-background p-8 md:p-12 lg:p-16">
            <div className="mx-auto max-w-2xl text-center space-y-6">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                {messages.home.finalCta.headline}
              </h2>
              <p className="text-base text-muted-foreground sm:text-lg">
                {messages.home.finalCta.description}
              </p>
              <div className="flex flex-wrap justify-center gap-3 pt-4">
                <Button asChild size="lg" className="px-8">
                  <TrackedLink 
                    href={`/${locale}/contact`} 
                    eventName="CTA: Final section" 
                    eventData={{ location: 'final-cta' }}
                  >
                    {messages.common.actions.bookIntro}
                  </TrackedLink>
                </Button>
                <Button variant="outline" size="lg" className="px-8" asChild>
                  <TrackedLink
                    href={`/${locale}/services`}
                    eventName="CTA: View services final"
                    eventData={{ location: 'final-cta' }}
                  >
                    {messages.common.actions.viewAllServices}
                  </TrackedLink>
                </Button>
              </div>
              <p className="text-sm text-muted-foreground pt-2">
                {messages.home.finalCta.responseTime}
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
