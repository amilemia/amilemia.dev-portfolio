import { MetadataRoute } from 'next';
import { absoluteUrl } from '@/lib/site';
import { allProjects } from 'contentlayer/generated';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Get all static pages
  const staticPages = [
    {
      url: absoluteUrl('/'),
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
    {
      url: absoluteUrl('/projects'),
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: absoluteUrl('/about'),
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: absoluteUrl('/contact'),
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ];

  // Get all projects
  const projects = allProjects.map((project) => ({
    url: absoluteUrl(`/projects/${project.slug}`),
    lastModified: project.dates?.end 
      ? new Date(project.dates.end) 
      : project.dates?.start 
        ? new Date(project.dates.start) 
        : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  return [...staticPages, ...projects];
}
