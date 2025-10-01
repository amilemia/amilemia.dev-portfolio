import { getProjects } from "@/lib/content";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { ProjectCard } from "@/components/ui/project-card";
import { TagFilter } from "@/components/projects/tag-filter";
import { SectionHeading } from "@/components/SectionHeading";

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
    <Section size="lg">
      <Container className="space-y-10">
        <SectionHeading
          title="Projects"
          description="Selected launches across product, marketing, and experimentation. Each project shipped with measurable outcomes, rigorous QA, and a clear handoff."
          align="center"
        />

        {allTags.length > 0 ? (
          <TagFilter tags={allTags} selectedTag={selectedTag || undefined} />
        ) : null}

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
