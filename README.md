# amilemia.dev — Modern Web Developer Portfolio

A modern, performant portfolio to showcase my skills and projects, built with a clean, accessible UI and an AI-assisted development workflow.

---

## 🔖 Project Title & Description

**Title:** amilemia.dev — Personal Web Developer Portfolio  
**What I’m building:** A fast, accessible portfolio that highlights my skills, selected projects (as detailed case studies), and a clear contact path.  
**Who it’s for:** Hiring managers, clients, and collaborators.  
**Why it matters:** A credible, thoughtfully structured portfolio demonstrates engineering quality (accessibility, testing, docs) and accelerates opportunities.

---

## 🛠️ Tech Stack

- **Framework & Language:** Next.js 15 (App Router), React 19, TypeScript (strict)
- **Styling & UI:** Tailwind CSS, shadcn/ui, Framer Motion (light, purposeful animations)
- **Content:** MDX + Contentlayer (projects, about, uses)
- **Forms & Validation:** Next.js Route Handlers, Zod
- **Email (contact):** Resend
- **API-aware generation:** OpenAPI 3.1 spec for `/api/contact` → types via `openapi-typescript` → typed client wrapper.
- **Testing:** Vitest, @testing-library/react, Playwright
- **Quality:** ESLint, Prettier, TypeScript strict
- **CI/CD:** GitHub Actions (lint, typecheck, test, build, e2e)
- **Analytics:** Plausible (lightweight, privacy-friendly), Vercel Web Analytics, and Speed Insights with custom event tracking
- **Hosting & Domain:** Vercel + `amilemia.dev` (optionally `portfolio.amilemia.dev`)
- **Assets:** next/image with optimized local images

---

## 🧠 AI Integration Strategy

### Code Generation (Windsurf + Codex CLI)
- **How I’ll use it:**  
  - Scaffold components, routes, and utilities from clear acceptance criteria.  
  - Generate small, reviewable diffs (component + test together).  
  - Enforce accessibility (keyboard focus, roles/labels) and TypeScript strict types in all prompts.
  - **Windsurf (SWE-1):** used an OpenAPI spec to scaffold a typed client, demonstrating schema-aware generation.
- **Sample prompts:**  
  - *“Create a `ProjectCard` component using shadcn/ui Card + Tailwind. Props must match this Zod schema. Include keyboard focus styles, ARIA where needed, and a Vitest + Testing Library spec. Provide a usage example in MDX.”*  
  - *“Generate `/app/api/contact/route.ts` with Zod validation `{ name: string; email: string; message: string; }`. On success send via Resend, else return typed error. Include unit tests for the validator and a Playwright e2e for happy/invalid cases.”*

## 🎯 Analytics & Tracking

### Events Tracked

- **Home Page**
  - `CTA: Start a project` - When clicking the main CTA button
  - `CTA: View work` - When clicking the secondary CTA button
  
- **Projects**
  - `Project: View` - When viewing a project detail page (includes slug and title)
  - `Projects: Filter` - When filtering projects by tag (debounced 300ms)
  
- **Contact**
  - `Contact: Submitted` - When successfully submitting the contact form (includes message length)

### Implementation Details

- All tracking is client-side only and gracefully degrades if Plausible is blocked
- No personal or sensitive data is tracked
- Uses a centralized `track()` utility for consistent event naming and properties
- Preconnects to Plausible for improved performance

### Testing Support
- **Unit/Component (Vitest + Testing Library):** Ask AI to cover render states, props, a11y roles/labels, and edge cases driven by Zod schemas.  
- **E2E (Playwright):** AI to script smoke flows (nav, project detail, contact form submission) and error paths.  
- **Sample prompts:**  
  - *“Given this Zod schema for ContactForm, write Vitest tests for valid/invalid inputs and error messages with Testing Library.”*  
  - *“Write a Playwright spec: open `/`, navigate to a project page, submit Contact form (valid/invalid), assert toast/error states and network responses.”*

### Documentation
- **Docstrings & Comments:** Use AI to add concise docstrings explaining component responsibilities, a11y choices, and validation flow.  
- **README & Page Copy:** Draft and refine section copy (hero, about, project case studies) for clarity and tone; ensure consistency with the codebase.  
- **Change notes:** On structural changes, generate short migration notes (what moved and why).

### Context-Aware Techniques
- **Provide context to AI:**  
  - File tree (or relevant subtree) and `package.json` dependencies.  
  - Zod schemas for forms/content to drive types, tests, and examples.  
  - Diff hunks for PR-sized modifications.  
  - Contentlayer config and MDX frontmatter to keep code/data aligned.  
