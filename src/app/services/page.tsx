import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import {
  ServiceCardList,
  type ServicePackage,
  FaqList,
  type FaqItem,
} from "./_components/service-sections";

const rawServices = [
  {
    name: "Portfolio MVP",
    pitch: "Launch a polished personal brand site that converts first-time visitors into calls.",
    deliverables: [
      "Offer clarity workshop to sharpen your positioning",
      "Conversion-ready homepage, about, and contact flows",
      "Reusable case study module with CMS-ready content slots",
      "Performance-first implementation on Next.js 15",
      "Launch checklist covering analytics, SEO, and accessibility",
    ],
    timeline: "2-3 weeks from kickoff",
    priceRange: "$3k-$5k",
  },
  {
    name: "Startup Site",
    pitch: "Ship a conversion-optimized marketing site that evolves with your release cadence.",
    deliverables: [
      "Messaging frameworks aligned to your go-to-market goals",
      "Responsive marketing pages built with production-ready UI system",
      "CMS-ready content architecture for rapid iteration",
      "A/B friendly CTAs wired to analytics and CRM tooling",
      "Performance, accessibility, and QA sweep before launch",
    ],
    timeline: "4-6 weeks including handoff",
    priceRange: "$6k-$9k",
  },
  {
    name: "Retainer",
    pitch: "Stay shipping with ongoing product design and engineering firepower on demand.",
    deliverables: [
      "Monthly roadmap planning tied to product metrics",
      "Experiment sprints for landing pages and onboarding flows",
      "Feature improvements with paired design and engineering",
      "Ongoing performance, accessibility, and regression sweeps",
      "Async updates, Loom walkthroughs, and shared backlog",
    ],
    timeline: "Month-to-month with 1-week onboarding",
    priceRange: "$2k-$4k/mo",
  },
] satisfies Array<Omit<ServicePackage, "href">>;

const services: ServicePackage[] = rawServices.map((service) => ({
  ...service,
  href: `/contact?subject=${encodeURIComponent(service.name)}`,
}));

const processSteps = [
  {
    title: "Brief",
    description:
      "We audit goals, audience, and success metrics in a structured kickoff conversation.",
  },
  {
    title: "Plan",
    description:
      "Insights become sitemap, messaging priorities, and checkpoints your team signs off on.",
  },
  {
    title: "Build",
    description:
      "Design and engineering move in lockstep with weekly reviews and transparent demos.",
  },
  {
    title: "Ship",
    description:
      "We launch, wire up analytics, and hand off a playbook so the momentum continues.",
  },
] as const;

const faqs: FaqItem[] = [
  {
    id: "start",
    question: "How quickly can we get started?",
    answer:
      "I typically book new projects 2-3 weeks out. If you already have assets, we can fast-track prep so day one is focused on decisions, not paperwork.",
  },
  {
    id: "brand-guidelines",
    question: "Do you work within existing brand guidelines?",
    answer:
      "Absolutely. I audit your current system and extend it when gaps appear. If you're missing pieces, I'll provide lightweight direction that keeps development moving.",
  },
  {
    id: "scope",
    question: "Can we add more pages after launch?",
    answer:
      "Yes. Everything ships with modular sections and documentation so you or I can layer on new pages without rework. Retainer clients often stack experiments on the launch foundation.",
  },
  {
    id: "tools",
    question: "What collaboration tools do you use?",
    answer:
      "You'll get a shared Notion board, Figma previews, and weekly Loom recaps. I'm happy to slot into Slack or email threads to keep stakeholders aligned.",
  },
  {
    id: "post-launch",
    question: "What happens once the project ships?",
    answer:
      "We wrap with QA, analytics verification, and a live handoff session. You'll leave with a deployment playbook, tracking events, and next-sprint ideas. Retainers cover ongoing support.",
  },
];

const pageDescription =
  "Productized web services that turn interest into booked calls, backed by accountable delivery.";

export const metadata: Metadata = {
  title: "Services",
  description: pageDescription,
};

export default function ServicesPage() {
  return (
    <Section>
      <Container className="space-y-16">
        <header className="max-w-2xl space-y-4">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">Services</p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Work that ships.</h1>
          <p className="text-lg text-muted-foreground">{pageDescription}</p>
        </header>

        <section aria-labelledby="packages-heading" className="space-y-8">
          <div className="flex items-center justify-between gap-4">
            <h2 id="packages-heading" className="text-2xl font-semibold">
              Packages built for momentum
            </h2>
            <p className="text-sm text-muted-foreground">
              Every engagement includes accessibility, analytics, and launch support.
            </p>
          </div>
          <ServiceCardList services={services} />
        </section>

        <section aria-labelledby="process-heading" className="space-y-6">
          <h2 id="process-heading" className="text-2xl font-semibold">
            The process
          </h2>
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

        <section aria-labelledby="faq-heading" className="space-y-6">
          <h2 id="faq-heading" className="text-2xl font-semibold">
            Frequently asked
          </h2>
          <FaqList items={faqs} />
        </section>
      </Container>
    </Section>
  );
}
