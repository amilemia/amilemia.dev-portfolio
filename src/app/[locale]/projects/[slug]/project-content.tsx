'use client';

import Link from "next/link";
import { format } from "date-fns";
import { useMDXComponent } from "next-contentlayer2/hooks";
import type { Project } from "contentlayer/generated";
import { useEffect } from "react";

import { CaseStudyHeader } from "@/components/case/CaseStudyHeader";
import { Testimonial } from "@/components/case/Testimonial";
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
};

type ProjectContentProps = {
  project: Project;
  locale: Locale;
  messages: ProjectContentMessages;
  caseStudyMessages: Messages["common"]["caseStudy"];
};

export function ProjectContent({ project, locale, messages, caseStudyMessages }: ProjectContentProps) {
  const MDXContent = useMDXComponent(project?.body?.code || "");

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

        <CaseStudyHeader
          title={project.title}
          summary={project.summary}
          role={project.role}
          stack={stackAsString}
          metrics={project.metrics}
          links={project.links}
          messages={caseStudyMessages}
        />

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

        {project.testimonial && (
          <Testimonial
            quote={project.testimonial.quote}
            author={project.testimonial.author}
            role={project.testimonial.role}
          />
        )}

        <div className="prose max-w-none dark:prose-invert">
          {project.body && <MDXContent />}
        </div>
      </Container>
    </Section>
  );
}
