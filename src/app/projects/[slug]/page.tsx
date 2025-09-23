import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProjectBySlug, getProjects } from '@/lib/content';
import { ProjectContent } from './project-content';
import { absoluteUrl } from '@/lib/site';

// Static generation configuration
export const dynamicParams = false; // Return 404 for non-existent slugs
export const dynamic = 'force-static'; // Force static generation
export const revalidate = 60; // Revalidate at most every minute

// Generate static params at build time
export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

type ProjectPageParams = { slug: string };

type ProjectPageProps = {
  params: Promise<ProjectPageParams>;
};

type GenerateMetadataProps = ProjectPageProps;

// Generate metadata for the project page
export async function generateMetadata({ params }: GenerateMetadataProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {};
  }

  const title = `${project.title} | Amilemia`;
  const description = project.summary;
  const url = absoluteUrl(`/projects/${slug}`);
  const ogImageUrl = absoluteUrl(`/projects/${slug}/opengraph-image`);

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: project.dates?.start ? new Date(project.dates.start).toISOString() : undefined,
      modifiedTime: project.dates?.end ? new Date(project.dates.end).toISOString() : undefined,
      url,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

// This is the actual page component
export default async function Page({ params }: ProjectPageProps) {
  const { slug } = await params;

  // Validate the slug
  if (!slug) {
    notFound();
  }

  // Fetch the project data
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return <ProjectContent project={project} />;
}

