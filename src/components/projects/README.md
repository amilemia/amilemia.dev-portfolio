# Projects Components

## RelatedProjects

A component that displays 2-4 related projects in a card grid with hover effects.

### Usage

```tsx
import { RelatedProjects } from '@/components/projects/RelatedProjects';
import { getMessages } from '@/i18n';

// In your page component
export default async function ProjectPage({ params }) {
  const { locale, slug } = await params;
  const messages = getMessages(locale);
  const project = await getProjectBySlug(slug, locale);

  return (
    <div>
      {/* Your project content */}
      
      {/* Related projects section */}
      {project.relatedProjects && project.relatedProjects.length > 0 && (
        <RelatedProjects
          projectSlugs={project.relatedProjects}
          locale={locale}
          messages={messages}
          currentProjectSlug={project.slug}
        />
      )}
    </div>
  );
}
```

### Props

- `projectSlugs: string[]` - Array of project slugs to fetch and display
- `locale: Locale` - Current locale for fetching localized projects
- `messages: Messages` - i18n messages object
- `currentProjectSlug?: string` - Optional slug of current project to exclude from related projects

### Features

- Fetches related project data by slugs
- Filters out undefined projects and the current project
- Displays 2-4 projects in a responsive grid
- Uses the existing ProjectCard component for consistency
- Includes hover effects via ProjectCard
- Returns null if no valid related projects found

### Project Schema

To use this component, add `relatedProjects` field to your project MDX frontmatter:

```yaml
---
title: "My Project"
slug: "my-project"
# ... other fields
relatedProjects:
  - "project-slug-1"
  - "project-slug-2"
  - "project-slug-3"
---
```

The component will automatically:
1. Fetch the projects by their slugs
2. Filter out any that don't exist or match the current project
3. Limit to maximum 4 projects
4. Display them in a responsive grid (1 col mobile, 2 cols tablet, 3-4 cols desktop)
