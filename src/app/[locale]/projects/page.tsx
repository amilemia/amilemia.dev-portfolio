import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { ProjectCard } from "@/components/ui/project-card";
import { TagFilter } from "@/components/projects/tag-filter";
import { getProjects } from "@/lib/content";
import { getMessages, type Locale } from "@/i18n";
import { fallbackLocale, isLocale } from "@/i18n/locales";

type SearchParams = Record<string, string | string[] | undefined>;

type PageProps = {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<SearchParams>;
};

export default async function ProjectsPage({ params, searchParams }: PageProps) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : fallbackLocale;
  const messages = getMessages(locale);

  const projects = await getProjects(locale);

  const resolvedSearchParams = (await searchParams) ?? {};
  const tagParam = resolvedSearchParams.tag;
  const selectedTag = Array.isArray(tagParam) ? tagParam[0] || null : tagParam || null;

  const allTags = Array.from(new Set(projects.flatMap((project) => project.tags || []))).sort();

  const filteredProjects = selectedTag
    ? projects.filter((project) => project.tags?.includes(selectedTag as string))
    : projects;

  return (
    <Section size="lg">
      <Container className="space-y-10">
        <SectionHeading
          title={messages.projects.heading.title}
          description={messages.projects.heading.description}
          align="center"
        />

        {allTags.length > 0 ? (
          <TagFilter tags={allTags} selectedTag={selectedTag || undefined} messages={messages.common.tagFilter} />
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
              messages={messages.common.projectCard}
              locale={locale}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
