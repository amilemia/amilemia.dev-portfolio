import { getProjects } from "@/lib/content";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { ProjectCard } from "@/components/ui/project-card";
import { TagFilter } from "@/components/projects/tag-filter";

type SearchParams = Record<string, string | string[] | undefined>;
type PageProps = {
  searchParams?: Promise<SearchParams>;
};

export default async function ProjectsPage({ searchParams }: PageProps) {
  const projects = await getProjects();

  const resolvedSearchParams = (await searchParams) ?? {};
  const tagParam = resolvedSearchParams.tag;
  const selectedTag = Array.isArray(tagParam)
    ? tagParam[0] || null
    : tagParam || null;

  const allTags = Array.from(
    new Set(projects.flatMap((project) => project.tags || []))
  ).sort();

  const filteredProjects = selectedTag
    ? projects.filter((project) => project.tags?.includes(selectedTag as string))
    : projects;

  return (
    <Section>
      <Container>
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight">Projects</h1>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            A collection of my recent work and contributions.
          </p>
        </div>

        {allTags.length > 0 && (
          <div className="mb-8">
            <TagFilter tags={allTags} selectedTag={selectedTag || undefined} />
          </div>
        )}

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
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
  );
}