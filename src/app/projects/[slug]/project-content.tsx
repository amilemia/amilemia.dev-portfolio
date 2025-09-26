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

type ProjectContentProps = {
  project: Project;
};

export function ProjectContent({ project }: ProjectContentProps) {
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

  return (
    <Section>
      <Container className="space-y-12 py-12">
        <Button asChild variant="ghost" className="-ml-4 w-fit">
          <Link href="/projects" className="flex items-center gap-2">
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
            Back to projects
          </Link>
        </Button>

        <CaseStudyHeader
          title={project.title}
          summary={project.summary}
          role={project.role}
          stack={stackAsString}
          metrics={project.metrics}
          links={project.links}
        />

        <div className="space-y-4">
          {(project.dates?.start || project.dates?.end) && (
            <p className="text-sm uppercase tracking-wide text-muted-foreground">
              {project.dates?.start && format(new Date(project.dates.start), "MMM yyyy")} -
              {" "}
              {project.dates?.end ? format(new Date(project.dates.end), "MMM yyyy") : "Present"}
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
