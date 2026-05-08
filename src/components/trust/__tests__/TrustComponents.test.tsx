import React from 'react';
import { describe, it, expect, beforeAll } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TrustMetrics } from '../TrustMetrics';
import { ClientLogos } from '../ClientLogos';
import { CertificationBadges } from '../CertificationBadges';
import type { TrustMetric, ClientLogo, Certification } from '@/data/trust';

// Mock IntersectionObserver for tests
beforeAll(() => {
  global.IntersectionObserver = class IntersectionObserver {
    constructor() {}
    disconnect() {}
    observe() {}
    takeRecords(): IntersectionObserverEntry[] {
      return [];
    }
    unobserve() {}
  } as unknown as typeof IntersectionObserver;
});

describe('TrustMetrics', () => {
  const mockMetrics: TrustMetric[] = [
    {
      label: 'Happy Clients',
      value: '25+',
      context: 'Successful partnerships',
      icon: 'users',
    },
    {
      label: 'Projects Delivered',
      value: '40+',
      context: 'From MVPs to enterprise',
      icon: 'briefcase',
    },
    {
      label: 'Conversion Lift',
      value: '28%',
      context: 'Measured across projects',
      icon: 'trending-up',
    },
    {
      label: 'Satisfaction',
      value: '4.9/5',
      context: 'Based on surveys',
      icon: 'star',
    },
  ];

  it('renders exactly 4 metrics with labels and values', () => {
    render(<TrustMetrics metrics={mockMetrics} />);
    
    expect(screen.getByText('Happy Clients')).toBeInTheDocument();
    expect(screen.getByText('Projects Delivered')).toBeInTheDocument();
    expect(screen.getByText('Conversion Lift')).toBeInTheDocument();
    expect(screen.getByText('Satisfaction')).toBeInTheDocument();
  });

  it('displays context text for each metric', () => {
    render(<TrustMetrics metrics={mockMetrics} />);
    
    expect(screen.getAllByText('Successful partnerships')[0]).toBeInTheDocument();
    expect(screen.getAllByText('From MVPs to enterprise')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Measured across projects')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Based on surveys')[0]).toBeInTheDocument();
  });

  it('has proper ARIA label for accessibility', () => {
    render(<TrustMetrics metrics={mockMetrics} />);
    
    const regions = screen.getAllByRole('region', { name: 'Trust metrics' });
    expect(regions.length).toBeGreaterThan(0);
  });

  it('renders with custom className', () => {
    const { container } = render(
      <TrustMetrics metrics={mockMetrics} className="custom-class" />
    );
    
    const region = container.querySelector('.custom-class');
    expect(region).toBeInTheDocument();
  });
});

