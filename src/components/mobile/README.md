# Mobile Components

This directory contains mobile-optimized components for the portfolio website.

## Components

### MobileBottomBar

A sticky bottom navigation bar that appears only on mobile devices (<768px). Features:
- Primary CTA button (Book Call)
- Secondary action button (View Services)
- Auto-hide on scroll down, show on scroll up
- Smooth transitions and backdrop blur

**Usage:**
```tsx
import { MobileBottomBar } from '@/components/mobile';

<MobileBottomBar 
  bookCallLabel="Schedule Call"
  bookCallHref="/contact"
  viewServicesLabel="Our Services"
  viewServicesHref="/services"
/>
```

### SwipeableGallery

A touch-friendly image gallery with swipe gestures, optimized for mobile devices. Features:
- Touch swipe gestures (left/right)
- Pagination dots for navigation
- Desktop navigation buttons (hidden on mobile)
- Lazy loading for performance
- Accessibility compliant (ARIA labels, keyboard navigation)
- Image counter on mobile
- Optional captions
- Smooth transitions

**Usage:**
```tsx
import { SwipeableGallery } from '@/components/mobile';
import type { GalleryImage } from '@/components/mobile';

const images: GalleryImage[] = [
  {
    src: '/images/before.jpg',
    alt: 'Before redesign',
    caption: 'Original design with 2% conversion rate',
  },
  {
    src: '/images/after.jpg',
    alt: 'After redesign',
    caption: 'New design with 5% conversion rate',
  },
];

<SwipeableGallery images={images} />
```

**Props:**
- `images` (required): Array of GalleryImage objects
  - `src`: Image source URL
  - `alt`: Alt text for accessibility
  - `caption` (optional): Caption displayed below image
- `className` (optional): Additional CSS classes
- `showControls` (optional): Show/hide navigation buttons (default: true)
- `autoHeight` (optional): Use auto height instead of fixed aspect ratio (default: false)

**Features:**
- **Swipe Detection**: Configurable threshold (50px) and minimum velocity (0.3)
- **Lazy Loading**: First image loads with priority, others lazy load
- **Responsive**: Desktop shows navigation buttons, mobile shows counter
- **Accessible**: Full ARIA support, keyboard navigation, screen reader announcements
- **Performance**: Optimized with Next.js Image component, proper sizing attributes

**Best Practices:**
1. Use descriptive alt text for all images
2. Keep captions concise (1-2 lines)
3. Optimize images before upload (use Next.js Image optimization)
4. Limit gallery to 5-10 images for best performance
5. Use consistent aspect ratios when possible

**Example Use Cases:**
- Before/after comparisons in case studies
- Project screenshot galleries
- Feature showcases
- Mobile-first image presentations

See `SwipeableGallery.example.tsx` for more usage examples.

## Hooks

### useSwipeGesture

A custom React hook for detecting swipe gestures on touch devices.

**Usage:**
```tsx
import { useSwipeGesture } from '@/hooks/useSwipeGesture';

const swipeHandlers = useSwipeGesture({
  onSwipeLeft: () => console.log('Swiped left'),
  onSwipeRight: () => console.log('Swiped right'),
  threshold: 50,
  minVelocity: 0.3,
});

<div {...swipeHandlers}>
  Swipeable content
</div>
```

**Options:**
- `onSwipeLeft`: Callback for left swipe
- `onSwipeRight`: Callback for right swipe
- `threshold`: Minimum distance in pixels (default: 50)
- `minVelocity`: Minimum swipe velocity (default: 0.3)

**Returns:**
- `onTouchStart`: Touch start handler
- `onTouchMove`: Touch move handler
- `onTouchEnd`: Touch end handler

## Testing

All components have comprehensive test coverage. Run tests with:

```bash
npm test -- src/components/mobile/__tests__
```

## Accessibility

All mobile components follow WCAG 2.1 AA guidelines:
- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader announcements
- Sufficient color contrast
- Touch target sizes (minimum 44x44px)

## Performance

Mobile components are optimized for performance:
- Lazy loading of images
- Debounced scroll handlers
- RequestAnimationFrame for smooth animations
- Minimal re-renders with React.memo and useCallback
- Code splitting with dynamic imports

## Browser Support

- iOS Safari 12+
- Chrome Mobile 80+
- Firefox Mobile 80+
- Samsung Internet 12+

## Future Enhancements

Potential improvements for future iterations:
- [ ] Pinch-to-zoom support for images
- [ ] Video support in gallery
- [ ] Thumbnail navigation
- [ ] Fullscreen mode
- [ ] Share functionality
- [ ] Download images option
