'use client';

import Link from "next/link";
import { format } from "date-fns";
import { useMDXComponent } from "next-contentlayer2/hooks";
import type { Project } from "contentlayer/generated";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";

type ProjectContentProps = {
  project: Project;
};

export function ProjectContent({ project }: ProjectContentProps) {
  const MDXContent = useMDXComponent(project?.body?.code || '');

  return (
    <Section>
      <Container className="py-12">
        <Button asChild variant="ghost" className="mb-8 -ml-4">
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

        <div className="mb-8">
          <h1 className="mb-4 text-4xl font-bold tracking-tight">
            {project.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            {project.dates && (
              <span>
                {format(new Date(project.dates.start), 'MMM yyyy')} -{' '}
                {project.dates.end
                  ? format(new Date(project.dates.end), 'MMM yyyy')
                  : 'Present'}
              </span>
            )}
            {project.role && <span>• {project.role}</span>}
          </div>

          {project.tags && (
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>

        <div className="prose dark:prose-invert max-w-none">
          {project.body && (
            <MDXContent />
          )}
        </div>

        {project.links && (
          <div className="mt-12 flex flex-wrap gap-4">
            {project.links.repo && (
              <Button asChild variant="outline">
                <a
                  href={project.links.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
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
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                  </svg>
                  View on GitHub
                </a>
              </Button>
            )}
            {project.links.live && (
              <Button asChild>
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
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
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                  Live Demo
                </a>
              </Button>
            )}
          </div>
        )}
      </Container>
    </Section>
  );
}
