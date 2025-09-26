import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getProjects } from "@/lib/content";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { ProjectCard } from "@/components/ui/project-card";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { Carousel } from "@/components/testimonials/Carousel";
import { testimonials } from "@/data/testimonials";

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
            <span>Available: 1 slot this month - Africa/Casablanca</span>
          </div>
          
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            I build fast, accessible web apps.
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
            Freelance web developer turning product ideas into shipped features - on time and tested.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="px-6">
              <TrackedLink href="/contact" eventName="CTA: Start a project" eventData={{ location: 'hero' }}>
                Start a project
              </TrackedLink>
            </Button>
            <Button asChild variant="outline" size="lg" className="px-6">
              <TrackedLink href="/projects" eventName="CTA: View work" eventData={{ location: 'hero' }}>
                View work
              </TrackedLink>
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

      {/* Testimonials */}
      <Section>
        <Container>
          <Carousel items={testimonials} />
        </Container>
      </Section>

      {/* Recent Projects */}
      <Section>
        <Container>
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Recent Projects</h2>
          <Button asChild variant="ghost">
            <Link href="/projects" className="text-sm">
              View all projects &rarr;
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard
              key={project.slug}
              slug={project.slug}
              title={project.title}
              summary={project.summary}
              coverImage={project.cover}
              role={project.role}
              tags={project.tags}
            />
          ))}
        </div>
      </Container>
      </Section>
    </>
  );
}
