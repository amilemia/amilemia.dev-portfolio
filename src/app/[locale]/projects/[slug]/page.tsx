import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ProjectContent } from './project-content';
import { getProjectBySlug, getProjects, getRelatedLeadMagnets } from '@/lib/content';
import { absoluteUrl } from '@/lib/site';
import { generateHreflangAlternates } from '@/lib/metadata';
import { getMessages, type Messages, type Locale } from '@/i18n';
import { locales, fallbackLocale, isLocale } from '@/i18n/locales';

export const dynamicParams = false;
export const dynamic = 'force-static';
export const revalidate = 60;

type ProjectPageParams = { locale: string; slug: string };

type PageProps = {
  params: Promise<ProjectPageParams>;
};

type GenerateMetadataProps = {
  params: Promise<ProjectPageParams>;
};

export async function generateStaticParams() {
  const params: Array<{ locale: string; slug: string }> = [];

  for (const locale of locales) {
    const projects = await getProjects(locale);
    projects.forEach((project) => {
      params.push({ locale, slug: project.slug });
    });
  }

  return params;
}

function buildMetadata(projectTitle: string, projectSummary: string, slug: string, messages: Messages, locale: Locale): Metadata {
  const title = `${projectTitle} | ${messages.common.site.name}`;
  const description = projectSummary;
  const path = `/${locale}/projects/${slug}`;
  const url = absoluteUrl(path);
  const ogImageUrl = absoluteUrl(`${path}/opengraph-image`);

  // Generate hreflang alternates for this project
  const alternates = generateHreflangAlternates(`/projects/${slug}`, locale);

  return {
    title,
    description,
    alternates,
    openGraph: {
      title,
      description,
      type: 'article',
      url,
      locale: messages.common.site.openGraphLocale,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: projectTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
  } satisfies Metadata;
}

export async function generateMetadata({ params }: GenerateMetadataProps): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : fallbackLocale;
  const messages = getMessages(locale);
  const project = await getProjectBySlug(slug, locale);

  if (!project) {
    return {};
  }

  return buildMetadata(project.title, project.summary, slug, messages, locale);
}

export default async function Page({ params }: PageProps) {
  const { locale: rawLocale, slug } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : fallbackLocale;
  const messages = getMessages(locale);

  if (!slug) {
    notFound();
  }

  const project = await getProjectBySlug(slug, locale);

  if (!project) {
    notFound();
  }

  // Get related lead magnets based on project tags
  const relatedLeadMagnets = await getRelatedLeadMagnets(project.tags);
  const relatedLeadMagnet = relatedLeadMagnets[0]; // Get the first related lead magnet

  return (
    <ProjectContent
      project={project}
      locale={locale}
      messages={messages.project}
      caseStudyMessages={messages.common.caseStudy}
      allMessages={messages}
      relatedLeadMagnet={relatedLeadMagnet}
    />
  );
}
