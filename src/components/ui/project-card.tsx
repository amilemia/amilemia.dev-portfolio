'use client';

import Link from "next/link";
import Image from "next/image";

import { Badge } from "./badge";
import { Button } from "./button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./card";
import { track } from "@/lib/analytics/track";
import type { Messages } from "@/i18n";
import type { Locale } from "@/i18n";
import { interpolate } from "@/i18n/interpolate";

type ProjectCardProps = {
  slug: string;
  title: string;
  summary: string;
  coverImage?: string;
  role?: string;
  tags?: string[];
  messages: Messages["common"]["projectCard"];
  locale: Locale;
};

export function ProjectCard({ slug, title, summary, coverImage, role, tags, messages, locale }: ProjectCardProps) {
  const detailHref = `/${locale}/projects/${slug}`;
  return (
    <Card
      className="group flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
      data-testid="project-card"
    >
      {coverImage && (
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={coverImage}
            alt={interpolate(messages.coverAlt, { title })}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
        </div>
      )}
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <CardTitle className="text-xl">
            <Link
              href={detailHref}
              className="focus:ring-offset-background hover:underline focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:rounded-sm"
              onClick={() => track('project_view', { project: slug })}
            >
              {title}
            </Link>
          </CardTitle>
          {role && (
            <span className="inline-flex items-center rounded-md bg-accent/50 px-2 py-1 text-xs font-medium text-accent-foreground ring-1 ring-inset ring-accent/30">
              {role}
            </span>
          )}
        </div>
        {tags && tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="transition-colors group-hover:bg-accent/50"
                data-testid="project-tag"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-muted-foreground">{summary}</p>
      </CardContent>
      <CardFooter className="mt-auto">
        <Button
          asChild
          variant="link"
          className="p-0 text-foreground/70 transition-transform duration-300 hover:text-foreground group-hover:translate-x-1"
        >
          <Link href={detailHref}>
            {messages.viewCaseStudy} <span className="ml-1">&rarr;</span>
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
