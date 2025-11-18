'use client';

import Link from "next/link";
import { format } from "date-fns";
import type { Project, LeadMagnet } from "contentlayer/generated";
import { useEffect } from "react";

import { CaseStudyHeader } from "@/components/case/CaseStudyHeader";
import { CaseStudyContent } from "@/components/case/CaseStudyContent";
import { CaseStudySection } from "@/components/case/CaseStudySection";
import { BeforeAfterComparison } from "@/components/case/BeforeAfterComparison";
import { TechnicalDeepDive } from "@/components/case/TechnicalDeepDive";
import { VideoTestimonial } from "@/components/case/VideoTestimonial";
import { Testimonial } from "@/components/case/Testimonial";
import { Metric } from "@/components/case/Metric";
import { RelatedProjects } from "@/components/projects/RelatedProjects";
import { ContentUpgradeCallout } from "@/components/lead-magnets";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { track } from "@/lib/analytics/track";
import type { Messages, Locale } from "@/i18n";
import { getDateFnsLocale } from "@/i18n/date";

export type ProjectContentMessages = {
  backToProjects: string;
  timeline: {
    present: string;
  };
  cta: {
    heading: string;
    description: string;
    button: string;
  };
};

type ProjectContentProps = {
  project: Project;
  locale: Locale;
  messages: ProjectContentMessages;
  caseStudyMessages: Messages["common"]["caseStudy"];
  allMessages: Messages;
  relatedLeadMagnet?: LeadMagnet;
};

export function ProjectContent({ project, locale, messages, caseStudyMessages, allMessages, relatedLeadMagnet }: ProjectContentProps) {
  useEffect(() => {
    track("Project: View", {
      slug: project.slug,
      title: project.title,
    });
  }, [project.slug, project.title]);

  const stackAsString = Array.isArray(project.stack)
    ? project.stack.join(", ")
    : project.stack;

  const dateLocale = getDateFnsLocale(locale);
  const formatDate = (value?: string | null) => {
    if (!value) return null;
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return value;
    return format(parsed, "MMM yyyy", { locale: dateLocale });
  };

  const startDate = formatDate(project.dates?.start);
  const endDate = project.dates?.end ? formatDate(project.dates.end) : messages.timeline.present;

  return (
    <Section>
      <Container className="space-y-12 py-12">
        {/* Back Button */}
        <Button asChild variant="ghost" className="-ml-4 w-fit">
          <Link href={`/${locale}/projects`} className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m12 19-7-7 7-7" />
              <path d="M19 12H5" />
            </svg>
            {messages.backToProjects}
          </Link>
        </Button>

        {/* Hero Section */}
        <CaseStudyHeader
          title={project.title}
          summary={project.summary}
          role={project.role}
          stack={stackAsString}
          metrics={project.metrics}
          links={project.links}
          messages={caseStudyMessages}
        />

        {/* Timeline and Tags */}
        <div className="space-y-4">
          {(startDate || endDate) && (
            <p className="text-sm uppercase tracking-wide text-muted-foreground">
              {startDate}
              {startDate && " – "}
              {endDate}
            </p>
          )}

          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Case Study Section (Problem-Solution-Results) */}
        {project.caseStudy && (
          <CaseStudySection caseStudy={project.caseStudy} />
        )}

        {/* Content Upgrade Callout */}
        {relatedLeadMagnet && (
          <ContentUpgradeCallout
            relatedMagnet={relatedLeadMagnet}
          />
        )}

        {/* Before/After Comparison */}
        {project.beforeAfter && project.beforeAfter.length > 0 && (
          <BeforeAfterComparison comparisons={project.beforeAfter} />
        )}

        {/* Technical Deep Dive */}
        {project.technicalDeepDive && (
          <TechnicalDeepDive deepDive={project.technicalDeepDive} />
        )}

        {/* Video Testimonial */}
        {project.videoTestimonial && (
          <VideoTestimonial
            video={project.videoTestimonial}
            fallbackTestimonial={project.testimonial}
          />
        )}

        {/* Legacy Testimonial (if no video testimonial) */}
        {!project.videoTestimonial && project.testimonial && (
          <Testimonial
            quote={project.testimonial.quote}
            author={project.testimonial.author}
            role={project.testimonial.role}
          />
        )}

        {/* Metrics Section (if not already shown in header) */}
        {project.metrics && project.metrics.length > 0 && (
          <section className="rounded-3xl border bg-background shadow-sm">
            <div className="space-y-6 p-8 sm:p-10 lg:p-12">
              <header>
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  Key Metrics
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Measurable impact and results
                </p>
              </header>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {project.metrics.map((metric, index) => (
                  <Metric key={index} label={metric.label} value={metric.value} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* MDX Content (if available) */}
        {project.body?.code && (
          <CaseStudyContent code={project.body.code} />
        )}

        {/* Related Projects */}
        {project.relatedProjects && project.relatedProjects.length > 0 && (
          <RelatedProjects
            projectSlugs={project.relatedProjects}
            locale={locale}
            messages={allMessages}
            currentProjectSlug={project.slug}
          />
        )}

        {/* CTA Section */}
        <section className="rounded-3xl border bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 shadow-sm">
          <div className="space-y-6 p-8 text-center sm:p-10 lg:p-12">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              {messages.cta?.heading || "Start Your Project"}
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              {messages.cta?.description || "Ready to achieve similar results? Let's discuss how I can help bring your vision to life."}
            </p>
            <Button asChild size="lg" className="mt-4">
              <Link href={`/${locale}/contact`}>
                {messages.cta?.button || "Get in Touch"}
              </Link>
            </Button>
          </div>
        </section>
      </Container>
    </Section>
  );
}
