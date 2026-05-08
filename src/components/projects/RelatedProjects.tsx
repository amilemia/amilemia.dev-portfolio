import { ProjectCard } from '@/components/ui/project-card';
import { getProjectBySlug } from '@/lib/content';
import type { Locale } from '@/i18n';
import type { Messages } from '@/i18n';
import type { Project } from 'contentlayer/generated';

interface RelatedProjectsProps {
  projectSlugs: string[];
  locale: Locale;
  messages: Messages;
  currentProjectSlug?: string;
}

export async function RelatedProjects({
  projectSlugs,
  locale,
  messages,
  currentProjectSlug,
}: RelatedProjectsProps) {
  // Fetch related projects by slugs
  const relatedProjectsData = await Promise.all(
    projectSlugs.map((slug) => getProjectBySlug(slug, locale))
  );

  // Filter out null/undefined projects and the current project
  const validProjects = relatedProjectsData.filter(
    (project): project is Project => 
      project !== undefined && project.slug !== currentProjectSlug
  );

  // Limit to 2-4 projects as per requirements
  const displayProjects = validProjects.slice(0, 4);

  // Don't render if no related projects
  if (displayProjects.length === 0) {
    return null;
  }

  return (
    <section className="py-12 md:py-16">
      <div className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
          Similar work
        </h2>
        <p className="mt-2 text-muted-foreground">
          Other projects you might find interesting
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {displayProjects.map((project) => (
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
    </section>
  );
}
