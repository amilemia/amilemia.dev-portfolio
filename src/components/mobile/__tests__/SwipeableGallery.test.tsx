import * as React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { SwipeableGallery } from '../SwipeableGallery';
import type { GalleryImage } from '../SwipeableGallery';

// Mock next/image
vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} {...props} />
  ),
}));

describe('SwipeableGallery', () => {
  const mockImages: GalleryImage[] = [
    { src: '/test-image-1.jpg', alt: 'Test image 1', caption: 'First image' },
    { src: '/test-image-2.jpg', alt: 'Test image 2', caption: 'Second image' },
    { src: '/test-image-3.jpg', alt: 'Test image 3', caption: 'Third image' },
  ];

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
    vi.useRealTimers();
  });

  it('renders with images', () => {
    render(<SwipeableGallery images={mockImages} />);
    
    // Check that the first image is visible
    const firstImage = screen.getByAltText('Test image 1');
    expect(firstImage).toBeInTheDocument();
  });

  it('renders nothing when images array is empty', () => {
    const { container } = render(<SwipeableGallery images={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('displays caption for current image', () => {
    render(<SwipeableGallery images={mockImages} />);
    
    expect(screen.getByText('First image')).toBeInTheDocument();
  });

  it('renders pagination dots for multiple images', () => {
    const { container } = render(<SwipeableGallery images={mockImages} />);
    
    const dots = container.querySelectorAll('[role="tab"]');
    expect(dots).toHaveLength(3);
  });

  it('does not render pagination dots for single image', () => {
    const singleImage: GalleryImage[] = [
      { src: '/test-image-1.jpg', alt: 'Test image 1' },
    ];
    const { container } = render(<SwipeableGallery images={singleImage} />);
    
    const dots = container.querySelectorAll('[role="tab"]');
    expect(dots).toHaveLength(0);
  });

  it('navigates to next image when next button is clicked', () => {
    render(<SwipeableGallery images={mockImages} />);
    
    const nextButton = screen.getByLabelText('Next image');
    fireEvent.click(nextButton);
    
    // Fast-forward timers to complete transition
    vi.advanceTimersByTime(300);
    
    // Check that caption changed
    expect(screen.getByText('Second image')).toBeInTheDocument();
  });

  it('navigates to previous image when previous button is clicked', () => {
    const { rerender } = render(<SwipeableGallery images={mockImages} />);
    
    // First go to next image
    const nextButton = screen.getByLabelText('Next image');
    fireEvent.click(nextButton);
    vi.advanceTimersByTime(300);
    rerender(<SwipeableGallery images={mockImages} />);
    
    expect(screen.getByText('Second image')).toBeInTheDocument();
    
    // Then go back
    const prevButton = screen.getByLabelText('Previous image');
    fireEvent.click(prevButton);
    vi.advanceTimersByTime(300);
    rerender(<SwipeableGallery images={mockImages} />);
    
    expect(screen.getByText('First image')).toBeInTheDocument();
  });

  it('navigates to specific image when pagination dot is clicked', () => {
    const { container } = render(<SwipeableGallery images={mockImages} />);
    
    const dots = container.querySelectorAll('[role="tab"]');
    fireEvent.click(dots[2]); // Click third dot
    
    vi.advanceTimersByTime(300);
    
    expect(screen.getByText('Third image')).toBeInTheDocument();
  });

  it('wraps around to first image when navigating past last image', () => {
    const { rerender } = render(<SwipeableGallery images={mockImages} />);
    
    const nextButton = screen.getByLabelText('Next image');
    
    // Navigate to second image
    fireEvent.click(nextButton);
    vi.advanceTimersByTime(300);
    rerender(<SwipeableGallery images={mockImages} />);
    expect(screen.getByText('Second image')).toBeInTheDocument();
    
    // Navigate to third image
    fireEvent.click(screen.getByLabelText('Next image'));
    vi.advanceTimersByTime(300);
    rerender(<SwipeableGallery images={mockImages} />);
    expect(screen.getByText('Third image')).toBeInTheDocument();
    
    // Navigate once more to wrap around to first
    fireEvent.click(screen.getByLabelText('Next image'));
    vi.advanceTimersByTime(300);
    rerender(<SwipeableGallery images={mockImages} />);
    expect(screen.getByText('First image')).toBeInTheDocument();
  });

  it('wraps around to last image when navigating before first image', () => {
    render(<SwipeableGallery images={mockImages} />);
    
    const prevButton = screen.getByLabelText('Previous image');
    fireEvent.click(prevButton);
    
    vi.advanceTimersByTime(300);
    
    expect(screen.getByText('Third image')).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    const { container } = render(<SwipeableGallery images={mockImages} />);
    
    const region = container.querySelector('[role="region"][aria-label="Image gallery"]');
    expect(region).toBeInTheDocument();
    
    const tablist = container.querySelector('[role="tablist"][aria-label="Gallery navigation"]');
    expect(tablist).toBeInTheDocument();
  });

  it('displays image counter on mobile', () => {
    render(<SwipeableGallery images={mockImages} />);
    
    const counter = screen.getByLabelText('Image 1 of 3');
    expect(counter).toBeInTheDocument();
    expect(counter.textContent).toBe('1 / 3');
  });

  it('hides controls when showControls is false', () => {
    render(<SwipeableGallery images={mockImages} showControls={false} />);
    
    expect(screen.queryByLabelText('Next image')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Previous image')).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <SwipeableGallery images={mockImages} className="custom-class" />
    );
    
    const gallery = container.querySelector('.custom-class');
    expect(gallery).toBeInTheDocument();
  });

  it('handles touch swipe gestures', () => {
    const { container } = render(<SwipeableGallery images={mockImages} />);
    
    const imageContainer = container.querySelector('[role="region"]')?.firstChild;
    expect(imageContainer).toBeInTheDocument();
    
    // Simulate swipe left (next)
    fireEvent.touchStart(imageContainer!, {
      targetTouches: [{ clientX: 200 }],
    });
    fireEvent.touchMove(imageContainer!, {
      targetTouches: [{ clientX: 100 }],
    });
    fireEvent.touchEnd(imageContainer!);
    
    vi.advanceTimersByTime(300);
    
    expect(screen.getByText('Second image')).toBeInTheDocument();
  });

  it('prevents navigation during transition', () => {
    render(<SwipeableGallery images={mockImages} />);
    
    const nextButton = screen.getByLabelText('Next image');
    
    // Click next
    fireEvent.click(nextButton);
    
    // Try to click again immediately (should be disabled)
    fireEvent.click(nextButton);
    
    // Fast-forward only the first transition
    vi.advanceTimersByTime(300);
    
    // Should only have moved one image
    expect(screen.getByText('Second image')).toBeInTheDocument();
  });

  it('loads first image with priority', () => {
    const { container } = render(<SwipeableGallery images={mockImages} />);
    
    const images = container.querySelectorAll('img');
    const firstImage = images[0];
    
    expect(firstImage).toHaveAttribute('loading', 'eager');
  });

  it('lazy loads subsequent images', () => {
    const { container } = render(<SwipeableGallery images={mockImages} />);
    
    const images = container.querySelectorAll('img');
    const secondImage = images[1];
    
    expect(secondImage).toHaveAttribute('loading', 'lazy');
  });
});