- **API/Schema grounding:** When adding routes or external APIs, paste the schema/OpenAPI snippet so AI can produce typed helpers and contract tests.

---

## 🚀 Features Implemented

### Step 3 — Pages & Routing
- App layout with accessible header navigation and footer
- Home page with hero, CTAs, and "Recent projects" (top 3 from Contentlayer2)
- Projects index with responsive grid and project cards
- Project detail pages rendering MDX content by slug (Contentlayer2 + App Router)
- About page with bio and highlights
- Contact page (UI only) with client-side Zod validation and inline errors

### Step 4 — Contact API
- POST `/api/contact` with Zod validation and Resend integration
- Runtime env validation for required secrets (`RESEND_API_KEY`, `CONTACT_TO`)
- Contact page wired to call the API with pending state and toasts
- Server returns field-level errors on 400 (mirrored in the UI)
- Rate limiting (3 requests/minute per IP) using Upstash Redis

### Services
- New /services page with 3 packages (Portfolio MVP, Startup Site, Retainer)
- Process and FAQ sections; CTAs deep-link to Contact with subject preset

### Analytics & Performance

#### Vercel Web Analytics 
- Enable in Vercel dashboard
- Added `@vercel/analytics` package
- Rendered `<Analytics />` in the root layout
- Verify in production/preview: Look for requests to `/_vercel/insights/view`

### Performance Optimizations

- **Images**:
  - All images use Next.js Image component with proper aspect ratios
  - Responsive `sizes` attribute for optimal loading
  - Placeholder UI for images while loading
  
- **Layout Stability**:
  - Fixed aspect ratio containers prevent layout shifts
  - Properly sized images prevent reflows
  - Consistent spacing and grid layouts

#### Vercel Speed Insights
- Enable in Vercel dashboard
- Added `@vercel/speed-insights` package
- Rendered `<SpeedInsights />` in the root layout
- Verify in production/preview: Look for `/_vercel/speed-insights/script.js`
  - Note: No data collection in development mode

#### Privacy Protection
- Uses `beforeSend` to filter sensitive routes:
  - Excludes `/admin` paths
  - Redacts URLs containing `?token=` or `&token=`
- No personally identifiable information (PII) is collected
- Data collection is limited to production deployments

#### Plausible Integration
- Running alongside Vercel Analytics for complementary insights
- Privacy-focused visitor analytics
- No cookies or persistent identifiers

### Step 5 — A11y & Design Polish
- Skip link for keyboard users and main content landmark
- Consistent layout primitives: `Container` and `Section`
- Global focus-visible outlines using theme ring token
- Minimal prose-like MDX styles (light/dark) without extra plugins
- Reduced-motion support
- External link safety (`rel="noopener noreferrer"`)

### Changelog Management

