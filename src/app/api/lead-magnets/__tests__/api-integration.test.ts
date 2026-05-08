import { describe, it, expect } from 'vitest';
import { allLeadMagnets } from 'contentlayer/generated';

describe('Lead Magnet API Integration', () => {
  describe('Contentlayer Integration', () => {
    it('should be able to import allLeadMagnets from contentlayer', () => {
      expect(allLeadMagnets).toBeDefined();
      expect(Array.isArray(allLeadMagnets)).toBe(true);
    });

    it('should find lead magnet by slug', () => {
      const slug = 'web-performance-checklist';
      const leadMagnet = allLeadMagnets.find(lm => lm.slug === slug);
      
      expect(leadMagnet).toBeDefined();
      expect(leadMagnet?.slug).toBe(slug);
    });

    it('should have body content for each lead magnet', () => {
      allLeadMagnets.forEach((leadMagnet) => {
        expect(leadMagnet.body).toBeDefined();
        expect(leadMagnet.body.raw).toBeDefined();
        expect(leadMagnet.body.raw.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Download URL Generation', () => {
    it('should have valid file URLs', () => {
      allLeadMagnets.forEach((leadMagnet) => {
        expect(leadMagnet.fileUrl).toMatch(/^\/resources\/.+\.pdf$/);
      });
    });

    it('should have valid thumbnail URLs', () => {
      allLeadMagnets.forEach((leadMagnet) => {
        expect(leadMagnet.thumbnail).toMatch(/^\/images\/lead-magnets\/.+\.(jpg|png|svg)$/);
      });
    });
  });

  describe('Data Validation', () => {
    it('should have non-empty titles', () => {
      allLeadMagnets.forEach((leadMagnet) => {
        expect(leadMagnet.title.length).toBeGreaterThan(0);
      });
    });

    it('should have non-empty descriptions', () => {
      allLeadMagnets.forEach((leadMagnet) => {
        expect(leadMagnet.description.length).toBeGreaterThan(0);
      });
    });

    it('should have slugs in kebab-case format', () => {
      const kebabCaseRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
      allLeadMagnets.forEach((leadMagnet) => {
        expect(leadMagnet.slug).toMatch(kebabCaseRegex);
      });
    });
  });

  describe('Specific Lead Magnets', () => {
    it('should have web performance checklist with correct data', () => {
      const leadMagnet = allLeadMagnets.find(
        lm => lm.slug === 'web-performance-checklist'
      );
      
      expect(leadMagnet).toBeDefined();
      expect(leadMagnet?.title).toBe('Web Performance Checklist');
      expect(leadMagnet?.category).toBe('checklist');
      expect(leadMagnet?.fileUrl).toBe('/resources/web-performance-checklist.pdf');
      expect(leadMagnet?.downloadCount).toBeGreaterThan(0);
      expect(leadMagnet?.rating).toBeGreaterThan(0);
    });

    it('should have conversion optimization guide with correct data', () => {
      const leadMagnet = allLeadMagnets.find(
        lm => lm.slug === 'conversion-optimization-guide'
      );
      
      expect(leadMagnet).toBeDefined();
      expect(leadMagnet?.title).toBe('Conversion Optimization Guide');
      expect(leadMagnet?.category).toBe('guide');
      expect(leadMagnet?.fileUrl).toBe('/resources/conversion-optimization-guide.pdf');
      expect(leadMagnet?.downloadCount).toBeGreaterThan(0);
      expect(leadMagnet?.rating).toBeGreaterThan(0);
    });

    it('should have nextjs best practices with correct data', () => {
      const leadMagnet = allLeadMagnets.find(
        lm => lm.slug === 'nextjs-best-practices'
      );
      
      expect(leadMagnet).toBeDefined();
      expect(leadMagnet?.title).toBe('Next.js Best Practices Toolkit');
      expect(leadMagnet?.category).toBe('toolkit');
      expect(leadMagnet?.fileUrl).toBe('/resources/nextjs-best-practices.pdf');
      expect(leadMagnet?.downloadCount).toBeGreaterThan(0);
      expect(leadMagnet?.rating).toBeGreaterThan(0);
    });
  });
});
