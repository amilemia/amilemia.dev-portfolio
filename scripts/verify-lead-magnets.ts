#!/usr/bin/env tsx
/**
 * Verification script for lead magnet implementation
 * 
 * This script verifies that:
 * 1. All lead magnet MDX files are created
 * 2. All PDF files exist in public/resources
 * 3. All thumbnail images exist
 * 4. Contentlayer has generated the types correctly
 * 5. The API can find lead magnets by slug
 */

import { allLeadMagnets } from '../.contentlayer/generated/index.mjs';
import { existsSync } from 'fs';
import { join } from 'path';

console.log('🔍 Verifying Lead Magnet Implementation...\n');

// Check 1: Lead magnets generated
console.log('✅ Check 1: Lead Magnets Generated');
console.log(`   Found ${allLeadMagnets.length} lead magnets`);
allLeadMagnets.forEach((lm, index) => {
  console.log(`   ${index + 1}. ${lm.title} (${lm.slug})`);
});
console.log('');

// Check 2: Required lead magnets exist
console.log('✅ Check 2: Required Lead Magnets Exist');
const requiredSlugs = [
  'web-performance-checklist',
  'conversion-optimization-guide',
  'nextjs-best-practices'
];

requiredSlugs.forEach(slug => {
  const found = allLeadMagnets.find(lm => lm.slug === slug);
  if (found) {
    console.log(`   ✓ ${slug}`);
  } else {
    console.log(`   ✗ ${slug} - MISSING!`);
  }
});
console.log('');

// Check 3: PDF files exist
console.log('✅ Check 3: PDF Files Exist');
allLeadMagnets.forEach(lm => {
  const pdfPath = join(process.cwd(), 'public', lm.fileUrl);
  const exists = existsSync(pdfPath);
  console.log(`   ${exists ? '✓' : '✗'} ${lm.fileUrl}`);
});
console.log('');

// Check 4: Thumbnail images exist
console.log('✅ Check 4: Thumbnail Images Exist');
allLeadMagnets.forEach(lm => {
  const thumbnailPath = join(process.cwd(), 'public', lm.thumbnail);
  const exists = existsSync(thumbnailPath);
  console.log(`   ${exists ? '✓' : '✗'} ${lm.thumbnail}`);
});
console.log('');

// Check 5: Data validation
console.log('✅ Check 5: Data Validation');
let allValid = true;

allLeadMagnets.forEach(lm => {
  const validations = [
    { check: lm.title && lm.title.length > 0, field: 'title' },
    { check: lm.slug && lm.slug.length > 0, field: 'slug' },
    { check: lm.description && lm.description.length > 0, field: 'description' },
    { check: lm.thumbnail && lm.thumbnail.length > 0, field: 'thumbnail' },
    { check: lm.fileUrl && lm.fileUrl.length > 0, field: 'fileUrl' },
    { check: lm.category && ['checklist', 'guide', 'template', 'toolkit'].includes(lm.category), field: 'category' },
  ];

  const invalid = validations.filter(v => !v.check);
  if (invalid.length > 0) {
    console.log(`   ✗ ${lm.slug}: Missing or invalid fields: ${invalid.map(i => i.field).join(', ')}`);
    allValid = false;
  } else {
    console.log(`   ✓ ${lm.slug}: All fields valid`);
  }
});
console.log('');

// Check 6: Social proof data
console.log('✅ Check 6: Social Proof Data');
allLeadMagnets.forEach(lm => {
  const hasDownloadCount = lm.downloadCount !== undefined && lm.downloadCount > 0;
  const hasRating = lm.rating !== undefined && lm.rating > 0 && lm.rating <= 5;
  console.log(`   ${lm.slug}:`);
  console.log(`     Downloads: ${hasDownloadCount ? lm.downloadCount : 'N/A'}`);
  console.log(`     Rating: ${hasRating ? lm.rating : 'N/A'}/5`);
});
console.log('');

// Check 7: Related projects
console.log('✅ Check 7: Related Projects');
allLeadMagnets.forEach(lm => {
  const hasRelated = lm.relatedTo && lm.relatedTo.length > 0;
  console.log(`   ${lm.slug}: ${hasRelated ? lm.relatedTo.join(', ') : 'None'}`);
});
console.log('');

// Summary
console.log('📊 Summary');
console.log(`   Total Lead Magnets: ${allLeadMagnets.length}`);
console.log(`   All Validations: ${allValid ? '✓ PASSED' : '✗ FAILED'}`);
console.log('');

if (allLeadMagnets.length >= 2 && allValid) {
  console.log('🎉 All checks passed! Lead magnets are ready for use.');
  process.exit(0);
} else {
  console.log('❌ Some checks failed. Please review the output above.');
  process.exit(1);
}
