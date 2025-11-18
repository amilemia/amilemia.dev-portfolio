# Case Study Components

This directory contains components for displaying rich case study content on project pages.

## Components

### CaseStudySection

Displays problem-solution-results in a tabbed interface.

```tsx
import { CaseStudySection } from '@/components/case';

<CaseStudySection
  caseStudy={{
    problem: "The client's website had a 1.2% conversion rate...",
    solution: "We implemented a conversion-focused redesign...",
    implementation: "Using Next.js 15 and TypeScript...",
    results: [
      "Increased conversion rate from 1.2% to 3.8%",
      "Reduced page load time by 60%",
      "Improved mobile experience"
    ]
  }}
/>
```

### BeforeAfterComparison

Shows before/after comparisons with three types: screenshot (with slider), metric (side-by-side), or video.

```tsx
import { BeforeAfterComparison } from '@/components/case';

<BeforeAfterComparison
  comparisons={[
    {
      type: 'screenshot',
      before: '/images/before.jpg',
      after: '/images/after.jpg',
      caption: 'Homepage redesign'
    },
    {
      type: 'metric',
      before: '1.2%',
      after: '3.8%',
      caption: 'Conversion rate improvement'
    }
  ]}
/>
```

### TechnicalDeepDive

Collapsible section showing architecture, challenges, and technical decisions.

```tsx
import { TechnicalDeepDive } from '@/components/case';

<TechnicalDeepDive
  deepDive={{
    architecture: "Built with Next.js 15 App Router, TypeScript, and Tailwind CSS...",
    challenges: [
      "Migrating from legacy PHP codebase",
      "Maintaining SEO during transition"
    ],
    decisions: [
      "Chose Next.js for SSR and performance",
      "Implemented incremental static regeneration"
    ]
  }}
/>
```

### VideoTestimonial

Displays video testimonial with thumbnail and play button. Supports YouTube, Vimeo, and direct video files.

```tsx
import { VideoTestimonial } from '@/components/case';

<VideoTestimonial
  video={{
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnail: '/images/video-thumb.jpg',
    duration: 120
  }}
  fallbackTestimonial={{
    quote: "Working with this developer was amazing...",
    author: "John Doe",
    role: "CEO, Example Corp"
  }}
/>
```

## Usage in Project Pages

These components are designed to be used in project detail pages (`src/app/[locale]/projects/[slug]/page.tsx`):

```tsx
import { 
  CaseStudySection, 
  BeforeAfterComparison, 
  TechnicalDeepDive, 
  VideoTestimonial 
} from '@/components/case';

export default function ProjectPage({ project }) {
  return (
    <>
      <CaseStudyHeader {...project} />
      
      {project.caseStudy && (
        <CaseStudySection caseStudy={project.caseStudy} />
      )}
      
      {project.beforeAfter && (
        <BeforeAfterComparison comparisons={project.beforeAfter} />
      )}
      
      {project.technicalDeepDive && (
        <TechnicalDeepDive deepDive={project.technicalDeepDive} />
      )}
      
      {project.videoTestimonial && (
        <VideoTestimonial 
          video={project.videoTestimonial}
          fallbackTestimonial={project.testimonial}
        />
      )}
    </>
  );
}
```

## Data Structure

All components expect data that matches the Contentlayer Project schema defined in `contentlayer.config.ts`.

## Accessibility

All components include:
- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader friendly content
- Semantic HTML structure
- Focus management for interactive elements
