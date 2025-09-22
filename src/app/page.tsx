import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getProjects } from "@/lib/content";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";

export default async function Home() {
  const projects = (await getProjects()).slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <Section className="py-24">
        <Container className="text-center">
          <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent/50 mb-6" data-testid="availability-pill">
            <span className="relative flex h-2 w-2 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="sr-only">Current availability: </span>
            <span>Available: 1 slot this month — Africa/Casablanca</span>
          </div>
          
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            I build fast, accessible web apps.
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
            Freelance web developer turning product ideas into shipped features—on time and tested.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="px-6">
              <Link href="/contact">Start a project</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="px-6">
              <Link href="/projects">View work</Link>
            </Button>
          </div>
          
          {/* Trust indicators */}
          <div className="mt-12 pt-8 border-t border-border/50">
            <p className="text-sm text-muted-foreground mb-6">Trusted by product teams at</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-70">
              <span className="sr-only">Company One</span>
              <div className="h-8 w-24 bg-muted rounded" aria-hidden="true"></div>
              <span className="sr-only">Company Two</span>
              <div className="h-8 w-24 bg-muted rounded" aria-hidden="true"></div>
              <span className="sr-only">Company Three</span>
              <div className="h-8 w-24 bg-muted rounded" aria-hidden="true"></div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Recent Projects */}
      <Section>
        <Container>
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Recent Projects</h2>
          <Button asChild variant="ghost">
            <Link href="/projects" className="text-sm">
              View all projects →
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                    Read more <span className="ml-1">→</span>
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        </Container>
      </Section>
    </>
  );
}
