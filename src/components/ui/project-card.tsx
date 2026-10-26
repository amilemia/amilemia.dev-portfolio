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

type ProjectMetric = {
  label: string;
  value: string;
};

type ProjectCardProps = {
  slug: string;
  title: string;
  summary: string;
  coverImage?: string;
  role?: string;
  tags?: string[];
  stack?: string[];
  metrics?: ProjectMetric[];
  messages: Messages["common"]["projectCard"];
  locale: Locale;
};

export function ProjectCard({
  slug,
  title,
  summary,
  coverImage,
  role,
  tags,
  stack,
  metrics,
  messages,
  locale,
}: ProjectCardProps) {
  const detailHref = `/${locale}/projects/${slug}`;
  const primaryMetric = metrics?.[0];
  const displayTags = stack && stack.length > 0 ? stack.slice(0, 4) : tags;

  return (
    <Card
      className="group flex h-full flex-col transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-xl focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 bg-card/80 backdrop-blur-md border border-border/70 overflow-hidden rounded-2xl"
      data-testid="project-card"
    >
      {/* Architectural Browser Header Bar + Metric Pill */}
      <div className="flex items-center justify-between gap-2 border-b border-border/60 bg-muted/60 px-4 py-2.5">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-rose-400/80" />
          <span className="size-2.5 rounded-full bg-amber-400/80" />
          <span className="size-2.5 rounded-full bg-emerald-400/80" />
        </div>
        {primaryMetric ? (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
            <span className="size-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
            {primaryMetric.value} {primaryMetric.label}
          </span>
        ) : role ? (
          <span className="font-mono text-[11px] font-medium text-muted-foreground">
            {role}
          </span>
        ) : null}
      </div>

      {coverImage && (
        <div className="relative aspect-[16/9] overflow-hidden border-b border-border/40 bg-muted/30">
          <Image
            src={coverImage}
            alt={interpolate(messages.coverAlt, { title })}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
        </div>
      )}

      <CardHeader className="space-y-3 pb-3">
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="text-xl font-bold tracking-tight leading-snug">
            <Link
              href={detailHref}
              className="focus:ring-offset-background group-hover:text-primary transition-colors hover:underline focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:rounded-sm"
              onClick={() => track('project_view', { project: slug })}
            >
              {title}
            </Link>
          </CardTitle>
          {role && (
            <span className="shrink-0 inline-flex items-center rounded-md border border-border/80 bg-muted/60 px-2.5 py-1 font-mono text-[11px] font-medium text-muted-foreground">
              {role}
            </span>
          )}
        </div>
        {displayTags && displayTags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {displayTags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="rounded-md font-mono text-[11px] font-medium transition-colors group-hover:bg-primary/10 group-hover:text-primary"
                data-testid="project-tag"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardHeader>

      <CardContent className="flex-1 pb-4">
        <p className="text-sm leading-relaxed text-muted-foreground">{summary}</p>
      </CardContent>

      <CardFooter className="mt-auto border-t border-border/40 pt-4">
        <Button
          asChild
          variant="link"
          className="h-auto p-0 font-semibold text-primary transition-transform duration-200 group-hover:translate-x-1"
        >
          <Link href={detailHref}>
            {messages.viewCaseStudy} <span className="ml-1" aria-hidden="true">&rarr;</span>
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
