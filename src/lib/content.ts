import { Project as ProjectType } from 'contentlayer/generated';

// Helper to get projects with proper type safety
async function getProjectsData(): Promise<ProjectType[]> {
  try {
    // Using dynamic import to avoid build-time errors
    const { allProjects } = await import('contentlayer/generated');
    return allProjects as ProjectType[];
  } catch {
    if (process.env.NODE_ENV === 'development') {
      console.warn('Contentlayer data not available. Run `npm run build:content` to generate it.');
    }
    return [];
  }
}

export async function getProjects(): Promise<ProjectType[]> {
  const projects = await getProjectsData();
  return [...projects].sort((a: ProjectType, b: ProjectType) => {
    const dateA = a.dates?.end ? new Date(a.dates.end) : new Date(a.dates?.start || 0);
    const dateB = b.dates?.end ? new Date(b.dates.end) : new Date(b.dates?.start || 0);
    return dateB.getTime() - dateA.getTime();
  });
}

export async function getProjectBySlug(slug: string): Promise<ProjectType | undefined> {
  const projects = await getProjectsData();
  return projects.find((project) => project.slug === slug);
}
