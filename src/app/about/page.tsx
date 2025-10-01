import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";

const focusAreas = [
  "Revenue-focused UX: onboarding, pricing, lifecycle, and checkout flows",
  "Marketing systems: conversion-first landing pages and modular content hubs",
  "Design systems and component libraries that scale across teams",
  "Accessibility, performance, and testing baked into every release",
];

const toolset = [
  "React, Next.js, TypeScript, and Edge runtimes",
  "Contentlayer, MDX, and modern CMS integrations",
  "Playwright, Vitest, and automated QA pipelines",
  "Upstash, Resend, and analytics platforms like Plausible",
];

const experience = [
  {
    title: "Senior Frontend Developer",
    place: "Relay CRM",
    timeframe: "2022 - Present",
    summary:
      "Led revenue-critical onboarding, pricing, and reporting flows that increased trial-to-paid conversions by 28 percent while standardising accessibility and testing.",
  },
  {
    title: "Product Engineer",
    place: "Launchpad Studio",
    timeframe: "2019 - 2022",
    summary:
      "Partnered with marketing and product leads to ship high-volume experimentation, reducing time-to-launch for campaigns from weeks to days.",
  },
];

export default function AboutPage() {
  return (
    <Section size="lg">
      <Container className="space-y-12">
        <SectionHeading
          title="Intentional builds, measurable outcomes"
          description="I am Amilemia — a full-stack product partner who helps teams translate strategy into launches that move the right metrics."
          align="center"
        />

        <div className="rounded-3xl border border-border/60 bg-card/60 p-6 shadow-sm backdrop-blur-sm">
          <p className="text-lg text-muted-foreground">
            From the first discovery call through launch, I focus on what success looks like for your business. That means pairing thoughtful UX with pragmatic engineering, running accessibility and performance sweeps before we ship, and leaving behind the documentation your team needs to iterate.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <section className="rounded-2xl border border-border/60 bg-background/80 p-6 shadow-sm backdrop-blur-sm">
            <h2 className="mb-4 text-lg font-semibold">What I focus on</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {focusAreas.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span aria-hidden="true" className="mt-1 size-1.5 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </section>
          <section className="rounded-2xl border border-border/60 bg-background/80 p-6 shadow-sm backdrop-blur-sm">
            <h2 className="mb-4 text-lg font-semibold">Tooling that keeps momentum</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {toolset.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span aria-hidden="true" className="mt-1 size-1.5 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="space-y-8">
          <h2 className="text-2xl font-semibold">Experience</h2>
          {experience.map((role) => (
            <article
              key={role.title}
              className="relative pl-6 before:absolute before:left-0 before:top-2 before:h-3 before:w-3 before:rounded-full before:bg-primary"
            >
              <h3 className="text-lg font-semibold">{role.title}</h3>
              <p className="text-sm text-muted-foreground">
                {role.place} - {role.timeframe}
              </p>
              <p className="mt-2 text-muted-foreground">{role.summary}</p>
            </article>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <Button asChild size="lg">
            <Link href="/contact">Book project intro</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="mailto:hi@amilemia.dev">Email hi@amilemia.dev</Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
