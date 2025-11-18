import * as React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { MobileBottomBar } from '../MobileBottomBar';

// Mock next/link
vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: React.PropsWithChildren<{ href: string }>) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

// Mock analytics track function
vi.mock('@/lib/analytics/track', () => ({
  track: vi.fn(),
}));

describe('MobileBottomBar', () => {
  beforeEach(() => {
    // Mock window.scrollY
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      value: 0,
    });
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('renders with default props', () => {
    render(<MobileBottomBar />);
    
    expect(screen.getByText('Book Call')).toBeInTheDocument();
    expect(screen.getByText('View Services')).toBeInTheDocument();
  });

  it('renders with custom labels and hrefs', () => {
    render(
      <MobileBottomBar
        bookCallLabel="Schedule Consultation"
        bookCallHref="/schedule"
        viewServicesLabel="Our Services"
        viewServicesHref="/our-services"
      />
    );
    
    expect(screen.getByText('Schedule Consultation')).toBeInTheDocument();
    expect(screen.getByText('Our Services')).toBeInTheDocument();
    
    const bookCallLink = screen.getByText('Schedule Consultation').closest('a');
    const viewServicesLink = screen.getByText('Our Services').closest('a');
    
    expect(bookCallLink).toHaveAttribute('href', '/schedule');
    expect(viewServicesLink).toHaveAttribute('href', '/our-services');
  });

  it('has proper navigation role and aria-label', () => {
    const { container } = render(<MobileBottomBar />);
    
    const nav = container.querySelector('[role="navigation"][aria-label="Mobile bottom navigation"]');
    expect(nav).toBeInTheDocument();
  });

  it('renders primary CTA with phone icon', () => {
    const { container } = render(<MobileBottomBar />);
    
    const bookCallButton = container.querySelector('a[href="/contact"]');
    expect(bookCallButton).toBeInTheDocument();
    expect(bookCallButton?.textContent).toContain('Book Call');
    
    // Check for phone icon (lucide-react Phone component)
    const svg = bookCallButton?.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('applies mobile-only class (md:hidden)', () => {
    const { container } = render(<MobileBottomBar />);
    
    const bottomBar = container.querySelector('[role="navigation"]');
    expect(bottomBar?.className).toContain('md:hidden');
  });

  it('has sticky positioning at bottom', () => {
    const { container } = render(<MobileBottomBar />);
    
    const bottomBar = container.querySelector('[role="navigation"]');
    expect(bottomBar?.className).toContain('fixed');
    expect(bottomBar?.className).toContain('bottom-0');
  });

  it('has backdrop blur and border styling', () => {
    const { container } = render(<MobileBottomBar />);
    
    const bottomBar = container.querySelector('[role="navigation"]');
    expect(bottomBar?.className).toContain('backdrop-blur');
    expect(bottomBar?.className).toContain('border-t');
  });

  it('renders both buttons with correct flex layout', () => {
    const { container } = render(<MobileBottomBar />);
    
    const buttons = container.querySelectorAll('a');
    expect(buttons).toHaveLength(2);
    
    // Both buttons should have flex-1 class for equal width
    buttons.forEach(button => {
      expect(button.className).toContain('flex-1');
    });
  });
});
