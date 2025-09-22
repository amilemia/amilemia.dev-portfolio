import { Project as ProjectType } from 'contentlayer/generated';

function getProjectTimestamp(project: ProjectType): number {
  const rawDate = project.dates?.end ?? project.dates?.start;
  return rawDate ? new Date(rawDate).getTime() : 0;
}

export function sortProjects(projects: ProjectType[]): ProjectType[] {
  return [...projects].sort((a, b) => getProjectTimestamp(b) - getProjectTimestamp(a));
}

async function getProjectsData(): Promise<ProjectType[]> {
  try {
    const { allProjects } = await import('contentlayer/generated');
    return allProjects as ProjectType[];
  } catch {
    if (process.env.NODE_ENV === 'development') {
      console.warn("Contentlayer data not available. Run `npm run build:content` to generate it.");
    }
    return [];
  }
}

export async function getProjects(): Promise<ProjectType[]> {
  const projects = await getProjectsData();
  return sortProjects(projects);
}

export async function getProjectBySlug(slug: string): Promise<ProjectType | undefined> {
  const projects = await getProjectsData();
  return projects.find((project) => project.slug === slug);
}
