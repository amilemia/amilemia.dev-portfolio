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
- **Testing:** Vitest, @testing-library/react, Playwright
- **Quality:** ESLint, Prettier, TypeScript strict
- **CI/CD:** GitHub Actions (lint, typecheck, test, build, e2e)
- **Analytics:** Plausible (lightweight, privacy-friendly)
- **Hosting & Domain:** Vercel + `amilemia.dev` (optionally `portfolio.amilemia.dev`)
- **Assets:** next/image with optimized local images

---

## 🧠 AI Integration Strategy

### Code Generation (Windsurf + Codex CLI)
- **How I’ll use it:**  
  - Scaffold components, routes, and utilities from clear acceptance criteria.  
  - Generate small, reviewable diffs (component + test together).  
  - Enforce accessibility (keyboard focus, roles/labels) and TypeScript strict types in all prompts.
- **Sample prompts:**  
  - *“Create a `ProjectCard` component using shadcn/ui Card + Tailwind. Props must match this Zod schema. Include keyboard focus styles, ARIA where needed, and a Vitest + Testing Library spec. Provide a usage example in MDX.”*  
  - *“Generate `/app/api/contact/route.ts` with Zod validation `{ name: string; email: string; message: string; }`. On success send via Resend, else return typed error. Include unit tests for the validator and a Playwright e2e for happy/invalid cases.”*

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

### Step 5 — A11y & Design Polish
- Skip link for keyboard users and main content landmark
- Consistent layout primitives: `Container` and `Section`
- Global focus-visible outlines using theme ring token
- Minimal prose-like MDX styles (light/dark) without extra plugins
- Reduced-motion support
- External link safety (`rel="noopener noreferrer"`)

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
---

### Continuous Integration
- GitHub Actions runs on push/PR to `main`:
  - content build → typecheck → lint → unit tests → Playwright e2e
- Dummy env vars are used in CI so the Contact API module loads:
  - `RESEND_API_KEY=dummy`
  - `CONTACT_TO=test@example.com`
- On e2e failure, the Playwright report is uploaded as a build artifact.

## 🤖 AI Usage (so far)

- **Windsurf (SWE-1):** implemented typed API route, env runtime validation, and client wiring with a11y feedback and error handling.
- **Windsurf (SWE-1):** scaffolded pages/routing, header/footer, and form UI with a11y guardrails, using repo context and helpers.
- Changes delivered as small, reviewable diffs with verification steps and README notes.
- **Windsurf (SWE-1):** produced small diffs for a11y polish (skip link, focus styles) and reusable layout primitives without adding dependencies.
- **Windsurf (SWE-1):** small, test-safe UI uplift focused on conversion (no new deps, selectors stable).
- **Codex CLI:** scaffolded test config and representative tests & generated Conventional Commit messages and PR summaries.
