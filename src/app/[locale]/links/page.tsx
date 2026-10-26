import type { Metadata } from "next";
import {
  ArrowRight,
  Briefcase,
  FileDown,
  FolderGit2,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Sparkles,
} from "lucide-react";

import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { generateHreflangAlternates } from "@/lib/metadata";
import { getMessages, type Locale } from "@/i18n";
import { fallbackLocale, isLocale } from "@/i18n/locales";
import { interpolate } from "@/i18n/interpolate";

type PageParams = {
  locale: string;
};

type PageProps = {
  params: Promise<PageParams>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : fallbackLocale;
  const messages = getMessages(locale);
  const alternates = generateHreflangAlternates("/links", locale);

  return {
    title: messages.linksPage.meta.title,
    description: messages.linksPage.meta.description,
    alternates,
    openGraph: {
      title: `${messages.linksPage.meta.title} | ${messages.common.site.name}`,
      description: messages.linksPage.meta.description,
      url: alternates.canonical,
    },
  } satisfies Metadata;
}

export default async function LinksPage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : fallbackLocale;
  const messages = getMessages(locale);
  const copy = messages.linksPage;

  const availabilityDate = new Date();
  availabilityDate.setMonth(availabilityDate.getMonth() + 1);
  const availabilityLabel = new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-US", {
    month: "long",
    year: "numeric",
  }).format(availabilityDate);

  const availabilityCopy = interpolate(messages.home.hero.availability.template, {
    period: availabilityLabel,
    month: availabilityLabel,
  });

  const actionItems = [
    {
      key: "quote",
      href: `/${locale}/contact`,
      title: copy.actions.quote.title,
      subtitle: copy.actions.quote.subtitle,
      icon: Sparkles,
      primary: true,
    },
    {
      key: "services",
      href: `/${locale}/services`,
      title: copy.actions.services.title,
      subtitle: copy.actions.services.subtitle,
      icon: Briefcase,
      primary: false,
    },
    {
      key: "projects",
      href: `/${locale}/projects`,
      title: copy.actions.projects.title,
      subtitle: copy.actions.projects.subtitle,
      icon: FolderGit2,
      primary: false,
    },
    {
      key: "resources",
      href: `/${locale}/resources`,
      title: copy.actions.resources.title,
      subtitle: copy.actions.resources.subtitle,
      icon: FileDown,
      primary: false,
    },
  ] as const;

  return (
    <Section size="md">
      <Container className="max-w-xl space-y-8">
        {/* Identity & Bio Header */}
        <div className="rounded-2xl border border-border/70 bg-card/85 p-6 text-center shadow-sm backdrop-blur-xl space-y-4">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 font-mono text-xs font-semibold text-emerald-700 dark:text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span>{availabilityCopy}</span>
          </div>

          <div className="space-y-1.5">
            <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl font-heading">
              Mohammed-Amine Madah
            </h1>
            <p className="font-mono text-xs sm:text-sm font-medium text-primary">
              {copy.bio.role}
            </p>
            <p className="inline-flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
              <MapPin className="size-3.5 text-muted-foreground" aria-hidden="true" />
              <span>{copy.bio.location}</span>
            </p>
          </div>

          <p className="mx-auto max-w-md text-sm leading-relaxed text-muted-foreground">
            {copy.bio.tagline}
          </p>
        </div>

        {/* Thumb-Friendly Action Stack */}
        <nav aria-label={copy.meta.title} className="space-y-3.5">
          {actionItems.map((item) => {
            const Icon = item.icon;
            return (
              <TrackedLink
                key={item.key}
                href={item.href}
                eventName={`Links Hub: ${item.key}`}
                eventData={{ locale, destination: item.href }}
                className={
                  item.primary
                    ? "group flex min-h-[68px] items-center justify-between gap-4 rounded-2xl border border-primary bg-primary px-5 py-4 text-primary-foreground shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg"
                    : "group flex min-h-[68px] items-center justify-between gap-4 rounded-2xl border border-border/70 bg-card/85 px-5 py-4 text-foreground shadow-xs transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
                }
              >
                <div className="flex items-start gap-3.5">
                  <div
                    className={
                      item.primary
                        ? "mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/15 text-white"
                        : "mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary"
                    }
                    aria-hidden="true"
                  >
                    <Icon className="size-5" />
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-sm sm:text-base font-bold leading-snug">
                      {item.title}
                    </div>
                    <div
                      className={
                        item.primary
                          ? "text-xs text-primary-foreground/85"
                          : "text-xs text-muted-foreground"
                      }
                    >
                      {item.subtitle}
                    </div>
                  </div>
                </div>
                <ArrowRight
                  className="size-5 shrink-0 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </TrackedLink>
            );
          })}

          {/* Direct Email Action */}
          <a
            href="mailto:contact@amilemia.dev"
            className="group flex min-h-[64px] items-center justify-between gap-4 rounded-2xl border border-border/70 bg-card/70 px-5 py-4 text-foreground transition-all hover:border-primary/40 hover:bg-card"
          >
            <div className="flex items-center gap-3.5">
              <div
                className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border bg-muted/60 text-foreground"
                aria-hidden="true"
              >
                <Mail className="size-5" />
              </div>
              <div>
                <div className="text-sm font-semibold">{copy.actions.email.title}</div>
                <div className="font-mono text-xs text-muted-foreground">
                  {copy.actions.email.subtitle}
                </div>
              </div>
            </div>
            <ArrowRight
              className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </a>
        </nav>

        {/* Social Profiles */}
        <div className="flex items-center justify-center gap-4 pt-2">
          <a
            href="https://github.com/amilemia"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-border/70 bg-card px-4 py-2 text-xs font-semibold text-foreground transition-colors hover:border-primary/40 hover:text-primary"
          >
            <Github className="size-4" aria-hidden="true" />
            <span>GitHub</span>
          </a>
          <a
            href="https://www.linkedin.com/in/aminemadah/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-border/70 bg-card px-4 py-2 text-xs font-semibold text-foreground transition-colors hover:border-primary/40 hover:text-primary"
          >
            <Linkedin className="size-4" aria-hidden="true" />
            <span>LinkedIn</span>
          </a>
        </div>
      </Container>
    </Section>
  );
}
