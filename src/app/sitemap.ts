import { MetadataRoute } from 'next';

import { absoluteUrl } from '@/lib/site';
import { getProjects } from '@/lib/content';
import { locales } from '@/i18n/locales';

const staticPaths = [
  '',
  '/projects',
  '/services',
  '/about',
  '/contact',
  '/resources',
  '/links',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    // Always include explicit locale prefix for all locales
    const prefix = `/${locale}`;

    staticPaths.forEach((path) => {
      const urlPath = `${prefix}${path}`;
      entries.push({
        url: absoluteUrl(urlPath),
        lastModified: new Date(),
        changeFrequency: path === '' ? 'monthly' : 'weekly',
        priority: path === '' ? 1 : path === '/projects' ? 0.8 : 0.7,
      });
    });

    const projects = await getProjects(locale);
    projects.forEach((project) => {
      const urlPath = `${prefix}/projects/${project.slug}`;
      const modifiedDate = project.dates?.end ? new Date(project.dates.end) : project.dates?.start ? new Date(project.dates.start) : new Date();
      
      const isClinicProject = project.slug === 'clinic-booking-system';
      
      entries.push({
        url: absoluteUrl(urlPath),
        lastModified: modifiedDate,
        changeFrequency: isClinicProject ? 'weekly' : 'monthly',
        priority: isClinicProject ? 1.0 : 0.4,
      });
    });
  }

  return entries;
}
