import Link from "next/link";
import { ArrowRight, Check, CheckCircle2, Eye, ShieldCheck, Zap } from "lucide-react";

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
import { cn } from "@/lib/utils";

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
  const trustMetrics = getTrustMetrics(locale);
  const leadMagnets = await getLeadMagnets();
  const featuredLeadMagnet = leadMagnets[0]; // Get the most popular lead magnet
  const servicePackages = getLocalizedServicePackages(messages.services.packages).map((service) => ({
    ...service,
    href: `/${locale}/contact?service=${encodeURIComponent(service.name)}`,
  }));

  const availabilityDate = new Date();
  availabilityDate.setMonth(availabilityDate.getMonth() + 1);

  const availabilityLabel = new Intl.DateTimeFormat(locale === 'fr' ? 'fr-FR' : 'en-US', {
    month: 'long',
    year: 'numeric',
  }).format(availabilityDate);

  const availabilityCopy = interpolate(messages.home.hero.availability.template, {
    period: availabilityLabel,
    month: availabilityLabel,
  });

  const formatTierPrice = formatCurrency(locale);
  const protocolBadgeLabel = locale === "fr" ? "PROTOCOLE 3 ÉTAPES" : "3-STAGE PROTOCOL";
  const insightIcons = [Zap, ShieldCheck, Eye];

  return (
    <>
      <Section size="xl" className="relative overflow-hidden">
        <Particles />
        <Container className="relative z-10">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,420px)] lg:items-center">
            <ScrollReveal className="space-y-8" duration={0.8}>
              <div
                className="inline-flex items-center gap-3 rounded-full border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-md px-4 py-1.5 font-mono text-xs font-semibold text-emerald-700 dark:text-emerald-400 shadow-xs"
                data-testid="availability-pill"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400/70 animate-ping" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                </span>
                <span className="sr-only">{messages.home.hero.availability.srLabel}</span>
                <span>{availabilityCopy}</span>
              </div>

              <div className="space-y-5 text-left">
                <AnimatedText
                  text={messages.home.hero.headline}
                  el="h1"
                  className="text-4xl font-extrabold tracking-tight leading-[1.08] sm:text-6xl lg:text-7xl font-heading"
                />
                <p className="text-base leading-relaxed text-muted-foreground sm:text-lg max-w-2xl">
                  {messages.home.hero.description}
                </p>
              </div>

              <ul className="space-y-3 text-sm sm:text-base text-muted-foreground">
                {messages.home.hero.bulletPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <CheckCircle2
                      aria-hidden="true"
                      className="mt-0.5 size-5 shrink-0 text-emerald-500"
                    />
                    <span className="text-foreground/90">{point}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap sm:items-center">
                <Button asChild size="lg" variant="premium" className="min-h-[48px] w-full px-8 sm:w-auto">
                  <TrackedLink href={`/${locale}/contact`} eventName="CTA: Start a project" eventData={{ location: 'hero' }}>
                    {messages.common.actions.bookIntro}
                    <ArrowRight className="ml-2 size-4" aria-hidden="true" />
                  </TrackedLink>
                </Button>
                <Button variant="outline" size="lg" className="min-h-[48px] w-full px-8 sm:w-auto" asChild>
                  <TrackedLink
                    href={`/${locale}/projects`}
                    eventName="CTA: View work"
                    eventData={{ location: 'hero' }}
                    aria-label={messages.common.actions.viewWork}
                  >
                    {messages.common.actions.viewWork}
                  </TrackedLink>
                </Button>
                <TrackedLink
                  href={`/${locale}/services`}
                  eventName="CTA: View services"
                  eventData={{ location: 'hero-copy' }}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-semibold text-primary underline-offset-4 hover:underline sm:justify-start"
                >
                  {messages.common.actions.exploreServices}
                  <span aria-hidden="true">&rarr;</span>
                </TrackedLink>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2} direction="left">
              <aside className="rounded-2xl border border-border/70 bg-card/80 p-6 sm:p-8 shadow-xl backdrop-blur-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-50 pointer-events-none" />
                <div className="space-y-6 relative z-10">
                  <div className="space-y-2 border-b border-border/60 pb-4">
                    <div className="flex items-center justify-between gap-2">
                      <h2 className="text-lg font-bold tracking-tight text-foreground">
                        {messages.home.hero.insights.title}
                      </h2>
                      <span className="inline-flex items-center rounded-md border border-primary/25 bg-primary/10 px-2.5 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-primary">
                        {protocolBadgeLabel}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
                      {messages.home.hero.insights.description}
                    </p>
                  </div>

                  <dl className="grid gap-3.5 text-sm text-muted-foreground">
                    {messages.home.hero.insights.items.map((item, idx) => {
                      const IconComponent = insightIcons[idx % insightIcons.length];
                      const isEmerald = idx === 1;
                      return (
                        <div
                          key={item.title}
                          className="flex items-start gap-3.5 rounded-xl border border-border/60 bg-background/60 p-4 transition-all hover:border-primary/30"
                        >
                          <div
                            className={cn(
                              "mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg border",
                              isEmerald
                                ? "border-emerald-500/25 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                : "border-primary/25 bg-primary/10 text-primary"
                            )}
                            aria-hidden="true"
                          >
                            <IconComponent className="size-4" />
                          </div>
                          <div>
                            <dt className="font-semibold text-foreground">{item.title}</dt>
                            <dd className="mt-1 text-xs sm:text-sm leading-relaxed">{item.description}</dd>
                          </div>
                        </div>
                      );
                    })}
                  </dl>
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
              <Link href={`/${locale}/services`} className="text-sm font-semibold text-primary">
                {messages.home.servicesPreview.viewAll} <span aria-hidden="true">&rarr;</span>
              </Link>
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-stretch">
            {servicePackages.map((service, index) => {
              const isFeatured = index === 0;
              return (
                <ScrollReveal
                  key={service.id}
                  delay={index * 0.15}
                >
                  <article
                    className={cn(
                      "flex h-full flex-col justify-between gap-7 rounded-2xl border p-6 sm:p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 relative overflow-hidden group",
                      isFeatured
                        ? "border-primary/50 bg-card/90 shadow-lg ring-1 ring-primary/20"
                        : "border-border/70 bg-card/70 shadow-sm hover:border-primary/30 hover:shadow-md"
                    )}
                  >
                    <div className="space-y-6 relative z-10">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between gap-2">
                          {service.badge ? (
                            <span
                              className={cn(
                                "inline-flex items-center rounded-full px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider",
                                isFeatured
                                  ? "bg-primary text-primary-foreground"
                                  : index === 1
                                    ? "border border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                                    : "border border-border bg-muted text-muted-foreground"
                              )}
                            >
                              {service.badge}
                            </span>
                          ) : <span />}
                          <span className="font-mono text-xs font-medium text-muted-foreground">
                            {service.estimatedTimeline}
                          </span>
                        </div>
                        <h3 className="text-2xl font-bold tracking-tight text-foreground">{service.name}</h3>
                        <p className="text-sm leading-relaxed text-muted-foreground">{service.pitch}</p>
                      </div>

                      <div className="rounded-xl border border-border/60 bg-muted/40 px-3.5 py-2.5">
                        <p className="text-xs font-medium text-muted-foreground">
                          {interpolate(messages.services.labels.bestFor, { audience: service.idealFor })}
                        </p>
                      </div>

                      <ul className="space-y-2.5 text-sm text-muted-foreground">
                        {service.deliverables.slice(0, 3).map((item) => (
                          <li key={item} className="flex items-start gap-2.5">
                            <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="space-y-3 border-t border-border/60 pt-5">
                        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-1">
                          {service.tiers.map((tier) => {
                            const isPlus = tier.id === "plus";
                            return (
                              <div
                                key={`${service.id}-${tier.id}`}
                                className={cn(
                                  "rounded-xl border p-3.5 transition-colors",
                                  isPlus
                                    ? "border-primary/35 bg-primary/5"
                                    : "border-border/60 bg-background/60"
                                )}
                              >
                                <div className="flex flex-wrap items-baseline justify-between gap-1 text-sm font-semibold text-foreground">
                                  <span className="flex items-center gap-1.5">
                                    {tier.name}
                                    {isPlus && (
                                      <span className="hidden sm:inline-block rounded bg-primary/15 px-1.5 py-0.5 font-mono text-[10px] font-bold uppercase text-primary">
                                        Plus
                                      </span>
                                    )}
                                  </span>
                                  <span className="font-mono text-base font-extrabold text-primary">
                                    {formatTierPrice(tier.price, tier.billingSuffix)}
                                  </span>
                                </div>
                                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                                  {tier.description}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                        <p className="font-mono text-xs text-muted-foreground pt-1">
                          {interpolate(messages.services.labels.timeline, { timeline: service.timeline })}
                        </p>
                      </div>
                    </div>

                    <Button
                      asChild
                      className="min-h-[48px] w-full relative z-10"
                      variant={isFeatured ? "premium" : "outline"}
                    >
                      <TrackedLink
                        href={service.href}
                        eventName="CTA: Service package"
                        eventData={{ package: service.name }}
                      >
                        {messages.common.actions.startProject}
                        <ArrowRight className="ml-2 size-4" aria-hidden="true" />
                      </TrackedLink>
                    </Button>
                  </article>
                </ScrollReveal>
              );
            })}
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
              <Link href={`/${locale}/projects`} className="text-sm font-semibold text-primary">
                {messages.home.recentProjects.viewAll} <span aria-hidden="true">&rarr;</span>
              </Link>
            </Button>
          </div>

          <div
            className={cn(
              "grid gap-6 items-stretch",
              projects.length === 2 ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3"
            )}
          >
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
                  stack={project.stack}
                  metrics={project.metrics}
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
            <div className="relative overflow-hidden rounded-2xl border border-border/70 bg-gradient-to-br from-primary/10 via-card/80 to-card/80 backdrop-blur-xl shadow-xl p-8 md:p-16 lg:p-20">
              <div className="absolute top-0 right-0 -mt-20 -mr-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl opacity-50 pointer-events-none" />
              <div className="absolute bottom-0 left-0 -mb-20 -ml-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl opacity-50 pointer-events-none" />

              <div className="relative mx-auto max-w-2xl text-center space-y-6 z-10">
                <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl font-heading">
                  {messages.home.finalCta.headline}
                </h2>
                <p className="text-base text-muted-foreground sm:text-xl leading-relaxed">
                  {messages.home.finalCta.description}
                </p>
                <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 pt-4">
                  <Button asChild size="lg" variant="premium" className="min-h-[48px] px-10">
                    <TrackedLink
                      href={`/${locale}/contact`}
                      eventName="CTA: Final section"
                      eventData={{ location: 'final-cta' }}
                    >
                      {messages.common.actions.bookIntro}
                      <ArrowRight className="ml-2 size-4" aria-hidden="true" />
                    </TrackedLink>
                  </Button>
                  <Button variant="outline" size="lg" className="min-h-[48px] px-10 bg-background/60 backdrop-blur-sm" asChild>
                    <TrackedLink
                      href={`/${locale}/services`}
                      eventName="CTA: View services final"
                      eventData={{ location: 'final-cta' }}
                    >
                      {messages.common.actions.viewAllServices}
                    </TrackedLink>
                  </Button>
                </div>
                <p className="font-mono text-xs text-muted-foreground pt-2">
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
