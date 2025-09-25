import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { Metric } from "./Metric";

export type CaseStudyMetric = {
  label: string;
  value: string;
};

export type CaseStudyLinks = {
  live?: string;
  repo?: string;
};

type CaseStudyHeaderProps = {
  title: string;
  summary: string;
  role?: string;
  stack?: string;
  metrics?: CaseStudyMetric[];
  links?: CaseStudyLinks;
};

const extractStackItems = (stack?: string) => {
  if (!stack) {
    return [];
  }

  return stack
    .split(/[,|]/)
    .map((item) => item.trim())
    .filter(Boolean);
};

export function CaseStudyHeader({
  title,
  summary,
  role,
  stack,
  metrics,
  links,
}: CaseStudyHeaderProps) {
  const hasLinks = Boolean(links?.live || links?.repo);
  const stackItems = extractStackItems(stack);
  const hasStack = stackItems.length > 0;
  const hasMetrics = Boolean(metrics && metrics.length > 0);

  return (
    <section className="relative overflow-hidden rounded-3xl border bg-background shadow-sm">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-transparent to-primary/5"
      />
      <div className="space-y-10 p-8 sm:p-10 lg:p-12">
        <header className="space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary/70">
            Case Study
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {title}
          </h1>
          <p className="max-w-3xl text-lg text-muted-foreground sm:text-xl">
            {summary}
          </p>
        </header>

        {(role || hasStack) && (
          <div className="space-y-4">
            {role && (
              <div>
                <Badge
                  aria-label={`Role: ${role}`}
                  className="rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide"
                  variant="secondary"
                >
                  {role}
                </Badge>
              </div>
            )}
            {hasStack && (
              <div className="flex flex-wrap gap-2">
                {stackItems.map((item) => (
                  <Badge key={item} aria-label={`Stack: ${item}`} variant="outline">
                    {item}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        )}

        {hasMetrics && (
          <div className="space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              Impact metrics
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {metrics?.map((metric) => (
                <Metric key={`${metric.label}-${metric.value}`} label={metric.label} value={metric.value} />
              ))}
            </div>
          </div>
        )}

        {hasLinks && (
          <div className="flex flex-wrap gap-4">
            {links?.live && (
              <Button asChild size="lg">
                <Link href={links.live} rel="noopener noreferrer" target="_blank">
                  Visit live site
                  <ArrowUpRight aria-hidden="true" className="size-4" />
                </Link>
              </Button>
            )}
            {links?.repo && (
              <Button asChild size="lg" variant="outline">
                <Link href={links.repo} rel="noopener noreferrer" target="_blank">
                  <Github aria-hidden="true" className="size-4" />
                  View source
                </Link>
              </Button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
