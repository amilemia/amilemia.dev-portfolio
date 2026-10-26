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
    label: 'Lighthouse Target',
    value: '95+',
    context: 'Performance, Accessibility & SEO audited on every release',
    icon: 'trending-up',
  },
  {
    label: 'Delivery Window',
    value: '2-4 wks',
    context: 'Focused sprints from discovery to production deployment',
    icon: 'briefcase',
  },
  {
    label: 'Bilingual Native',
    value: '100%',
    context: 'Built-in English & French localization and SEO routing',
    icon: 'users',
  },
  {
    label: 'Post-Launch QA',
    value: '14 Days',
    context: 'Dedicated bug-fix, handoff documentation & launch support',
    icon: 'star',
  },
];

export const trustMetricsFr: TrustMetric[] = [
  {
    label: 'Objectif Lighthouse',
    value: '95+',
    context: 'Performance, accessibilité et SEO audités à chaque livraison',
    icon: 'trending-up',
  },
  {
    label: 'Délai de livraison',
    value: '2-4 sem.',
    context: 'Sprints focalisés de la découverte à la mise en production',
    icon: 'briefcase',
  },
  {
    label: 'Bilingue natif',
    value: '100%',
    context: 'Localisation anglais/français et routage SEO intégrés',
    icon: 'users',
  },
  {
    label: 'Support QA post-lancement',
    value: '14 Jours',
    context: 'Corrections, documentation de passation et suivi inclus',
    icon: 'star',
  },
];

// ============================================================================
// Client Logos Data
// ============================================================================

export const clientLogos: ClientLogo[] = [
  {
    name: 'Clinique Santé Plus',
    src: '/images/clients/clinic-sante-plus-logo.png',
    industry: 'Healthcare',
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
export function getTrustMetrics(locale: 'en' | 'fr' = 'en'): TrustMetric[] {
  return locale === 'fr' ? trustMetricsFr : trustMetrics;
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
