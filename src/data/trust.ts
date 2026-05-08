/**
 * Trust and Social Proof Data
 * 
 * This module contains data structures and sample data for trust signals
 * including metrics, client logos, and certifications.
 */

// ============================================================================
// Type Definitions
// ============================================================================

export interface TrustMetric {
  label: string;
  value: string;
  context?: string;
  icon?: string;
}

export interface ClientLogo {
  name: string;
  src: string;
  url?: string;
  industry?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  image: string;
  verifyUrl?: string;
  earnedDate: string;
}

// ============================================================================
// Trust Metrics Data
// ============================================================================

export const trustMetrics: TrustMetric[] = [
  {
    label: 'Happy Clients',
    value: '25+',
    context: 'Successful partnerships across industries',
    icon: 'users',
  },
  {
    label: 'Projects Delivered',
    value: '40+',
    context: 'From MVPs to enterprise applications',
    icon: 'briefcase',
  },
  {
    label: 'Average Conversion Lift',
    value: '28%',
    context: 'Measured across 12 optimization projects',
    icon: 'trending-up',
  },
  {
    label: 'Client Satisfaction',
    value: '4.9/5',
    context: 'Based on post-project surveys',
    icon: 'star',
  },
];

// ============================================================================
// Client Logos Data
// ============================================================================

export const clientLogos: ClientLogo[] = [
  {
    name: 'TechCorp Solutions',
    src: '/images/clients/techcorp.svg',
    url: 'https://techcorp.example.com',
    industry: 'Technology',
  },
  {
    name: 'HealthFirst Medical',
    src: '/images/clients/healthfirst.svg',
    url: 'https://healthfirst.example.com',
    industry: 'Healthcare',
  },
  {
    name: 'EduLearn Platform',
    src: '/images/clients/edulearn.svg',
    url: 'https://edulearn.example.com',
    industry: 'Education',
  },
  {
    name: 'FinanceHub',
    src: '/images/clients/financehub.svg',
    url: 'https://financehub.example.com',
    industry: 'Finance',
  },
  {
    name: 'RetailPro Systems',
    src: '/images/clients/retailpro.svg',
    url: 'https://retailpro.example.com',
    industry: 'Retail',
  },
  {
    name: 'GreenEnergy Co',
    src: '/images/clients/greenenergy.svg',
    url: 'https://greenenergy.example.com',
    industry: 'Energy',
  },
  {
    name: 'MediaStream Inc',
    src: '/images/clients/mediastream.svg',
    industry: 'Media',
  },
  {
    name: 'LogiTrack Solutions',
    src: '/images/clients/logitrack.svg',
    industry: 'Logistics',
  },
];

// ============================================================================
// Certifications Data
// ============================================================================

export const certifications: Certification[] = [
  {
    name: 'WCAG 2.1 Level AA Certified',
    issuer: 'W3C Web Accessibility Initiative',
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
  {
    name: 'Google Analytics Certified',
    issuer: 'Google',
    image: '/images/certifications/google-analytics.svg',
    verifyUrl: 'https://skillshop.exceedlms.com/student/catalog',
    earnedDate: '2024-02-05',
  },
  {
    name: 'AWS Certified Developer',
    issuer: 'Amazon Web Services',
    image: '/images/certifications/aws-developer.svg',
    verifyUrl: 'https://aws.amazon.com/verification',
    earnedDate: '2023-08-12',
  },
  {
    name: 'TypeScript Professional',
    issuer: 'Microsoft',
    image: '/images/certifications/typescript-pro.svg',
    earnedDate: '2023-10-18',
  },
];

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Get trust metrics for display
 */
export function getTrustMetrics(): TrustMetric[] {
  return trustMetrics;
}

/**
 * Get client logos for display
 */
export function getClientLogos(): ClientLogo[] {
  return clientLogos;
}

/**
 * Get certifications for display
 */
export function getCertifications(): Certification[] {
  return certifications;
}

/**
 * Get client logos filtered by industry
 */
export function getClientLogosByIndustry(industry: string): ClientLogo[] {
  return clientLogos.filter((logo) => logo.industry === industry);
}

/**
 * Get certifications sorted by date (most recent first)
 */
export function getCertificationsByDate(): Certification[] {
  return [...certifications].sort(
    (a, b) => new Date(b.earnedDate).getTime() - new Date(a.earnedDate).getTime()
  );
}