describe('ClientLogos', () => {
  const mockLogos: ClientLogo[] = [
    {
      name: 'TechCorp',
      src: '/images/clients/techcorp.svg',
      url: 'https://techcorp.example.com',
      industry: 'Technology',
    },
    {
      name: 'HealthFirst',
      src: '/images/clients/healthfirst.svg',
      url: 'https://healthfirst.example.com',
      industry: 'Healthcare',
    },
    {
      name: 'EduLearn',
      src: '/images/clients/edulearn.svg',
      industry: 'Education',
    },
    {
      name: 'FinanceHub',
      src: '/images/clients/financehub.svg',
      industry: 'Finance',
    },
    {
      name: 'RetailPro',
      src: '/images/clients/retailpro.svg',
      industry: 'Retail',
    },
    {
      name: 'GreenEnergy',
      src: '/images/clients/greenenergy.svg',
      industry: 'Energy',
    },
  ];

  it('displays minimum 6 logos with alt text', () => {
    render(<ClientLogos logos={mockLogos} />);
    
    const techCorpLogo = screen.getAllByAltText('TechCorp logo')[0];
    const healthFirstLogo = screen.getAllByAltText('HealthFirst logo')[0];
    const eduLearnLogo = screen.getAllByAltText('EduLearn logo')[0];
    const financeHubLogo = screen.getAllByAltText('FinanceHub logo')[0];
    const retailProLogo = screen.getAllByAltText('RetailPro logo')[0];
    const greenEnergyLogo = screen.getAllByAltText('GreenEnergy logo')[0];
    
    expect(techCorpLogo).toBeInTheDocument();
    expect(healthFirstLogo).toBeInTheDocument();
    expect(eduLearnLogo).toBeInTheDocument();
    expect(financeHubLogo).toBeInTheDocument();
    expect(retailProLogo).toBeInTheDocument();
    expect(greenEnergyLogo).toBeInTheDocument();
  });

  it('has proper ARIA label for accessibility', () => {
    render(<ClientLogos logos={mockLogos} />);
    
    const regions = screen.getAllByRole('region', { name: 'Client logos' });
    expect(regions.length).toBeGreaterThan(0);
  });

  it('renders logos with URLs as links', () => {
    render(<ClientLogos logos={mockLogos} />);
    
    const techCorpLink = screen.getAllByLabelText('Visit TechCorp website')[0];
    expect(techCorpLink).toHaveAttribute('href', 'https://techcorp.example.com');
    expect(techCorpLink).toHaveAttribute('target', '_blank');
    expect(techCorpLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders logos without URLs as non-interactive elements', () => {
    render(<ClientLogos logos={mockLogos} />);
    
    // EduLearn doesn't have a URL, so it shouldn't be a link
    const eduLearnLinks = screen.queryAllByLabelText('Visit EduLearn website');
    expect(eduLearnLinks).toHaveLength(0);
  });
});

describe('CertificationBadges', () => {
  const mockBadges: Certification[] = [
    {
      name: 'WCAG 2.1 Level AA',
      issuer: 'W3C',
      image: '/images/certifications/wcag-aa.svg',
      verifyUrl: 'https://www.w3.org/WAI/WCAG2AA-Conformance',
      earnedDate: '2024-01-15',
    },
    {
      name: 'Vercel Partner',
      issuer: 'Vercel Inc.',
      image: '/images/certifications/vercel-partner.svg',
      verifyUrl: 'https://vercel.com/partners',
      earnedDate: '2023-09-20',
    },
    {
      name: 'Next.js Expert',
      issuer: 'Vercel Inc.',
      image: '/images/certifications/nextjs-expert.svg',
      earnedDate: '2023-11-10',
    },
  ];

  it('renders all certification badges', () => {
    render(<CertificationBadges badges={mockBadges} />);
    
    const wcagBadge = screen.getByAltText('WCAG 2.1 Level AA certification badge');
    const vercelBadge = screen.getByAltText('Vercel Partner certification badge');
    const nextjsBadge = screen.getByAltText('Next.js Expert certification badge');
    
    expect(wcagBadge).toBeInTheDocument();
    expect(vercelBadge).toBeInTheDocument();
    expect(nextjsBadge).toBeInTheDocument();
  });

  it('has proper ARIA label for accessibility', () => {
    render(<CertificationBadges badges={mockBadges} />);
    
    const regions = screen.getAllByRole('region', { name: 'Certifications and badges' });
    expect(regions.length).toBeGreaterThan(0);
  });

  it('renders badges with verifyUrl as links', () => {
    render(<CertificationBadges badges={mockBadges} />);
    
    const wcagLinks = screen.getAllByLabelText('WCAG 2.1 Level AA - Click to verify');
    expect(wcagLinks[0]).toHaveAttribute('href', 'https://www.w3.org/WAI/WCAG2AA-Conformance');
    expect(wcagLinks[0]).toHaveAttribute('target', '_blank');
    expect(wcagLinks[0]).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders badges without verifyUrl as non-link elements', () => {
    render(<CertificationBadges badges={mockBadges} />);
    
    const nextjsElements = screen.getAllByLabelText('Next.js Expert');
    expect(nextjsElements[0].tagName).not.toBe('A');
  });
});
