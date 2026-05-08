import { describe, it, expect } from 'vitest';
import type { LeadMagnetEmailData, EmailSubscriber } from '../resend-client';

/**
 * Tests for Resend email client
 * 
 * Note: These are unit tests that verify the data structures and interfaces.
 * Integration tests with actual email sending would require mocking Resend
 * or using a test API key.
 */

describe('LeadMagnetEmailData', () => {
  it('should have correct structure', () => {
    const emailData: LeadMagnetEmailData = {
      recipientName: 'John Doe',
      recipientEmail: 'john@example.com',
      leadMagnetTitle: 'Web Performance Checklist',
      downloadUrl: 'https://example.com/download/checklist.pdf',
      expirationDays: 7,
    };

    expect(emailData.recipientName).toBe('John Doe');
    expect(emailData.recipientEmail).toBe('john@example.com');
    expect(emailData.leadMagnetTitle).toBe('Web Performance Checklist');
    expect(emailData.downloadUrl).toBe('https://example.com/download/checklist.pdf');
    expect(emailData.expirationDays).toBe(7);
  });

  it('should allow optional expirationDays', () => {
    const emailData: LeadMagnetEmailData = {
      recipientName: 'Jane Smith',
      recipientEmail: 'jane@example.com',
      leadMagnetTitle: 'Conversion Guide',
      downloadUrl: 'https://example.com/download/guide.pdf',
    };

    expect(emailData.expirationDays).toBeUndefined();
  });
});

describe('EmailSubscriber', () => {
  it('should have correct structure for lead magnet source', () => {
    const subscriber: EmailSubscriber = {
      email: 'subscriber@example.com',
      name: 'Test Subscriber',
      source: 'lead_magnet',
      tags: ['web-performance', 'checklist'],
      metadata: {
        leadMagnetSlug: 'web-performance-checklist',
        downloadedAt: new Date().toISOString(),
      },
    };

    expect(subscriber.email).toBe('subscriber@example.com');
    expect(subscriber.name).toBe('Test Subscriber');
    expect(subscriber.source).toBe('lead_magnet');
    expect(subscriber.tags).toContain('web-performance');
    expect(subscriber.metadata?.leadMagnetSlug).toBe('web-performance-checklist');
  });

  it('should allow optional fields', () => {
    const subscriber: EmailSubscriber = {
      email: 'minimal@example.com',
      source: 'newsletter',
    };

    expect(subscriber.name).toBeUndefined();
    expect(subscriber.tags).toBeUndefined();
    expect(subscriber.metadata).toBeUndefined();
  });

  it('should support all source types', () => {
    const sources: EmailSubscriber['source'][] = [
      'lead_magnet',
      'newsletter',
      'contact_form',
    ];

    sources.forEach(source => {
      const subscriber: EmailSubscriber = {
        email: 'test@example.com',
        source,
      };
      expect(subscriber.source).toBe(source);
    });
  });
});

describe('Email template validation', () => {
  it('should generate valid download URLs', () => {
    const baseUrl = 'https://amilemia.dev';
    const filePath = '/resources/checklist.pdf';
    const downloadUrl = `${baseUrl}${filePath}`;

    expect(downloadUrl).toBe('https://amilemia.dev/resources/checklist.pdf');
    expect(downloadUrl).toMatch(/^https?:\/\//);
  });

  it('should handle expiration days correctly', () => {
    const expirationDays = 7;
    const now = new Date();
    const expirationDate = new Date(now);
    expirationDate.setDate(expirationDate.getDate() + expirationDays);

    const diffInDays = Math.round(
      (expirationDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );

    expect(diffInDays).toBe(expirationDays);
  });
});
