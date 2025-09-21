import { notFound } from "next/navigation";
import { getProjectBySlug, getProjects } from "@/lib/content";
import { ProjectContent } from "./project-content";

// This function tells Next.js which paths to pre-render at build time
export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

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

// Configuration for static generation
export const dynamicParams = false; // Return 404 for non-existent slugs
export const dynamic = 'force-static'; // Force static generation
export const revalidate = 60; // Revalidate at most every minute
