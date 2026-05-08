# Lead Magnet Components

This directory contains components for displaying and capturing leads through downloadable resources (lead magnets).

## Components

### LeadMagnetCard

A card component that displays a lead magnet with thumbnail, title, description, and social proof.

**Props:**
- `leadMagnet: LeadMagnet` - The lead magnet data from Contentlayer
- `onDownloadClick: (slug: string) => void` - Callback when download button is clicked

**Features:**
- Displays thumbnail image with fallback
- Shows category badge
- Displays download count and rating as social proof
- Responsive card layout with hover effects

**Usage:**
```tsx
<LeadMagnetCard
  leadMagnet={magnet}
  onDownloadClick={(slug) => handleDownload(slug)}
/>
```

### EmailCaptureModal

A modal dialog that captures user email and name before delivering the lead magnet.

**Props:**
- `isOpen: boolean` - Controls modal visibility
- `onClose: () => void` - Callback when modal is closed
- `leadMagnetSlug: string` - Slug of the lead magnet being downloaded
- `leadMagnetTitle: string` - Title of the lead magnet for display
- `onSuccess?: () => void` - Optional callback after successful submission

**Features:**
- Simple form with name and email fields
- Form validation using Zod
- Success state with confirmation message
- Privacy notice
- Auto-closes after successful submission
- Accessible modal with proper ARIA attributes

**Usage:**
```tsx
<EmailCaptureModal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  leadMagnetSlug="web-performance-checklist"
  leadMagnetTitle="Web Performance Checklist"
/>
```

### ContentUpgradeCallout

An inline callout component for promoting related lead magnets within blog posts or case studies.

**Props:**
- `relatedMagnet: LeadMagnet` - The related lead magnet to promote
- `className?: string` - Optional CSS classes
- `variant?: 'default' | 'compact'` - Display variant (default: 'default')

**Features:**
- Two variants: default (full-width with gradient) and compact (inline)
- Integrated email capture modal
- Social proof display
- Responsive design

**Usage:**
```tsx
// Default variant (full-width)
<ContentUpgradeCallout relatedMagnet={magnet} />

// Compact variant (inline)
<ContentUpgradeCallout relatedMagnet={magnet} variant="compact" />
```

### LeadMagnetGrid

A grid layout component for displaying multiple lead magnets with optional category filtering.

**Props:**
- `magnets: LeadMagnet[]` - Array of lead magnets to display
- `showFilters?: boolean` - Whether to show category filters (default: true)
- `className?: string` - Optional CSS classes

**Features:**
- Responsive grid layout (1 column mobile, 2 tablet, 3 desktop)
- Category filtering with pill buttons
- Results count display
- Empty state when no results
- Integrated email capture modal

**Usage:**
```tsx
<LeadMagnetGrid
  magnets={allLeadMagnets}
  showFilters={true}
/>
```

## Integration

### API Endpoint Required

These components expect a `/api/lead-magnets/capture` endpoint that accepts:

```typescript
POST /api/lead-magnets/capture
{
  name: string;
  email: string;
  leadMagnetSlug: string;
}
```

The endpoint should:
1. Validate the input
2. Send the lead magnet via email (using Resend)
3. Add the subscriber to an email list
4. Track the download event
5. Return success/error response

### Example Page Usage

```tsx
// app/resources/page.tsx
import { allLeadMagnets } from 'contentlayer/generated';
import { LeadMagnetGrid } from '@/components/lead-magnets';

export default function ResourcesPage() {
  return (
    <div className="container py-12">
      <h1 className="mb-8 text-4xl font-bold">Free Resources</h1>
      <LeadMagnetGrid magnets={allLeadMagnets} />
    </div>
  );
}
```

### Example Blog Post Usage

```tsx
// In MDX or blog post component
import { ContentUpgradeCallout } from '@/components/lead-magnets';

<ContentUpgradeCallout
  relatedMagnet={performanceChecklist}
  variant="compact"
/>
```

## Accessibility

All components follow WCAG AA accessibility guidelines:
- Proper ARIA labels and roles
- Keyboard navigation support
- Focus management
- Screen reader friendly
- Sufficient color contrast
- Touch targets meet minimum size (44x44px)

## Styling

Components use Tailwind CSS and shadcn/ui design system for consistent styling. They support both light and dark modes automatically.

## Requirements Validation

These components satisfy the following requirements from the design document:

- **Requirement 4.1**: Lead magnet display with email capture
- **Requirement 4.2**: Content upgrade callouts for inline placement
- **Requirement 4.5**: Social proof display (download count, ratings)