We use [Conventional Commits](https://www.conventionalcommits.org/) for consistent commit messages and automated changelog generation.

#### Updating the Changelog

1. Make sure your commits follow the Conventional Commits format:
   ```
   type(scope): short description
   
   [optional body]
   
   [optional footer]
   ```
   
   Example:
   ```
   feat(contact): add typed API client for contact form
   
   - Add OpenAPI spec for /api/contact
   - Generate TypeScript types from OpenAPI
   - Create typed fetch wrapper
   - Update contact form to use new client
   ```

2. To update the CHANGELOG.md, run:
   ```bash
   npm run changelog
   ```

3. Review the changes, then commit the updated CHANGELOG.md

#### Commit Types
- `feat`: New features
- `fix`: Bug fixes
- `docs`: Documentation changes
- `style`: Code style/formatting
- `refactor`: Code changes that don't add features or fix bugs
- `test`: Adding or updating tests
- `chore`: Build process or tooling changes

### Hire-me uplift (pre-tests)
- Hero value prop with clear 2-CTA funnel (Start a project / View work)
- Availability pill (Africa/Casablanca)
- Mobile sticky “Hire me” CTA
- Subtle polish to project cards (hover/focus) without changing selectors

### Testing (Day 2)
- **Unit/Component:** Vitest + Testing Library with jsdom setup
- **E2E:** Playwright with dev server auto-start and network stub for contact endpoint
- Stable selectors (`data-testid`) and a11y-aware queries (roles/labels)
- Commands: `npm test`, `npm run e2e`

### CI/CD
- CI: GitHub Actions pipeline (Node 20, npm cache, unit + e2e with Playwright)
- Analytics: Plausible (env-gated via `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`)

---

## 🛠️ Setup & Run

### Environment
Create `.env.local` from `.env.local.example` and fill:
- `RESEND_API_KEY` — Resend API key
- `CONTACT_TO` — the destination email for contact messages
- `UPSTASH_REDIS_REST_URL` — Upstash Redis REST URL (for rate limiting)
- `UPSTASH_REDIS_REST_TOKEN` — Upstash Redis REST token (for rate limiting)
- `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` — if set, loads Plausible analytics script; leave blank to disable locally.

> For development, the API uses `onboarding@resend.dev` as the sender.

### Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### API Types
- Generate types from the OpenAPI spec:
  ```bash
  npm run generate:api:types
  ```

### Changelog
- Uses Conventional Commits
- Update with: `npm run changelog`

---

### Continuous Integration
- GitHub Actions runs on push/PR to `main`:
  - content build → typecheck → lint → unit tests → Playwright e2e
- Dummy env vars are used in CI so the Contact API module loads:
  - `RESEND_API_KEY=dummy`
  - `CONTACT_TO=test@example.com`
- On e2e failure, the Playwright report is uploaded as a build artifact.

## 🚀 Deployment

### Vercel

1. **Connect your GitHub repository** to Vercel
2. **Set up environment variables** in the Vercel dashboard:
   - `RESEND_API_KEY` - Your Resend API key for sending emails
   - `CONTACT_TO` - The destination email for contact form submissions
   - `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` - Your Plausible domain for analytics (or leave empty to disable)
   - `UPSTASH_REDIS_REST_URL` - Required for rate limiting
   - `UPSTASH_REDIS_REST_TOKEN` - Required for rate limiting

   You can set these in the Vercel dashboard or use the Vercel CLI:
   ```bash
   vercel env add RESEND_API_KEY production
   vercel env add CONTACT_TO production
   vercel env add NEXT_PUBLIC_PLAUSIBLE_DOMAIN production
   vercel env add UPSTASH_REDIS_REST_URL production
   vercel env add UPSTASH_REDIS_REST_TOKEN production
   ```

3. **Push to deploy** - Vercel will automatically build and deploy your site on every push to the main branch

## 🌐 SEO Configuration

The portfolio includes comprehensive SEO optimizations out of the box:

### Core SEO Features

- **Global Metadata**: Properly configured in `app/layout.tsx` with title templates, descriptions, and OpenGraph/Twitter cards
- **Canonical URLs**: Automatically generated to prevent duplicate content issues
- **Structured Data**: JSON-LD schema for Person and Project types
- **Sitemap**: Dynamic sitemap at `/sitemap.xml` including all projects
- **Robots.txt**: Configured at `/robots.txt` with sitemap reference
- **OpenGraph Images**: Auto-generated social sharing images for both the homepage and individual projects

### Environment Variables

Create a `.env.local` file with the following variables:

```env
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://amilemia.dev
```

### Verifying SEO Implementation

1. **Metadata**: Check page source for proper meta tags and structured data
2. **Sitemap**: Visit `/sitemap.xml` to ensure all pages are listed
3. **Robots.txt**: Verify at `/robots.txt`
4. **OpenGraph Images**:
   - Homepage: `https://amilemia.dev/opengraph-image`
   - Project pages: `https://amilemia.dev/projects/[slug]/opengraph-image`
5. **Structured Data**: Use [Google's Rich Results Test](https://search.google.com/test/rich-results)

### Adding New Projects

1. Create a new MDX file in `content/projects/`
2. The sitemap will automatically include the new project
3. OpenGraph images are generated on-demand for each project

### Environment Variables
Make sure all required environment variables are set in your Vercel project settings for both Production and Preview environments.

## 🤖 AI Usage (so far)

- **Windsurf (SWE-1):** implemented typed API route, env runtime validation, and client wiring with a11y feedback and error handling.
- **Windsurf (SWE-1):** scaffolded pages/routing, header/footer, and form UI with a11y guardrails, using repo context and helpers.
- Changes delivered as small, reviewable diffs with verification steps and README notes.
- **Windsurf (SWE-1):** produced small diffs for a11y polish (skip link, focus styles) and reusable layout primitives without adding dependencies.
- **Windsurf (SWE-1):** small, test-safe UI uplift focused on conversion (no new deps, selectors stable).
- **Codex CLI:** scaffolded test config and representative tests & generated Conventional Commit messages and PR summaries.
