import { describe, it, expect } from 'vitest';
import { allLeadMagnets } from 'contentlayer/generated';
import { existsSync } from 'fs';
import { join } from 'path';

describe('Lead Magnet End-to-End Flow', () => {
  describe('Content Generation', () => {
    it('should have generated at least 2 lead magnets', () => {
      expect(allLeadMagnets.length).toBeGreaterThanOrEqual(2);
    });

    it('should have all required fields for each lead magnet', () => {
      allLeadMagnets.forEach((leadMagnet) => {
        expect(leadMagnet.title).toBeDefined();
        expect(leadMagnet.slug).toBeDefined();
        expect(leadMagnet.description).toBeDefined();
        expect(leadMagnet.thumbnail).toBeDefined();
        expect(leadMagnet.fileUrl).toBeDefined();
        expect(leadMagnet.category).toBeDefined();
      });
    });

    it('should have valid category values', () => {
      const validCategories = ['checklist', 'guide', 'template', 'toolkit'];
      allLeadMagnets.forEach((leadMagnet) => {
        expect(validCategories).toContain(leadMagnet.category);
      });
    });

    it('should have unique slugs', () => {
      const slugs = allLeadMagnets.map(lm => lm.slug);
      const uniqueSlugs = new Set(slugs);
      expect(slugs.length).toBe(uniqueSlugs.size);
    });
  });

  describe('File Existence', () => {
    it('should have PDF files in public/resources for each lead magnet', () => {
      allLeadMagnets.forEach((leadMagnet) => {
        const pdfPath = join(process.cwd(), 'public', leadMagnet.fileUrl);
        expect(existsSync(pdfPath)).toBe(true);
      });
    });

    it('should have thumbnail images for each lead magnet', () => {
      allLeadMagnets.forEach((leadMagnet) => {
        const thumbnailPath = join(process.cwd(), 'public', leadMagnet.thumbnail);
        expect(existsSync(thumbnailPath)).toBe(true);
      });
    });
  });

  describe('Lead Magnet Content', () => {
    it('should have web performance checklist', () => {
      const perfChecklist = allLeadMagnets.find(
        lm => lm.slug === 'web-performance-checklist'
      );
      expect(perfChecklist).toBeDefined();
      expect(perfChecklist?.category).toBe('checklist');
    });

    it('should have conversion optimization guide', () => {
      const conversionGuide = allLeadMagnets.find(
        lm => lm.slug === 'conversion-optimization-guide'
      );
      expect(conversionGuide).toBeDefined();
      expect(conversionGuide?.category).toBe('guide');
    });

    it('should have nextjs best practices toolkit', () => {
      const nextjsToolkit = allLeadMagnets.find(
        lm => lm.slug === 'nextjs-best-practices'
      );
      expect(nextjsToolkit).toBeDefined();
      expect(nextjsToolkit?.category).toBe('toolkit');
    });
  });

  describe('Social Proof Data', () => {
    it('should have download counts for social proof', () => {
      allLeadMagnets.forEach((leadMagnet) => {
        if (leadMagnet.downloadCount !== undefined) {
          expect(leadMagnet.downloadCount).toBeGreaterThanOrEqual(0);
        }
      });
    });

    it('should have ratings between 0 and 5', () => {
      allLeadMagnets.forEach((leadMagnet) => {
        if (leadMagnet.rating !== undefined) {
          expect(leadMagnet.rating).toBeGreaterThanOrEqual(0);
          expect(leadMagnet.rating).toBeLessThanOrEqual(5);
        }
      });
    });
  });

  describe('Related Projects', () => {
    it('should have related projects for context', () => {
      const leadMagnetsWithRelated = allLeadMagnets.filter(
        lm => lm.relatedTo && lm.relatedTo.length > 0
      );
      expect(leadMagnetsWithRelated.length).toBeGreaterThan(0);
    });
  });

  describe('URL Generation', () => {
    it('should generate correct URLs for each lead magnet', () => {
      allLeadMagnets.forEach((leadMagnet) => {
        expect(leadMagnet.url).toBe(`/resources/${leadMagnet.slug}`);
      });
    });
  });
});
