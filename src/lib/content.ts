import { Project as ProjectType } from 'contentlayer/generated';

// This is a workaround for the fact that we can't directly import from 'contentlayer/generated'
// until after the first build. The types will be available after running `pnpm build:content`
let _allProjects: ProjectType[] = [];

try {
  // Dynamic import to avoid build-time errors
  _allProjects = require('contentlayer/generated').allProjects as ProjectType[];
} catch (e) {
  if (process.env.NODE_ENV === 'development') {
    console.warn('Contentlayer data not available. Run `pnpm build:content` to generate it.');
  }
}

export function getProjects(): ProjectType[] {
  return [..._allProjects].sort((a: ProjectType, b: ProjectType) => {
    const dateA = a.dates.end ? new Date(a.dates.end) : new Date(a.dates.start);
    const dateB = b.dates.end ? new Date(b.dates.end) : new Date(b.dates.start);
    return dateB.getTime() - dateA.getTime();
  });
}

export function getProjectBySlug(slug: string): ProjectType | undefined {
  return _allProjects.find((project: ProjectType) => project.slug === slug);
}
