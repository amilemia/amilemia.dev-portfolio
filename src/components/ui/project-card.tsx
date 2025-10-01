'use client';

import Link from "next/link";
import Image from "next/image";
import { Badge } from "./badge";
import { Button } from "./button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./card";
import { track } from "@/lib/analytics/track";

type ProjectCardProps = {
  slug: string;
  title: string;
  summary: string;
  coverImage?: string;
  role?: string;
  tags?: string[];
};

export function ProjectCard({ slug, title, summary, coverImage, role, tags }: ProjectCardProps) {
  return (
    <Card
      className="flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:outline-none group"
      data-testid="project-card"
    >
      {coverImage && (
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={coverImage}
            alt={`${title} cover image`}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
        </div>
      )}
      <CardHeader>
        <div className="flex justify-between items-start gap-4">
          <CardTitle className="text-xl">
            <Link
              href={`/projects/${slug}`}
              className="hover:underline focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background focus:rounded-sm"
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
          className="p-0 text-foreground/70 hover:text-foreground group-hover:translate-x-1 transition-transform duration-300"
        >
          <Link href={`/projects/${slug}`}>
            View case study <span className="ml-1">&rarr;</span>
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
