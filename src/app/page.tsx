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
      <Section className="py-20">
        <Container className="text-center">
        <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Hi, I&apos;m Amilemia
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
          I build exceptional digital experiences with modern web technologies.
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/projects">View Projects</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/contact">Get in Touch</Link>
          </Button>
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
            <Card key={project.slug} className="flex flex-col">
              <CardHeader>
                <CardTitle className="text-xl">
                  <Link href={`/projects/${project.slug}`} className="hover:underline">
                    {project.title}
                  </Link>
                </CardTitle>
                {project.tags && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-muted-foreground">{project.summary}</p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="link" className="p-0">
                  <Link href={`/projects/${project.slug}`}>Read more →</Link>
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
