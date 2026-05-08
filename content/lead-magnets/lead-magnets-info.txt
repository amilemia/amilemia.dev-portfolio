# Lead Magnets

This directory contains the lead magnet content for the portfolio site. Lead magnets are free resources offered in exchange for email addresses to build the email list and nurture potential clients.

## Created Lead Magnets

### 1. Web Performance Checklist
- **Slug**: `web-performance-checklist`
- **Category**: Checklist
- **Description**: A comprehensive checklist to audit and optimize website performance
- **File**: `/public/resources/web-performance-checklist.pdf`
- **Thumbnail**: `/public/images/lead-magnets/web-performance-checklist.jpg`
- **Related Projects**: sample-saas-dashboard, conversion-playbook

### 2. Conversion Optimization Guide
- **Slug**: `conversion-optimization-guide`
- **Category**: Guide
- **Description**: Proven strategies to increase website conversion rates
- **File**: `/public/resources/conversion-optimization-guide.pdf`
- **Thumbnail**: `/public/images/lead-magnets/conversion-optimization-guide.jpg`
- **Related Projects**: conversion-playbook, sample-project

### 3. Next.js Best Practices Toolkit
- **Slug**: `nextjs-best-practices`
- **Category**: Toolkit
- **Description**: Complete toolkit for building production-ready Next.js applications
- **File**: `/public/resources/nextjs-best-practices.pdf`
- **Thumbnail**: `/public/images/lead-magnets/nextjs-best-practices.jpg`
- **Related Projects**: sample-saas-dashboard, hello-world

## Download Flow

The end-to-end download flow works as follows:

1. **User Discovery**: User finds lead magnet on home page, project pages, or resources page
2. **Email Capture**: User clicks download button, which opens EmailCaptureModal
3. **Form Submission**: User enters name and email, form submits to `/api/lead-magnets/capture`
4. **API Processing**:
   - Validates input with Zod schema
   - Checks rate limiting (5 requests per minute per IP)
   - Finds lead magnet by slug
   - Sends email with download link via Resend
   - Adds subscriber to email list with tags
   - Tracks download event
5. **Email Delivery**: User receives email within 2 minutes with download link
6. **Download**: User clicks link in email to download PDF (link expires in 7 days)

## Testing

Run the integration tests to verify the flow:

```bash
npm test -- src/app/api/lead-magnets/__tests__/lead-magnet-flow.test.ts
```

## File Structure

```
content/lead-magnets/
├── web-performance-checklist.mdx
├── conversion-optimization-guide.mdx
├── nextjs-best-practices.mdx
└── README.md

public/resources/
├── web-performance-checklist.pdf
├── conversion-optimization-guide.pdf
└── nextjs-best-practices.pdf

public/images/lead-magnets/
├── web-performance-checklist.jpg
├── conversion-optimization-guide.jpg
└── nextjs-best-practices.jpg
```

## Adding New Lead Magnets

To add a new lead magnet:

1. Create a new MDX file in `content/lead-magnets/` with frontmatter:
   ```yaml
   ---
   title: "Your Lead Magnet Title"
   slug: "your-slug"
   description: "Brief description"
   thumbnail: "/images/lead-magnets/your-thumbnail.jpg"
   fileUrl: "/resources/your-file.pdf"
   downloadCount: 0
   rating: 4.5
   category: checklist # or guide, template, toolkit
   relatedTo:
     - project-slug-1
     - project-slug-2
   ---
   ```

2. Add the PDF file to `public/resources/`
3. Add the thumbnail image to `public/images/lead-magnets/`
4. Run `npm run build:content` to regenerate Contentlayer types
5. Test the download flow

## Notes

- PDF files are currently placeholders for testing. In production, these should be professionally designed PDF documents.
- Thumbnail images are SVG placeholders. In production, use high-quality JPG/PNG images (800x600px recommended).
- Download counts and ratings are static values for social proof. In production, these could be dynamically updated from a database.
