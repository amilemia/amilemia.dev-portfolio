import { describe, it, expect } from 'vitest';
import { LeadMagnetCaptureSchema } from '../lead-magnet';

describe('LeadMagnetCaptureSchema', () => {
  it('should validate correct input', () => {
    const validInput = {
      email: 'test@example.com',
      name: 'John Doe',
      leadMagnetSlug: 'web-performance-checklist',
    };

    const result = LeadMagnetCaptureSchema.safeParse(validInput);
    expect(result.success).toBe(true);
  });

  it('should reject invalid email', () => {
    const invalidInput = {
      email: 'not-an-email',
      name: 'John Doe',
      leadMagnetSlug: 'web-performance-checklist',
    };

    const result = LeadMagnetCaptureSchema.safeParse(invalidInput);
    expect(result.success).toBe(false);
  });

  it('should reject name shorter than 2 characters', () => {
    const invalidInput = {
      email: 'test@example.com',
      name: 'J',
      leadMagnetSlug: 'web-performance-checklist',
    };

    const result = LeadMagnetCaptureSchema.safeParse(invalidInput);
    expect(result.success).toBe(false);
  });

  it('should reject missing leadMagnetSlug', () => {
    const invalidInput = {
      email: 'test@example.com',
      name: 'John Doe',
      leadMagnetSlug: '',
    };

    const result = LeadMagnetCaptureSchema.safeParse(invalidInput);
    expect(result.success).toBe(false);
  });

  it('should reject missing fields', () => {
    const invalidInput = {
      email: 'test@example.com',
    };

    const result = LeadMagnetCaptureSchema.safeParse(invalidInput);
    expect(result.success).toBe(false);
  });
});
