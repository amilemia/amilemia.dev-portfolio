import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";

const frontendSkills = [
  "React & Next.js",
  "TypeScript & JavaScript",
  "Tailwind CSS",
  "Accessibility-first UI",
];

const backendSkills = [
  "Node.js & Edge runtimes",
  "REST & GraphQL APIs",
  "Authentication & security",
  "Database design & ORMs",
];

const experience = [
  {
    title: "Senior Frontend Developer",
    place: "Acme Corp",
    timeframe: "2022 - Present",
    summary:
      "Lead accessible, performant product initiatives using React, Next.js, and design systems.",
  },
  {
    title: "Full Stack Developer",
    place: "Globex",
    timeframe: "2019 - 2022",
    summary:
      "Shipped end-to-end web features across modern JavaScript stacks and cloud infrastructure.",
  },
];

export default function AboutPage() {
  return (
    <Section>
      <Container className="max-w-3xl">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight">About Me</h1>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            A product-focused developer building resilient, inclusive digital experiences with
            modern web tooling.
          </p>
        </div>

        <div className="prose dark:prose-invert mx-auto">
          <p className="text-lg">
            Hello! I&apos;m Amilemia, a full-stack developer who loves shaping thoughtful web experiences.
            I lean on robust TypeScript foundations, intentional design systems, and data-informed
            feedback loops to move from ideas to dependable products.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <section>
            <h2 className="mb-3 text-lg font-semibold">Frontend</h2>
            <ul className="space-y-2 text-muted-foreground">
              {frontendSkills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="mb-3 text-lg font-semibold">Backend</h2>
            <ul className="space-y-2 text-muted-foreground">
              {backendSkills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </section>
        </div>

        <div className="mt-12 space-y-8">
          <h2 className="text-2xl font-bold">Experience</h2>
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

        <div className="mt-12 flex justify-center">
          <Button asChild size="lg">
            <Link href="/contact">Get in touch</Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
