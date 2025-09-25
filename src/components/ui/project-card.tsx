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
            View details <span className="ml-1">→</span>
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

// Placeholder component for when there's no cover image
function ProjectImagePlaceholder() {
  return (
    <div className="relative aspect-[16/9] overflow-hidden bg-muted/50 flex items-center justify-center">
      <svg
        className="h-12 w-12 text-muted-foreground/30"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1}
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    </div>
  );
}
