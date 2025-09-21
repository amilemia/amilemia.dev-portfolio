import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getProjects } from "@/lib/content";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <Section>
      <Container>
        <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight">Projects</h1>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          A collection of my recent work and contributions.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card 
            key={project.slug} 
            className="flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:outline-none group"
            data-testid="project-card"
          >
            <CardHeader>
              <div className="flex justify-between items-start gap-4">
                <CardTitle className="text-xl">
                  <Link 
                    href={`/projects/${project.slug}`} 
                    className="hover:underline focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background focus:rounded-sm"
                  >
                    {project.title}
                  </Link>
                </CardTitle>
                {project.role && (
                  <span className="inline-flex items-center rounded-md bg-accent/50 px-2 py-1 text-xs font-medium text-accent-foreground ring-1 ring-inset ring-accent/30">
                    {project.role}
                  </span>
                )}
              </div>
              {project.tags && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
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
              <p className="text-muted-foreground">{project.summary}</p>
            </CardContent>
            <CardFooter className="mt-auto">
              <Button 
                asChild 
                variant="link" 
                className="p-0 text-foreground/70 hover:text-foreground group-hover:translate-x-1 transition-transform duration-300"
              >
                <Link href={`/projects/${project.slug}`}>
                  View details <span className="ml-1">→</span>
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
        </div>
      </Container>
    </Section>
  );
}
