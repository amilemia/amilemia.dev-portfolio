import Link from "next/link";

import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { Carousel } from "@/components/testimonials/Carousel";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/ui/project-card";
import { TrustMetrics } from "@/components/trust/TrustMetrics";
import { FeaturedLeadMagnet } from "@/components/lead-magnets";
import { Particles } from "@/components/animations/particles";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { AnimatedText } from "@/components/animations/animated-text";
import { getLocalizedServicePackages } from "@/data/services";
import { getTestimonials } from "@/data/testimonials";
import { getTrustMetrics } from "@/data/trust";
import { getProjects, getLeadMagnets } from "@/lib/content";
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
  const trustMetrics = getTrustMetrics();
  const leadMagnets = await getLeadMagnets();
  const featuredLeadMagnet = leadMagnets[0]; // Get the most popular lead magnet
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
      <Section size="xl" className="relative overflow-hidden">
        <Particles />
        <Container className="relative z-10">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,320px)] lg:items-center">
            <ScrollReveal className="space-y-10" duration={0.8}>
              <div
                className="inline-flex items-center gap-3 rounded-full border border-primary/20 bg-background/50 backdrop-blur-md px-4 py-2 text-sm font-medium text-primary/80 shadow-[0_0_15px_-3px_var(--color-primary)]"
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
                <AnimatedText
                  text={messages.home.hero.headline}
                  el="h1"
                  className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl font-heading"
                />
                <p className="text-base text-muted-foreground sm:text-lg max-w-2xl">
                  {messages.home.hero.description}
                </p>
              </div>

              <ul className="space-y-3 text-sm text-muted-foreground">
                {messages.home.hero.bulletPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span aria-hidden="true" className="mt-1.5 size-1.5 rounded-full bg-primary shadow-[0_0_10px_2px_var(--color-primary)]" />
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

              <div className="flex flex-wrap gap-4 sm:justify-center lg:justify-start">
                <Button asChild size="lg" variant="premium" className="px-8">
                  <TrackedLink href={`/${locale}/contact`} eventName="CTA: Start a project" eventData={{ location: 'hero' }}>
                    {messages.common.actions.bookIntro}
                  </TrackedLink>
                </Button>
                <Button variant="outline" size="lg" className="px-8" asChild>
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
            </ScrollReveal>

            <ScrollReveal delay={0.3} direction="left" className="hidden lg:block">
              <aside className="rounded-[2rem] border border-border/50 bg-background/40 p-8 shadow-xl backdrop-blur-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-50" />
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-foreground">{messages.home.hero.insights.title}</h2>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {messages.home.hero.insights.description}
                </p>
                <div className="grid gap-4 text-sm text-muted-foreground relative z-10">
                  {messages.home.hero.insights.items.map((item) => (
                    <div key={item.title} className="rounded-2xl border border-border/40 bg-card/40 backdrop-blur-md p-5 transition-transform hover:-translate-y-1 hover:border-primary/30">
                      <dt className="font-semibold text-foreground">{item.title}</dt>
                      <dd className="mt-1.5">{item.description}</dd>
                    </div>
                  ))}
                </div>
              </div>
              </aside>
            </ScrollReveal>
          </div>

          {/* Trust Metrics Section */}
          <div className="mt-16 pt-12 border-t border-border/60">
            <TrustMetrics metrics={trustMetrics} />
          </div>

          {/* Featured Lead Magnet */}
          {featuredLeadMagnet && (
            <div className="mt-16">
              <FeaturedLeadMagnet
                leadMagnet={featuredLeadMagnet}
                messages={messages.resources.featured}
              />
            </div>
          )}
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

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-stretch">
            {servicePackages.map((service, index) => (
              <ScrollReveal 
                key={service.id} 
                delay={index * 0.15} 
              >
                <article
                  className="flex h-full flex-col justify-between gap-8 rounded-[2rem] border border-border/50 bg-background/40 p-8 shadow-sm backdrop-blur-xl transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:hover:shadow-[0_8px_30px_var(--color-primary)_/_0.15] hover:-translate-y-2 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="space-y-6 relative z-10">
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

                  <div className="space-y-3">
                    {service.tiers.map((tier) => (
                      <div key={`${service.id}-${tier.id}`} className="rounded-2xl border border-border/40 bg-background/40 backdrop-blur-sm p-4 transition-colors group-hover:border-primary/20">
                        <div className="flex items-center justify-between text-sm font-semibold text-foreground">
                          <span>{tier.name}</span>
                          <span className="text-primary">{formatTierPrice(tier.price, tier.billingSuffix)}</span>
                        </div>
                        <p className="mt-1.5 text-xs text-muted-foreground">{tier.description}</p>
                      </div>
                    ))}
                    <p className="text-xs text-muted-foreground mt-4 font-medium">
                      {interpolate(messages.services.labels.timeline, { timeline: service.timeline })}
                    </p>
                  </div>
                </div>

                <Button asChild className="w-full relative z-10" variant="outline">
                  <TrackedLink
                    href={service.href}
                    eventName="CTA: Service package"
                    eventData={{ package: service.name }}
                  >
                    {messages.common.actions.startProject}
                  </TrackedLink>
                </Button>
                </article>
              </ScrollReveal>
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

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-stretch">
            {projects.map((project, index) => (
              <ScrollReveal
                key={project.slug}
                delay={index * 0.15}
              >
                <ProjectCard
                  slug={project.slug}
                  title={project.title}
                  summary={project.summary}
                  coverImage={project.cover}
                  role={project.role}
                  tags={project.tags}
                  messages={messages.common.projectCard}
                  locale={locale}
                />
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section size="lg">
        <Container>
          <ScrollReveal delay={0.2} duration={0.8}>
            <div className="relative overflow-hidden rounded-[2.5rem] border border-border/40 bg-gradient-to-br from-primary/10 via-background/40 to-background/40 backdrop-blur-xl shadow-2xl p-8 md:p-16 lg:p-24">
              <div className="absolute top-0 right-0 -mt-20 -mr-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl opacity-50" />
              <div className="absolute bottom-0 left-0 -mb-20 -ml-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl opacity-50" />
              
              <div className="relative mx-auto max-w-2xl text-center space-y-8 z-10">
                <h2 className="text-4xl font-bold tracking-tight sm:text-5xl font-heading">
                  {messages.home.finalCta.headline}
                </h2>
                <p className="text-lg text-muted-foreground sm:text-xl">
                  {messages.home.finalCta.description}
                </p>
                <div className="flex flex-wrap justify-center gap-4 pt-6">
                  <Button asChild size="lg" variant="premium" className="px-10">
                    <TrackedLink 
                      href={`/${locale}/contact`} 
                      eventName="CTA: Final section" 
                      eventData={{ location: 'final-cta' }}
                    >
                      {messages.common.actions.bookIntro}
                    </TrackedLink>
                  </Button>
                  <Button variant="outline" size="lg" className="px-10 bg-background/50 backdrop-blur-sm" asChild>
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
          </ScrollReveal>
        </Container>
      </Section>
    </>
  );
}
