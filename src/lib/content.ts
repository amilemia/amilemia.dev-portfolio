import type { Project as ProjectType, LeadMagnet as LeadMagnetType } from 'contentlayer/generated';

import type { Locale } from '@/i18n';
import { fallbackLocale } from '@/i18n';

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

function groupProjectsBySlug(projects: ProjectType[]): Map<string, Partial<Record<Locale, ProjectType>>> {
  const grouped = new Map<string, Partial<Record<Locale, ProjectType>>>();

  projects.forEach((project) => {
    const locale = (project.locale ?? fallbackLocale) as Locale;
    const slug = project.slug;
    const bucket = grouped.get(slug) ?? {};
    bucket[locale] = project;
    grouped.set(slug, bucket);
  });

  return grouped;
}

function selectLocalizedProjects(grouped: Map<string, Partial<Record<Locale, ProjectType>>>, locale: Locale): ProjectType[] {
  const selected: ProjectType[] = [];

  grouped.forEach((entry) => {
    const match = entry[locale] ?? entry[fallbackLocale];
    if (match) {
      selected.push(match);
    }
  });

  return selected;
}

export async function getProjects(locale: Locale): Promise<ProjectType[]> {
  const projects = await getProjectsData();
  const grouped = groupProjectsBySlug(projects);
  return sortProjects(selectLocalizedProjects(grouped, locale));
}

export async function getProjectBySlug(slug: string, locale: Locale): Promise<ProjectType | undefined> {
  const projects = await getProjectsData();
  const grouped = groupProjectsBySlug(projects);
  const entry = grouped.get(slug);
  if (!entry) return undefined;
  return entry[locale] ?? entry[fallbackLocale];
}

async function getLeadMagnetsData(): Promise<LeadMagnetType[]> {
  try {
    const { allLeadMagnets } = await import('contentlayer/generated');
    return allLeadMagnets as LeadMagnetType[];
  } catch {
    if (process.env.NODE_ENV === 'development') {
      console.warn("Contentlayer data not available. Run `npm run build:content` to generate it.");
    }
    return [];
  }
}

export async function getLeadMagnets(): Promise<LeadMagnetType[]> {
  const leadMagnets = await getLeadMagnetsData();
  // Sort by download count (descending) and rating
  return [...leadMagnets].sort((a, b) => {
    const downloadDiff = (b.downloadCount ?? 0) - (a.downloadCount ?? 0);
    if (downloadDiff !== 0) return downloadDiff;
    return (b.rating ?? 0) - (a.rating ?? 0);
  });
}

export async function getLeadMagnetBySlug(slug: string): Promise<LeadMagnetType | undefined> {
  const leadMagnets = await getLeadMagnetsData();
  return leadMagnets.find((magnet) => magnet.slug === slug);
}

export async function getRelatedLeadMagnets(relatedTo?: string[]): Promise<LeadMagnetType[]> {
  if (!relatedTo || relatedTo.length === 0) return [];
  
  const leadMagnets = await getLeadMagnetsData();
  return leadMagnets.filter((magnet) => {
    if (!magnet.relatedTo) return false;
    return magnet.relatedTo.some((topic) => relatedTo.includes(topic));
  });
}
