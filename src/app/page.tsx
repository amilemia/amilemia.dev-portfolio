import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getProjects } from "@/lib/content";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { ProjectCard } from "@/components/ui/project-card";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { Carousel } from "@/components/testimonials/Carousel";
import { testimonials } from "@/data/testimonials";
import { SectionHeading } from "@/components/SectionHeading";

export default async function Home() {
  const projects = (await getProjects()).slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <Section size="xl">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,320px)] lg:items-center">
            <div className="space-y-10">
              <div
                className="inline-flex items-center gap-3 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary/80"
                data-testid="availability-pill"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400/60 animate-ping"></span>
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
                </span>
                <span className="sr-only">Current availability:</span>
                <span>Taking 1 new project this month - Africa/Casablanca</span>
              </div>

              <div className="space-y-6 text-left sm:text-center lg:text-left">
                <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                  I build fast, accessible web apps.
                </h1>
                <p className="text-base text-muted-foreground sm:text-lg">
                  Freelance web developer turning product ideas into shipped features - on time and tested.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 sm:justify-center lg:justify-start">
                <Button asChild size="lg" className="px-6">
                  <TrackedLink href="/contact" eventName="CTA: Start a project" eventData={{ location: "hero" }}>
                    Start a project
                  </TrackedLink>
                </Button>
                <Button asChild variant="outline" size="lg" className="px-6">
                  <TrackedLink href="/projects" eventName="CTA: View work" eventData={{ location: "hero" }}>
                    View work
                  </TrackedLink>
                </Button>
              </div>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground sm:justify-center lg:justify-start">
                <span className="font-semibold text-foreground">Trusted by product teams at</span>
                <span className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-muted" aria-hidden />
                  Relay CRM
                </span>
                <span className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-muted" aria-hidden />
                  Launchpad Studio
                </span>
                <span className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-muted" aria-hidden />
                  Stellar Labs
                </span>
              </div>
            </div>

            <div className="hidden rounded-3xl border border-border/60 bg-background/80 p-6 shadow-sm lg:block">
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-foreground">Launch-ready support</h2>
                <p className="text-sm text-muted-foreground">
                  From discovery to ship, I partner with founders and product teams to align goals, ship confidently, and keep momentum.
                </p>
                <dl className="grid gap-3 text-sm text-muted-foreground">
                  <div className="flex items-start justify-between gap-4">
                    <dt className="font-medium text-foreground">Avg. turnaround</dt>
                    <dd>2-6 weeks</dd>
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <dt className="font-medium text-foreground">Launch scorecard</dt>
                    <dd>Performance, accessibility & QA baked in</dd>
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <dt className="font-medium text-foreground">Collaboration</dt>
                    <dd>Async check-ins, Loom walkthroughs, shared backlog</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Testimonials */}
      <Section size="lg">
        <Container>
          <Carousel items={testimonials} />
        </Container>
      </Section>

      {/* Recent Projects */}
      <Section>
        <Container className="space-y-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              title="Recent projects"
              description="A snapshot of shipped work across product and marketing surfaces."
            />
            <Button asChild variant="ghost" className="px-3">
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
