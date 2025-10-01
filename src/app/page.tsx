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
import { servicePackages } from "@/data/services";
import type { ServiceTier } from "@/data/services";

export default async function Home() {
  const projects = (await getProjects()).slice(0, 3);
  const services = servicePackages.map((service) => ({
    ...service,
    href: `/contact?subject=${encodeURIComponent(service.name)}`,
  }));
  const availabilityDate = new Date();
  availabilityDate.setMonth(availabilityDate.getMonth() + 1);
  const availabilityLabel = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric',
  }).format(availabilityDate);
  const availabilityCopy = `1 project slot open for ${availabilityLabel} · Remote (UTC+1)`;

  const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });

  const formatTierPrice = (tier: ServiceTier) => {
    const formatted = currencyFormatter.format(tier.price);
    return tier.billingSuffix ? `${formatted}${tier.billingSuffix}` : formatted;
  };

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
                <span>{availabilityCopy}</span>
              </div>

              <div className="space-y-6 text-left sm:text-center lg:text-left">
                <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                  Launch and improve your site with a dependable one-person partner.
                </h1>
                <p className="text-base text-muted-foreground sm:text-lg">
                  I help founders and small teams plan, design, and ship fast, accessible web experiences—without slowing you down or handing off context.
                </p>
              </div>

              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span aria-hidden="true" className="mt-1 size-1.5 rounded-full bg-primary" />
                  Strategy, design, and Next.js development handled end to end by one person.
                </li>
                <li className="flex items-start gap-2">
                  <span aria-hidden="true" className="mt-1 size-1.5 rounded-full bg-primary" />
                  Weekly async updates, staging previews, and clear goals every sprint.
                </li>
                <li className="flex items-start gap-2">
                  <span aria-hidden="true" className="mt-1 size-1.5 rounded-full bg-primary" />
                  Accessibility, performance, and testing considered before launch.
                </li>
              </ul>

              <div className="flex flex-wrap gap-3 sm:justify-center lg:justify-start">
                <Button asChild size="lg" className="px-6">
                  <TrackedLink href="/contact" eventName="CTA: Start a project" eventData={{ location: "hero" }}>
                    Book project intro
                  </TrackedLink>
                </Button>
                <Button asChild variant="outline" size="lg" className="px-6">
                  <TrackedLink href="/services" eventName="CTA: View services" eventData={{ location: "hero" }}>
                    See services
                  </TrackedLink>
                </Button>
              </div>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground sm:justify-center lg:justify-start">
                <span className="font-semibold text-foreground">Trusted by teams at</span>
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

            <div className="hidden rounded-3xl border border-border/60 bg-background/80 p-6 shadow-sm backdrop-blur-sm lg:block">
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-foreground">What working together looks like</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We align on the metric, map the experience, and deliver on a schedule with zero handoffs. You stay focused on strategy while I handle execution.
                </p>
                <div className="grid gap-4 text-sm text-muted-foreground">
                  <div className="rounded-2xl border border-border/60 bg-card/50 p-4">
                    <dt className="font-semibold text-foreground">Delivery window</dt>
                    <dd className="mt-1">Pilot launches in 2-6 weeks based on scope readiness.</dd>
                  </div>
                  <div className="rounded-2xl border border-border/60 bg-card/50 p-4">
                    <dt className="font-semibold text-foreground">Launch scorecard</dt>
                    <dd className="mt-1">Accessibility, performance, QA, and analytics verified before go-live.</dd>
                  </div>
                  <div className="rounded-2xl border border-border/60 bg-card/50 p-4">
                    <dt className="font-semibold text-foreground">Collaboration</dt>
                    <dd className="mt-1">Weekly async updates, Loom walkthroughs, and a shared backlog keep everyone aligned.</dd>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Services snapshot */}
      <Section size="lg">
        <Container className="space-y-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              title="Services designed to launch"
              description="Productized engagements built to move from kickoff to launch without surprises."
            />
            <Button asChild variant="ghost" className="px-3">
              <Link href="/services" className="text-sm">
                View all services &rarr;
              </Link>
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => (
              <article
                key={service.name}
                className="flex h-full flex-col justify-between gap-6 rounded-3xl border bg-card/60 p-6 shadow-sm backdrop-blur-sm"
              >
                <div className="space-y-4">
                  <div className="space-y-2">
                    {service.badge ? (
                      <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                        {service.badge}
                      </span>
                    ) : null}
                    <h3 className="text-2xl font-semibold text-foreground">{service.name}</h3>
                    <p className="text-sm text-muted-foreground">{service.pitch}</p>
                  </div>

                  <p className="inline-flex items-center rounded-full border border-border/60 bg-background/60 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    For {service.idealFor}
                  </p>

                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {service.deliverables.slice(0, 3).map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span aria-hidden="true" className="mt-1 size-1.5 rounded-full bg-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="space-y-2">
                    {service.tiers.map((tier) => (
                      <div
                        key={`${service.name}-${tier.name}`}
                        className="rounded-2xl border border-border/70 bg-background/70 p-3"
                      >
                        <div className="flex items-center justify-between text-xs font-semibold text-foreground">
                          <span>{tier.name}</span>
                          <span>{formatTierPrice(tier)}</span>
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">{tier.description}</p>
                      </div>
                    ))}
                    <p className="text-xs text-muted-foreground">Timeline: {service.timeline}</p>
                  </div>
                </div>

                <Button asChild className="w-full">
                  <TrackedLink
                    href={service.href}
                    eventName="CTA: Service package"
                    eventData={{ package: service.name }}
                  >
                    Start a project
                  </TrackedLink>
                </Button>
              </article>
            ))}
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
              description="Case studies that pair thoughtful UX with measurable lifts in conversion, activation, and retention."
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
