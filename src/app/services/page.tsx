import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { Carousel } from "@/components/testimonials/Carousel";
import { testimonials } from "@/data/testimonials";
import {
  ServiceCardList,
  type ServicePackage,
  FaqList,
  type FaqItem,
} from "./_components/service-sections";
import { SectionHeading } from "@/components/SectionHeading";
import { servicePackages } from "@/data/services";
import { Button } from "@/components/ui/button";
import { TrackedLink } from "@/components/analytics/tracked-link";

const services: ServicePackage[] = servicePackages.map((service) => ({
  ...service,
  href: `/contact?subject=${encodeURIComponent(service.name)}`,
}));

const differentiators = [
  {
    title: "Outcome first",
    body: "We start by defining the result you need—more enquiries, clearer messaging, or faster load times—and plan the work around that goal.",
  },
  {
    title: "Hands-on partner",
    body: "You work with one person from discovery through launch. Less overhead, no information loss, and a direct line to progress.",
  },
  {
    title: "Transparent delivery",
    body: "Weekly async updates, Loom walkthroughs, and a shared backlog keep everyone aligned. You always know what shipped and what is next.",
  },
];

const processSteps = [
  {
    title: "Discover",
    description:
      "Kickoff workshops clarify audience, messaging, and the metric we are aiming to move. You leave with a concrete brief and success criteria.",
  },
  {
    title: "Plan",
    description:
      "I translate discovery into page outlines, UX flows, and a delivery schedule. You approve scope, checkpoints, and go-live requirements.",
  },
  {
    title: "Build",
    description:
      "Design and engineering happen in tandem. Expect async walkthroughs, staging previews, and checklists for analytics, SEO, and accessibility.",
  },
  {
    title: "Launch",
    description:
      "We deploy, verify tracking, and document how to maintain momentum. Post-launch support covers fixes, experiments, and next sprint planning.",
  },
] as const;

const faqs: FaqItem[] = [
  {
    id: "start",
    question: "How quickly can we kick off?",
    answer:
      "Most projects start within two to three weeks. Share your timeline in the brief and I will confirm the first available kickoff date within one business day.",
  },
  {
    id: "brand-guidelines",
    question: "Can you work within our brand and component library?",
    answer:
      "Yes. I audit your existing guidelines and extend them only where needed. If you are missing pieces, I supply lightweight patterns that slot into your design system.",
  },
  {
    id: "scope",
    question: "What if we need more pages or iterations after launch?",
    answer:
      "Everything ships modular, documented, and ready for future iterations. You can extend with me through the retainer or hand updates to your internal team.",
  },
  {
    id: "tools",
    question: "How do we collaborate day to day?",
    answer:
      "Expect async status updates in Notion, Loom walkthroughs for major milestones, and shared Slack or email threads for quick decisions. You are never guessing what is happening.",
  },
  {
    id: "post-launch",
    question: "Do you offer support after launch?",
    answer:
      "Yes. Each project includes 14 days of post-launch support for fixes and questions. Ongoing experiments and improvements roll into the Product Partner Retainer.",
  },
];

const pageDescription =
  "Straightforward packages for launching a new site, refreshing what you have, or booking ongoing help. Share your goals, pick a fit, and we start quickly.";

export const metadata: Metadata = {
  title: "Services",
  description: pageDescription,
};

export default function ServicesPage() {
  return (
    <Section size="xl">
      <Container className="space-y-16">
        <SectionHeading
          eyebrow="Services"
          title="Work that ships."
          description={pageDescription}
        />

        <div className="flex flex-col gap-8 rounded-3xl border border-border/60 bg-card/60 p-6 shadow-sm backdrop-blur-sm md:flex-row md:items-center md:justify-between">
          <ul className="flex flex-1 flex-col gap-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-3">
              <span aria-hidden="true" className="mt-1 size-2 rounded-full bg-primary" />
              Launch-ready assets delivered with accessibility, performance, and testing baked in.
            </li>
            <li className="flex items-start gap-3">
              <span aria-hidden="true" className="mt-1 size-2 rounded-full bg-primary" />
              Async-first collaboration: weekly Loom walkthroughs and a shared backlog for stakeholders.
            </li>
            <li className="flex items-start gap-3">
              <span aria-hidden="true" className="mt-1 size-2 rounded-full bg-primary" />
              Clear pricing, timelines, and next steps so you can secure approvals fast.
            </li>
          </ul>
          <div className="flex flex-col gap-3 md:w-56">
            <Button asChild size="lg">
              <TrackedLink href="/contact" eventName="CTA: Services hero" eventData={{ source: 'services-intro' }}>
                Book project intro
              </TrackedLink>
            </Button>
            <Button asChild variant="outline">
              <TrackedLink href="/projects" eventName="CTA: View case studies" eventData={{ source: 'services-intro' }}>
                View case studies
              </TrackedLink>
            </Button>
          </div>
        </div>

        <section aria-labelledby="packages-heading" className="space-y-8">
          <SectionHeading
            title="Packages built for momentum"
            description="Every engagement includes accessibility, analytics, and launch support."
            className="max-w-xl"
            id="packages-heading"
          />
          <ServiceCardList services={services} />
        </section>

        <Carousel items={testimonials} />

        <section className="space-y-8" aria-label="Why teams hire me">
          <SectionHeading title="Why teams hire me" className="max-w-xl" />
          <div className="grid gap-6 md:grid-cols-3">
            {differentiators.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-border/60 bg-background/80 p-6 shadow-sm backdrop-blur-sm"
              >
                <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="process-heading" className="space-y-8">
          <SectionHeading title="The process" className="max-w-xl" id="process-heading" />
          <ol className="grid gap-6 sm:grid-cols-2">
            {processSteps.map((step, index) => (
              <li
                key={step.title}
                className="flex gap-4 rounded-xl border p-6 shadow-sm transition-colors hover:border-primary/40 focus-within:border-primary/60"
              >
                <span className="mt-1 inline-flex size-10 items-center justify-center rounded-full bg-primary/10 text-lg font-semibold text-primary">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="faq-heading" className="space-y-8">
          <SectionHeading title="Frequently asked" className="max-w-xl" id="faq-heading" />
          <FaqList items={faqs} />
        </section>

        <div className="rounded-3xl border border-border/60 bg-card/60 p-8 text-center shadow-sm backdrop-blur-sm">
          <h2 className="text-2xl font-semibold">Ready to land the next release?</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Tell me about your timeline and goals. I will reply within one business day with next steps and a suggested kickoff date.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <TrackedLink href="/contact" eventName="CTA: Services footer" eventData={{ source: 'services-footer' }}>
                Book project intro
              </TrackedLink>
            </Button>
            <Button asChild variant="outline">
              <TrackedLink href="mailto:hi@amilemia.dev" eventName="CTA: Email direct" eventData={{ source: 'services-footer' }}>
                Email hi@amilemia.dev
              </TrackedLink>
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
