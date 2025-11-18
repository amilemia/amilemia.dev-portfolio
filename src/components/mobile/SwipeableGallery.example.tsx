/**
 * Example usage of SwipeableGallery component
 * 
 * This file demonstrates how to use the SwipeableGallery component
 * in your case study pages or anywhere you need a touch-friendly image gallery.
 */

import { SwipeableGallery } from './SwipeableGallery';
import type { GalleryImage } from './SwipeableGallery';

// Example 1: Basic usage with before/after images
export function BeforeAfterGalleryExample() {
  const beforeAfterImages: GalleryImage[] = [
    {
      src: '/images/projects/before-homepage.jpg',
      alt: 'Homepage before redesign',
      caption: 'Before: Original homepage with 2.3% conversion rate',
    },
    {
      src: '/images/projects/after-homepage.jpg',
      alt: 'Homepage after redesign',
      caption: 'After: Redesigned homepage with 4.8% conversion rate',
    },
  ];

  return (
    <div className="container py-8">
      <h2 className="mb-4 text-2xl font-bold">Before & After Comparison</h2>
      <SwipeableGallery images={beforeAfterImages} />
    </div>
  );
}

// Example 2: Multiple screenshots gallery
export function ProjectScreenshotsExample() {
  const screenshots: GalleryImage[] = [
    {
      src: '/images/projects/dashboard-overview.jpg',
      alt: 'Dashboard overview page',
      caption: 'Dashboard with real-time analytics',
    },
    {
      src: '/images/projects/user-management.jpg',
      alt: 'User management interface',
      caption: 'Intuitive user management system',
    },
    {
      src: '/images/projects/reporting.jpg',
      alt: 'Reporting interface',
      caption: 'Comprehensive reporting tools',
    },
    {
      src: '/images/projects/mobile-view.jpg',
      alt: 'Mobile responsive view',
      caption: 'Fully responsive mobile experience',
    },
  ];

  return (
    <div className="container py-8">
      <h2 className="mb-4 text-2xl font-bold">Project Screenshots</h2>
      <SwipeableGallery images={screenshots} />
    </div>
  );
}

// Example 3: Gallery without controls (swipe-only)
export function SwipeOnlyGalleryExample() {
  const images: GalleryImage[] = [
    {
      src: '/images/projects/feature-1.jpg',
      alt: 'Feature 1 screenshot',
    },
    {
      src: '/images/projects/feature-2.jpg',
      alt: 'Feature 2 screenshot',
    },
    {
      src: '/images/projects/feature-3.jpg',
      alt: 'Feature 3 screenshot',
    },
  ];

  return (
    <div className="container py-8">
      <h2 className="mb-4 text-2xl font-bold">Swipe to Explore Features</h2>
      <SwipeableGallery images={images} showControls={false} />
      <p className="mt-2 text-center text-sm text-muted-foreground">
        Swipe left or right to navigate
      </p>
    </div>
  );
}

// Example 4: Auto-height gallery for varying image sizes
export function AutoHeightGalleryExample() {
  const images: GalleryImage[] = [
    {
      src: '/images/projects/tall-image.jpg',
      alt: 'Tall portrait image',
      caption: 'Portrait orientation',
    },
    {
      src: '/images/projects/wide-image.jpg',
      alt: 'Wide landscape image',
      caption: 'Landscape orientation',
    },
  ];

  return (
    <div className="container py-8">
      <h2 className="mb-4 text-2xl font-bold">Mixed Aspect Ratios</h2>
      <SwipeableGallery images={images} autoHeight />
    </div>
  );
}

// Example 5: Integration in a case study page
export function CaseStudyPageExample() {
  const caseStudyImages: GalleryImage[] = [
    {
      src: '/images/projects/conversion-playbook/hero.jpg',
      alt: 'Conversion Playbook landing page',
      caption: 'Landing page with clear value proposition',
    },
    {
      src: '/images/projects/conversion-playbook/features.jpg',
      alt: 'Features section',
      caption: 'Feature highlights with social proof',
    },
    {
      src: '/images/projects/conversion-playbook/pricing.jpg',
      alt: 'Pricing page',
      caption: 'Transparent pricing with comparison table',
    },
  ];

  return (
    <article className="container py-12">
      <header className="mb-8">
        <h1 className="mb-4 text-4xl font-bold">Conversion Playbook Case Study</h1>
        <p className="text-xl text-muted-foreground">
          How we increased conversions by 127% through strategic UX improvements
        </p>
      </header>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-bold">The Solution</h2>
        <p className="mb-6 text-muted-foreground">
          We redesigned the entire user journey, focusing on clarity, trust signals,
          and reducing friction at every step.
        </p>
        <SwipeableGallery images={caseStudyImages} className="mb-6" />
      </section>

      {/* Rest of case study content */}
    </article>
  );
}
